import React, { useState } from 'react';
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
} from 'react-native';
import Container from '../components/Container';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { LinearGradient } from 'expo-linear-gradient';
import useSeatStatus from '../queries/useSeatStatus';
import { ActivityIndicator } from 'react-native-paper';
import screen from '../../assets/screen.png';
import { TouchableHighlight } from 'react-native';

const Seat = ({ navigation }) => {
    const scheduleCode = 'SC130';
    const { data, isLoading, isSuccess } = useSeatStatus(scheduleCode);

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
    const [selectedSeat, setSelectedSeat] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);

    const handleSelectSeat = (seat) => {
        setSelectedSeat((prev) => {
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

            return updatedSeats;
        });
    };

    const getSeatClass = (seat) => {
        if (selectedSeat && selectedSeat.includes(seat)) {
            return '#66d6ff'; //đã chọn
            // return '#1185fa'; //giữ chỗ
            // return '#F5EE76'; //bao tri
            // return '#F68C66'; //đã đặt
        }

        switch (seat.status) {
            case 2:
                return '#00FFFF';
            case 3:
                return '#1185fa';
            default:
                if (seat.statusSeat === 0) {
                    return '#F5EE76';
                }
                return 'rgba(255, 255, 255,0.9)';
        }
    };
    const UserItem = ({ image, name, seatNumber, seat }) => {
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
                <TouchableWithoutFeedback onPress={() => handleSelectSeat(seat)}>
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
                        <Text className="absolute " style={{ fontSize: hp(1.2) }}>
                            {seatNumber}
                        </Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        );
    };

    return (
        <Container
            back={true}
            isScroll={false}
            title="TD Sài Gòn"
            span="Phòng 1 17:00, 10/12/2024"
            style={{ color: 'white', fontWeight: '700' }}
            styleSpan={{ color: 'white' }}
        >
            {isLoading && <ActivityIndicator size="large" color="white" />}
            {isSuccess && (
                <View style={styles.container}>
                    <View
                        style={{
                            minHeight: hp(70),

                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <ScrollView
                            horizontal={true}
                            showsVerticalScrollIndicator={false}
                            style={{
                                flexDirection: 'column',
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
                                            <UserItem
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

                    <View style={styles.footer} className="bg-white  flex-col px-5 py-2  ">
                        {selectedSeat.length > 0 && (
                            <View className="  flex-row   space-y-10  " style={{ height: hp(3) }}>
                                <Text
                                    numberOfLines={1}
                                    ellipsizeMode="tail"
                                    className="font-semibold text-sm   max-w-[93%] "
                                >
                                    {selectedSeat.length + 'x'} <Text className="font-medium">ghế: </Text>
                                    {selectedSeat.map((item) => item?.seatNumber).join(', ')}
                                </Text>
                            </View>
                        )}

                        <View className="  flex-row  " style={{ height: hp(3) }}>
                            <Text
                                numberOfLines={1}
                                ellipsizeMode="tail"
                                className="font-semibold text-base uppercase  max-w-[93%]  "
                            >
                                Thám tử lừng danh conan movie 7 Thám tử lừng danh conan movie
                            </Text>

                            <View className="ml-1 border rounded border-yellow-600 items-center justify-center h-[75%]   w-[7%]">
                                <Text className="text-[10px] text-yellow-400 font-bold">T16</Text>
                            </View>
                        </View>

                        <View className="  flex-row   " style={{ height: hp(6) }}>
                            <View className="  w-[70%]  flex justify-around ">
                                <Text className="text-[#8f8e8e]  ">2D Phụ đề Việt</Text>

                                <Text className="font-semibold ">
                                    {selectedSeat.reduce((sum, seat) => sum + seat.price, 0).toLocaleString()} đ
                                </Text>
                            </View>

                            <View className=" w-[30%] items-center justify-center">
                                <TouchableOpacity onPress={() => navigation.navigate('Food')}>
                                    <LinearGradient
                                        className=" border border-black rounded-3xl  px-5 py-2  "
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
                </View>
            )}
        </Container>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        height: hp(90),
        width: wp(100),
    },

    listSeat: {
        width: 'auto',
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
