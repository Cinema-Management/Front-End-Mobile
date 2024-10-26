import React, { useState } from 'react';
import { FlatList, ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Container from '../components/Container';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { LinearGradient } from 'expo-linear-gradient';
import Avatar from '../components/Avatar';
import phim1 from '../../assets/phim1.png';

const Food = () => {
    const productList = [
        {
            id: '1',
            name: 'Combo truyền thống',
            description: '1 bắp + 2 nước ',
            price: '200.00đ',
            avatar: phim1,
        },
        {
            id: '2',
            name: 'Nước ngọt',
            description: 'Nước ngọt mát lạnh',
            price: '200.00đ',
            avatar: phim1,
        },
        {
            id: '3',
            name: 'Bỏng ngô Bỏng ngô  ',
            description: 'Bỏng ngô giòn  ',
            price: '200.00đ',
            avatar: phim1,
        },

        {
            id: '4',
            name: 'Combo truyền thống đậm vị giang sinh',
            description: '1 bắp + 2 nước + 1 milo ',
            price: '200.00đ',
            avatar: phim1,
        },
        {
            id: '5',
            name: 'Nước ngọt',
            description: 'Nước ngọt mát lạnh',
            price: '200.00đ',
            avatar: phim1,
        },
        {
            id: '6',
            name: 'Bỏng ngô Bỏng ngô  ',
            description: 'Bỏng ngô giòn  ',
            price: '200.00đ',
            avatar: phim1,
        },
    ];

    const [quantities, setQuantities] = useState(
        productList.reduce((acc, product) => {
            acc[product.id] = 0; // Initialize quantity to 0 for each product
            return acc;
        }, {}),
    );

    const updateQuantity = (id, delta) => {
        setQuantities((prev) => ({
            ...prev,
            [id]: Math.max(0, prev[id] + delta), // Prevent negative quantities
        }));
    };

    const UserItem = ({ image, name, description, price, quantity, onIncrement, onDecrement, isLastItem }) => (
        <View
            style={[
                styles.content,
                isLastItem && { borderBottomLeftRadius: 10, borderBottomRightRadius: 10, borderBottomWidth: 0 },
            ]}
        >
            <View style={styles.section1}>
                <Avatar photoUrl={image} size={hp(10)} />
            </View>
            <View style={styles.section2} className="space-y-2 py-2">
                <Text className="break-all" style={styles.name}>
                    {name}
                </Text>
                <Text style={styles.description}>{description}</Text>
                <Text style={styles.price}>{price}</Text>

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
            span="Phòng 1 17:00, 10/12/2024"
            style={{ color: 'white', fontWeight: '700' }}
            styleSpan={{ color: 'white' }}
        >
            <View style={styles.container}>
                <FlatList
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    style={styles.main}
                    data={productList}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item, index }) => (
                        <UserItem
                            name={item.name}
                            description={item.description}
                            image={item.avatar}
                            price={item.price}
                            quantity={quantities[item.id]}
                            onIncrement={() => updateQuantity(item.id, 1)}
                            onDecrement={() => updateQuantity(item.id, -1)}
                            isLastItem={index === productList.length - 1}
                        />
                    )}
                />
                <View style={styles.footer}>
                    <TouchableOpacity className=" px-3">
                        <LinearGradient
                            colors={['#ED999A', '#F6D365']}
                            style={{ borderRadius: 10, padding: 15 }}
                            start={{ x: 0.4, y: 0.1 }}
                            end={{ x: 0.9, y: 0.2 }}
                        >
                            <Text style={{ textAlign: 'center', fontSize: 18, fontWeight: 'bold', color: 'black' }}>
                                Xóa tài khoản
                            </Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </View>
        </Container>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },

    main: {
        minHeight: hp(70),
        maxHeight: hp(70),
        height: 'auto',
        width: wp(90),
        borderRadius: 10,
    },

    content: {
        width: wp(90),
        flexDirection: 'row',
        borderColor: 'rgba(255, 255, 255, 0.3)',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderBottomWidth: 1,
    },
    section1: {
        width: wp(30),
        alignItems: 'center',
        justifyContent: 'center',
    },
    section2: {
        width: wp(55),
        justifyContent: 'center',
        height: 'auto',
    },
    name: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    description: {
        color: 'white',
        fontSize: 14,
    },
    price: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        height: hp(3),
        flexDirection: 'column',
        alignItems: 'center',
    },
    quantityContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',

        alignItems: 'center',
        width: wp(30),
        height: hp(4),
    },
    quantityButton: {
        borderWidth: 2,
        borderColor: '#F49146',
        width: hp(3),
        height: hp(3),
        borderRadius: hp(3) / 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    quantityText: {
        color: '#F49146',
        fontSize: 16, // Tăng kích thước font chữ của dấu + và -
        fontWeight: 'bold',
    },
    quantityValue: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        width: 30, // Đặt kích thước cho số lượng hiển thị
    },
    footer: {
        height: hp(15),
        width: wp(100),
        justifyContent: 'center',
    },
});

export default Food;
