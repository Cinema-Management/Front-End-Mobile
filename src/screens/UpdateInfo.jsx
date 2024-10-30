import React, { useEffect, useRef, useState } from 'react';
import {
    View,
    Text,
    ImageBackground,
    Dimensions,
    Image,
    ScrollView,
    TouchableOpacity,
    TextInput,
    StyleSheet,
    KeyboardAvoidingView,
    FlatList,
    Platform,
} from 'react-native';
import phim1 from '../../assets/phim1.png';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { AntDesign } from '@expo/vector-icons';
import Container from '../components/Container';
import { colors } from '../constants/colors';
import { Dropdown } from 'react-native-element-dropdown';
import ButtonPrimary from '../components/ButtonPrimary';
import { useSelector } from 'react-redux';
import * as ImagePicker from 'expo-image-picker';

import { all } from 'axios';
var { height, width } = Dimensions.get('window');

export default function UpdateInfo({ navigation }) {
    const currentUser = useSelector((state) => state.auth.login.currentUser);
    const items = [
        { label: 'Nam', value: '1' },
        { label: 'Nữ', value: '2' },
    ];
    const phoneRef = useRef();
    const gender = currentUser.gender === 'Nam' ? '1' : '2';
    const [selectedGender, setSelectedGender] = useState(gender);
    const [selectedValue, setSelectedValue] = useState('');
    const emailRef = useRef();

    const [image, setImage] = useState(null);

    const handleImagePicker = async () => {
        // Yêu cầu quyền truy cập thư viện ảnh
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            alert('Xin vui lòng cấp quyền truy cập thư viện ảnh!');
            return;
        }

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [16, 9],
            quality: 1,
        });

        if (!result.canceled) {
            const selectedImageUri = result.assets[0].uri;
            setImage(selectedImageUri);
            console.log(selectedImageUri);
        } else {
            console.log('Người dùng đã hủy chọn hình ảnh.');
        }
    };

    console.log(image);

    const items1 = [
        { value: '1', label: 'TP Hồ Chí Minh' },
        { value: '2', label: 'TP Đà Nẵng' },
        { value: '3', label: 'TP Vũng Tàu' },
        { value: '4', label: 'Bình Định' },
        { value: '5', label: 'Phú Yên' },
        { value: '6', label: 'TP Vũng Tàu' },
        { value: '7', label: 'Bình Định' },
        { value: '8', label: 'Phú Yên' },
    ];
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date(currentUser.birthDate));
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

    return (
        <Container isScroll={false} title="Thông tin tài khoản" back={true} style={{ color: 'white', fontWeight: 700 }}>
            <View style={styles.main}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={{ flex: 1 }}
                    keyboardVerticalOffset={Platform.OS === 'ios' ? 130 : 130}
                >
                    <ScrollView
                        style={{ flex: 1 }}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingBottom: hp(8) }}
                    >
                        <View style={{ height: hp(10) }} className="justify-center items-center  py-2 relative">
                            <View style={{ position: 'relative' }}>
                                <Image
                                    source={{ uri: image ? image : currentUser.avatar }}
                                    style={{
                                        width: hp(10),
                                        height: hp(10),
                                        borderRadius: 50,
                                    }}
                                    resizeMode="cover"
                                />
                                <TouchableOpacity style={styles.btnImage} onPress={handleImagePicker}>
                                    <AntDesign name="camerao" size={24} color="white" />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{ flex: 1, marginTop: 25 }}>
                            <View style={{ height: hp(10) }} className="mb-9">
                                <Text className="text-white text-lg px-4  font-bold">Tài khoản của tôi là:</Text>

                                <Text style={styles.text}>{currentUser.phone}</Text>
                            </View>
                            <View style={{ height: hp(30) }}>
                                <Text className="text-white text-lg px-4 font-bold mb-4">Thông tin cá nhân:</Text>
                                <View style={{ backgroundColor: colors.backgroundColor }}>
                                    <View className="flex-row px-4 py-[5px]  justify-between items-center border-b border-[#8e8d8d]">
                                        <Text
                                            className="text-base text-white h-full "
                                            style={{ width: wp(30), height: hp(5), lineHeight: hp(5) }}
                                        >
                                            Họ và tên
                                        </Text>
                                        <TextInput
                                            style={styles.textInput}
                                            placeholder="Nhập họ và tên"
                                            defaultValue={currentUser.name}
                                            placeholderTextColor="white"
                                            onChangeText={(text) => (phoneRef.current = text)}
                                            underlineColorAndroid="transparent"
                                        />
                                    </View>
                                    <View className="flex-row px-4 py-1 justify-center items-center border-b border-[#8e8d8d]">
                                        <Text
                                            className="text-base text-white  h-full "
                                            style={{ width: wp(30), height: hp(5), lineHeight: hp(5) }}
                                        >
                                            Ngày sinh
                                        </Text>
                                        <View
                                            style={{
                                                alignItems: 'center',
                                                flexDirection: 'row',
                                                flex: 1,
                                                height: '100%',
                                                justifyContent: 'flex-end',
                                                alignItems: 'center',
                                                borderColor: 'transparent',
                                            }}
                                        >
                                            <View>
                                                <DateTimePickerModal
                                                    isVisible={isDatePickerVisible}
                                                    mode="date"
                                                    onConfirm={handleConfirm}
                                                    onCancel={hideDatePicker}
                                                    locale="vi-VN"
                                                    headerTextIOS="Chọn ngày sinh"
                                                />
                                                {selectedDate && (
                                                    <Text
                                                        style={{
                                                            fontSize: 16,
                                                            color: 'white',
                                                            padding: 8,
                                                            marginLeft: 10,
                                                            fontWeight: 'bold',
                                                        }}
                                                    >
                                                        {selectedDate.toLocaleDateString()}
                                                    </Text>
                                                )}
                                            </View>

                                            <View>
                                                <TouchableOpacity onPress={showDatePicker}>
                                                    <AntDesign name="calendar" size={24} color="white" />
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </View>
                                    <View className="flex-row px-4 py-[5px] justify-between items-center border-b border-gray-400">
                                        <Text
                                            className="text-base text-white h-full justify-center "
                                            style={{ width: wp(50), height: hp(5), lineHeight: hp(5) }}
                                        >
                                            Giới tính
                                        </Text>
                                        <View className="flex-1 ">
                                            <Dropdown
                                                data={items}
                                                labelField="label"
                                                valueField="value"
                                                maxHeight={100}
                                                placeholder="Chọn"
                                                value={selectedGender}
                                                onChange={(item) => {
                                                    setSelectedGender(item.value);
                                                }}
                                                style={{
                                                    backgroundColor: 'transparent',
                                                    color: 'white',
                                                }}
                                                selectedTextStyle={{
                                                    color: 'white',
                                                    textAlign: 'right',
                                                    padding: 11,
                                                    fontSize: 16,
                                                    fontWeight: 'bold',
                                                }}
                                                iconStyle={{
                                                    width: 20,
                                                    height: 30,
                                                    marginRight: 10,
                                                }}
                                                activeColor="transparent"
                                                placeholderStyle={{
                                                    color: 'white',
                                                    textAlign: 'right',
                                                    padding: 11,
                                                    fontWeight: 'bold',
                                                }}
                                                containerStyle={{
                                                    backgroundColor: '#494949',
                                                    borderRadius: 5,
                                                    height: 'auto',
                                                    shadowColor: 'white',
                                                    elevation: 10,
                                                }}
                                                iconColor="white"
                                                itemTextStyle={{
                                                    color: 'white',
                                                    textAlign: 'center',
                                                    height: 20,
                                                }}
                                                itemContainerStyle={{
                                                    borderBottomWidth: 0.2,
                                                    borderBottomColor: 'white',
                                                    opacity: 0.9,
                                                    justifyContent: 'center',
                                                    marginBottom: 1,
                                                    height: 40,
                                                }}
                                            />
                                        </View>
                                    </View>
                                </View>
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text className="text-white text-lg px-4 font-bold mb-4">Liên hệ:</Text>
                                <View style={{ backgroundColor: colors.backgroundColor }}>
                                    <View className="flex-row px-4 py-[5px]  justify-between items-center border-b border-[#8e8d8d]">
                                        <Text
                                            className="text-base text-white h-full "
                                            style={{ width: wp(25), height: hp(5), lineHeight: hp(5) }}
                                        >
                                            Email
                                        </Text>
                                        <TextInput
                                            style={styles.textInput}
                                            defaultValue={currentUser.email}
                                            onChangeText={(text) => (emailRef.current = text)}
                                            placeholder="Nhập email"
                                            placeholderTextColor="white"
                                            underlineColorAndroid="transparent"
                                        />
                                    </View>
                                    <View className="flex-row px-4 py-[5px] justify-between items-center border-b border-[#8e8d8d]">
                                        <Text
                                            className="text-base text-white h-full "
                                            style={{ width: wp(30), height: hp(5), lineHeight: hp(5) }}
                                        >
                                            Tỉnh/thành
                                        </Text>
                                        <View className="flex-1 ">
                                            <Dropdown
                                                data={items1}
                                                labelField="label"
                                                valueField="value"
                                                maxHeight={100}
                                                placeholder="Chọn"
                                                value={selectedValue}
                                                onChange={(item) => {
                                                    setSelectedValue(item.value);
                                                }}
                                                style={{
                                                    backgroundColor: 'transparent',
                                                    color: 'white',
                                                }}
                                                selectedTextStyle={{
                                                    color: 'white',
                                                    textAlign: 'right',

                                                    padding: 11,
                                                    fontSize: 16,
                                                    fontWeight: 'bold',
                                                }}
                                                search={true}
                                                searchPlaceholder="Tìm kiếm..."
                                                searchPlaceholderTextColor="white"
                                                inputSearchStyle={{ color: 'white' }}
                                                activeColor="rgba(205, 207, 212, 0.6)"
                                                iconStyle={{
                                                    width: 20,
                                                    height: 30,
                                                    marginRight: 10,
                                                }}
                                                placeholderStyle={{
                                                    color: 'white',
                                                    textAlign: 'right',
                                                    padding: 11,
                                                    fontWeight: 'bold',
                                                }}
                                                containerStyle={{
                                                    backgroundColor: '#494949',
                                                    borderRadius: 5,
                                                    height: hp(50),
                                                    width: wp(80),
                                                    shadowColor: 'white',
                                                    elevation: 10,
                                                }}
                                                iconColor="white"
                                                itemTextStyle={{
                                                    color: 'white',
                                                    height: 20,
                                                }}
                                                itemContainerStyle={{
                                                    borderBottomWidth: 0.2,
                                                    borderBottomColor: 'white',
                                                    opacity: 0.9,
                                                    justifyContent: 'center',
                                                    marginBottom: 1,
                                                    height: 40,
                                                }}
                                                mode="modal"
                                            />
                                        </View>
                                    </View>
                                    <View className="flex-row px-4 py-[5px] justify-between items-center border-b border-[#8e8d8d]">
                                        <Text
                                            className="text-base text-white h-full "
                                            style={{ width: wp(30), height: hp(5), lineHeight: hp(5) }}
                                        >
                                            Quận/huyện
                                        </Text>
                                        <View className="flex-1 ">
                                            <Dropdown
                                                data={items1}
                                                labelField="label"
                                                valueField="value"
                                                maxHeight={100}
                                                placeholder="Chọn"
                                                value={selectedValue}
                                                onChange={(item) => {
                                                    setSelectedValue(item.value);
                                                }}
                                                style={{
                                                    backgroundColor: 'transparent',
                                                    color: 'white',
                                                }}
                                                selectedTextStyle={{
                                                    color: 'white',
                                                    textAlign: 'right',

                                                    padding: 11,
                                                    fontSize: 16,
                                                    fontWeight: 'bold',
                                                }}
                                                search={true}
                                                searchPlaceholder="Tìm kiếm..."
                                                searchPlaceholderTextColor="white"
                                                inputSearchStyle={{ color: 'white' }}
                                                activeColor="rgba(205, 207, 212, 0.6)"
                                                iconStyle={{
                                                    width: 20,
                                                    height: 30,
                                                    marginRight: 10,
                                                }}
                                                placeholderStyle={{
                                                    color: 'white',
                                                    textAlign: 'right',
                                                    padding: 11,
                                                    fontWeight: 'bold',
                                                }}
                                                containerStyle={{
                                                    backgroundColor: '#494949',
                                                    borderRadius: 5,
                                                    height: hp(50),
                                                    width: wp(80),
                                                    shadowColor: 'white',
                                                    elevation: 10,
                                                }}
                                                iconColor="white"
                                                itemTextStyle={{
                                                    color: 'white',
                                                    height: 20,
                                                }}
                                                itemContainerStyle={{
                                                    borderBottomWidth: 0.2,
                                                    borderBottomColor: 'white',
                                                    opacity: 0.9,
                                                    justifyContent: 'center',
                                                    marginBottom: 1,
                                                    height: 40,
                                                }}
                                                mode="modal"
                                            />
                                        </View>
                                    </View>
                                    <View className="flex-row px-4 py-[5px] justify-between items-center border-b border-[#8e8d8d]">
                                        <Text
                                            className="text-base text-white h-full "
                                            style={{ width: wp(30), height: hp(5), lineHeight: hp(5) }}
                                        >
                                            Phường/xã
                                        </Text>
                                        <View className="flex-1 ">
                                            <Dropdown
                                                data={items1}
                                                labelField="label"
                                                valueField="value"
                                                maxHeight={100}
                                                placeholder="Nam"
                                                value={selectedValue}
                                                onChange={(item) => {
                                                    setSelectedValue(item.value);
                                                }}
                                                style={{
                                                    backgroundColor: 'transparent',
                                                    color: 'white',
                                                }}
                                                selectedTextStyle={{
                                                    color: 'white',
                                                    textAlign: 'right',

                                                    padding: 11,
                                                    fontSize: 16,
                                                    fontWeight: 'bold',
                                                }}
                                                search={true}
                                                searchPlaceholder="Tìm kiếm..."
                                                searchPlaceholderTextColor="white"
                                                inputSearchStyle={{ color: 'white' }}
                                                activeColor="rgba(205, 207, 212, 0.6)"
                                                iconStyle={{
                                                    width: 20,
                                                    height: 30,
                                                    marginRight: 10,
                                                }}
                                                placeholderStyle={{
                                                    color: 'white',
                                                    textAlign: 'right',
                                                    padding: 11,
                                                }}
                                                containerStyle={{
                                                    backgroundColor: '#494949',
                                                    borderRadius: 5,
                                                    height: hp(50),
                                                    width: wp(80),
                                                    shadowColor: 'white',
                                                    elevation: 10,
                                                }}
                                                iconColor="white"
                                                itemTextStyle={{
                                                    color: 'white',
                                                    height: 20,
                                                }}
                                                itemContainerStyle={{
                                                    borderBottomWidth: 0.2,
                                                    borderBottomColor: 'white',
                                                    opacity: 0.9,
                                                    justifyContent: 'center',
                                                    marginBottom: 1,
                                                    height: 40,
                                                }}
                                                mode="modal"
                                            />
                                        </View>
                                    </View>
                                    <View className="flex-row px-4 py-[5px] justify-between items-center border-b border-[#8e8d8d]">
                                        <Text
                                            className="text-base text-white h-full "
                                            style={{ width: wp(30), height: hp(5), lineHeight: hp(5) }}
                                        >
                                            Địa chỉ chi tiết
                                        </Text>
                                        <TextInput
                                            style={styles.textInput}
                                            placeholder="4 Nguyễn Văn Bảo"
                                            placeholderTextColor="white"
                                            underlineColorAndroid="transparent"
                                            ellipsizeMode="tail"
                                        />
                                    </View>
                                </View>
                            </View>

                            <View className=" mt-4 mb-4 flex-row ">
                                <View className="px-4 flex-row justify-between w-full items-center">
                                    <TouchableOpacity>
                                        <Text className="text-white text-base  font-bold py-2">Thay đổi mật khẩu</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity>
                                        <Text className="text-red-600 text-base font-bold">Xóa tài khoản</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </View>

            <ButtonPrimary
                title="Cập nhật"
                //  onPress={() => navigation.navigate('Phim')}
            />
        </Container>
    );
}
const styles = StyleSheet.create({
    main: {
        flex: 1,
    },
    btnImage: {
        position: 'absolute',
        backgroundColor: 'orange',
        bottom: 0,
        right: 0,
        padding: 5,
        borderRadius: 50,
    },
    text: {
        height: hp(6),
        borderColor: 'gray',
        backgroundColor: colors.backgroundColor,
        color: 'white',
        marginTop: 5,
        paddingHorizontal: 16,
        justifyContent: 'center',

        fontSize: 16,
        lineHeight: hp(6),
    },
    textInput: {
        borderColor: 'transparent',
        height: '100%',
        borderWidth: 1,
        color: 'white',
        flex: 1,
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'right',
        paddingVertical: 0,
    },
});
