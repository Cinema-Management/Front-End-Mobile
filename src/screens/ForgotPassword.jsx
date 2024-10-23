import React from 'react';
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
import quenMK from '../../assets/quenmk.png';
import { LinearGradient } from 'expo-linear-gradient';

export default function ForgotPassword({ navigation }) {
    var { height, width } = Dimensions.get('window');
    return (
        <TouchableWithoutFeedback style={{ flex: 1 }} onPress={dismissKeyboard}>
            <SafeAreaView className="flex-1 text-white p-3  bg-[#1c1c1c] ">
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={{ flex: 1 }}
                    keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 100}
                >
                    <View className="items-center flex-row space-x-16 px-5">
                        <TouchableOpacity className=" bg-[#555555] w-10 h-10 rounded-[100px] justify-center items-center ">
                            <Ionicons name="chevron-back" size={30} color="white" style={{ padding: '8px' }} />
                        </TouchableOpacity>
                        <Text className="text-[24px] text-white leading-[26px] font-medium">Quên mật khẩu</Text>
                    </View>

                    <View className="items-center px-5 justify-center mt-6 ">
                        <Text className="text-base text-center  text-white font-normal ">
                            Chọn thông tin liên hệ mà chúng tôi sẽ sử dụng để đặt lại mật khẩu của bạn.
                        </Text>
                        <Image source={quenMK} className=" h-48 m-6" />

                        <View className="space-y-3">
                            <TouchableOpacity
                                className="flex-row border items-center p-3 space-x-3 h-16 rounded-lg border-[#7d7d7d] "
                                style={{ width: width * 0.9 }}
                            >
                                <Ionicons name="chatbubble-ellipses-sharp" size={28} color="#FF9900" />
                                <View className="">
                                    <Text className="text-[#7d7d7d] font-normal text-sm">Gửi qua SMS</Text>
                                    <TextInput
                                        className=" text-white h-6 w-56 font-normal text-sm"
                                        placeholder="Nhập SDT của bạn"
                                        placeholderTextColor="white"
                                        keyboardType="phone-pad"
                                    />
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                className="flex-row border items-center p-3 space-x-3 h-16 rounded-lg border-[#7d7d7d] "
                                style={{ width: width * 0.9 }}
                            >
                                <Ionicons name="send" size={28} color="#C0C0C0" />
                                <View className="">
                                    <Text className="text-[#7d7d7d] font-normal text-sm">Gửi qua Email</Text>
                                    <TextInput
                                        className=" text-white w-56 h-6  font-normal text-sm"
                                        placeholder="Nhập Email của bạn"
                                        placeholderTextColor="white"
                                    />
                                </View>
                            </TouchableOpacity>
                        </View>
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
                      font-medium text-black leading-5 "
                        >
                            Tiếp tục
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
});
