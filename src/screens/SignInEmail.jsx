import React, { useEffect, useState, useRef } from 'react';
import {
    StyleSheet,
    Platform,
    TouchableOpacity,
    View,
    Text,
    ImageBackground,
    Dimensions,
    ScrollView,
    Image,
    TextInput,
    KeyboardAvoidingView,
    Keyboard,
} from 'react-native';
import { API_URL } from '@env';
import logo from '../../assets/logo.png';
import { LinearGradient } from 'expo-linear-gradient';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Checkbox from 'expo-checkbox';
import Container from '../components/Container';
import { AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { loginUser } from '../redux/apiRequest';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function SignInEmail({ navigation }) {
    var { height, width } = Dimensions.get('window');
    const [isSelected, setSelection] = useState(false);

    const phoneRef = useRef('');
    const passWord = useRef('');
    const [showPass, setShowPass] = useState(false);
    const toggleShowPass = () => {
        setShowPass(!showPass);
    };
    const dispatch = useDispatch();

    const handleChangeSDT = (text) => {
        phoneRef.current = text;
    };
    const handleChangePass = (text) => {
        passWord.current = text;
    };
    useEffect(() => {
        const loadCredentials = async () => {
            try {
                const storedPhone = await AsyncStorage.getItem('phone');
                const storedPassword = await AsyncStorage.getItem('password');

                if (storedPhone && storedPassword) {
                    phoneRef.current = storedPhone;
                    passWord.current = storedPassword;
                    setSelection(true);
                }
            } catch (e) {
                console.error('Failed to load credentials', e);
            }
        };

        loadCredentials();
    }, []);
    const handleLogin = async () => {
        try {
            const newUser = {
                phone: phoneRef.current,
                password: passWord.current,
                type: 0,
            };

            const response = await axios.post(`${API_URL}/api/users/checkUserStatusByPhone`, newUser);
            const status = response.data;

            if (status) {
                if (status === 2) {
                    Toast.show({
                        type: 'error',
                        text1: 'Lỗi',
                        text2: 'Tài khoản này đã ngưng hoạt động!',
                    });
                    return;
                }
            } else {
                Toast.show({
                    type: 'error',
                    text1: 'Lỗi',
                    text2: 'Số điện thoại hoặc mật khẩu không chính !',
                });
                return;
            }

            const error = await loginUser(newUser, dispatch);
            if (error) {
                Toast.show({
                    type: 'error',
                    text1: 'Lỗi',
                    text2: 'Số điện thoại hoặc mật khẩu không chính xác!',
                });
                return;
            } else {
                if (isSelected) {
                    await AsyncStorage.setItem('phone', phoneRef.current);
                    await AsyncStorage.setItem('password', passWord.current);
                }

                Toast.show({
                    type: 'success',
                    text1: 'Thành công',
                    text2: 'Đăng nhập thành công!',
                });
            }
        } catch (e) {
            Toast.show({
                type: 'error',
                text1: 'Lỗi',
                text2: 'Tài khoản hoặc mật khẩu không chính xác!',
            });
        }
    };

    console.log('phoneRef', phoneRef.current);
    console.log('passWord', passWord.current);
    return (
        <Container
            home={true}
            // back={true}
            isScroll={false}
            title="Đăng nhập"
            style={{ color: 'white', fontWeight: 700, fontSize: 18, textTransform: 'uppercase' }}
        >
            <ScrollView
                keyboardShouldPersistTaps="handled"
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                scrollEnabled={false}
            >
                <View className="h-2/4 justify-center items-center mb-3  " style={{ height: hp(30) }}>
                    <Image source={logo} style={{ width: wp(55) }} resizeMode="contain" />
                </View>

                <View className="flex-1 items-center ">
                    <View style={{ height: hp(23), width: wp(90) }}>
                        <View className="gap-[5px] mb-2 h-1/3">
                            <View className="flex-row  items-center px-4 rounded-[20px] border-white border-[1px] ">
                                <FontAwesome name="user-o" size={15} color="white" />
                                <TextInput
                                    placeholder="Số điện thoại"
                                    placeholderTextColor="white"
                                    defaultValue={phoneRef.current}
                                    onChangeText={handleChangeSDT}
                                    keyboardType="phone-pad"
                                    className="text-[15px] ml-3 font-bold w-64 h-[45px] text-white"
                                />
                            </View>
                        </View>

                        <View className="gap-[5px] mb-3 h-1/3">
                            <View className="flex-row  items-center px-4 rounded-[20px] border-white border-[1px] ">
                                <AntDesign name="lock" size={15} color="white" />
                                <TextInput
                                    placeholder="Mật khẩu"
                                    placeholderTextColor="white"
                                    defaultValue={passWord.current}
                                    onChangeText={handleChangePass}
                                    secureTextEntry={passWord ? !showPass : false}
                                    className="text-[15px] ml-3 font-bold w-64 h-[45px] text-white"
                                />
                                <TouchableOpacity onPress={toggleShowPass}>
                                    <Ionicons
                                        name={showPass ? 'eye-off-outline' : 'eye-outline'}
                                        size={20}
                                        color="white"
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View className="flex-row wh-1/3 justify-between items-center  ">
                            <View className="flex-row items-center ">
                                <Checkbox
                                    value={isSelected}
                                    onValueChange={setSelection}
                                    color={isSelected ? 'orange' : undefined}
                                    style={styles.checkbox}
                                />

                                <Text className="text-white text-[15px] font-normal ml-2">Lưu mật khẩu</Text>
                            </View>

                            <TouchableOpacity>
                                <Text className="text-[#EC870E] text-[15px] font-bold">Quên mật khẩu?</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View className=" mt-10 justify-center" style={{ height: hp(25), width: wp(80) }}>
                        <TouchableOpacity className="justify-center items-center" onPress={() => handleLogin()}>
                            <LinearGradient
                                colors={['#ED999A', '#F6D365']}
                                style={styles.gradientButton}
                                start={{ x: 0.4, y: 0.1 }}
                                end={{ x: 0.5, y: 1 }}
                                className="absolute rounded-lg"
                            />
                            <Text
                                style={styles.buttonText}
                                className="text-center text-lg text-[18px] font-bold text-white"
                            >
                                Đăng nhập
                            </Text>
                        </TouchableOpacity>

                        <View className="items-center mt-5">
                            <Text className="text-sm text-white font-bold">
                                Không có tài khoản?
                                <Text
                                    className="text-[#F6D365] font-bold"
                                    onPress={() => navigation.navigate('Register')}
                                >
                                    Đăng ký
                                </Text>
                            </Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </Container>
    );
}
const styles = StyleSheet.create({
    gradient: {
        ...StyleSheet.absoluteFillObject,
    },
    gradientButton: {
        borderRadius: 25,
        marginTop: 20,
        width: wp(80),
        height: 45,
    },

    checkbox: {
        height: 23,
        width: 23,
        marginLeft: 10,
    },
});
