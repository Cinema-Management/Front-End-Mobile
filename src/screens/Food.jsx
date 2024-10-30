import React, { useEffect, useState } from 'react';
import { FlatList, ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Container from '../components/Container';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { LinearGradient } from 'expo-linear-gradient';
import Avatar from '../components/Avatar';
import useFood from '../queries/useFood';
import { ActivityIndicator } from 'react-native-paper';

const Food = ({ route }) => {
    const { selectedSeats } = route.params || [];
    const date = '2024-10-24T17:00:00.000Z';
    const { data = [], isLoading, isSuccess } = useFood(date);
    const [quantities, setQuantities] = useState({});
    const [selectedFoods, setSelectedFoods] = useState([]);

    useEffect(() => {
        if (data.length > 0) {
            const initialQuantities = data.reduce((acc, product) => {
                acc[product.code] = 0; // Khởi tạo quantity ban đầu cho mỗi sản phẩm là 0
                return acc;
            }, {});
            setQuantities(initialQuantities);
        }
    }, [data]);

    const updateQuantity = (item, delta) => {
        setQuantities((prev) => ({
            ...prev,
            [item.code]: Math.max(0, prev[item.code] + delta),
        }));

        if (delta > 0) {
            setSelectedFoods((prev) => {
                const existingItem = prev.find((i) => i.code === item.code);
                if (existingItem) {
                    return prev.map((i) =>
                        i.code === item.code ? { ...i, quantity: quantities[item.code] + delta } : i,
                    );
                } else {
                    return [...prev, { ...item, quantity: 1 }];
                }
            });
        } else if (quantities[item.code] - 1 <= 0) {
            setSelectedFoods((prev) => prev.filter((i) => i.code !== item.code));
        }
    };

    const removeItem = (code) => {
        setSelectedFoods((prev) => prev.filter((i) => i.code !== code));
        setQuantities((prev) => ({ ...prev, [code]: 0 }));
    };

    const calculateTotal = () => {
        // Tổng tiền ghế
        const seatTotal = selectedSeats.reduce((sum, seat) => sum + seat.price, 0);

        // Tổng tiền món ăn
        const foodTotal = data.reduce((sum, product) => {
            const quantity = quantities[product.code] || 0;
            return sum + product.price * quantity;
        }, 0);

        // Tổng tất cả
        return seatTotal + foodTotal;
    };
    const FoodItem = ({ image, name, description, price, quantity, onIncrement, onDecrement, isLastItem }) => (
        <View
            style={[
                styles.content,
                isLastItem && { borderBottomLeftRadius: 10, borderBottomRightRadius: 10, borderBottomWidth: 0 },
            ]}
        >
            <View style={styles.section1}>
                <Avatar uri={image} size={hp(10)} resizeMode="cover" />
            </View>
            <View style={styles.section2}>
                <Text className="break-all" style={styles.name} numberOfLines={2}>
                    {name}
                </Text>
                <Text style={styles.description} numberOfLines={1}>
                    {description}
                </Text>
                <Text style={styles.price}>{price.toLocaleString() + ' đ'}</Text>

                {/* Add quantity controls below price */}
                <View style={styles.quantityContainer} className="">
                    <TouchableOpacity onPress={onDecrement} style={styles.quantityButton}>
                        <Text className="font-bold text-[#F49146] ">-</Text>
                    </TouchableOpacity>

                    <Text style={styles.quantityValue}>{quantity}</Text>
                    <TouchableOpacity onPress={onIncrement} style={styles.quantityButton}>
                        <Text style={styles.quantityText}>+</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );

    return (
        <Container
            back={true}
            isScroll={false}
            title="TD Sài Gòn"
            style={{ color: 'white', fontWeight: '700' }}
            styleSpan={{ color: 'white' }}
        >
            {isLoading && (
                <ActivityIndicator size="large" color="white" className="flex-1 items-center justify-center" />
            )}

            {isSuccess && (
                <View style={styles.container}>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        style={
                            selectedFoods.length > 0
                                ? [
                                      styles.listFood,
                                      {
                                          minHeight: hp(64),
                                          maxHeight: hp(64),
                                      },
                                  ]
                                : [
                                      styles.listFood,
                                      {
                                          minHeight: hp(74),
                                          maxHeight: hp(74),
                                      },
                                  ]
                        }
                        data={data}
                        keyExtractor={(item) => item.code}
                        renderItem={({ item, index }) => (
                            <FoodItem
                                name={item?.productName}
                                description={item?.descriptionProduct}
                                image={item?.image}
                                price={item?.price}
                                quantity={quantities[item?.code]}
                                onIncrement={() => updateQuantity(item, 1)}
                                onDecrement={() => updateQuantity(item, -1)}
                                isLastItem={index === data.length - 1}
                            />
                        )}
                    />

                    {selectedFoods.length > 0 && (
                        <View style={{ height: hp(10), width: wp(100), backgroundColor: 'rgba(255, 255, 255, 0.1)' }}>
                            <FlatList
                                data={selectedFoods}
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                                keyExtractor={(item) => item.code}
                                contentContainerStyle={{
                                    alignItems: 'center',
                                    marginLeft: wp(1),
                                }}
                                renderItem={({ item }) => (
                                    <View
                                        className="bg-white flex-row items-center justify-start rounded-xl px-1"
                                        style={{ maxWidth: wp(55), width: 'auto', marginRight: wp(1), height: hp(8) }}
                                    >
                                        <View style={{ width: wp(15) }} className="justify-center items-center">
                                            <Avatar uri={item.image} size={hp(6)} />
                                        </View>
                                        <View className="" style={{ width: wp(25) }}>
                                            <Text
                                                ellipsizeMode="tail "
                                                numberOfLines={2}
                                                className="max-w-[90%]  text-sm "
                                            >
                                                <Text className="font-semibold mr-1 "> {item.quantity + 'x '}</Text>
                                                {item.productName}
                                            </Text>
                                        </View>
                                        <View style={{ width: wp(5) }} className="items-center justify-center ">
                                            <TouchableOpacity
                                                onPress={() => removeItem(item.code)}
                                                className="bg-[#F49146] items-center justify-center rounded-lg"
                                                style={{ height: hp(2), width: hp(2) }}
                                            >
                                                <Text className="text-white font-bold">X</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                )}
                            />
                        </View>
                    )}

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
                                Thám tử lừng danh conan movie 7 Thám tử lừng danh conan movie
                            </Text>

                            <View className="ml-1 border rounded border-yellow-600 items-center justify-center h-[75%]   w-[7%]">
                                <Text className="text-[10px] text-yellow-400 font-bold">T16</Text>
                            </View>
                        </View>

                        <View className="  flex-row   " style={{ height: hp(6) }}>
                            <View className="  w-[70%]  flex justify-start ">
                                <Text className="text-[#8f8e8e]  " style={{ marginBottom: hp(1) }}>
                                    2D Phụ đề Việt
                                </Text>

                                <Text className="font-semibold  text-sm">{calculateTotal().toLocaleString()} đ</Text>
                            </View>

                            <View className=" w-[30%] items-center justify-center ">
                                <TouchableOpacity
                                    onPress={() => navigation.navigate('Food', { selectedSeats: selectedSeats })}
                                >
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
                </View>
            )}
        </Container>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        height: hp(90),
    },

    listFood: {
        marginTop: hp(1),
        backgroundColor: 'rgba(255, 255, 255, 0.1)',

        width: wp(100),
    },

    content: {
        width: wp(100),
        justifyContent: 'center',
        flexDirection: 'row',
        borderColor: 'rgba(255, 255, 255, 0.3)',
        borderBottomWidth: 1,
    },
    section1: {
        width: wp(30),
        alignItems: 'center',
        justifyContent: 'center',
    },
    section2: {
        paddingVertical: hp(1),
        width: wp(55),
        justifyContent: 'center',
        height: 'auto',
    },
    name: {
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold',
    },
    description: {
        color: 'white',
        fontSize: 12,
        height: hp(2),
    },
    price: {
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold',
        height: hp(3),
        flex: 1,
    },
    quantityContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: wp(30),
        height: hp(4),
    },
    quantityButton: {
        borderWidth: 1.5,
        borderColor: '#F49146',
        width: hp(3),
        height: hp(3),
        borderRadius: hp(3) / 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    quantityText: {
        color: '#F49146',
        fontSize: 14, // Tăng kích thước font chữ của dấu + và -
        fontWeight: 'bold',
    },
    quantityValue: {
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center',
        width: 30, // Đặt kích thước cho số lượng hiển thị
    },
    footer: {
        height: hp(15),
    },
});

export default Food;
