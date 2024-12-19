import React, { useEffect, useState } from 'react';
import { FlatList, ScrollView, StyleSheet, Text, View, Image, Dimensions, Modal } from 'react-native';
import Container from '../components/Container';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { formatDateTicket, handleChangAge, formatDateTimeSalesInvoice } from '../utils/Date';
import Barcode from 'react-native-barcode-builder';
import { TouchableOpacity } from 'react-native';
var { height, width } = Dimensions.get('window');
import useAddress from '../queries/useAddress';
const TicketDetail = ({ route, navigation }) => {
    const { ticket } = route.params || {};
    const { data: address = {}, isLoading: isLoadingAddress } = useAddress(
        ticket?.scheduleCode?.roomCode?.cinemaCode?.code,
    );
    const groupByProductType = (details) => {
        if (!Array.isArray(details)) {
            return { seat: [], food: [] };
        }

        const result = details.reduce(
            (acc, item) => {
                const productType = item.productCode.type;

                if (productType === 0) {
                    // Thêm sản phẩm loại ghế vào mảng type0
                    acc.seat.push(item);
                } else if (productType !== 0) {
                    // Thêm sản phẩm loại nước ngọt vào mảng type1
                    acc.food.push(item);
                }

                return acc;
            },
            { seat: [], food: [] }, // Khởi tạo đối tượng với 2 mảng trống
        );

        return result;
    };

    const groupedDetailsByType = groupByProductType(ticket?.details || {});

    const arraySeat = groupedDetailsByType?.seat?.map((item) => item.productCode.seatNumber).join(', ');
    const arrayCombo = groupedDetailsByType?.food
        ?.map((item) => item.quantity + 'x ' + item.productCode.name)
        .join(', ');
    const totalAmountFood = groupedDetailsByType?.food?.reduce((sum, item) => sum + item.totalAmount, 0);
    const totalAmountSeat = groupedDetailsByType?.seat?.reduce((sum, item) => sum + item.totalAmount, 0);
    const totalAmount = totalAmountFood + totalAmountSeat - ticket?.discountAmount;
    const [modalVisible, setModalVisible] = useState(false);

    const toggleModal = () => setModalVisible(!modalVisible);
    return (
        <Container
            back={true}
            isScroll={true}
            targetRoute={ticket?.resetTab ? 'Tabs' : ''}
            title="Thông tin vé"
            style={{ color: 'white', fontWeight: '700' }}
            styleSpan={{ color: 'white' }}
        >
            <View style={styles.container}>
                <View style={styles.main} className="rounded-lg">
                    {ticket?.inactive && (
                        <Text className="absolute text-red-200 top-[40%] text-3xl  flex-1  font-bold -rotate-45 "></Text>
                    )}
                    <View style={styles.info} className=" pt-4  ">
                        <View style={{ width: wp(25) }} className="  h-full">
                            <Image
                                resizeMode="stretch"
                                source={{ uri: ticket?.scheduleCode?.movieCode?.image }}
                                style={{ height: hp(14), width: wp(23), borderRadius: 5 }}
                            />
                        </View>

                        <View style={{ width: wp(55) }} className=" h-full ">
                            <View className="  flex-row  h-[15%] ">
                                <Text
                                    numberOfLines={2}
                                    ellipsizeMode="tail"
                                    className="font-bold  text-base uppercase  max-w-[90%] "
                                >
                                    {ticket?.scheduleCode?.movieCode?.name}
                                </Text>

                                <View className="ml-1 border rounded border-yellow-600 items-center justify-center h-[85%]   w-[10%]">
                                    <Text className="text-[9px] text-yellow-400 font-bold">
                                        {handleChangAge(ticket?.scheduleCode?.movieCode?.ageRestriction)}
                                    </Text>
                                </View>
                            </View>
                            <Text className="text-black text-xs font-normal uppercase mb-2 ">
                                {ticket?.scheduleCode?.screeningFormatCode?.name}{' '}
                                {ticket?.scheduleCode?.audioCode?.name === 'Gốc'
                                    ? ''
                                    : ' ' + ticket?.scheduleCode?.audioCode?.name}
                                <Text className="text-xs">Phụ đề </Text>
                                {ticket?.scheduleCode?.subtitleCode?.name}
                            </Text>
                            {/* <Text className="text-black text-sm font-normal ">
                                {formatDateTicket(ticket?.scheduleCode?.startTime)}
                            </Text> */}
                            <Text className="text-black text-base font-bold ">
                                {ticket?.scheduleCode?.roomCode?.cinemaCode?.name}
                            </Text>
                            <Text className="text-black text-xs ">{address?.fullAddress}</Text>
                        </View>
                    </View>
                    {/* Detail */}

                    <View style={{ width: wp(80) }} className="  pb-5  items-center ">
                        <View className="flex-row   justify-between items-center  py-2">
                            <Text className="text-sm text-black h-full " style={{ width: wp(30) }}>
                                Phòng chiếu
                            </Text>

                            <Text
                                className="text-sm text-black h-full  flex-1 text-right font-bold"
                                style={{ width: wp(80) }}
                            >
                                {ticket?.scheduleCode?.roomCode?.name}
                            </Text>
                        </View>
                        <View className="flex-row   justify-between items-center  py-2">
                            <Text className="text-sm text-black h-full " style={{ width: wp(30) }}>
                                Suất chiếu
                            </Text>

                            <Text
                                className="text-sm text-black h-full  flex-1 text-right font-bold"
                                style={{ width: wp(80) }}
                            >
                                {formatDateTicket(ticket?.scheduleCode?.startTime)}
                            </Text>
                        </View>
                        <View className="flex-row   justify-between items-center  py-2">
                            <Text className="text-sm text-black h-full " style={{ width: wp(30) }}>
                                Số ghế ({groupedDetailsByType?.seat?.length})
                            </Text>

                            <Text
                                className="text-sm text-black h-full  flex-1 text-right font-bold"
                                style={{ width: wp(80) }}
                            >
                                {arraySeat}
                            </Text>
                        </View>
                        <View className="flex-row   justify-between items-center  py-2">
                            <Text className="text-sm text-black h-full " style={{ width: wp(30) }}>
                                Combo ({groupedDetailsByType?.food?.reduce((sum, item) => sum + item.quantity, 0)})
                            </Text>

                            <Text
                                className="text-sm text-black h-full  flex-1 text-right font-bold"
                                style={{ width: wp(20) }}
                            >
                                {arrayCombo}
                            </Text>
                        </View>
                        {ticket?.freeQuantity > 0 && (
                            <View className="flex-row   justify-between items-center  py-2">
                                <Text className="text-sm text-black h-full " style={{ width: wp(30) }}>
                                    Quà tặng ({ticket?.freeQuantity})
                                </Text>

                                <Text
                                    className="text-sm text-black h-full  flex-1 text-right font-bold"
                                    style={{ width: wp(20) }}
                                >
                                    {ticket?.freeQuantity + 'x ' + ticket?.freeProductCode?.name}
                                </Text>
                            </View>
                        )}
                        <View className="flex-row   justify-between items-center ">
                            <Text
                                className="text-sm text-black h-full "
                                style={{ width: wp(30), height: hp(5), lineHeight: hp(5) }}
                            >
                                Tổng tiền
                            </Text>

                            <Text
                                className="text-lg text-black h-full  flex-1 text-right font-bold"
                                numberOfLines={1}
                                style={{ width: wp(70), height: hp(5), lineHeight: hp(5) }}
                            >
                                {totalAmount.toLocaleString('vi-VN', {})} đ
                            </Text>
                        </View>
                        <View className="flex-row   justify-between items-center  ">
                            <Text className="text-sm text-black h-full ">Thời gian giao dịch</Text>

                            <Text className="text-sm  h-full  flex-1 text-right font-light  text-blue-500">
                                {formatDateTimeSalesInvoice(ticket?.createdAt)}
                            </Text>
                        </View>
                    </View>
                    {/*Border dashed */}
                    <View className="h-auto flex-row items-center ">
                        {/* Nửa hình tròn bên trái */}
                        <View className="absolute -left-3 w-[8%] h-4 bg-black/95 rounded-t-full overflow-hidden rotate-90" />

                        {/* Đường gạch ở giữa */}
                        <View className="flex-1 flex-row justify-center items-center">
                            {Array.from({ length: 20 }).map((_, index) => (
                                <View key={index} className="w-2 h-[2px] bg-gray-500 mx-1" />
                            ))}
                        </View>

                        {/* Nửa hình tròn bên phải */}
                        <View className="absolute -right-3 w-[8%] h-4 bg-black/95 rounded-t-full overflow-hidden -rotate-90" />
                    </View>
                    {/* Barcode */}
                    <TouchableOpacity onPress={toggleModal}>
                        <Barcode
                            value={ticket?.code}
                            width={1.1}
                            height={70}
                            format="CODE39"
                            background="transparent"
                            text={ticket?.code}
                        />
                    </TouchableOpacity>
                    <Text className="text-sm text-center text-red-400">Đưa mã này cho nhân viên để lấy vé.</Text>
                </View>
            </View>
            <Modal
                animationType="none"
                transparent={false}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <TouchableOpacity onPress={() => setModalVisible(false)} className="h-full bg-white">
                    <View className=" justify-center items-center h-full rotate-90 ">
                        {/* Nội dung modal */}

                        <Barcode
                            value={ticket?.code}
                            width={1.5}
                            height={150}
                            format="CODE39"
                            background="transparent"
                            text={ticket?.code}
                            className="rotate-90"
                        />
                    </View>
                </TouchableOpacity>
            </Modal>
        </Container>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: height * 0.7,
        alignItems: 'center',
        justifyContent: 'center',
    },

    main: {
        marginTop: hp(1),
        width: wp(90),
        backgroundColor: 'white',
        alignItems: 'center',
        paddingBottom: hp(2),
    },
    info: {
        height: height * 0.18,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'red',
    },
});

export default TicketDetail;
