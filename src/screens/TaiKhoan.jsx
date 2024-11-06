import React, { useState } from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';
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
const TaiKhoan = ({ navigation }) => {
    const dispatch = useDispatch();
    const maxValue = 5000000;
    const user = useSelector((state) => state.auth.login?.currentUser);
    const axiosJWT = createAxios(user, dispatch, logOutSuccess);
    const [currentExpense, setCurrentExpense] = useState(2000000);
    const progress = Math.min(currentExpense / maxValue, 1);
    const [expandedAccordions, setExpandedAccordions] = useState([]);
    const currentUser = useSelector((state) => state.auth.login.currentUser);
    return (
        <Container isScroll={false} title="Tài khoản" style={{ color: 'white', fontWeight: 700 }}>
            <View style={styles.main}>
                <ScrollView
                    style={{ flex: 1 }}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ flexGrow: 1, paddingBottom: hp(10) }}
                >
                    <View className="flex-row py-1 px-3" style={{ backgroundColor: colors.backgroundColor }}>
                        <Avatar photoUrl={{ uri: currentUser.avatar }} size={70} bordered={true} />
                        <View className=" justify-center ml-5 flex-1">
                            <View className=" flex-row">
                                <MaterialIcons name="workspace-premium" size={20} color="orange" />
                                <Text className="text-white text-base font-normal ml-2">{currentUser.name}</Text>
                            </View>
                            <View className=" flex-row mt-2">
                                <AntDesign name="gift" size={20} color="orange" />
                                <Text className="text-white text-base font-normal ml-2">0 Start</Text>
                            </View>
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
                            <Text className="text-gray-200 text-base font-normal ml-1">Thông tin</Text>
                        </TouchableOpacity>

                        <View className="w-0.5 h-9 bg-white mx-5" />

                        <TouchableOpacity
                            className="flex-row"
                            style={{ width: wp(40) }}
                            onPress={() => navigation.navigate('TicketDetail')}
                        >
                            <Fontisto name="bell" size={24} color="orange" />
                            <Text className="text-white text-base font-normal ml-1">Thông báo</Text>
                        </TouchableOpacity>
                    </View>
                    <View
                        className=" mt-2 py-3 justify-center items-center h-auto px-2"
                        style={{ backgroundColor: colors.backgroundColor }}
                    >
                        <View className="flex-row w-full py-1 items-center justify-between h-auto  px-2">
                            <View className="flex-row justify-center items-center">
                                <Text className="text-white text-base font-normal ">Tổng chi tiêu 2024</Text>
                                <MaterialIcons name="lock" size={15} color="orange" />
                            </View>
                            <Text className="text-white text-base font-normal ">0 VND</Text>
                        </View>

                        <View className="mt-5 relative w-full ">
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                                <MaterialIcons name="workspace-premium" size={20} color="orange" />
                                <View className="flex-row">
                                    <MaterialIcons name="workspace-premium" size={20} color="orange" />
                                    <MaterialIcons name="workspace-premium" size={20} color="orange" />
                                </View>
                                <View className="flex-row mr-4">
                                    <MaterialIcons name="workspace-premium" size={20} color="orange" />
                                    <MaterialIcons name="workspace-premium" size={20} color="orange" />
                                    <MaterialIcons name="workspace-premium" size={20} color="orange" />
                                </View>
                            </View>
                            <View className="my-3 w-full flex-row bg-orange-500 justify-between border-[orange] border rounded-xl">
                                <View className="w-3 h-3 rounded-[9px] bg-white" />
                                <View className="w-3 h-3 rounded-[9px] bg-white" />
                                <View className="w-3 h-3 rounded-[9px] bg-white mr-8" />
                            </View>

                            <View
                                style={{
                                    width: '100%',
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <Text className="text-white text-sm">0đ</Text>
                                <Text className="text-white text-sm">2.000.000đ</Text>
                                <Text className="text-white text-sm ">4.000.000đ</Text>
                            </View>
                        </View>
                    </View>

                    <View style={{ marginTop: 8, backgroundColor: colors.backgroundColor }}>
                        <View className=" pb-2 h-auto ">
                            <View className="mt-2 py-5  border-b border-white justify-between flex-row px-3">
                                <View className="flex-row">
                                    <MaterialCommunityIcons name="chat-alert-outline" size={24} color="white" />
                                    <Text className="text-white text-base font-normal ml-2">Liên hệ hỗ trợ</Text>
                                </View>
                                <MaterialIcons name="navigate-next" size={24} color="white" />
                            </View>

                            <View className="py-5  border-b border-white justify-between flex-row px-3">
                                <View className="flex-row">
                                    <MaterialIcons name="menu-book" size={24} color="white" />
                                    <Text className="text-white text-base font-normal ml-2">Điều khoản sử dụng</Text>
                                </View>
                                <MaterialIcons name="navigate-next" size={24} color="white" />
                            </View>

                            <View className="py-5  border-b border-white justify-between flex-row px-3">
                                <View className="flex-row">
                                    <MaterialIcons name="security" size={24} color="white" />
                                    <Text className="text-white text-base font-normal ml-2">Chính sách bảo mật</Text>
                                </View>
                                <MaterialIcons name="navigate-next" size={24} color="white" />
                            </View>
                        </View>
                    </View>
                    <View className=" mt-6 mb-6 flex-row justify-between w-full items-center">
                        <View className="px-4 py-2justify-between w-full items-center">
                            <TouchableOpacity onPress={() => logOut(dispatch, user.accessToken, axiosJWT)}>
                                <Text className="text-white text-base font-bold">Đăng xuất</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </View>
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
