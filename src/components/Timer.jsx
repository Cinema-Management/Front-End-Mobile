import { useNavigation, useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { useEffect, useState, useCallback } from 'react';
import { Text, Alert, AppState } from 'react-native';
import { API_URL } from '@env';
import { formatTimer } from '../utils/Date';

const Timer = ({ isActive, selectedSeats, showtime, classNameTimer, timerId = 'abc', initialSeconds = 10 }) => {
    const [seconds, setSeconds] = useState(initialSeconds);
    const navigation = useNavigation();
    const [appState, setAppState] = useState(AppState.currentState);

    // Lưu thời gian kết thúc khi bắt đầu bộ đếm
    const saveEndTime = async () => {
        try {
            const endTime = Date.now() + seconds * 1000; // Thời gian hiện tại cộng với thời gian giữ ghế
            await AsyncStorage.setItem(`end_time_${timerId}`, endTime.toString());
        } catch (error) {
            console.error('Error saving end time:', error);
        }
    };

    // Khôi phục thời gian còn lại khi quay lại màn hình
    const loadRemainingTime = useCallback(async () => {
        try {
            const storedEndTime = await AsyncStorage.getItem(`end_time_${timerId}`);
            if (storedEndTime) {
                const remaining = Math.max(Math.floor((parseInt(storedEndTime, 10) - Date.now()) / 1000), 0);
                setSeconds(remaining);
            } else {
                setSeconds(initialSeconds);
            }
        } catch (error) {
            console.error('Error loading remaining time:', error);
        }
    }, [initialSeconds, timerId]);

    useEffect(() => {
        if (isActive) {
            saveEndTime(); // Lưu thời gian kết thúc khi kích hoạt
            const intervalId = setInterval(() => {
                setSeconds((prev) => {
                    if (prev <= 1) {
                        clearInterval(intervalId);
                        navigation.navigate('Seat', { showtime });
                        Alert.alert('Hết thời gian giữ ghế', 'Vui lòng chọn ghế lại.');
                        return 0;
                    }

                    return prev - 1; // Giảm thời gian
                });
            }, 1000);

            return () => clearInterval(intervalId); // Dừng interval khi unmount
        }
    }, [isActive, navigation, selectedSeats, showtime]);

    // Khi màn hình focus trở lại thì load lại thời gian còn lại
    useFocusEffect(
        useCallback(() => {
            loadRemainingTime();
        }, [loadRemainingTime]),
    );

    // Theo dõi trạng thái ứng dụng
    useEffect(() => {
        const subscription = AppState.addEventListener('change', (nextAppState) => {
            if (appState.match(/inactive|background/) && nextAppState === 'active') {
                loadRemainingTime(); // Khi ứng dụng quay lại chế độ hoạt động
            }
            setAppState(nextAppState);
        });

        return () => {
            subscription.remove(); // Dọn dẹp khi component unmount
        };
    }, [appState, loadRemainingTime]);

    return (
        <Text className={classNameTimer}>
            Thời gian giữ ghế: <Text className="font-semibold">{formatTimer(seconds)}</Text>{' '}
        </Text>
    );
};

export default Timer;
