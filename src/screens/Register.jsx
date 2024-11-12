import React, { useRef, useState } from 'react';
import {
    View,
    Text,
    ImageBackground,
    Dimensions,
    Image,
    ScrollView,
    SafeAreaView,
    TouchableOpacity,
    TextInput,
    StyleSheet,
    KeyboardAvoidingView,
    FlatList,
    Platform,
    Alert,
} from 'react-native';
import image1 from '../../assets/img1.png';
import logo from '../../assets/logo.png';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from '@expo/vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { AntDesign } from '@expo/vector-icons';
import Checkbox from 'expo-checkbox';
import InputComponent from '../components/InputComponent';
import { Dropdown } from 'react-native-element-dropdown';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import ButtonPrimary from '../components/ButtonPrimary';
import { useDispatch } from 'react-redux';
import ModalNotify from '../components/ModalNotify';
import axios from 'axios';
import { API_URL } from '@env';
import { registerUser } from '../redux/apiRequest';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Register({ navigation }) {
    var { height, width } = Dimensions.get('window');
    const [isSelected, setIsSelection] = useState(false);
    const [isSelected2, setIsSelection2] = useState(false);
    const optionGender = [
        { label: 'Nam', value: '1' },
        { label: 'Nữ', value: '2' },
    ];

    const [selectedGender, setSelectedGender] = useState(optionGender[0]);

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [showPass, setShowPass] = useState(false);
    const nameRef = useRef('');
    const emailRef = useRef('');
    const phoneRef = useRef('');
    const passwordRef = useRef('');
    const confirmPasswordRef = useRef('');
    const [errors, setErrors] = useState(''); // State to store error messages

    const [modalVisible, setModalVisible] = useState(false);
    const toggleShowPass = () => {
        setShowPass(!showPass);
    };
    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        setSelectedDate(date);
        hideDatePicker();
    };

    const validate = async () => {
        let errorMessages = '';
        const regexPhone = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;
        const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
        const { data } = await axios.post(API_URL + '/api/users/checkPhoneOrEmailExist', {
            phone: phoneRef.current,
            email: emailRef.current,
            type: 0,
        });

        let valid = true;
        let modal = false;

        if (nameRef.current?.length < 2) {
            errorMessages = 'Họ tên ít nhất 2 từ';
            modal = true;
            valid = false;
        } else if (!phoneRef.current || !regexPhone.test(phoneRef.current)) {
            errorMessages = 'Số điện thoại không đúng';
            modal = true;
            valid = false;
        } else if (data?.phone) {
            errorMessages = 'Số điện thoại đã tồn tại';
            modal = true;
            valid = false;
        } else if (!emailRef.current || !regexEmail.test(emailRef.current)) {
            errorMessages = 'Email không đúng';
            modal = true;
            valid = false;
        } else if (data?.email) {
            errorMessages = 'Email đã tồn tại';
            modal = true;
            valid = false;
        } else if (!passwordRef.current || !passRegex.test(passwordRef.current)) {
            errorMessages = 'Mật khẩu ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số.';
            modal = true;
            valid = false;
        } else if (passwordRef.current !== confirmPasswordRef.current) {
            errorMessages = 'Xác nhận mật khẩu không khớp.';
            modal = true;
            valid = false;
        } else if (!isSelected || !isSelected2) {
            errorMessages = 'Vui lòng đồng ý với điều khoản sử dụng và chính sách bảo mật';
            modal = true;
            valid = false;
        }

        setErrors(errorMessages);
        setModalVisible(modal);
        return valid;
    };

    const handleRegister = async () => {
        try {
            const isValid = await validate();

            if (!isValid) {
                console.log('Vui lòng chọn ');
                return;
            }
            const newUser = {
                name: nameRef.current,
                phone: phoneRef.current,
                email: emailRef.current,
                password: passwordRef.current,
                gender: selectedGender?.label,

                birthDate: selectedDate
                    ? `${selectedDate.getFullYear()}-${selectedDate.getMonth() + 1}-${selectedDate.getDate()}`
                    : '',
                type: 0,
            };
            const { data } = await axios.post(`${API_URL}/api/auth/register`, newUser);
            if (data) {
                Alert.alert(
                    'Thành công',
                    'Vui lòng đăng nhập',
                    [{ text: 'Đóng', onPress: () => console.log('OK Pressed') }],
                    {
                        cancelable: false,
                    },
                );
                await AsyncStorage.removeItem('phone');
                await AsyncStorage.removeItem('password');
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'SignInEmail' }],
                });
            } else {
                setErrors('Đăng ký thất bại');
                setModalVisible(true);
            }
        } catch (error) {
            setErrors('Lỗi hệ thống');
            setModalVisible(true);
        }
    };
    return (
        <ImageBackground source={image1} style={{ width, height }} className="bg-black/80">
            <LinearGradient
                colors={['transparent', 'rgba(23,23,23,0.9)', 'rgba(23,23,23,0.9)']}
                style={{ width, height }}
                start={{ x: 10, y: 0 }}
                end={{ x: 0, y: 0 }}
                className="absolute "
            />
            <SafeAreaView style={{ height: hp(100), marginTop: Platform.OS === 'ios' ? 0 : 22 }}>
                <ModalNotify
                    title={'Lỗi'}
                    modalVisible={modalVisible}
                    setModalVisible={setModalVisible}
                    message={errors}
                />

                <TouchableOpacity
                    className=" bg-[#555555] w-10 h-10 rounded-[100px] justify-center items-center ml-5"
                    onPress={() => navigation.goBack()}
                >
                    <Ionicons name="chevron-back" size={30} color="white" style={{ padding: '8px' }} />
                </TouchableOpacity>

                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={{ height: hp(80) }}
                    keyboardVerticalOffset={Platform.OS === 'ios' ? 10 : 100}
                >
                    <ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled={true}>
                        <View className="flex-1 h-[35%] ">
                            <Image className="m-auto" source={logo} />
                        </View>
                        <View className="flex-2 h-[65%] m-auto mt-4 mb-20 w-[85%] space-y-3">
                            <View className="mb-2 ">
                                <View className="flex-row items-center rounded-[20px] bg-transparent justify-between border px-2 border-white">
                                    <Icon name="account" size={20} color="#fff" />
                                    <TextInput
                                        onChangeText={(text) => (nameRef.current = text)}
                                        placeholder="Họ và tên"
                                        textContentType="name"
                                        placeholderTextColor="gray"
                                        className="text-[15px] flex-1 py-3 h-auto text-white pl-2"
                                    />
                                </View>
                                <Text className="absolute text-orange-400 -right-2 -top-2 font-bold text-lg">*</Text>
                            </View>

                            <View className="mb-2 ">
                                <View className="flex-row items-center rounded-[20px] bg-transparent justify-between border px-2 border-white">
                                    <Icon name="phone" size={20} color="#fff" />
                                    <TextInput
                                        placeholder="Số điện thoại"
                                        textContentType="telephoneNumber"
                                        placeholderTextColor="gray"
                                        onChangeText={(text) => (phoneRef.current = text)}
                                        className="text-[15px] flex-1 py-3 h-auto text-white pl-2"
                                    />
                                </View>
                                <Text className="absolute text-orange-400 -right-2 -top-2 font-bold text-lg">*</Text>
                            </View>
                            <View className="mb-2 ">
                                <View className="flex-row items-center rounded-[20px] bg-transparent justify-between border px-2 border-white">
                                    <Icon name="email" size={20} color="#fff" />
                                    <TextInput
                                        placeholder="Email"
                                        placeholderTextColor="gray"
                                        textContentType="emailAddress"
                                        onChangeText={(text) => (emailRef.current = text)}
                                        className="text-[15px] flex-1 py-3 h-auto text-white pl-2"
                                    />
                                </View>
                                <Text className="absolute text-orange-400 -right-2 -top-2 font-bold text-lg">*</Text>
                            </View>

                            <View className="mb-2">
                                <View className="flex-row items-center rounded-[20px] bg-[transparent] justify-between border border-white px-2">
                                    <Icon name="key-variant" size={20} color="#fff" />
                                    <TextInput
                                        placeholder="Mật khẩu"
                                        placeholderTextColor="gray"
                                        className="text-[15px] flex-1 py-3 h-auto text-white pl-2"
                                        textContentType="newPassword"
                                        autoComplete="off"
                                        onChangeText={(text) => (passwordRef.current = text)}
                                        secureTextEntry={!showPass}
                                    />
                                    <TouchableOpacity onPress={toggleShowPass}>
                                        <Ionicons
                                            name={!showPass ? 'eye-off-outline' : 'eye-outline'}
                                            size={20}
                                            color="white"
                                        />
                                    </TouchableOpacity>
                                    <Text className="absolute text-orange-400 -right-2 -top-2 font-bold text-lg">
                                        *
                                    </Text>
                                </View>
                            </View>

                            <View className="mb-2">
                                <View className="flex-row items-center rounded-[20px] bg-[transparent] justify-between border border-white px-2">
                                    <Icon name="key-variant" size={20} color="#fff" />
                                    <TextInput
                                        placeholder="Xác nhận mật khẩu"
                                        textContentType="newPassword"
                                        autoComplete="off"
                                        placeholderTextColor="gray"
                                        className="text-[15px] flex-1 py-3 h-auto text-white pl-2"
                                        onChangeText={(text) => (confirmPasswordRef.current = text)}
                                        secureTextEntry={!showPass}
                                    />
                                    <TouchableOpacity onPress={toggleShowPass}>
                                        <Ionicons
                                            name={!showPass ? 'eye-off-outline' : 'eye-outline'}
                                            size={20}
                                            color="white"
                                        />
                                    </TouchableOpacity>
                                    <Text className="absolute text-orange-400 -right-2 -top-2 font-bold text-lg">
                                        *
                                    </Text>
                                </View>
                            </View>

                            <View className="mb-4 flex-row items-center gap-3">
                                <View className="flex-1 ">
                                    <Dropdown
                                        data={optionGender}
                                        labelField="label"
                                        valueField="value"
                                        maxHeight={100}
                                        placeholder="Nam"
                                        value={selectedGender}
                                        onChange={(item) => {
                                            setSelectedGender(item);
                                        }}
                                        style={{
                                            backgroundColor: 'transparent',
                                            color: 'white',
                                            borderRadius: 20,
                                            borderWidth: 1,
                                            borderColor: 'white',
                                        }}
                                        selectedTextStyle={{
                                            color: 'white',
                                            textAlign: 'right',
                                            padding: 11,
                                        }}
                                        iconStyle={{
                                            width: 20,
                                            height: 30,
                                            marginRight: 10,
                                        }}
                                        activeColor="transparent"
                                        placeholderStyle={{ color: 'white', textAlign: 'right', padding: 11 }}
                                        containerStyle={{
                                            backgroundColor: 'white',
                                            borderRadius: 5,
                                            height: 'auto',
                                            shadowColor: 'white',
                                            elevation: 10,
                                        }}
                                        iconColor="white"
                                        itemTextStyle={{
                                            color: 'black',
                                            textAlign: 'center',
                                            height: 20,
                                        }}
                                        itemContainerStyle={{
                                            borderBottomWidth: 0.2,
                                            borderBottomColor: 'black',
                                            opacity: 0.9,
                                            justifyContent: 'center',
                                            marginBottom: 1,
                                            height: 40,
                                        }}
                                    />
                                </View>

                                <View
                                    style={{
                                        alignItems: 'center',
                                        flexDirection: 'row',
                                        backgroundColor: 'transparent',
                                        padding: 5,
                                        flex: 2,
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        borderWidth: 1,
                                        borderColor: 'white',
                                        borderRadius: 20,
                                    }}
                                >
                                    {!selectedDate && (
                                        <Text style={{ fontSize: 15, color: 'white', marginLeft: 10, padding: 8 }}>
                                            Ngày sinh
                                        </Text>
                                    )}
                                    <View>
                                        <DateTimePickerModal
                                            isVisible={isDatePickerVisible}
                                            mode="date"
                                            themeVariant="light"
                                            confirmTextIOS="Xác nhận"
                                            cancelTextIOS="Hủy"
                                            onConfirm={handleConfirm}
                                            onCancel={hideDatePicker}
                                            locale="vi-VN"
                                        />
                                        {selectedDate && (
                                            <Text
                                                style={{
                                                    fontSize: 15,
                                                    color: 'white',
                                                    padding: 8,
                                                    marginLeft: 10,
                                                }}
                                            >
                                                {selectedDate.toLocaleDateString()}
                                            </Text>
                                        )}
                                    </View>

                                    <View className="mr-2">
                                        <TouchableOpacity onPress={showDatePicker}>
                                            <AntDesign name="calendar" size={24} color="white" />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>

                            <View className="flex-row items-center mt-3">
                                <View className="h-full w-[10%]">
                                    <Checkbox
                                        value={isSelected}
                                        color={isSelected ? 'orange' : undefined}
                                        onValueChange={setIsSelection}
                                        className="p-[10px]"
                                    />
                                </View>
                                <View className="w-[90%]">
                                    <Text className="text-white text-[14px] ">
                                        Bằng việt bấm nút “Đăng ký” bên dưới. Tôi đồng ý cho phép TD Việt Nam thực hiện
                                        xử lý dữ liệu cá nhân của tôi phù hợp với mục đích mà TD Việt Nam đã thông báo
                                        tại Chính Sách Bảo Mật
                                    </Text>
                                </View>
                            </View>
                            <View className="flex-row items-center mt-3">
                                <View className="h-full w-[10%]">
                                    <Checkbox
                                        value={isSelected2}
                                        color={isSelected2 ? 'orange' : undefined}
                                        onValueChange={setIsSelection2}
                                        className="p-[10px]"
                                    />
                                </View>
                                <View className="w-[90%]">
                                    <Text className="text-white text-[14px] ">
                                        Tôi đồng ý với{' '}
                                        <Text className="text-orange-400 font-bold">Điều khoản sử dụng</Text> của TD
                                        Việt Nam.
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </SafeAreaView>
            <View>
                <ButtonPrimary title="Đăng ký" onPress={handleRegister} />
            </View>
        </ImageBackground>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#333',
    },
    gradient: {
        ...StyleSheet.absoluteFillObject,
    },
    input: {
        color: 'white',
    },
    footer: {
        marginTop: 10,
        heigh: hp(20),
        width: wp(90),
        justifyContent: 'center',
        alignItems: 'center',
        margin: 'auto',
    },
});
