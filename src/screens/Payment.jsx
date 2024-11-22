import React, { memo, useCallback, useContext, useEffect, useMemo, useState } from 'react';
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
    Modal,
    ActivityIndicator,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Container from '../components/Container';
import { colors } from '../constants/colors';

import ButtonPrimary from '../components/ButtonPrimary';
import axios from 'axios';
import { API_URL } from '@env';
import { handleChangAge, formatDateTicket } from '../utils/Date';
import { useMutation, useQueryClient } from 'react-query';
var { height, width } = Dimensions.get('window');
import { TimerContext } from '../utils/TimerContext'; // Đường dẫn tới TimerContext
import { formatTimer } from '../utils/Date';
import { useFocusEffect } from '@react-navigation/native';
import usePromotionDetail from '../queries/usePromotionDetail';
import { useSelector } from 'react-redux';
export default function Payment({ navigation, route }) {
    const { selectedSeats, selectedFoods, showtime, totalAmount, products } = route.params;
    const [loading, setLoading] = useState(false);
    const [selectedOption, setSelectedOption] = useState('zalopay');
    const { seconds, setReturnCode, stopTimer } = useContext(TimerContext);
    const [open, setOpen] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const { data = [], isLoading, isSuccess, refetch } = usePromotionDetail(showtime?.date);
    const [selectedPromotionDetail, setSelectedPromotionDetail] = useState(null); // State để quản lý promotion đã chọn
    const currentUser = useSelector((state) => state?.auth.login?.currentUser);
    const handleOpenModal = () => {
        setModalVisible(true);
    };

    const isPromotionApplicable = (promotion) => {
        if (promotion.type === 0) {
            return selectedFoods.some(
                (food) => promotion.salesProductCode === food.productCode && promotion.minQuantity <= food.quantity,
            );
        }

        if (promotion.type === 1 || promotion.type === 2) {
            return promotion.minPurchaseAmount <= totalAmount;
        }

        // Trả về false nếu không khớp loại khuyến mãi nào
        return false;
    };
    const calculateDiscount = (promotion, totalPriceMain) => {
        let discountAmount = 0;

        switch (promotion.type) {
            case 1: // Type 1: Giảm giá cố định
                if (totalPriceMain >= promotion.minPurchaseAmount) {
                    discountAmount = promotion.discountAmount;
                }
                break;

            case 2: // Type 2: Giảm giá phần trăm
                if (totalPriceMain >= promotion.minPurchaseAmount) {
                    discountAmount = (totalPriceMain * promotion.discountPercentage) / 100;
                    if (promotion.maxDiscountAmount) {
                        discountAmount = Math.min(discountAmount, promotion.maxDiscountAmount);
                    }
                }
                break;

            default:
                discountAmount = 0;
        }

        return discountAmount;
    };
    const calculateTotalWithPromotion = (
        totalPriceMain,
        selectedPromotion,
        groupedCombos,
        promotionDetails,
        availableProducts,
    ) => {
        let discountAmount = 0;
        let freeProductAdd = ''; // Lưu sản phẩm để xuất hóa đơn
        let freeProductTitle = '';

        // Tìm khuyến mãi dựa trên mã đã chọn
        const promotion = promotionDetails.find((promo) => promo.code === selectedPromotion);

        if (promotion) {
            switch (promotion.type) {
                case 0: // Type 0: Khuyến mãi tặng sản phẩm miễn phí
                    // Tìm sản phẩm mà người dùng đã mua đủ số lượng
                    const applicableCombo = groupedCombos.find(
                        (combo) => promotion.salesProductCode === combo.productCode,
                    );

                    if (applicableCombo && applicableCombo.quantity >= promotion.minQuantity) {
                        // Tìm sản phẩm tặng
                        const freeProduct = availableProducts.find(
                            (product) => product.productCode === promotion.freeProductCode,
                        );
                        freeProductTitle = 'Tặng ' + promotion.freeQuantity + ' ' + freeProduct.productName;

                        if (freeProduct) {
                            // Lưu giá gốc của sản phẩm tặng
                            const freeProductOriginalPrice = freeProduct.price;

                            // Ghi chú lại sản phẩm tặng với giá 0 đồng, và lưu giá gốc
                            freeProductAdd = {
                                originalPrice: freeProductOriginalPrice, // Giá trị gốc của sản phẩm tặng
                                freeProductCode: promotion.freeProductCode, // Mã sản phẩm tặng
                                productName: freeProduct.productName, // Tên sản phẩm tặng
                                freeQuantity: promotion.freeQuantity, // Số lượng sản phẩm tặng
                                price: 0, // Gán giá trị sản phẩm tặng bằng 0
                                isGift: true, // Đánh dấu sản phẩm là quà tặng
                            };
                        }
                    }
                    break;

                case 1: // Type 1: Giảm giá cố định
                    if (totalPriceMain >= promotion.minPurchaseAmount) {
                        discountAmount = promotion.discountAmount; // Giảm giá cố định
                    }
                    break;

                case 2: // Type 2: Giảm giá theo phần trăm
                    if (totalPriceMain >= promotion.minPurchaseAmount) {
                        discountAmount = (totalPriceMain * promotion.discountPercentage) / 100; // Tính giảm giá theo phần trăm

                        // Đảm bảo giảm giá không vượt quá giới hạn giảm giá tối đa
                        if (promotion.maxDiscountAmount) {
                            discountAmount = Math.min(discountAmount, promotion.maxDiscountAmount);
                        }
                    }
                    break;

                default:
                    discountAmount = 0; // Không có khuyến mãi
            }
        }

        // Tính tổng giá sau khi áp dụng giảm giá (không tính sản phẩm tặng)
        const newTotalPrice = Math.max(totalPriceMain - discountAmount, 0);

        return { newTotalPrice, freeProductAdd, freeProductTitle }; // Trả về tổng tiền và sản phẩm đã thêm giá trị gốc
    };
    useEffect(() => {
        if (data && data.length > 0) {
            // Hàm tính giá trị khuyến mãi
            const calculatePromotionValue = (promotion) => {
                if (promotion.type === 0) {
                    // Loại tặng sản phẩm miễn phí
                    const freeProduct = products.find((product) => product.productCode === promotion.freeProductCode);
                    return freeProduct ? freeProduct.price * promotion.freeQuantity : 0;
                } else if (promotion.type === 1 || promotion.type === 2) {
                    // Loại giảm giá
                    return promotion.discountAmount || 0;
                }
                return 0;
            };

            // Tìm khuyến mãi có lợi nhất
            const bestPromotion = data.reduce((best, current) => {
                // Kiểm tra nếu khuyến mãi áp dụng được
                const isApplicable = isPromotionApplicable(current, totalAmount, selectedFoods);

                if (!isApplicable) return best;

                // Tính giá trị khuyến mãi
                const currentValue = calculatePromotionValue(current);
                const bestValue = best ? calculatePromotionValue(best) : 0;

                return currentValue > bestValue ? current : best;
            }, null);

            // Đặt mã khuyến mãi nếu tìm thấy
            if (bestPromotion) {
                setSelectedPromotionDetail(bestPromotion.code);
            }
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data, totalAmount, selectedFoods, products]);

    const queryClient = useQueryClient();
    useFocusEffect(
        useCallback(() => {
            setLoading(true);
            setTimeout(() => {
                setLoading(false);
            }, 1000);
        }, [selectedFoods, selectedSeats]),
    );
    useEffect(() => {
        if (seconds < 1) {
            setModalVisible(false);
            setOpen(false);
        }
    }, [seconds]);

    const handlePress = (option) => {
        setSelectedOption(option);
    };

    const arraySeat = selectedSeats?.map((item) => ({
        productCode: item.code,
        priceDetailCode: item.priceDetailCode,
        quantity: 1,
    }));

    const arrayFood = selectedFoods?.map((item) => ({
        productCode: item.productCode,
        priceDetailCode: item.code,
        quantity: item.quantity,
    }));
    const salesInvoiceDetails = [...(arraySeat || []), ...(arrayFood || [])];
    const handleCheckStatusSeat = async () => {
        try {
            const arrayCode = selectedSeats.map((t) => t.code);

            const seatCheck = {
                scheduleCode: showtime?.code,
                arrayCode: arrayCode,
            };

            const responseCheck = await axios.post(
                API_URL + '/api/seat-status-in-schedules/checkSelectedSeatsStatus',
                seatCheck,
            );

            if (responseCheck.data.available === true) {
                return false;
            } else {
                return true;
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    const handlePayment = async () => {
        try {
            if (!(await handleCheckStatusSeat())) {
                stopTimer();
                Alert.alert('Ghế đã được đặt, vui lòng chọn ghế khác');
                navigation.navigate('Seat', { showtime: { ...showtime, check: true } });
                return;
            }
            // if (seconds < 300) {
            //     Alert.alert('Thời gian thanh toán ', ' tối thiểu 5 phút');

            //     return;
            // }

            const arrayCode = selectedSeats.map((t) => t.code);

            setLoading(true);

            // Gửi yêu cầu đến API thanh toán
            const response = await axios.post(API_URL + '/api/app/payment', {
                scheduleCode: showtime?.code,
                arrayCode: arrayCode,
                expire_duration_seconds: seconds,
                amount: newTotalPrice,
            });

            if (response.data && response.data.order_url) {
                // Mở ZaloPay với URL trả về
                const url = response.data.order_url;
                // Sử dụng Linking để mở URL
                setLoading(false);

                Linking.openURL(url);
            } else {
                setLoading(false);

                Alert.alert('Lỗi', 'Hệ thống thanh toán!');
            }
        } catch (error) {
            setLoading(false);

            Alert.alert('Lỗi', 'Hệ thống thanh toán!');
        }
    };
    const newTotalPrice = useMemo(() => {
        return calculateTotalWithPromotion(totalAmount, selectedPromotionDetail, selectedFoods, data, products)
            .newTotalPrice;
    }, [totalAmount, selectedPromotionDetail, selectedFoods, data, products]);

    const freeProductDetails = useMemo(() => {
        const { freeProductAdd } = calculateTotalWithPromotion(
            totalAmount,
            selectedPromotionDetail,
            selectedFoods,
            data,
            products,
        );
        // Chỉ lấy các thông tin cần thiết để lưu
        return freeProductAdd;
    }, [totalAmount, selectedPromotionDetail, selectedFoods, data, products]);

    const handleAddSalesInvoice = async () => {
        try {
            setLoading(true);
            const salesInvoice = {
                staffCode: '',
                customerCode: currentUser?.code,
                scheduleCode: showtime?.code,
                paymentMethod: 1,
                type: 0,
                salesInvoiceDetails: salesInvoiceDetails,
            };
            const response = await axios.post(API_URL + '/api/sales-invoices/addWithDetail', salesInvoice);
            if (selectedPromotionDetail) {
                const promotionResult = {
                    salesInvoiceCode: response.data.code,
                    promotionDetailCode: selectedPromotionDetail,
                    freeProductCode: freeProductDetails?.freeProductCode,
                    freeQuantity: freeProductDetails?.freeQuantity,
                    discountAmount: totalAmount - newTotalPrice,
                };
                const t = await axios.post(API_URL + '/api/promotion-results', promotionResult);
            }

            if (response.data) {
                const arrayCode = selectedSeats.map((t) => t.code);

                const seat = {
                    scheduleCode: showtime?.code,
                    arrayCode: arrayCode,
                    status: 3,
                };

                const result = await axios.put(API_URL + '/api/seat-status-in-schedules', seat);
                if (result.data) {
                    setLoading(false);
                    stopTimer();
                    Alert.alert(
                        'Thông báo',
                        'Đặt vé thành công',
                        [{ text: 'Đóng', onPress: () => console.log('OK Pressed') }],
                        {
                            cancelable: false,
                        },
                    );

                    navigation.navigate('TicketDetail', {
                        ticket: {
                            ...response.data,
                            freeQuantity: freeProductDetails?.freeQuantity || '',
                            freeProductCode: {
                                name: freeProductDetails?.productName || '',
                            },
                            discountAmount: totalAmount - newTotalPrice,
                            resetTab: true,
                        },
                    });
                }
            }
        } catch (error) {
            Alert.alert('Thông báo', 'Lỗi khi thanh toán');
        }
    };

    const mutationPay = useMutation(handleAddSalesInvoice, {
        onSuccess: () => {
            queryClient.refetchQueries('TicketByCustomerCode');
            queryClient.refetchQueries('seatStatus');

            queryClient.refetchQueries('spendingForCurrentYear');
        },
    });

    useEffect(() => {
        const handleOpenURL = async (event) => {
            try {
                const data = event.url; // Lấy URL từ sự kiện

                // Phân tích URL để lấy mã trả về
                const urlParams = new URLSearchParams(data.split('?')[1]);
                const apptransid = urlParams.get('apptransid');

                if (apptransid) {
                    setReturnCode(1);

                    const response = await axios.post(API_URL + '/api/app/order-status/' + apptransid);
                    // Thêm các thông tin cần thiết như appID, checksum nếu cần
                    setReturnCode(response.data?.return_code);
                    if (response.data?.return_code === 1) {
                        mutationPay.mutate();
                    } else {
                        Alert.alert('Giao dịch đã bị hủy!');
                        navigation.navigate('Seat', { showtime: { ...showtime, check: true } });
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
                    {item.quantity}x {item.productName}
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
    // const handleSelectedPromotionDetail = (code) => {
    //     setSelectedPromotionDetail(code);
    // };
    const [sortedData, setSortedData] = useState([]);

    useEffect(() => {
        if (!modalVisible) {
            setLoading(true);

            const applicableFlags = data.map((promotion) => ({
                ...promotion,
                isApplicable: isPromotionApplicable(promotion),
            }));

            const newSortedData = applicableFlags.sort((a, b) => {
                if (a.code === selectedPromotionDetail) return -1; // Mục được chọn sẽ lên đầu
                if (b.code === selectedPromotionDetail) return 1;
                if (b.isApplicable && !a.isApplicable) return 1; // b có thể áp dụng -> lên trên a
                if (!b.isApplicable && a.isApplicable) return -1; // a có thể áp dụng -> lên trên b
                return 0; // Giữ nguyên thứ tự nếu cả hai đều không áp dụng hoặc đều áp dụng
            });
            setTimeout(() => {
                setLoading(false);
            }, 200);

            if (!modalVisible && JSON.stringify(newSortedData) !== JSON.stringify(sortedData)) {
                setSortedData(newSortedData);
            }
        }
    }, [modalVisible, data, selectedPromotionDetail]);
    const PromotionDetailItem = memo(({ item }) => {
        const handlePress = () => {
            if (item?.isApplicable) {
                if (selectedPromotionDetail === item.code) {
                    setSelectedPromotionDetail(null); // Hoặc giá trị không hợp lệ
                } else {
                    // Nếu chưa chọn thì chọn
                    setSelectedPromotionDetail(item.code);
                }
            }
        };

        return (
            <TouchableOpacity onPress={handlePress} disabled={!item?.isApplicable}>
                <View
                    className={`flex-row my-2 border-0.5 border-l-0 border-gray-300   ${
                        item.isApplicable ? '' : ' opacity-50'
                    }`}
                >
                    <View className="w-[25%]  ">
                        <Image
                            source={{ uri: 'https://td-cinemas.s3.ap-southeast-1.amazonaws.com/1731855236786.png' }}
                            style={{ width: 'auto', height: hp(10) }}
                            resizeMode="stretch"
                        />
                    </View>
                    <View className="flex-1  pl-2 my-1">
                        {/* <Text>{item.code}</Text> */}
                        {item.type === 0 && (
                            <View className="flex-col flex-1 my-2">
                                <View className="flex-row flex-1  ">
                                    <Text className="w-[40%]  font-semibold text-sm">Tặng {item.freeQuantity}</Text>
                                    <Text className="flex-1  font-semibold text-sm">{item.nameProductFree}</Text>
                                </View>
                                <View className="flex-row flex-1">
                                    <Text className="w-[40%]  text-xs">Khi mua {item.minQuantity}</Text>
                                    <Text className="flex-1  text-xs">{item.nameProductSales}</Text>
                                </View>
                            </View>
                        )}

                        {item.type === 1 && (
                            <View className="flex-col flex-1 my-3">
                                <Text className="flex-1  font-semibold text-sm">
                                    Giảm {item.discountAmount.toLocaleString() + ' đ'}
                                </Text>
                                <Text className="flex-1  text-xs">
                                    Đơn tối thiểu {item.minPurchaseAmount.toLocaleString() + ' đ'}
                                </Text>
                            </View>
                        )}
                        {item.type === 2 && (
                            <View className="flex-col flex-1 my-2">
                                <Text className="flex-1  font-semibold text-sm">
                                    Giảm {item.discountPercentage}% Giảm tối đa
                                </Text>
                                <Text className="flex-1  text-sm font-semibold">
                                    {item.maxDiscountAmount.toLocaleString() + ' đ'}
                                </Text>
                                <Text className="flex-1  text-xs">
                                    Đơn tối thiểu {item.minPurchaseAmount.toLocaleString() + ' đ'}
                                </Text>
                            </View>
                        )}
                    </View>
                    <View className=" w-[10%] items-center justify-center bg-white">
                        <View
                            className={`w-6 h-6   rounded-full flex items-center justify-center transition ${
                                selectedPromotionDetail === item.code ? 'bg-orange-500 ' : 'border-gray-300 border'
                            }`}
                        >
                            {selectedPromotionDetail === item.code && <Icon name="check" size={10} color="white" />}
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    });

    return (
        <Container
            targetRoute="Film"
            showtimeValue={showtime}
            selectedSeatValue={selectedSeats}
            openModalPayment={open}
            isScroll={false}
            title="Thanh toán"
            back={true}
            style={{ color: 'white', fontWeight: 700 }}
        >
            {(loading || isLoading) && (
                <ActivityIndicator size="large" color="white" className="flex-1 items-center justify-center" />
            )}
            {!loading && isSuccess && (
                <View className=" flex-1">
                    <View className="bg-orange-400  absolute w-full justify-center items-center top-0 z-50 ">
                        {/* <Timer
                            isActive={true}
                            selectedSeats={selectedSeats}
                            showtime={showtime}
                            initialSeconds={initialSeconds}
                            classNameTimer="text-white text-sm "
                        /> */}
                        <Text className="text-white text-sm ">
                            Thời gian giữ ghế: <Text className="font-bold">{formatTimer(seconds)}</Text>
                        </Text>
                    </View>
                    <View className="">
                        <View style={styles.info}>
                            <View style={{ width: wp(25) }} className=" items-center  h-full mt-2">
                                <Image
                                    resizeMode="contain"
                                    source={{ uri: showtime?.image }}
                                    style={{ height: hp(14), width: wp(20) }}
                                />
                            </View>

                            <View style={{ width: wp(70) }} className=" h-full  ">
                                <View className="  flex-row  h-[15%] mt-1 ">
                                    <Text
                                        numberOfLines={1}
                                        ellipsizeMode="tail"
                                        className="font-semibold text-base uppercase  max-w-[90%] text-white "
                                    >
                                        {showtime?.movie}
                                    </Text>

                                    <View className="ml-1 border rounded border-yellow-600 items-center justify-center h-[85%]   w-[10%]">
                                        <Text className="text-[9px] text-yellow-400 font-bold">
                                            {handleChangAge(showtime?.ageRestriction)}
                                        </Text>
                                    </View>
                                </View>
                                <Text className="text-white text-sm font-normal uppercase mb-2 ">
                                    {showtime?.screeningFormat} {showtime?.audio === 'Gốc' ? '' : ' ' + showtime?.audio}
                                    <Text className="text-[15px]"> Phụ đề </Text>
                                    {showtime?.subtitle}
                                </Text>
                                <Text className="text-white text-sm font-normal ">
                                    {formatDateTicket(showtime?.startTime)}
                                </Text>
                                <Text className="text-white text-sm font-bold ">{showtime?.cinema}</Text>
                                <Text className="text-white text-sm font-bold ">{showtime?.room}</Text>
                            </View>
                        </View>
                    </View>
                    <ScrollView style={{ flex: 1, height: hp(50) }} showsVerticalScrollIndicator={false}>
                        <View style={{ flex: 1, marginTop: 25 }}>
                            <View>
                                <Text className="text-white text-lg px-4 font-bold mb-4">Thông tin vé:</Text>
                                <View style={{ backgroundColor: colors.backgroundColor }}>
                                    <View className="flex-row px-4  justify-between items-center border-b border-[#8e8d8d]">
                                        <Text
                                            className="text-base text-white h-full "
                                            style={{ width: wp(30), height: hp(5), lineHeight: hp(5) }}
                                        >
                                            {selectedSeats.length + 'x ghế'}
                                        </Text>

                                        <Text
                                            className="text-base text-white h-full  flex-1 text-right"
                                            numberOfLines={1}
                                            style={{ width: wp(70), height: hp(5), lineHeight: hp(5) }}
                                        >
                                            {selectedSeats.map((seat) => seat.seatNumber).join(', ')}
                                        </Text>
                                    </View>
                                    <View className="flex-row px-4   justify-between items-center ">
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
                                            {selectedSeats.reduce((sum, seat) => sum + seat.price, 0).toLocaleString()}{' '}
                                            đ
                                        </Text>
                                    </View>
                                </View>
                            </View>
                            {selectedFoods.length > 0 && (
                                <View style={{ marginTop: 40 }}>
                                    <Text className="text-white text-lg px-4 font-bold mb-4">Thông tin combo:</Text>
                                    <View style={{ backgroundColor: colors.backgroundColor }}>
                                        <FlatList
                                            scrollEnabled={false}
                                            data={selectedFoods}
                                            keyExtractor={(item) => item.code}
                                            renderItem={({ item }) => <FoodItem item={item} />}
                                        />
                                        <View className="flex-row px-4   justify-between items-center ">
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
                                                {selectedFoods
                                                    .reduce((sum, food) => sum + food.price * food.quantity, 0)
                                                    .toLocaleString()}{' '}
                                                đ
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                            )}
                            {/* Khuyến mãi */}
                            <View style={{ marginTop: 40 }}>
                                <Text className="text-white text-lg px-4 font-bold d mb-4">Khuyến mãi:</Text>
                                <TouchableOpacity onPress={handleOpenModal}>
                                    <View style={{ backgroundColor: colors.backgroundColor }}>
                                        <View className="flex-row px-4  justify-between items-center border-b ">
                                            <Text
                                                className="text-base text-white h-full   "
                                                style={{ width: wp(30), height: hp(5), lineHeight: hp(5) }}
                                            >
                                                Mã khuyến mãi
                                            </Text>

                                            <Text
                                                className="text-sm  text-orange-500 h-full flex-1  text-right"
                                                numberOfLines={1}
                                                style={{ width: wp(50), height: hp(5), lineHeight: hp(5) }}
                                            >
                                                {newTotalPrice - totalAmount < 0 ? (
                                                    (newTotalPrice - totalAmount).toLocaleString() + ' đ'
                                                ) : freeProductDetails?.freeQuantity > 0 ? (
                                                    'Tặng ' +
                                                    freeProductDetails?.freeQuantity +
                                                    ' ' +
                                                    freeProductDetails?.productName
                                                ) : (
                                                    <Icon name="angle-right" size={30} color="#ffff" />
                                                )}
                                            </Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            {/* modal khuyến mãi */}
                            <Modal
                                animationType="none"
                                transparent={true}
                                visible={modalVisible}
                                onRequestClose={() => setModalVisible(false)}
                            >
                                <View className="flex-1 justify-end items-center bg-black/30">
                                    <View className="bg-white rounded-lg" style={{ height: hp(90), width: wp(100) }}>
                                        <View
                                            style={{ height: 50, width: wp(100) }}
                                            className="flex-row justify-between items-center px-4"
                                        >
                                            <TouchableOpacity
                                                onPress={() => {
                                                    setModalVisible(false);
                                                    setSelectedPromotionDetail(null);
                                                }}
                                            >
                                                <Text className="text-3xl text-pink-800 font-bold">✕</Text>
                                            </TouchableOpacity>

                                            <Text className="text-base capitalize font-semibold">
                                                Chọn mã khuyến mãi
                                            </Text>
                                            <View style={{ width: 24 }} />
                                        </View>

                                        <View className="flex-row justify-between items-center ">
                                            <FlatList
                                                data={sortedData}
                                                contentContainerStyle={{
                                                    paddingHorizontal: 10,
                                                }}
                                                className="flex-1"
                                                style={{ width: wp(100), minHeight: hp(75), maxHeight: hp(75) }}
                                                keyExtractor={(item) => item.code}
                                                renderItem={({ item }) => <PromotionDetailItem item={item} />}
                                            />
                                        </View>

                                        {/* Thêm lớp đổ bóng cho phần dưới */}
                                        <View className="flex-1 ">
                                            <ButtonPrimary title="Đồng ý" onPress={() => setModalVisible(false)} />
                                        </View>
                                    </View>
                                </View>
                            </Modal>

                            {/* Tổng kết */}
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
                                            {totalAmount.toLocaleString()} đ
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
                                            {(newTotalPrice - totalAmount).toLocaleString()} đ
                                        </Text>
                                    </View>
                                    <View className="flex-row px-4  justify-between items-center ">
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
                                            {newTotalPrice.toLocaleString()} đ
                                        </Text>
                                    </View>
                                </View>
                            </View>

                            <View style={{ marginTop: 40 }}>
                                <Text className="text-white text-lg px-4 font-bold mb-4">Thanh toán</Text>
                                <View style={{ backgroundColor: colors.backgroundColor }}>
                                    {/* <TouchableOpacity onPress={() => handlePress('momo')}>
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
                                    </TouchableOpacity> */}
                                    <TouchableOpacity onPress={() => handlePress('zalopay')}>
                                        <View className="flex-row px-4  items-center">
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
                                        {selectedOption === 'zalopay' && (
                                            <MaterialIcons
                                                name="check"
                                                size={24}
                                                color="#F68C66"
                                                style={{ position: 'absolute', right: 10, top: 10 }}
                                            />
                                        )}
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.footer} className="pb-5 items-start justify-start">
                                    <ButtonPrimary title="Thanh toán" onPress={handlePayment} />
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                </View>
            )}
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
        width: wp(100),
        height: height * 0.1,
    },
});
