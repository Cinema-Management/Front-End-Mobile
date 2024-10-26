import React, { useState } from 'react';
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
export default function Register({ navigation }) {
    var { height, width } = Dimensions.get('window');
    const [isSelected, setSelection] = useState(false);
    const items = [
        { label: 'Nam', value: '1' },
        { label: 'Nữ', value: '2' },
    ];

    const [selectedValue, setSelectedValue] = useState(null);
    const [passWord, setPassWord] = useState('');
    const data = [
        { label: 'Option 1 ', value: 'option1' },
        { label: 'Option 2', value: 'option2' },
        { label: 'Option 3', value: 'option3' },
        { label: 'Option 1 ', value: 'option1' },
        { label: 'Option 2', value: 'option2' },
        { label: 'Option 3', value: 'option3' },
        { label: 'Option 1 ', value: 'option1' },
        { label: 'Option 2', value: 'option2' },
    ];
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [showPass, setShowPass] = useState(false);
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
    return (
        <ImageBackground source={image1} style={{ width, height }}>
            <LinearGradient
                colors={['transparent', 'rgba(23,23,23,0.9)', 'rgba(23,23,23,0.9)']}
                style={{ width, height }}
                start={{ x: 10, y: 0 }}
                end={{ x: 0, y: 0 }}
                className="absolute "
            />
            <SafeAreaView style={{ height: hp(100), marginTop: Platform.OS === 'ios' ? 0 : 22 }}>
                <TouchableOpacity className=" bg-[#555555] w-10 h-10 rounded-[100px] justify-center items-center ml-5">
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
                        <View className="flex-2 h-[65%] m-auto mt-4 mb-20 w-[85%]">
                            <View className="mb-2">
                                <View className="flex-row items-center rounded-[20px] bg-transparent justify-between border px-2 border-white">
                                    <Icon name="phone" size={20} color="#fff" />
                                    <TextInput
                                        placeholder="Họ và tên"
                                        placeholderTextColor="white"
                                        className="text-[15px] flex-1 py-3 h-auto text-white pl-2"
                                    />
                                </View>
                                <Text className="text-red-600 pl-4 mt-1">Bắt buộc nhập</Text>
                            </View>

                            <View className="mb-2">
                                <View className="flex-row items-center rounded-[20px] bg-[transparent] justify-between border border-white px-2">
                                    <Icon name="phone" size={20} color="#fff" />
                                    <TextInput
                                        placeholder="Số điện thoại hoặc email"
                                        placeholderTextColor="white"
                                        className="text-[15px] flex-1 py-3 h-auto text-white pl-2"
                                    />
                                </View>
                                <Text className="text-red-600 pl-4 mt-1">Bắt buộc nhập</Text>
                            </View>

                            <View className="mb-2">
                                <View className="flex-row items-center rounded-[20px] bg-[transparent] justify-between border border-white px-2">
                                    <Icon name="key-variant" size={20} color="#fff" />
                                    <TextInput
                                        placeholder="Mật khẩu"
                                        placeholderTextColor="white"
                                        className="text-[15px] flex-1 py-3 h-auto text-white pl-2"
                                        secureTextEntry={passWord ? !showPass : false}
                                    />
                                    <TouchableOpacity onPress={toggleShowPass}>
                                        <Ionicons
                                            name={showPass ? 'eye-off-outline' : 'eye-outline'}
                                            size={20}
                                            color="white"
                                        />
                                    </TouchableOpacity>
                                </View>

                                <Text className="text-red-600 pl-4 mt-1">Bắt buộc nhập</Text>
                            </View>

                            <View className="mb-2">
                                <View className="flex-row items-center rounded-[20px] bg-[transparent] justify-between border border-white px-2">
                                    <Icon name="key-variant" size={20} color="#fff" />
                                    <TextInput
                                        placeholder="Xác nhận mật khẩu"
                                        placeholderTextColor="white"
                                        className="text-[15px] flex-1 py-3 h-auto text-white pl-2"
                                        secureTextEntry={passWord ? !showPass : false}
                                    />
                                    <TouchableOpacity onPress={toggleShowPass}>
                                        <Ionicons
                                            name={showPass ? 'eye-off-outline' : 'eye-outline'}
                                            size={20}
                                            color="white"
                                        />
                                    </TouchableOpacity>
                                </View>
                                <Text className="text-red-600 pl-4 mt-1">Bắt buộc nhập</Text>
                            </View>

                            <View className="mb-4 flex-row items-center gap-3">
                                <View className="flex-1 ">
                                    <Dropdown
                                        data={items}
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
                                    <Checkbox value={isSelected} onValueChange={setSelection} className="p-[10px]" />
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
                                    <Checkbox value={isSelected} onValueChange={setSelection} className="p-[10px]" />
                                </View>
                                <View className="w-[90%]">
                                    <Text className="text-white text-[14px] ">
                                        Tôi đồng ý với{' '}
                                        <Text className="text-[#F6D365] font-bold">Điều khoản sử dụng</Text> của TD Việt
                                        Nam.
                                    </Text>
                                </View>
                            </View>
                            <View className="flex-row items-center mt-3">
                                <View className="h-full w-[10%]">
                                    <Checkbox value={isSelected} onValueChange={setSelection} className="p-[10px]" />
                                </View>
                                <View className="w-[90%]">
                                    <Text className="text-white text-[14px] ">
                                        Tôi đồng ý với{' '}
                                        <Text className="text-[#F6D365] font-bold">Điều khoản sử dụng</Text> của TD Việt
                                        Nam.
                                    </Text>
                                </View>
                            </View>
                            <View className="flex-row items-center mt-3">
                                <View className="h-full w-[10%]">
                                    <Checkbox value={isSelected} onValueChange={setSelection} className="p-[10px]" />
                                </View>
                                <View className="w-[90%]">
                                    <Text className="text-white text-[14px] ">
                                        Tôi đồng ý với{' '}
                                        <Text className="text-[#F6D365] font-bold">Điều khoản sử dụng</Text> của TD Việt
                                        Nam.
                                    </Text>
                                </View>
                            </View>
                            <View className="flex-row items-center mt-3">
                                <View className="h-full w-[10%]">
                                    <Checkbox value={isSelected} onValueChange={setSelection} className="p-[10px]" />
                                </View>
                                <View className="w-[90%]">
                                    <Text className="text-white text-[14px] ">
                                        Tôi đồng ý với{' '}
                                        <Text className="text-[#F6D365] font-bold">Điều khoản sử dụng</Text> của TD Việt
                                        Nam.
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
                <View style={styles.footer}>
                    <ButtonPrimary title="Cập nhật" />
                </View>
            </SafeAreaView>
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
