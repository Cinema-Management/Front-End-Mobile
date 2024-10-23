import React, { useState } from 'react';
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
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Checkbox from 'expo-checkbox';

export default function NewPassword({ navigation }) {
    var { height, width } = Dimensions.get('window');
    const [isSelected, setSelection] = useState(false);

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
                        <Text className="text-[24px] text-white leading-[26px] font-medium">Tạo mật khẩu mới</Text>
                    </View>

                    <View className="items-center px-5 justify-center mt-6 ">
                        <Image source={quenMK} className=" m-6" />

                        <View className=" h-auto my-3" style={{ width: width * 0.9 }}>
                            <View className="flex-row items-center space-x-1">
                                <Ionicons name="checkmark-circle-outline" size={20} color="green" />
                                <Text className="text-green-700 text-center text-[12px] font-normal">
                                    Chứa 1 chữ cái hoa , thường.
                                </Text>
                            </View>
                            <View className="flex-row items-center space-x-1">
                                <Ionicons name="checkmark-circle-outline" size={20} color="green" />
                                <Text className="text-green-700 text-center text-[12px] font-normal">
                                    Chứa ít nhất 1 số.
                                </Text>
                            </View>
                            <View className="flex-row items-center space-x-1">
                                <Ionicons name="checkmark-circle-outline" size={20} color="green" />
                                <Text className="text-green-700 text-center text-[12px] font-normal">
                                    Ít nhất 8 ký tự.
                                </Text>
                            </View>
                        </View>

                        <View className="space-y-3">
                            <View
                                className="flex-row border items-center py-2 px-3 space-x-3 h-12 rounded-lg border-[#7d7d7d] "
                                style={{ width: width * 0.9 }}
                            >
                                <MaterialIcons name="lock" size={24} color="white" />
                                <TextInput
                                    className=" text-white h-6 w-56 font-normal text-sm"
                                    placeholder="Nhập mật khẩu mới "
                                    placeholderTextColor="white"
                                    secureTextEntry={true}
                                />
                                <Ionicons name="eye" size={28} color="#C0C0C0" />
                            </View>

                            <View
                                className="flex-row border items-center py-2 px-3 space-x-3 h-12 rounded-lg border-[#7d7d7d] "
                                style={{ width: width * 0.9 }}
                            >
                                <MaterialIcons name="lock" size={24} color="white" />
                                <TextInput
                                    className=" text-white h-6 w-56 font-normal text-sm"
                                    placeholder="Nhập lại mật khẩu mới"
                                    placeholderTextColor="white"
                                    secureTextEntry={true}
                                />
                                <Ionicons name="eye-off" size={28} color="#C0C0C0" />
                            </View>
                            <View className="flex-row items-center ">
                                <Checkbox value={isSelected} onValueChange={setSelection} />
                                <Text className="text-white text-sm font-normal ml-2">Lưu mật khẩu</Text>
                            </View>
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
                      font-bold text-black leading-5 "
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
});
