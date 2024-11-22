import React, { useCallback, useEffect, useRef, useState } from 'react';
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
    ActivityIndicator,
    Alert,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { AntDesign } from '@expo/vector-icons';
import Container from '../components/Container';
import { colors } from '../constants/colors';
import { Dropdown } from 'react-native-element-dropdown';
import ButtonPrimary from '../components/ButtonPrimary';
import { useDispatch, useSelector } from 'react-redux';
import * as ImagePicker from 'expo-image-picker';

import axios, { all } from 'axios';
import useProvinces from '../queries/useProvinces';
import useDistricts from '../queries/useDistricts';
import useWards from '../queries/useWards';

var { height, width } = Dimensions.get('window');
import { API_URL } from '@env';
import { updateUser } from '../redux/authSlice';
import useAddress from '../queries/useAddress';
import { useFocusEffect } from '@react-navigation/native';

export default function UpdateInfo({ navigation }) {
    const currentUser = useSelector((state) => state.auth.login.currentUser);
    const [loading, setLoading] = useState(false);
    const items = [
        { label: 'Nam', value: '1' },
        { label: 'Nữ', value: '2' },
    ];
    const nameRef = useRef();
    const emailRef = useRef();
    const addressDetailRef = useRef();
    const dispatch = useDispatch();

    const gender = currentUser.gender === 'Nam' ? items[0] : currentUser.gender === 'Nữ' ? items[1] : items;
    const [selectedGender, setSelectedGender] = useState(gender);
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [selectedDate, setSelectedDate] = useState(currentUser.birthDate ? new Date(currentUser.birthDate) : '');
    const [selectedProvince, setSelectedProvince] = useState(null);
    const [selectedDistrict, setSelectedDistrict] = useState(null);
    const [selectedWard, setSelectedWard] = useState(null);

    const [image, setImage] = useState(null);
    const { data: address = {}, isLoading: isLoadingAddress } = useAddress(currentUser?.address);
    const { data: provinces = [], isLoading: isLoadingProvinces, isSuccess: isSuccessProvinces } = useProvinces();
    const {
        data: districts = [],
        isLoading: isLoadingDistricts,
        isSuccess: isSuccessDistricts,
    } = useDistricts(selectedProvince?.value);
    const {
        data: wards = [],
        isLoading: isLoadingWards,
        isSuccess: isSuccessWards,
    } = useWards(selectedDistrict?.value);

    useFocusEffect(
        useCallback(() => {
            setLoading(true);
            setTimeout(() => {
                setLoading(false);
            }, 300);
        }, []),
    );

    // Update selectedProvince when address and provinces data is loaded
    useEffect(() => {
        if (address?.province && provinces.length > 0) {
            const province = provinces.find((p) => p.province_name === address.province);
            if (province) {
                setSelectedProvince({ label: province.province_name, value: province._id });
            }
        }
    }, [address, provinces]);

    // Update selectedDistrict when address and districts data is loaded
    useEffect(() => {
        if (address?.district && districts.length > 0 && selectedProvince) {
            const district = districts.find((d) => d.district_name === address.district);
            if (district) {
                setSelectedDistrict({ label: district.district_name, value: district._id });
            }
        }
    }, [address, districts, selectedProvince]);

    // Update selectedWard when address and wards data is loaded
    useEffect(() => {
        if (address?.ward && wards.length > 0 && selectedDistrict) {
            const ward = wards.find((w) => w.ward_name === address.ward);
            if (ward) {
                setSelectedWard({ label: ward.ward_name, value: ward._id });
            }
        }
    }, [address, wards, selectedDistrict]);

    const handleProvinceChange = (item) => {
        setSelectedProvince(item);
        if (item !== selectedProvince) {
            setSelectedDistrict('');
            setSelectedWard('');
            addressDetailRef.current = '';
        }
    };
    const handleDistrictChange = (item) => {
        setSelectedDistrict(item);
        if (item !== selectedDistrict) {
            setSelectedWard('');
            addressDetailRef.current = '';
        }
    };

    const handleWardChange = (item) => {
        setSelectedWard(item);
        if (item !== selectedWard) {
            addressDetailRef.current = '';
        }
    };

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
            // const fileInfo = await FileSystem.getInfoAsync(selectedImageUri);

            // const maxFileSize = 5 * 1024 * 1024; // 5MB

            // if (fileInfo.size > maxFileSize) {
            //     Alert.alert('Kích thước file quá lớn, vui lòng chọn file nhỏ hơn 5MB.');
            //     return;
            // }
            setImage(selectedImageUri);
        } else {
            console.log('Người dùng đã hủy chọn hình ảnh.');
        }
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
    const maskPhoneNumber = (phone) => {
        if (!phone || phone.length < 7) return phone; // Kiểm tra số điện thoại
        return `${phone.slice(0, 1)}******${phone.slice(-3)}`; // Lấy 3 số đầu và 3 số cuối, phần giữa là ****
    };

    const validate = async () => {
        const { data } = await axios.post(API_URL + '/api/users/checkPhoneOrEmailExist', {
            email: emailRef.current,
            type: 0,
        });
        const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
        if (emailRef.current === '') {
            Alert.alert('Email không được để trống');
            return false;
        }

        if (!emailRegex.test(emailRef.current) && emailRef.current) {
            Alert.alert('Email không hợp lệ');
            return false;
        }

        if (data?.email && emailRef.current !== currentUser.email) {
            Alert.alert('Email đã tồn tại');
            return false;
        }

        if (!selectedDistrict?.label && selectedProvince) {
            Alert.alert('Vui lòng chọn quận/huyện');
            return false;
        }

        if (selectedWard === '' && selectedDistrict) {
            Alert.alert('Vui lòng chọn phường/xã!');
            return false;
        }

        if (addressDetailRef.current === '' && selectedWard) {
            Alert.alert('Vui lòng nhập địa chỉ chi tiết!');
            return false;
        }

        return true;
    };
    const handleUpdateInfo = async () => {
        try {
            const isValid = await validate();

            // Nếu validate trả về false, ngừng hàm tại đây
            if (!isValid) return;

            setLoading(true);

            let parentCode = '';
            const fullAddress = `${addressDetailRef.current || address?.addressDetail}, ${selectedWard?.label}, ${
                selectedDistrict?.label
            }, ${selectedProvince?.label}`;

            // Nếu địa chỉ mới khác địa chỉ cũ, tiến hành cập nhật địa chỉ
            if (fullAddress !== address?.fullAddress && selectedProvince && selectedDistrict && selectedWard) {
                const hierarchyValues = [
                    { name: selectedProvince?.label, level: 0 },
                    { name: selectedDistrict?.label, parentCode: '', level: 1 },
                    { name: selectedWard?.label, parentCode: '', level: 2 },
                    { name: addressDetailRef.current, parentCode: '', level: 3 },
                ];

                for (let i = 0; i < hierarchyValues.length; i++) {
                    const { name, level } = hierarchyValues[i];
                    const hierarchyValue = {
                        name,
                        parentCode: i > 0 ? parentCode : undefined,
                        level,
                        hierarchyStructureCode: 'PHANCAP01',
                    };

                    const response = await axios.post(API_URL + '/api/hierarchy-values', hierarchyValue);

                    if (response.data) {
                        parentCode = response.data.code;
                    } else {
                        throw new Error('Không thể thêm giá trị cấp bậc.');
                    }
                }
            }
            let formData = new FormData();

            const user = {
                name: nameRef.current || currentUser.name,
                birthDate: selectedDate
                    ? `${selectedDate.getFullYear()}-${selectedDate.getMonth() + 1}-${selectedDate.getDate()}`
                    : '',
                gender: selectedGender?.label,
                address: parentCode || currentUser?.address,
                email: emailRef.current || currentUser?.email,
            };
            formData.append('name', user.name);
            formData.append('birthDate', user.birthDate);
            formData.append('gender', user.gender);
            formData.append('address', user.address);
            formData.append('email', user.email);

            // Nếu có ảnh mới được chọn, chuẩn bị FormData
            if (image) {
                formData.append('image', {
                    uri: image,
                    name: 'image.png', // Use a filename, you can dynamically assign this if needed
                    type: 'image/png',
                });
            }
            const { data } = await axios.put(API_URL + '/api/users/' + currentUser?.code, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data', // Quan trọng khi gửi file
                },
            });

            // formData.append('userData', JSON.stringify(user)); // Thêm các thông tin user vào formData

            // const result = await axios.put(API_URL + '/api/users/' + currentUser?.code, user);

            if (data) {
                Alert.alert('Cập nhật thành công');
                dispatch(updateUser(data)); // Cập nhật state trong Redux
                setLoading(false);
            } else {
                throw new Error('Không thể cập nhật thông tin.');
            }
        } catch (error) {
            Alert.alert('Có lỗi xảy ra khi cập nhật thông tin.', error.message);
            setLoading(false);
        }
    };

    return (
        <Container isScroll={false} title="Thông tin tài khoản" back={true} style={{ color: 'white', fontWeight: 700 }}>
            {(isLoadingAddress || loading) && (
                <ActivityIndicator size="large" color="white" className="h-[100%] w-[100%] absolute z-50 bg-black/50" />
            )}

            {!isLoadingAddress && (
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

                                    <Text style={styles.text}>{maskPhoneNumber(currentUser.phone)}</Text>
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
                                                placeholderTextColor="#8e8d8d"
                                                onChangeText={(text) => (nameRef.current = text)}
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
                                                        themeVariant="light"
                                                        locale="vi-VN"
                                                        onConfirm={handleConfirm}
                                                        confirmTextIOS="Xác nhận"
                                                        cancelTextIOS="Hủy"
                                                        onCancel={hideDatePicker}
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
                                                            {selectedDate.toLocaleDateString() || 'Chọn'}
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
                                                style={{ width: wp(65), height: hp(5), lineHeight: hp(5) }}
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
                                                        setSelectedGender(item);
                                                    }}
                                                    style={{
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
                                                    activeColor="rgba(205, 207, 212, 0.6)"
                                                    placeholderStyle={{
                                                        color: 'white',
                                                        textAlign: 'right',
                                                        padding: 11,
                                                        fontWeight: 'bold',
                                                    }}
                                                    containerStyle={{
                                                        borderRadius: 5,
                                                        height: 'auto',
                                                        shadowColor: 'white',
                                                        elevation: 10,
                                                    }}
                                                    iconColor="white"
                                                    itemTextStyle={{
                                                        textAlign: 'center',
                                                        height: 20,
                                                    }}
                                                    itemContainerStyle={{
                                                        borderBottomWidth: 0.2,
                                                        opacity: 0.9,
                                                        justifyContent: 'center',
                                                        marginBottom: 1,
                                                        height: 30,
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
                                                placeholderTextColor="#8e8d8d"
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
                                            <View className="flex-1">
                                                {isLoadingProvinces && <ActivityIndicator size="large" color="white" />}
                                                {isSuccessProvinces && (
                                                    <Dropdown
                                                        data={provinces.map((province) => ({
                                                            label: province?.province_name, // Dùng 'province_name' thay vì 'name'
                                                            value: province?._id, // Dùng _id làm value
                                                        }))}
                                                        labelField="label"
                                                        valueField="value"
                                                        maxHeight={300}
                                                        placeholder="Chọn"
                                                        placeholderTextColor="white"
                                                        value={selectedProvince}
                                                        onChange={(item) => {
                                                            handleProvinceChange(item); // Lưu lại giá trị đã chọn
                                                        }}
                                                        style={{
                                                            backgroundColor: 'transparent',
                                                        }}
                                                        selectedTextStyle={{
                                                            textAlign: 'right',
                                                            padding: 11,
                                                            fontSize: 16,
                                                            fontWeight: 'bold',
                                                            color: 'white', // Thêm màu chữ để dễ đọc
                                                        }}
                                                        search={true}
                                                        searchPlaceholder="Tìm kiếm..."
                                                        searchPlaceholderTextColor="black"
                                                        iconColor="white"
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
                                                            borderRadius: 5,
                                                            height: hp(60),
                                                            width: wp(70),
                                                            zIndex: 2,
                                                        }}
                                                        itemTextStyle={{
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
                                                        mode="modal"
                                                    />
                                                )}
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
                                                {isLoadingDistricts && <ActivityIndicator size="large" color="white" />}
                                                {isSuccessDistricts && (
                                                    <Dropdown
                                                        data={districts.map((district) => ({
                                                            label: district?.district_name, // Dùng 'province_name' thay vì 'name'
                                                            value: district?._id, // Dùng _id làm value
                                                        }))}
                                                        labelField="label"
                                                        valueField="value"
                                                        maxHeight={100}
                                                        placeholder="Chọn"
                                                        value={selectedDistrict}
                                                        onChange={(item) => {
                                                            handleDistrictChange(item);
                                                        }}
                                                        style={{
                                                            backgroundColor: 'transparent',
                                                        }}
                                                        selectedTextStyle={{
                                                            textAlign: 'right',
                                                            padding: 11,
                                                            fontSize: 16,
                                                            fontWeight: 'bold',
                                                            color: 'white', // Thêm màu chữ để dễ đọc
                                                        }}
                                                        search={true}
                                                        searchPlaceholder="Tìm kiếm..."
                                                        searchPlaceholderTextColor="black"
                                                        iconColor="white"
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
                                                            borderRadius: 5,
                                                            height: hp(60),
                                                            width: wp(70),
                                                            zIndex: 2,
                                                        }}
                                                        itemTextStyle={{
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
                                                        mode="modal"
                                                    />
                                                )}
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
                                                {isLoadingWards && <ActivityIndicator size="large" color="white" />}
                                                {isSuccessWards && (
                                                    <Dropdown
                                                        data={wards.map((ward) => ({
                                                            label: ward?.ward_name, // Dùng 'province_name' thay vì 'name'
                                                            value: ward?._id, // Dùng _id làm value
                                                        }))}
                                                        labelField="label"
                                                        valueField="value"
                                                        maxHeight={100}
                                                        placeholder="Chọn"
                                                        value={selectedWard}
                                                        onChange={(item) => {
                                                            handleWardChange(item);
                                                        }}
                                                        style={{
                                                            backgroundColor: 'transparent',
                                                        }}
                                                        selectedTextStyle={{
                                                            textAlign: 'right',
                                                            padding: 11,
                                                            fontSize: 16,
                                                            fontWeight: 'bold',
                                                            color: 'white', // Thêm màu chữ để dễ đọc
                                                        }}
                                                        search={true}
                                                        searchPlaceholder="Tìm kiếm..."
                                                        searchPlaceholderTextColor="black"
                                                        iconColor="white"
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
                                                            borderRadius: 5,
                                                            height: hp(60),
                                                            width: wp(70),
                                                            zIndex: 2,
                                                        }}
                                                        itemTextStyle={{
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
                                                        mode="modal"
                                                    />
                                                )}
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
                                                placeholder="Nhập"
                                                defaultValue={
                                                    addressDetailRef.current === '' ? '' : address?.addressDetail
                                                }
                                                placeholderTextColor="#8e8d8d"
                                                onChangeText={(text) => (addressDetailRef.current = text)}
                                                underlineColorAndroid="transparent"
                                                ellipsizeMode="tail"
                                            />
                                        </View>
                                    </View>
                                </View>

                                <View className=" mt-4 mb-4 flex-row ">
                                    <View className="px-4 flex-row justify-between w-full items-center">
                                        <TouchableOpacity onPress={() => navigation.navigate('ChangePassword')}>
                                            <Text className="text-white text-base  font-bold py-2">
                                                Thay đổi mật khẩu
                                            </Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity
                                            onPress={() => {
                                                navigation.navigate('DeleteAccount');
                                            }}
                                        >
                                            <Text className="text-red-600 text-base font-bold">Xóa tài khoản</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </ScrollView>
                    </KeyboardAvoidingView>
                    <ButtonPrimary title="Cập nhật" onPress={handleUpdateInfo} />
                </View>
            )}
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
