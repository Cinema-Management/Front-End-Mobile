import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { ImageBackground, Text, StyleSheet, TouchableOpacity, View, Dimensions } from 'react-native';
import image1 from '../../assets/img1.png';

export default function Welcome({ navigation }) {
    var { height, width } = Dimensions.get('window');
    return (
        <ImageBackground source={image1} className="flex-1 pb-32" style={{ width, height }}>
            <LinearGradient
                colors={['transparent', 'rgba(23,23,23,0.7)', 'rgba(23,23,23,0.7)']}
                style={{ width, height }}
                start={{ x: 0.5, y: 0 }}
                end={{ x: 0.5, y: 1 }}
                className="absolute "
            />
            <View className="absolute items-center bottom-0 left-2 p-0 m-0 h-[223px]">
                <View className="items-center">
                    <Text className="text-[32px] font-medium text-neutral-100 font-kanit leading-9">
                        Chào mừng đến với TD
                    </Text>
                    <Text className="text-[16px] text-center text-neutral-100 ">
                        Ứng dụng đặt phim tốt nhất Việt Nam giúp bạn có một ngày tuyệt vời!
                    </Text>
                </View>

                <TouchableOpacity
                    className="w-11/12 px-6 py-3 overflow-hidden mt-14"
                    onPress={() => navigation.navigate('SignInHome')}
                >
                    <LinearGradient
                        colors={['#ED999A', '#F6D365']}
                        style={styles.gradient}
                        start={{ x: 0.2, y: 0 }}
                        end={{ x: 0.5, y: 1 }}
                        className="absolute rounded-lg"
                    />
                    <Text
                        style={styles.buttonText}
                        className="text-center text-[18px] font-medium text-neutral-900 leading-5 font-kanit"
                    >
                        Bắt đầu
                    </Text>
                </TouchableOpacity>
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
