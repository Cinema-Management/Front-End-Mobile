import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    Dimensions,
    Image,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    FlatList,
    Linking,
    Alert,
} from 'react-native';
import phim1 from '../../assets/phim1.png';
import { MaterialIcons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { AntDesign } from '@expo/vector-icons';
import Container from '../components/Container';
import { colors } from '../constants/colors';
import { Dropdown } from 'react-native-element-dropdown';
import { color } from 'react-native-elements/dist/helpers';
import ButtonPrimary from '../components/ButtonPrimary';
import axios from 'axios';
import { API_URL } from '@env';
import { Link } from '@react-navigation/native';
var { height, width } = Dimensions.get('window');

export default function Pay({ navigation }) {
    const food = [
        { id: '1', name: 'Combo truyền thống', price: 100000, quantity: 10 },
        { id: '2', name: 'Combo abc', price: 100000, quantity: 10 },
        { id: '3', name: 'Combo bcd', price: 100000, quantity: 10 },
    ];

    const [selectedOption, setSelectedOption] = useState('momo');
    const [loading, setLoading] = useState(false);

    const handlePress = (option) => {
        setSelectedOption(option);
    };

    const handlePayment = async () => {
        setLoading(true);
        try {
            console.log('Thanh toán');
            // Gửi yêu cầu đến API thanh toán
            const response = await axios.post(API_URL + '/api/app/payment');

            if (response.data && response.data.order_url) {
                // Mở ZaloPay với URL trả về
                const url = response.data.order_url;
                // Sử dụng Linking để mở URL
                Linking.openURL(url);
            } else {
                Alert.alert('Payment Error', 'Failed to initiate payment');
            }
        } catch (error) {
            console.error('Payment Error:', error);
            Alert.alert('Error', 'An error occurred while processing the payment');
        }
    };

    useEffect(() => {
        const handleOpenURL = async (event) => {
            try {
                const data = event.url; // Lấy URL từ sự kiện

                // Phân tích URL để lấy mã trả về
                const urlParams = new URLSearchParams(data.split('?')[1]);
                console.log('12', urlParams);
                const apptransid = urlParams.get('apptransid');

                if (apptransid) {
                    const response = await axios.post(API_URL + '/api/app/order-status/' + apptransid);
                    // Thêm các thông tin cần thiết như appID, checksum nếu cần

                    if (response.data?.return_code === 1) {
                        Alert.alert('Payment Success', 'Payment was successful');
                    } else {
                        Alert.alert('Payment Failed', `Error: ${response.data.return_code}`);
                    }
                }
            } catch (error) {}
        };

        // Gắn listener
        const subscription = Linking.addEventListener('url', handleOpenURL);

        // Lấy URL ban đầu nếu có
        const getInitialURL = async () => {
            const initialURL = await Linking.getInitialURL();
            if (initialURL) {
                handleOpenURL({ url: initialURL });
            }
            return;
        };
        getInitialURL();

        // Xóa listener khi component unmount
        return () => {
            subscription.remove();
        };
    }, []);

    const FoodItem = ({ item }) => {
        return (
            <View className="flex-row  px-4   justify-between items-center border-b border-[#8e8d8d] ">
                <Text
                    className="text-base text-white h-full   "
                    numberOfLines={1}
                    style={{
                        width: wp(65),
                        height: hp(5),
                        lineHeight: hp(5),
                    }}
                >
                    {item.quantity}x {item.name}
                </Text>
                <Text
                    className="text-base text-white h-full  flex-1 text-right  "
                    numberOfLines={1}
                    style={{
                        width: wp(35),
                        height: hp(5),
                        lineHeight: hp(5),
                    }}
                >
                    {(item.price * item.quantity).toLocaleString() + ' đ'}
                </Text>
            </View>
        );
    };

    return (
        <Container isScroll={false} title="Thanh toán" back={true} style={{ color: 'white', fontWeight: 700 }}>
            <View className="">
                <View style={styles.info}>
                    <View style={{ width: wp(25) }} className=" items-center  h-full mt-2">
                        <Image resizeMode="contain" source={phim1} style={{ height: hp(14), width: wp(20) }} />
                    </View>

                    <View style={{ width: wp(70) }} className=" h-full  ">
                        <View className="  flex-row  h-[15%] mt-1 ">
                            <Text
                                numberOfLines={1}
                                ellipsizeMode="tail"
                                className="font-semibold text-base uppercase  max-w-[90%] text-white "
                            >
                                Thám tử lừng danh conan movie 7 Thám tử lừng danh conan movie
                            </Text>

                            <View className="ml-1 border rounded border-yellow-600 items-center justify-center h-[85%]   w-[10%]">
                                <Text className="text-[9px] text-yellow-400 font-bold">T16</Text>
                            </View>
                        </View>
                        <Text className="text-white text-sm font-normal uppercase mb-2 ">2D Phụ đề</Text>
                        <Text className="text-white text-sm font-normal ">Thứ 2 - 14:20, 28/10/2024</Text>
                        <Text className="text-white text-sm font-bold ">TD Center Paly</Text>
                        <Text className="text-white text-sm font-bold ">Phòng 1</Text>
                    </View>
                </View>
            </View>
            <View style={styles.main}>
                <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
                    <View style={{ flex: 1, marginTop: 25 }}>
                        <View>
                            <Text className="text-white text-lg px-4 font-bold mb-4">Thông tin vé:</Text>
                            <View style={{ backgroundColor: colors.backgroundColor }}>
                                <View className="flex-row px-4  justify-between items-center border-b border-[#8e8d8d]">
                                    <Text
                                        className="text-base text-white h-full "
                                        style={{ width: wp(30), height: hp(5), lineHeight: hp(5) }}
                                    >
                                        8x ghế
                                    </Text>

                                    <Text
                                        className="text-base text-white h-full  flex-1 text-right"
                                        numberOfLines={1}
                                        style={{ width: wp(70), height: hp(5), lineHeight: hp(5) }}
                                    >
                                        E1, E2, E3, E4, E5, E6, E7, E8
                                    </Text>
                                </View>
                                <View className="flex-row px-4   justify-between items-center border-b border-[#8e8d8d]">
                                    <Text
                                        className="text-base text-white h-full "
                                        style={{ width: wp(30), height: hp(5), lineHeight: hp(5) }}
                                    >
                                        Tổng cộng
                                    </Text>

                                    <Text
                                        className="text-base text-white h-full  flex-1 text-right"
                                        numberOfLines={1}
                                        style={{ width: wp(70), height: hp(5), lineHeight: hp(5) }}
                                    >
                                        1.100.000 đ
                                    </Text>
                                </View>
                            </View>
                        </View>
                        {food.length > 0 && (
                            <View style={{ marginTop: 40 }}>
                                <Text className="text-white text-lg px-4 font-bold mb-4">Thông tin combo:</Text>
                                <View style={{ backgroundColor: colors.backgroundColor }}>
                                    <FlatList
                                        scrollEnabled={false}
                                        data={food}
                                        keyExtractor={(item) => item.id}
                                        renderItem={({ item }) => <FoodItem item={item} />}
                                    />
                                    <View className="flex-row px-4   justify-between items-center border-b border-[#8e8d8d]">
                                        <Text
                                            className="text-base text-white h-full "
                                            style={{ width: wp(30), height: hp(5), lineHeight: hp(5) }}
                                        >
                                            Tổng cộng
                                        </Text>

                                        <Text
                                            className="text-base text-white h-full  flex-1 text-right"
                                            numberOfLines={1}
                                            style={{ width: wp(80), height: hp(5), lineHeight: hp(5) }}
                                        >
                                            10.100.000 đ
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        )}

                        <View style={{ marginTop: 40 }}>
                            <Text className="text-white text-lg px-4 font-bold mb-4">Tổng kết:</Text>
                            <View style={{ backgroundColor: colors.backgroundColor }}>
                                <View className="flex-row px-4  justify-between items-center border-b border-[#8e8d8d]">
                                    <Text
                                        className="text-base text-white h-full  flex-1  "
                                        style={{ width: wp(50), height: hp(5), lineHeight: hp(5) }}
                                    >
                                        Tổng cộng
                                    </Text>

                                    <Text
                                        className="text-base  text-white h-full flex-1  text-right"
                                        numberOfLines={1}
                                        style={{ width: wp(50), height: hp(5), lineHeight: hp(5) }}
                                    >
                                        1.100.000 đ
                                    </Text>
                                </View>
                                <View className="flex-row px-4  justify-between items-center border-b border-[#8e8d8d]">
                                    <Text
                                        className="text-base text-white h-full  flex-1  "
                                        style={{ width: wp(50), height: hp(5), lineHeight: hp(5) }}
                                    >
                                        Giảm giá
                                    </Text>

                                    <Text
                                        className="text-base  text-white h-full flex-1  text-right"
                                        numberOfLines={1}
                                        style={{ width: wp(50), height: hp(5), lineHeight: hp(5) }}
                                    >
                                        - 300.000 đ
                                    </Text>
                                </View>
                                <View className="flex-row px-4  justify-between items-center border-b border-[#8e8d8d]">
                                    <Text
                                        className="text-base text-white h-full  flex-1  "
                                        style={{ width: wp(50), height: hp(5), lineHeight: hp(5) }}
                                    >
                                        Tổng Thanh toán
                                    </Text>

                                    <Text
                                        className="text-base  text-white h-full flex-1  text-right"
                                        numberOfLines={1}
                                        style={{ width: wp(50), height: hp(5), lineHeight: hp(5) }}
                                    >
                                        700.000 đ
                                    </Text>
                                </View>
                            </View>
                        </View>

                        <View style={{ marginTop: 40 }}>
                            <Text className="text-white text-lg px-4 font-bold mb-4">Thanh toán</Text>
                            <View style={{ backgroundColor: colors.backgroundColor }}>
                                <TouchableOpacity onPress={() => handlePress('momo')}>
                                    <View className="flex-row px-4   items-center border-b border-[#8e8d8d]">
                                        <View
                                            className="text-base text-white font-bold  justify-center   "
                                            style={{ width: wp(15), height: hp(6), lineHeight: hp(2) }}
                                        >
                                            <View
                                                className="flex-col justify-center items-center bg-pink-500 rounded-lg"
                                                style={{ width: hp(5), height: hp(4) }} // Kích thước thành phần, điều chỉnh tùy ý
                                            >
                                                <Text
                                                    className="text-white font-bold"
                                                    style={{ fontSize: hp(1.5), lineHeight: hp(1.5) }} // Kích thước chữ, tùy chỉnh để phù hợp
                                                >
                                                    MO
                                                </Text>

                                                <Text
                                                    className="text-white font-bold"
                                                    style={{ fontSize: hp(1.5), lineHeight: hp(1.5) }}
                                                >
                                                    MO
                                                </Text>

                                                <Text
                                                    className="text-white font-bold"
                                                    style={{ fontSize: hp(0.5), lineHeight: hp(0.5) }}
                                                >
                                                    mobile money
                                                </Text>
                                            </View>
                                        </View>

                                        <View
                                            className=" flex-row items-center   "
                                            style={{
                                                maxWidth: wp(75),
                                                height: hp(5),
                                                lineHeight: hp(5),
                                            }}
                                        >
                                            <Text className="text-white text-base ">Thanh toán qua </Text>
                                            <Text className="text-pink-500 text-base font-bold pr-6 ">MOMO</Text>
                                            <Text className="text-white text-xs font-bold absolute right-1 top-1">
                                                QR
                                            </Text>
                                        </View>
                                    </View>
                                    {selectedOption === 'momo' && (
                                        <MaterialIcons
                                            name="check"
                                            size={24}
                                            color="#F68C66"
                                            font
                                            style={{ position: 'absolute', right: 10, top: 10 }}
                                        />
                                    )}
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => handlePress('zalo')}>
                                    <View className="flex-row px-4  items-center border-b border-[#8e8d8d]">
                                        <View
                                            className="text-base text-white h-full font-bold  justify-center  "
                                            style={{ width: wp(15), height: hp(6), lineHeight: hp(2) }}
                                        >
                                            <View
                                                className="flex-col justify-center items-center bg-white rounded-lg"
                                                style={{ width: hp(5), height: hp(4) }} // Kích thước thành phần, điều chỉnh tùy ý
                                            >
                                                <Text
                                                    className="text-[#1a57ff] font-bold"
                                                    style={{ fontSize: hp(1.5), lineHeight: hp(1.5) }} // Kích thước chữ, tùy chỉnh để phù hợp
                                                >
                                                    Zalo
                                                </Text>

                                                <Text
                                                    className="text-green-500 font-bold"
                                                    style={{ fontSize: hp(1.5), lineHeight: hp(1.5) }}
                                                >
                                                    pay
                                                </Text>
                                            </View>
                                        </View>

                                        <View
                                            className=" flex-row items-center  "
                                            style={{
                                                width: 'auto',
                                                maxWidth: wp(75),
                                                height: hp(5),
                                                lineHeight: hp(5),
                                            }}
                                        >
                                            <Text className="text-white text-base ">Thanh toán qua </Text>
                                            <Text className="text-[#221AFF] text-base font-bold  ">Zalo</Text>
                                            <Text className="text-green-500 text-base font-bold pr-6 ">Pay</Text>

                                            <Text className="text-white text-xs font-bold absolute right-1 top-1">
                                                QR
                                            </Text>
                                        </View>
                                    </View>
                                    {selectedOption === 'zalo' && (
                                        <MaterialIcons
                                            name="check"
                                            size={24}
                                            color="#F68C66"
                                            style={{ position: 'absolute', right: 10, top: 10 }}
                                        />
                                    )}
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View style={styles.footer}>
                        <ButtonPrimary title="Thanh toán" onPress={handlePayment} />
                    </View>
                </ScrollView>
            </View>
        </Container>
    );
}
const styles = StyleSheet.create({
    info: {
        paddingTop: 10,
        marginTop: height * 0.02,
        height: height * 0.18,
        width: wp(100),
        backgroundColor: colors.backgroundColor,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    main: {
        width: wp(100),
        height: height * 0.7,
    },
    footer: {
        height: height * 0.15,
        width: wp(100),
        justifyContent: 'center',
        alignItems: 'center',
    },
});
