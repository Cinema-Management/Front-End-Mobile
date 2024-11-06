import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import Animated, { Easing, useSharedValue, useAnimatedStyle, withTiming, withRepeat } from 'react-native-reanimated';

const Loading = () => {
    const opacity = useSharedValue(0);

    useEffect(() => {
        // Hiệu ứng mờ dần cho logo
        opacity.value = withTiming(1, {
            duration: 1000,
            easing: Easing.inOut(Easing.ease),
        });
    }, []);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            opacity: opacity.value,
        };
    });

    const createDotAnimation = (index) => {
        const dotOpacity = useSharedValue(0);
        const startBlinking = () => {
            dotOpacity.value = withRepeat(
                withTiming(1, {
                    duration: 500,
                    easing: Easing.inOut(Easing.ease),
                }),
                -1,
                true,
            );
        };

        const dotStyle = useAnimatedStyle(() => {
            return {
                opacity: dotOpacity.value,
            };
        });

        useEffect(() => {
            const delay = index * 500; // Độ trễ giữa các chấm
            const timeoutId = setTimeout(() => {
                startBlinking();
            }, delay);
            return () => clearTimeout(timeoutId);
        }, [index]);

        return dotStyle;
    };

    return (
        <View style={styles.container}>
            <Animated.View style={[styles.animatedContainer, animatedStyle]}>
                <Image source={require('../../assets/logo.png')} style={styles.image} resizeMode="contain" />
                <Text style={styles.text}>TD Cinemas</Text>
            </Animated.View>
            <View style={styles.dotsContainer}>
                {[...Array(3)].map((_, index) => {
                    const dotStyle = createDotAnimation(index);
                    return <Animated.View key={index} style={[styles.dot, dotStyle]} />;
                })}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000',
    },
    animatedContainer: {
        alignItems: 'center',
    },
    text: {
        color: '#fff',
        fontSize: 20,
        marginTop: 10,
        fontWeight: 'bold',
    },
    dotsContainer: {
        flexDirection: 'row',
        marginTop: 20,
    },
    dot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#fff',
        marginHorizontal: 5,
    },
});

export default Loading;
