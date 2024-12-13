import React, { useCallback, useState } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, ActivityIndicator, Modal } from 'react-native';
import phim1 from '../../assets/phim1.png';
import { AntDesign, FontAwesome6, Fontisto, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { Button, List, ProgressBar } from 'react-native-paper';
import { TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Container from '../components/Container';
import Avatar from '../components/Avatar';
import { colors } from '../constants/colors';
import ButtonComponent from '../components/ButtonComponent';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { logOutSuccess, removeAuth } from '../redux/authSlice';
import { logOut } from '../redux/apiRequest';
import { createAxios } from '../createInstance';
import { useFocusEffect } from '@react-navigation/native';
import useSpendingForCurrentYear from '../queries/useSpendingForCurrentYear';
const TaiKhoan = ({ navigation }) => {
    const dispatch = useDispatch();
    const maxValue = 5000000;
    const user = useSelector((state) => state.auth.login?.currentUser);
    const axiosJWT = createAxios(user, dispatch, logOutSuccess);
    const [currentExpense, setCurrentExpense] = useState(2000000);
    const progress = Math.min(currentExpense / maxValue, 1);
    const [expandedAccordions, setExpandedAccordions] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);

    const currentUser = useSelector((state) => state.auth.login.currentUser);
    const { data, isLoading, refetch, isRefetching } = useSpendingForCurrentYear(currentUser?.code);
    const [loading, setLoading] = useState(false);
    useFocusEffect(
        useCallback(() => {
            setLoading(true);
            setTimeout(() => {
                setLoading(false);
            }, 500);
        }, []),
    );
    const handleLogout = () => {
        logOut(dispatch, user.accessToken, axiosJWT);
        setModalVisible(false);
    };
    const handleRefresh = async () => {
        refetch();
    };
    return (
        <Container
            isScroll={false}
            title="Tài khoản"
            style={{ color: 'white', fontWeight: 700 }}
            onRefresh={handleRefresh}
        >
            {isRefetching && (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="white" />
                </View>
            )}
            {loading || isLoading ? (
                <ActivityIndicator size="large" color="white" className="flex-1 items-center justify-center" />
            ) : (
                <View style={styles.main}>
                    <ScrollView
                        style={{ flex: 1 }}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ flexGrow: 1, paddingBottom: hp(10) }}
                    >
                        <View className="flex-row py-1 px-3" style={{ backgroundColor: colors.backgroundColor }}>
                            <Avatar photoUrl={{ uri: currentUser.avatar }} size={70} bordered={true} />

                            <View className=" justify-center ml-2 flex-1 ">
                                <View className=" flex-row">
                                    {data?.totalAmount > 4000000 ? (
                                        <MaterialIcons name="workspace-premium" size={30} color="orange" />
                                    ) : data?.totalAmount > 2000000 ? (
                                        <MaterialIcons name="local-police" size={23} color="orange" />
                                    ) : (
                                        <MaterialIcons name="star" size={20} color="orange" />
                                    )}

                                    <Text className="text-white text-base font-normal ml-2  w-[85%]">
                                        {currentUser.name}
                                    </Text>
                                </View>
                                {/* <View className=" flex-row mt-2">
                                    <AntDesign name="gift" size={20} color="orange" />
                                    <Text className="text-white text-base font-normal ml-2">0 Start</Text>
                                </View> */}
                            </View>
                        </View>
                        <View
                            className="mt-2 py-3 justify-center items-center  flex-row px-3"
                            style={{ backgroundColor: colors.backgroundColor }}
                        >
                            <TouchableOpacity
                                className=" h-full justify-center items-center flex-row"
                                style={{ width: wp(40) }}
                                onPress={() => navigation.navigate('UpdateInfo')}
                            >
                                <FontAwesome6 name="edit" size={24} color="orange" />
                                <Text className="text-gray-200 text-base font-normal ml-1">Thông tin tài khoản</Text>
                            </TouchableOpacity>
                        </View>
                        <View
                            className="mt-2 py-3 justify-center items-center h-auto px-2"
                            style={{ backgroundColor: colors.backgroundColor }}
                        >
                            <View className="flex-row w-full py-1 items-center justify-between h-auto px-2">
                                <View className="flex-row justify-center items-center">
                                    <Text className="text-white text-base font-normal">
                                        Tổng chi tiêu {new Date().getFullYear()}
                                    </Text>
                                    <MaterialIcons name="lock" size={15} color="orange" />
                                </View>
                                <Text className="text-white text-lg font-normal">
                                    {data?.totalAmount.toLocaleString() + ' đ'}
                                </Text>
                            </View>

                            <View className="mt-12  w-[95%] justify-between">
                                {/* Thanh tiến trình */}
                                <View className="my-3 w-full flex-row bg-black/5 justify-between border-orange-400 border rounded-xl">
                                    {/* Các vòng tròn trắng */}

                                    <View
                                        className="bg-orange-400"
                                        style={{
                                            height: '100%',
                                            width: `${(data?.totalAmount / 4000000) * 92}%`, // Tính tỷ lệ phần trăm
                                            maxWidth: '100%',

                                            borderRadius: 5,
                                            position: 'absolute',
                                        }}
                                    />

                                    {/* <MaterialIcons name="local-police" size={20} color="orange" />
                                    <FontAwesome6 name="medal" size={20} color="orange" /> */}
                                    <View className="w-[48%]  ">
                                        <View className="w-3 h-3 rounded-[9px] bg-white border-orange-400 border-[1px] z-50" />
                                        <View className=" absolute -top-7 -left-1">
                                            <MaterialIcons name="star" size={20} color="orange" />
                                        </View>
                                    </View>

                                    <View className="w-[42%] ">
                                        <View className="w-3 h-3 rounded-[9px] bg-white border-orange-400 border-[1px] z-50" />
                                        <View className=" absolute -top-8 -left-1">
                                            <MaterialIcons name="local-police" size={23} color="orange" />
                                        </View>
                                    </View>
                                    <View className="w-[15%]  ">
                                        <View className="w-3 h-3 rounded-[9px] bg-white border-orange-400 border-[1px] z-50" />
                                        <View className=" absolute -top-10 -left-2">
                                            <MaterialIcons name="workspace-premium" size={30} color="orange" />
                                        </View>
                                    </View>
                                </View>

                                {/* Cập nhật tỷ lệ chi tiêu */}
                                <View
                                    style={{
                                        width: '100%',
                                        flexDirection: 'row',
                                    }}
                                >
                                    <Text className="text-white text-sm w-[38%]">0 đ</Text>
                                    <Text className="text-white text-sm w-[40%]">2.000.000 đ</Text>
                                    <Text className="text-white text-sm ">4.000.000 đ</Text>
                                </View>
                            </View>
                        </View>

                        <View style={{ marginTop: 8, backgroundColor: colors.backgroundColor }}>
                            <View className=" pb-2 h-auto ">
                                <TouchableOpacity onPress={() => navigation.navigate('SupportContact')}>
                                    <View className="mt-2 py-5  border-b border-white justify-between flex-row px-3">
                                        <View className="flex-row">
                                            <MaterialCommunityIcons name="chat-alert-outline" size={24} color="white" />
                                            <Text className="text-white text-base font-normal ml-2">
                                                Liên hệ hỗ trợ
                                            </Text>
                                        </View>
                                        <MaterialIcons name="navigate-next" size={24} color="white" />
                                    </View>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => navigation.navigate('TermsOfUse')}>
                                    <View className="py-5  border-b border-white justify-between flex-row px-3">
                                        <View className="flex-row">
                                            <MaterialIcons name="menu-book" size={24} color="white" />
                                            <Text className="text-white text-base font-normal ml-2">
                                                Điều khoản sử dụng
                                            </Text>
                                        </View>
                                        <MaterialIcons name="navigate-next" size={24} color="white" />
                                    </View>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => navigation.navigate('PrivacyPolicy')}>
                                    <View className="py-5  border-b border-white  justify-between flex-row px-3">
                                        <View className="flex-row">
                                            <MaterialIcons name="security" size={24} color="white" />
                                            <Text className="text-white text-base font-normal ml-2">
                                                Chính sách bảo mật
                                            </Text>
                                        </View>
                                        <MaterialIcons name="navigate-next" size={24} color="white" />
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View className=" mt-6 mb-6 flex-row justify-between w-full items-center">
                            <View className="px-4 py-2justify-between w-full items-center">
                                <TouchableOpacity onPress={() => setModalVisible(true)}>
                                    <Text className="text-white text-base font-bold">Đăng xuất</Text>
                                </TouchableOpacity>
                            </View>
                            <Modal
                                transparent={true}
                                visible={modalVisible}
                                onRequestClose={() => setModalVisible(false)}
                            >
                                <View className=" justify-center items-center bg-black/30  flex-1 ">
                                    {/* Nội dung modal */}
                                    <View className="bg-white  rounded-lg " style={{ height: hp(15), width: wp(60) }}>
                                        <View
                                            style={{ height: hp(10), width: wp(60) }}
                                            className="justify-center items-center border-b-[0.5px] border-gray-300"
                                        >
                                            <Text className="text-sm font-bold">Đăng xuất</Text>
                                            <Text className="text-sm">Bạn có muốn đăng xuất?</Text>
                                        </View>
                                        <View className="flex-row items-center justify-center  h-[50%] flex-1 rounded-b-lg">
                                            <TouchableOpacity
                                                onPress={() => setModalVisible(false)}
                                                className="justify-center items-center bg-white  flex-1 h-[100%] border-r-0.5 rounded-bl-lg"
                                                underlayColor="#DDDDDD"
                                            >
                                                <Text className="text-blue-500 text-center font-bold ">Hủy</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                onPress={() => {
                                                    handleLogout();
                                                }}
                                                className="justify-center items-center bg-white rounded-b-lg flex-1 h-[100%]"
                                                underlayColor="#DDDDDD"
                                            >
                                                <Text className="text-blue-500 text-center">Có</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            </Modal>
                        </View>
                    </ScrollView>
                </View>
            )}
        </Container>
    );
};
const styles = StyleSheet.create({
    textArea: {
        height: 180,
        borderColor: 'gray',
        borderWidth: 1,
        width: '90%',
        borderRadius: 20,
        backgroundColor: '#2D2D2D',
        color: 'white',
        padding: 10,
        marginTop: 10,
        fontSize: 14,
    },
    main: {
        flex: 1,
    },

    counter: {
        position: 'relative',
        bottom: 30,
        right: -120,
        color: 'white',
        fontSize: 14,
    },
    gradient: {
        ...StyleSheet.absoluteFillObject,
    },
});
export default TaiKhoan;
