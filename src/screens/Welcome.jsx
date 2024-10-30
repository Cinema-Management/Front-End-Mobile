import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from 'react';
import { ImageBackground, Text, StyleSheet, TouchableOpacity, View, Dimensions, BackHandler } from 'react-native';
import image1 from '../../assets/img1.png';
import ButtonPrimary from '../components/ButtonPrimary';
export default function Welcome({ navigation }) {
    return (
        <ImageBackground source={image1} style={{ flex: 1 }}>
            <LinearGradient colors={['rgba(0, 0, 0, 0.3)', 'rgba(0, 0, 0, 0.7)']} style={styles.gradient} />
            <View className="absolute items-center  bottom-0 left-2 p-0 m-0 h-[223px]">
                <View className="items-center px-3">
                    <Text className="text-[32px] font-medium text-neutral-100 leading-9">Chào mừng đến với TD</Text>
                    <Text className="text-[16px] text-center text-neutral-100 ">
                        Ứng dụng đặt phim tốt nhất Việt Nam giúp bạn có một ngày tuyệt vời!
                    </Text>
                </View>

                <ButtonPrimary title="Bắt đầu" onPress={() => navigation.navigate('SignInEmail')} />
            </View>
        </ImageBackground>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'between',
    },
    gradient: {
        ...StyleSheet.absoluteFillObject,
    },
});
