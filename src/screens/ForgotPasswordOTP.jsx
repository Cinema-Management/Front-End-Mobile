import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    Text,
    Image,
    SafeAreaView,
    Dimensions,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    TouchableWithoutFeedback,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import dismissKeyboard from 'react-native/Libraries/Utilities/dismissKeyboard';
import Ionicons from '@expo/vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';

export default function NewPassword({ navigation }) {
    var { height, width } = Dimensions.get('window');
    const [otp, setOtp] = useState(['', '', '', '']);
    const otpRefs = useRef([]);
    const [timer, setTimer] = useState(60);

    const handleChange = (text, index) => {
        const newOtp = [...otp];
        newOtp[index] = text;
        setOtp(newOtp);

        if (text.length === 1 && index < otpRefs.current.length - 1) {
            otpRefs.current[index + 1].focus();
        }

        if (text.length === 0 && index > 0) {
            otpRefs.current[index - 1].focus();
        }
    };

    useEffect(() => {
        if (timer > 0) {
            const interval = setInterval(() => {
                setTimer((prevTime) => prevTime - 1);
            }, 1000);

            return () => clearInterval(interval);
        }
    }, [timer]);

    return (
        <TouchableWithoutFeedback style={{ flex: 1 }} onPress={dismissKeyboard}>
            <SafeAreaView className="flex-1 text-white p-3 bg-[#1c1c1c] ">
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={{ flex: 1, alignItems: 'center' }}
                    keyboardVerticalOffset={Platform.OS === 'ios' ? 220 : 220}
                >
                    <View className="items-center flex-row space-x-12 " style={{ width: width * 0.88 }}>
                        <TouchableOpacity className=" bg-[#555555] w-10 h-10 rounded-[100px] justify-center items-center ">
                            <Ionicons name="chevron-back" size={30} color="white" style={{ padding: '8px' }} />
                        </TouchableOpacity>
                        <Text className="text-[24px] text-white leading-[26px] font-medium">Quên mật khẩu</Text>
                    </View>

                    <View className="items-center px-5 justify-center mt-6 ">
                        <Text className="text-base font-normal text-[#CACBCE]">
                            Mã OTP đã được gửi đến số +84 363 *** 399
                        </Text>
                    </View>

                    <View className="  m-20 items-center">
                        <View className="flex-row ">
                            {otp.map((digit, index) => (
                                <TextInput
                                    key={index}
                                    style={[styles.otpInput, digit ? styles.filledOtpInput : null]}
                                    keyboardType="numeric"
                                    maxLength={1}
                                    onChangeText={(text) => handleChange(text, index)}
                                    value={digit}
                                    ref={(el) => (otpRefs.current[index] = el)}
                                />
                            ))}
                        </View>

                        <Text className="text-base text-white font-normal mt-5">
                            Gửi mã trong <Text style={styles.timer}>{timer}s</Text>
                        </Text>
                    </View>
                </KeyboardAvoidingView>

                <View className="px-5  space-y-16 absolute bottom-6" style={{ width: width * 0.99 }}>
                    <TouchableOpacity className=" py-3 my-5 px-5">
                        <LinearGradient
                            colors={['#ED999A', '#F6D365']}
                            style={styles.gradient}
                            start={{ x: 0.4, y: 0.1 }}
                            end={{ x: 0.9, y: 0.2 }}
                            className="absolute rounded-lg"
                        />
                        <Text
                            style={styles.buttonText}
                            className="text-center text-[18px] 
                      font-bold text-black leading-5 font-kanit"
                        >
                            Xác nhận
                        </Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    );
}
const styles = StyleSheet.create({
    gradient: {
        ...StyleSheet.absoluteFillObject,
    },
    otpInput: {
        width: 60,
        height: 60,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#888',
        color: 'white',
        fontSize: 24,
        textAlign: 'center',
        marginHorizontal: 5,
    },
    filledOtpInput: {
        borderColor: '#FF9900',
    },
    timer: {
        color: '#FF9900',
    },
});
