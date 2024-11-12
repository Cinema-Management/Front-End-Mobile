import React, { useState } from 'react';
import { Alert, ImageBackground, Modal, StyleSheet, Text, View } from 'react-native';
import Container from '../components/Container';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import ButtonPrimary from '../components/ButtonPrimary';
import { API_URL } from '@env';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../redux/apiRequest';
import { createAxios } from '../createInstance';
import { logOutSuccess } from '../redux/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DeleteAccount = ({ navigation }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const user = useSelector((state) => state.auth.login?.currentUser);
    const dispatch = useDispatch();
    const axiosJWT = createAxios(user, dispatch, logOutSuccess);

    const handleDelete = async () => {
        setModalVisible(false);
        try {
            const { data } = await axios.put(API_URL + '/api/users/' + user?.code, {
                status: 0,
            });
            if (data) {
                Alert.alert(
                    'Thông báo',
                    'Xóa tài khoản thành công!',
                    [{ text: 'Đóng', onPress: () => console.log('OK Pressed') }],
                    {
                        cancelable: false,
                    },
                );

                logOut(dispatch, user?.accessToken, axiosJWT);
                await AsyncStorage.removeItem('phone');
                await AsyncStorage.removeItem('password');
            } else {
                Alert.alert(
                    'Thông báo',
                    'Xóa thất bại!',
                    [{ text: 'Đóng', onPress: () => console.log('OK Pressed') }],
                    {
                        cancelable: false,
                    },
                );
            }
        } catch (error) {
            Alert.alert(
                'Thông báo',
                'Đã có lỗi hệ thống',
                [{ text: 'Đóng', onPress: () => console.log('OK Pressed') }],
                {
                    cancelable: false,
                },
            );
        }
    };
    return (
        <Container back={true} isScroll={false} title="Xóa tài khoản" style={{ color: 'white', fontWeight: 700 }}>
            <View className="flex-1">
                {/* top */}
                <View className="space-y-5 px-5" style={{ height: hp(70) }}>
                    <Text className="text-base text-white">
                        - Sau khi xóa thành công, Tài khoản sẽ không thể khôi phục. Đồng thời bạn không thể đăng nhập
                        lại vào tài khoản đã xóa.
                    </Text>

                    <Text className="text-base text-white">
                        - Các thông tin cá nhân liên quan đến tài khoản TD Cinema của bạn sẽ bị xóa, TD Cinema sẽ không
                        chịu trách nhiệm cho bất kỳ mất mát nào về thông tin, dữ liệu sau khi xóa tài khoản.
                    </Text>

                    {/* <Text className="text-base text-white">
                        - Vui lòng đọc kỹ{' '}
                        <Text className="text-orange-500">các chính sách điều kiện và điều khoản </Text>
                        của chúng tôi trước khi xóa.
                    </Text> */}
                </View>
                <Modal transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
                    <View className=" justify-center items-center bg-black/30  flex-1 ">
                        {/* Nội dung modal */}
                        <View className="bg-white  rounded-lg " style={{ height: hp(15), width: wp(60) }}>
                            <View
                                style={{ height: hp(10), width: wp(60) }}
                                className="justify-center items-center border-b-[0.5px] border-gray-300"
                            >
                                <Text className="text-sm font-bold">Xóa tài khoản</Text>
                                <Text className="text-sm">Bạn có chắc chắn muốn xóa?</Text>
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
                                        handleDelete();
                                    }}
                                    className="justify-center items-center bg-white rounded-b-lg flex-1 h-[100%]"
                                    underlayColor="#DDDDDD"
                                >
                                    <Text className="text-red-500 text-center">Đồng ý</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>

                <ButtonPrimary title="Xóa tài khoản" onPress={() => setModalVisible(true)} />
            </View>
        </Container>
    );
};
const styles = StyleSheet.create({
    container: {
        // backgroundColor: 'red',
        flex: 1,
    },
    test: {
        backgroundImage: 'linear-gradient(180deg, rgba(0, 111, 111, 0.36) 0%, #00CCF9 100%)',
    },
    footer: {
        height: hp(20),
        justifyContent: 'center',
    },
});
export default DeleteAccount;
