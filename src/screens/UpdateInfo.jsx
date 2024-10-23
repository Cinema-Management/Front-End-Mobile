import React, { useState } from 'react';
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
import image1 from '../../assets/img1.png';
import phim1 from '../../assets/phim1.png';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from '@expo/vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign } from '@expo/vector-icons';
import Checkbox from 'expo-checkbox';
import InputComponent from '../components/InputComponent';
import { color } from 'react-native-elements/dist/helpers';
import Section from '../components/Section';
import ButtonComponent from '../components/ButtonComponent';
export default function UpdateInfo({ navigation }) {
    var { height, width } = Dimensions.get('window');
    const [open1, setOpen1] = useState(false);
    const [value1, setValue1] = useState(null);
    const [open2, setOpen2] = useState(false);
    const [value2, setValue2] = useState(null);
    const [open3, setOpen3] = useState(false);
    const [value3, setValue3] = useState(null);
    const [open4, setOpen4] = useState(false);
    const [value4, setValue4] = useState(null);
    const items = [
        { label: 'Nam', value: '1' },
        { label: 'Nữ', value: '2' },
    ];
    const handlePress = () => {
        console.log('Button pressed!');
    };
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
    const [selectedDate, setSelectedDate] = useState(null);
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
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity className="bg-[#555555] absolute left-3 w-10 h-10 rounded-[100px] justify-center items-center">
                    <Ionicons name="chevron-back" size={30} color="white" style={{ padding: '8px' }} />
                </TouchableOpacity>
                <Text className="text-2xl font-medium text-white">Thông tin tài khoản</Text>
            </View>

            {/* Content */}
            <View style={styles.main}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={{ flex: 1 }}
                    keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 100}
                >
                    <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
                        <View style={{ height: hp('15%') }} className="justify-center items-center  py-2 relative">
                            <View style={{ position: 'relative' }}>
                                <Image
                                    source={phim1}
                                    style={{
                                        width: hp('10%'),
                                        height: hp('10%'),
                                        borderRadius: hp('5%'),
                                        objectFit: 'fill',
                                    }}
                                />
                                <TouchableOpacity
                                    style={{
                                        position: 'absolute',
                                        backgroundColor: 'orange',
                                        top: hp('6%'),
                                        right: hp('0%'),
                                        padding: 5,
                                        borderRadius: 50,
                                    }}
                                >
                                    <AntDesign name="camerao" size={24} color="white" />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{ height: hp('10%') }} className=" mb-4">
                            <Text className="text-white text-lg px-4 font-bold">Tài khoản của tôi là:</Text>

                            <Text style={styles.text}>caotrungduong11@gmail.com</Text>
                        </View>
                        <View style={{ height: hp('24%'), zIndex: 2000, marginBottom: 16 }}>
                            <Text className="text-white text-lg px-4 font-bold mb-2">Thông tin cá nhân:</Text>
                            <View className="bg-[#494949] flex-1 ">
                                <View className="flex-row px-4 py-1 justify-between items-center border-b border-white">
                                    <Text
                                        className="text-base text-white h-full "
                                        style={{ width: wp('30%'), lineHeight: '40%' }}
                                    >
                                        Họ và tên
                                    </Text>
                                    <TextInput
                                        style={styles.textInput}
                                        placeholder="Cao Trùng Dương"
                                        placeholderTextColor="white"
                                        underlineColorAndroid="transparent"
                                    />
                                </View>
                                <View className="flex-row px-4 py-1 justify-between items-center border-b border-white">
                                    <Text
                                        className="text-base text-white h-full "
                                        style={{ width: wp('30%'), lineHeight: '40%' }}
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
                                <View className="flex-row px-4 py-2 justify-between items-center border-b border-white">
                                    <Text
                                        className="text-base text-white h-full "
                                        style={{ width: wp('60%'), lineHeight: '40%' }}
                                    >
                                        Giới tính
                                    </Text>
                                    <View className="flex-1" style={{ alignItems: 'flex-end' }}>
                                        <DropDownPicker
                                            open={open1}
                                            value={value1}
                                            items={items.map((item) => ({ ...item, key: item.value }))}
                                            setOpen={setOpen1}
                                            setValue={setValue1}
                                            placeholder="Nam"
                                            containerStyle={{
                                                flex: 1,
                                                height: 40,
                                                justifyContent: 'center',
                                            }}
                                            style={{
                                                backgroundColor: '#494949',
                                                borderColor: 'red',
                                                height: 40,
                                                paddingVertical: 0,
                                                paddingHorizontal: 0,
                                                paddingLeft: 40,
                                            }}
                                            labelStyle={{
                                                paddingLeft: 10,
                                                color: 'white',
                                            }}
                                            dropDownContainerStyle={{
                                                backgroundColor: '#3b3b3b',
                                                maxHeight: 100,
                                            }}
                                            textStyle={{
                                                fontSize: 16,
                                                color: 'white',
                                                fontWeight: 'bold',
                                                textAlign: 'right',
                                            }}
                                            theme="DARK"
                                            listMode="SCROLLVIEW"
                                        />
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={{ height: hp('38%') }}>
                            <Text className="text-white text-lg px-4 font-bold mb-2">Liên hệ:</Text>
                            <View className="bg-[#494949] flex-1 ">
                                <View className="flex-row px-4 py-1 justify-between items-center border-b border-white">
                                    <Text
                                        className="text-base text-white h-full "
                                        style={{ width: wp('25%'), lineHeight: '40%' }}
                                    >
                                        Email
                                    </Text>
                                    <TextInput
                                        style={styles.textInput}
                                        placeholder="caotrungduong11@gmail.com"
                                        placeholderTextColor="white"
                                        underlineColorAndroid="transparent"
                                        ellipsizeMode="tail"
                                    />
                                </View>

                                <View className="flex-row px-4 py-2 z-50 justify-between items-center border-b border-white">
                                    <Text
                                        className="text-base text-white h-full "
                                        style={{ width: wp('30%'), lineHeight: '40%' }}
                                    >
                                        Tỉnh/thành
                                    </Text>
                                    <View className="flex-1">
                                        <DropDownPicker
                                            open={open2}
                                            value={value2}
                                            items={items1.map((item) => ({ ...item, key: item.value }))}
                                            setOpen={setOpen2}
                                            setValue={setValue2}
                                            placeholder="Tỉnh/thành"
                                            containerStyle={{
                                                flex: 1,
                                                height: 40,
                                                justifyContent: 'center',
                                            }}
                                            style={{
                                                backgroundColor: '#494949',
                                                borderColor: 'transparent',
                                                height: 40,
                                                paddingVertical: 0,
                                                paddingHorizontal: 0,
                                                justifyContent: 'right',
                                                paddingLeft: 60,
                                            }}
                                            labelStyle={{
                                                paddingLeft: 10,
                                                color: 'white',
                                            }}
                                            dropDownContainerStyle={{
                                                backgroundColor: '#3b3b3b',
                                                maxHeight: 100,
                                            }}
                                            textStyle={{
                                                fontSize: 16,
                                                color: 'white',
                                                fontWeight: 'bold',
                                            }}
                                            listMode="SCROLLVIEW"
                                            theme="DARK"
                                        />
                                    </View>
                                </View>
                                <View className="flex-row px-4 py-2 z-40 justify-between items-center border-b border-white">
                                    <Text
                                        className="text-base text-white h-full "
                                        style={{ width: wp('30%'), lineHeight: '40%' }}
                                    >
                                        Quận/huyện
                                    </Text>
                                    <View className="flex-1 " style={{ zIndex: 1000 }}>
                                        <DropDownPicker
                                            open={open3}
                                            value={value3}
                                            items={items1.map((item) => ({ ...item, key: item.value }))}
                                            setOpen={setOpen3}
                                            setValue={setValue3}
                                            placeholder="Quận/huyện"
                                            containerStyle={{
                                                flex: 1,
                                                height: 40,
                                                justifyContent: 'center',
                                            }}
                                            style={{
                                                backgroundColor: '#494949',
                                                borderColor: 'transparent',
                                                height: 40,
                                                paddingVertical: 0,
                                                paddingHorizontal: 0,
                                                justifyContent: 'right',
                                                paddingLeft: 60,
                                            }}
                                            labelStyle={{
                                                paddingLeft: 10,
                                                color: 'white',
                                            }}
                                            dropDownContainerStyle={{
                                                backgroundColor: '#3b3b3b',
                                                maxHeight: 100,
                                            }}
                                            textStyle={{
                                                fontSize: 16,
                                                color: 'white',
                                                fontWeight: 'bold',
                                            }}
                                            listMode="SCROLLVIEW"
                                            theme="DARK"
                                        />
                                    </View>
                                </View>

                                <View className="flex-row px-4 py-2 z-30 justify-between items-center border-b border-white">
                                    <Text
                                        className="text-base text-white h-full "
                                        style={{ width: wp('30%'), lineHeight: '40%' }}
                                    >
                                        Phường/xã
                                    </Text>
                                    <View className="flex-1 " style={{ zIndex: 1000 }}>
                                        <DropDownPicker
                                            open={open4}
                                            value={value4}
                                            items={items1.map((item) => ({ ...item, key: item.value }))}
                                            setOpen={setOpen4}
                                            setValue={setValue4}
                                            placeholder="Phường/xã"
                                            containerStyle={{
                                                flex: 1,
                                                height: 40,
                                                justifyContent: 'center',
                                            }}
                                            style={{
                                                backgroundColor: '#494949',
                                                borderColor: 'transparent',
                                                height: 40,
                                                paddingVertical: 0,
                                                paddingHorizontal: 0,
                                                justifyContent: 'right',
                                                paddingLeft: 60,
                                            }}
                                            labelStyle={{
                                                paddingLeft: 10,
                                                color: 'white',
                                            }}
                                            dropDownContainerStyle={{
                                                backgroundColor: '#3b3b3b',
                                                maxHeight: 100,
                                            }}
                                            textStyle={{
                                                fontSize: 16,
                                                color: 'white',
                                                fontWeight: 'bold',
                                            }}
                                            listMode="SCROLLVIEW"
                                            theme="DARK"
                                        />
                                    </View>
                                </View>
                                <View className="flex-row px-4 py-1 justify-between items-center border-b border-white">
                                    {/* <Text
                                        className="text-base text-white h-full "
                                        style={{ width: wp('30%'), lineHeight: '40%' }}
                                    >
                                        Địa chỉ chi tiết
                                    </Text>
                                    <TextInput
                                        style={styles.textInput}
                                        placeholder="4 Nguyễn Văn Bảo"
                                        placeholderTextColor="white"
                                        underlineColorAndroid="transparent"
                                        ellipsizeMode="tail"
                                    /> */}
                                </View>
                            </View>
                        </View>
                        {/* <InputComponent
                            // value={inputValue}
                            // onChange={handleInputChange}
                            placeholder="Nhập tên của bạn"
                            title="Tên"
                            allowClear={true}
                            password={false}
                            prefix={<Icon name="account" size={24} color="white" />}
                            affix={<Icon name="account" size={24} color="white" />}
                            inputStyles={{ color: 'red' }}

                            // showPass={showPassword}
                            // setShowPass={togglePasswordVisibility}
                        /> */}
                        <ButtonComponent
                            text="Click Me"
                            onPress={handlePress}
                            icon={<AntDesign name="arrowright" size={20} color="white" />}
                            type="primary"
                            styles={styles.button}
                        />
                        <View style={{ height: hp('5%') }} className=" mt-4 mb-4 flex-row">
                            <View className="px-4 flex-row justify-between w-full items-center">
                                <TouchableOpacity>
                                    <Text className="text-white text-base  font-bold">Thay đổi mật khẩu</Text>
                                </TouchableOpacity>

                                <TouchableOpacity>
                                    <Text className="text-red-600 text-base font-bold">Xóa tài khoản</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </View>

            {/* Footer */}
            <View style={styles.footer}>
                <TouchableOpacity className=" px-3">
                    <LinearGradient
                        colors={['#ED999A', '#F6D365']}
                        style={{ borderRadius: 10, padding: 15 }}
                        start={{ x: 0.4, y: 0.1 }}
                        end={{ x: 0.9, y: 0.2 }}
                    >
                        <Text style={{ textAlign: 'center', fontSize: 18, fontWeight: 'bold', color: 'black' }}>
                            Cập nhật
                        </Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1c1c1c',
    },
    header: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    main: {
        flex: 11,
        gap: 10,
    },
    footer: {
        flex: 1,
        justifyContent: 'center',
    },
    text: {
        height: hp('5%'),
        borderColor: 'gray',

        backgroundColor: '#494949',
        color: 'white',
        marginTop: 5,
        paddingHorizontal: 16,
        justifyContent: 'center',
        fontSize: 16,
        lineHeight: hp('5%'),
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
    gradient: {
        ...StyleSheet.absoluteFillObject,
    },
});
