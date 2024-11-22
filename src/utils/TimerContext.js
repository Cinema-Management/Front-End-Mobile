import React, { createContext, useState, useEffect, useCallback } from 'react';
import { Alert, AppState, Modal, TouchableOpacity, View, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import updateStatusSeat from '../queries/updateStatusSeat';

export const TimerContext = createContext();

export const TimerProvider = ({ children, timerId = 'abd', initialSeconds = 10 * 60 }) => {
    const [showtimeMain, setShowtimeMain] = useState('');
    const [returnCodeMain, setReturnCodeMain] = useState('');
    const [seconds, setSeconds] = useState(initialSeconds);
    const [isActive, setIsActive] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedSeatValue, setSelectedSeatValue] = useState('');

    const handleSuccess = () => {
        setModalVisible(false);
        updateStatusSeat(selectedSeatValue, 1, showtimeMain?.code);

        navigation.navigate('Film', { showtime: showtimeMain });
    };

    const navigation = useNavigation();
    const [appState, setAppState] = useState(AppState.currentState);

    const saveEndTime = async () => {
        try {
            const endTime = Date.now() + seconds * 1000;
            await AsyncStorage.setItem(`end_time_${timerId}`, endTime.toString());
        } catch (error) {
            console.error('Error saving end time:', error);
        }
    };

    const loadRemainingTime = useCallback(async () => {
        try {
            const storedEndTime = await AsyncStorage.getItem(`end_time_${timerId}`);
            if (storedEndTime) {
                const remaining = Math.max(Math.floor((parseInt(storedEndTime, 10) - Date.now()) / 1000), 0);
                setSeconds(remaining);
                setIsActive(true); // Đảm bảo bộ đếm đang hoạt động khi còn thời gian
            } else {
                setSeconds(initialSeconds);
            }
        } catch (error) {
            console.error('Error loading remaining time:', error);
        }
    }, [initialSeconds, timerId]);

    useFocusEffect(
        useCallback(() => {
            let intervalId;
            if (isActive) {
                saveEndTime();

                intervalId = setInterval(() => {
                    setSeconds((prevSeconds) => {
                        if (prevSeconds <= 1) {
                            clearInterval(intervalId);
                            setIsActive(false); // Đặt isActive về false khi hết thời gian
                            // if (showtimeMain && returnCodeMain !== 1) {
                            //     Alert.alert('Hết thời gian giữ ghế', 'Vui lòng chọn lại.');
                            //     navigation.navigate('Seat', { showtime: showtimeMain });
                            // }
                            if (showtimeMain) {
                                setModalVisible(true);
                            }
                            return 0;
                        }
                        return prevSeconds - 1;
                    });
                }, 1000);
            }

            return () => clearInterval(intervalId);
        }, [isActive, navigation, showtimeMain, returnCodeMain]),
    );

    useFocusEffect(
        useCallback(() => {
            loadRemainingTime();
        }, [loadRemainingTime]),
    );

    useFocusEffect(
        useCallback(() => {
            const subscription = AppState.addEventListener('change', (nextAppState) => {
                if (appState.match(/inactive|background/) && nextAppState === 'active') {
                    loadRemainingTime();
                }
                setAppState(nextAppState);
            });

            return () => {
                subscription.remove();
            };
        }, [appState, loadRemainingTime]),
    );

    const startTimer = () => {
        setSeconds(initialSeconds);
        setIsActive(true);
    };

    const stopTimer = () => setIsActive(false);

    const resetTimer = () => {
        setIsActive(false);
        setSeconds(initialSeconds);
        AsyncStorage.removeItem(`end_time_${timerId}`);
    };

    const setShowtime = (t) => setShowtimeMain(t);
    const setReturnCode = (t) => setReturnCodeMain(t);
    const setSelectedSeats = (t) => setSelectedSeatValue(t);
    const nextTimer = () => {
        setIsActive(true);
    };
    // console.log('seconds', seconds);
    return (
        <TimerContext.Provider
            value={{
                seconds,
                startTimer,
                stopTimer,
                resetTimer,
                nextTimer,
                setShowtime,
                setReturnCode,
                setSelectedSeats,
            }}
        >
            {children}
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View className=" justify-center items-center bg-black/30 z-50 flex-1  ">
                    {/* Nội dung modal */}
                    <View className="bg-white  rounded-lg " style={{ height: hp(15), width: wp(60) }}>
                        <View
                            style={{ height: hp(10), width: wp(60) }}
                            className="justify-center items-center border-b-[0.5px] border-gray-300"
                        >
                            <Text className="text-sm font-bold">Thông báo</Text>
                            <Text className="text-sm">Hết thời gian giao dịch</Text>
                        </View>
                        <View className="flex-row items-center justify-center  h-[100%] flex-1 rounded-b-lg">
                            <TouchableOpacity
                                onPress={handleSuccess}
                                className="justify-center items-center bg-white rounded-b-lg flex-1 h-[100%]"
                                underlayColor="#DDDDDD"
                            >
                                <Text className="text-blue-500 text-center">Đóng</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </TimerContext.Provider>
    );
};
