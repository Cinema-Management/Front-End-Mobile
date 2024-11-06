import React, { memo, useCallback, useEffect, useState } from 'react';
import {
    FlatList,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Image,
    ScrollView,
    Modal,
    Alert,
    ActivityIndicator,
} from 'react-native';
import Container from '../components/Container';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { LinearGradient } from 'expo-linear-gradient';
import useSeatStatus from '../queries/useSeatStatus';
import screen from '../../assets/screen.png';
import { TouchableHighlight } from 'react-native';
import { formatDateTicket, handleChangAge } from '../utils/Date';
import { useFocusEffect } from '@react-navigation/native';

import updateStatusSeat from '../queries/updateStatusSeat';
const Seat = memo(({ navigation, route }) => {
    const { showtime } = route.params || {};
    const { data = [], isLoading, isSuccess, refetch, isFetching } = useSeatStatus(showtime?.code);

    const [selectedSeats, setSelectedSeats] = useState([]);

    const [modalVisible, setModalVisible] = useState(false);
    const [modalVisibleSelected, setModalVisibleSelected] = useState(false);
    const [loading, setLoading] = useState(false);

    useFocusEffect(
        useCallback(() => {
            refetch();
        }, [refetch]),
    );
    // useEffect(() => {
    //     if (showtime?.check) {
    //         // setSelectedSeats([]);
    //         refetch();
    //     }
    // }, [showtime]);

    const handleSelectSeat = (seat) => {
        setSelectedSeats((prev) => {
            let updatedSeats;

            // Kiểm tra xem ghế đã được chọn hay chưa.
            const isSelected = prev.some((item) => item.code === seat.code);

            if (isSelected) {
                // Nếu ghế đã chọn, bỏ chọn nó
                updatedSeats = prev.filter((item) => item.code !== seat.code);
            } else {
                // Nếu số lượng ghế đã chọn đạt giới hạn (8), hiển thị modal và dừng thao tác
                if (prev.length >= 8) {
                    setModalVisible(true);
                    return prev; // Trả về danh sách ghế cũ, không thêm mới
                }
                // Nếu ghế chưa chọn và số lượng ghế hiện tại nhỏ hơn giới hạn, thêm ghế vào danh sách
                updatedSeats = [...prev, seat];
            }
            updatedSeats.sort((a, b) => {
                const rowA = a.seatNumber[0]; // Lấy ký tự hàng
                const rowB = b.seatNumber[0];
                const numA = parseInt(a.seatNumber.slice(1)); // Lấy số ghế
                const numB = parseInt(b.seatNumber.slice(1));

                // Sắp xếp theo hàng trước, nếu hàng giống nhau thì sắp xếp theo số ghế
                if (rowA < rowB) return -1;
                if (rowA > rowB) return 1;
                return numA - numB;
            });

            return updatedSeats;
        });
    };
    const getImageSize = (name) => {
        switch (name) {
            case 'Ghế Thường':
                return { width: wp(6), height: hp(2.3), marginRight: wp(1) }; // Kích thước cho ghế thường
            case 'Ghế VIP':
                return { width: wp(6.5), height: hp(3) }; // Kích thước cho ghế VIP
            case 'Ghế đôi':
                return { width: wp(14.1), height: hp(3.5) }; // Kích thước lớn hơn cho ghế đôi
            default:
                return { width: wp(12), height: hp(6) }; // Kích thước mặc định
        }
    };
    const getSeatClass = (seat) => {
        if (selectedSeats && selectedSeats.includes(seat)) {
            return '#66d6ff'; //đã chọn
            // return '#1185fa'; //giữ chỗ
            // return '#F5EE76'; //bao tri
            // return '#F68C66'; //đã đặt
        }

        switch (seat.status) {
            case 2:
                return '#1185fa';
            case 3:
                return '#F68C66';
            default:
                if (seat.statusSeat === 0) {
                    return '#F5EE76';
                }
                return 'rgba(255, 255, 255,0.8)';
        }
    };
    const SeatItem = ({ image, name, seatNumber, seat }) => {
        const size = getImageSize(name);
        return (
            <View
                style={{
                    width: size.width,
                    height: size.height,
                    margin: size.margin,
                    marginBottom: wp(0.5),
                    margin: wp(0.5),
                    marginRight: size.marginRight,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <TouchableWithoutFeedback
                    onPress={() => {
                        if (seat.status === 1 && seat.statusSeat !== 0) {
                            handleSelectSeat(seat);
                        }
                    }}
                >
                    <View className=" justify-center items-center ">
                        <View className="relative  h-full w-full">
                            <Image
                                source={{ uri: image }}
                                style={{
                                    width: size.width,
                                    height: size.height,
                                    top: name === 'Ghế Thường' ? 0 : 3,
                                    position: 'relative',
                                    tintColor: getSeatClass(seat),
                                }}
                                resizeMode="cover"
                            />
                        </View>
                        <Text className="absolute text-gray-800 " style={{ fontSize: hp(1.2) }}>
                            {seatNumber}
                        </Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        );
    };
    const handlePress = async () => {
        if (selectedSeats.length === 0) {
            setModalVisibleSelected(true);
            return;
        } else {
            updateStatusSeat(selectedSeats, 2, showtime?.code);

            const data1 = selectedSeats.map((seat) => ({ ...seat, status: 2 }));
            navigation.navigate('Food', { selectedSeats: data1, showtime });
        }
    };

    return (
        <Container
            back={true}
            isScroll={false}
            title={showtime?.cinema}
            span={`${showtime?.room} - ${formatDateTicket(showtime?.startTime)}`}
            style={{ color: 'white', fontWeight: '700' }}
            styleSpan={{ color: 'white' }}
        >
            {(isLoading || isFetching || loading) && (
                <ActivityIndicator size="large" color="white" className="flex-1 items-center justify-center" />
            )}
            {isSuccess && data.length === 0 && (
                <View style={styles.container} className="justify-center items-center px-3 ">
                    <Text className="text-white text-center text-lg">
                        Chưa có giá cho ngày này vui lòng liên hệ rạp để biết thêm thông tin chi tiết!
                    </Text>
                </View>
            )}

            {!loading && !isFetching && isSuccess && data.length > 0 && (
                <View style={styles.container}>
                    <View
                        style={{
                            minHeight: hp(75),

                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <ScrollView
                            horizontal={true}
                            maximumZoomScale={10}
                            minimumZoomScale={1}
                            showsVerticalScrollIndicator={false}
                            style={{
                                flexDirection: 'column',
                                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                marginTop: hp(1),
                            }}
                            contentContainerStyle={{
                                alignItems: 'center',
                                margin: 'auto',
                            }}
                        >
                            <View className=" flex-1" style={{ height: hp(70) }}>
                                <Image
                                    source={screen}
                                    style={{ width: wp(80), height: hp(20), margin: 'auto' }}
                                    resizeMode="contain"
                                />
                                <View className=" items-center flex-1  justify-center  ">
                                    <FlatList
                                        scrollEnabled={false}
                                        data={data}
                                        keyExtractor={(item) => item.code}
                                        renderItem={({ item }) => (
                                            <SeatItem
                                                name={item.name}
                                                image={item.image}
                                                seatNumber={item.seatNumber}
                                                seat={item}
                                            />
                                        )}
                                        showsVerticalScrollIndicator={false}
                                        numColumns={data.length > 110 ? 12 : data.length > 70 ? 10 : 8} // Số cột
                                        style={styles.listSeat}
                                    />
                                    <View style={styles.notes}>
                                        <View className="flex-row flex-wrap justify-center ">
                                            <View className="w-[28%] items-center justify-center p-2">
                                                <View className="flex-row items-center space-x-2 p-2  rounded-md w-full justify-center ">
                                                    <View className="w-5 h-5 bg-[#1185fa] rounded-sm" />
                                                    <Text className="text-xs font-bold text-center text-white">
                                                        Đang giữ
                                                    </Text>
                                                </View>
                                            </View>
                                            <View className="w-[25%] items-center justify-center p-2">
                                                <View className="flex-row items-center space-x-2 p-2  rounded-md w-full justify-center">
                                                    <View className="w-5 h-5 bg-[#66d6ff] rounded-sm" />
                                                    <Text className="text-xs font-bold text-center text-white">
                                                        Đã chọn
                                                    </Text>
                                                </View>
                                            </View>
                                            <View className="w-[23%] items-center justify-center p-2">
                                                <View className="flex-row items-center space-x-2 p-2  rounded-md w-full justify-center">
                                                    <View className="w-5 h-5 bg-[#F68C66] rounded-sm" />
                                                    <Text className="text-xs font-bold text-center text-white">
                                                        Đã đặt
                                                    </Text>
                                                </View>
                                            </View>
                                            <View className="w-[23%] items-center justify-center p-2">
                                                <View className="flex-row items-center space-x-2 p-2  rounded-md w-full justify-center">
                                                    <View className="w-5 h-5 bg-[#F5EE76] rounded-sm" />

                                                    <Text className="text-xs font-bold text-center text-white">
                                                        Bảo trì
                                                    </Text>
                                                </View>
                                            </View>
                                        </View>
                                        <View className="flex-row flex-wrap justify-center ">
                                            <View className="w-[30%] items-center justify-center ">
                                                <View className="flex-row items-center space-x-2   rounded-md w-full justify-center">
                                                    <Image
                                                        resizeMode="cover"
                                                        source={{
                                                            uri: 'https://td-cinemas.s3.ap-southeast-1.amazonaws.com/Seat.png',
                                                        }}
                                                        style={{ width: wp(6.5), height: hp(2.5) }}
                                                    />
                                                    <Text className="text-xs font-bold text-center text-white">
                                                        Ghế thường
                                                    </Text>
                                                </View>
                                            </View>
                                            <View className="w-[30%] items-center justify-center ">
                                                <View className="flex-row items-center space-x-2   rounded-md w-full justify-center">
                                                    <Image
                                                        resizeMode="cover"
                                                        source={{
                                                            uri: 'https://td-cinemas.s3.ap-southeast-1.amazonaws.com/seat_vip.png',
                                                        }}
                                                        style={{ width: wp(6.5), height: hp(3) }}
                                                    />
                                                    <Text className="text-xs font-bold text-center text-white">
                                                        Ghế vip
                                                    </Text>
                                                </View>
                                            </View>
                                            <View className="w-[30%] items-center justify-center ">
                                                <View className="flex-row items-center space-x-2   rounded-md w-full justify-center">
                                                    <Image
                                                        resizeMode="cover"
                                                        source={{
                                                            uri: 'https://td-cinemas.s3.ap-southeast-1.amazonaws.com/seat_couple.png',
                                                        }}
                                                        style={{ width: wp(14), height: hp(3) }}
                                                    />
                                                    <Text className="text-xs font-bold text-center text-white">
                                                        Ghế đôi
                                                    </Text>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </ScrollView>
                    </View>

                    <View style={styles.footer} className="bg-white  flex-col px-8 py-2  ">
                        {selectedSeats.length > 0 && (
                            <View className="  flex-row   space-y-10  " style={{ height: hp(2.5) }}>
                                <Text
                                    numberOfLines={1}
                                    ellipsizeMode="tail"
                                    className="font-semibold text-sm   max-w-[93%] "
                                >
                                    {selectedSeats.length + 'x'} <Text className="font-medium">ghế: </Text>
                                    {selectedSeats.map((item) => item?.seatNumber).join(', ')}
                                </Text>
                            </View>
                        )}

                        <View className="  flex-row  " style={{ height: hp(2.5) }}>
                            <Text
                                numberOfLines={1}
                                ellipsizeMode="tail"
                                className="font-semibold text-base uppercase  max-w-[93%]  "
                            >
                                {showtime.movie}
                            </Text>

                            <View className="ml-1 border rounded border-yellow-600 items-center justify-center h-[75%]   w-[7%]">
                                <Text className="text-[10px] text-yellow-400 font-bold">
                                    {handleChangAge(showtime?.ageRestriction)}
                                </Text>
                            </View>
                        </View>

                        <View className="  flex-row   " style={{ height: hp(6) }}>
                            <View className="  w-[70%]  flex justify-start ">
                                <Text className="text-[#8f8e8e] pb-1 ">
                                    {showtime?.screeningFormat} {showtime?.audio === 'Gốc' ? '' : ' ' + showtime?.audio}
                                    <Text className="text-[15px]"> Phụ đề </Text>
                                    {showtime?.subtitle}
                                </Text>

                                <Text className="font-semibold  text-sm">
                                    {selectedSeats.reduce((sum, seat) => sum + seat.price, 0).toLocaleString()} đ
                                </Text>
                            </View>

                            <View className=" w-[30%] items-center justify-center ">
                                <TouchableOpacity onPress={handlePress}>
                                    <LinearGradient
                                        className=" border border-black rounded-3xl  px-3 py-1  "
                                        colors={['#ED999A', '#F6D365']}
                                        start={{ x: 0.4, y: 0.1 }}
                                        end={{ x: 0.9, y: 0.2 }}
                                    >
                                        <Text className="text-center text-sm font-bold text-white">Đặt Vé</Text>
                                    </LinearGradient>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                    <Modal
                        animationType="none"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => setModalVisible(false)}
                    >
                        <View className="  flex-1 justify-center items-center bg-black/30  ">
                            {/* Nội dung modal */}
                            <View className="bg-white  rounded-lg " style={{ height: hp(10), width: wp(60) }}>
                                <View
                                    style={{ height: hp(5), width: wp(60) }}
                                    className="justify-center items-center border-b-[0.5px] border-gray-300"
                                >
                                    <Text className="text-sm">Bạn chỉ chọn tối đa 8 ghế</Text>
                                </View>

                                <TouchableHighlight
                                    style={{ height: hp(5), width: wp(60) }}
                                    onPress={() => setModalVisible(false)}
                                    className="justify-center items-center bg-white rounded-b-lg "
                                    underlayColor="#DDDDDD"
                                >
                                    <Text className="text-red-500 text-center">Đóng</Text>
                                </TouchableHighlight>
                            </View>
                        </View>
                    </Modal>

                    <Modal
                        animationType="none"
                        transparent={true}
                        visible={modalVisibleSelected}
                        onRequestClose={() => setModalVisibleSelected(false)}
                    >
                        <View className="  flex-1 justify-center items-center bg-black/30  ">
                            {/* Nội dung modal */}
                            <View className="bg-white  rounded-lg " style={{ height: hp(10), width: wp(60) }}>
                                <View
                                    style={{ height: hp(5), width: wp(60) }}
                                    className="justify-center items-center border-b-[0.5px] border-gray-300"
                                >
                                    <Text className="text-sm">Xin chọn ít nhất 1 ghế</Text>
                                </View>

                                <TouchableHighlight
                                    style={{ height: hp(5), width: wp(60) }}
                                    onPress={() => setModalVisibleSelected(false)}
                                    className="justify-center items-center bg-white rounded-b-lg "
                                    underlayColor="#DDDDDD"
                                >
                                    <Text className="text-red-500 text-center">Đóng</Text>
                                </TouchableHighlight>
                            </View>
                        </View>
                    </Modal>
                </View>
            )}
        </Container>
    );
});

const styles = StyleSheet.create({
    container: {
        height: hp(90),
        width: wp(100),
    },

    seat: {
        marginHorizontal: 5,
        marginVertical: 5,
    },

    notes: {
        width: 'auto',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
        width: wp(100),
    },
    footer: {
        height: hp(15),
    },

    footerButton: {
        borderRadius: 10,
        padding: 15,
    },

    footerText: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
    },
});

export default Seat;
