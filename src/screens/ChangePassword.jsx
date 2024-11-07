import React, { useRef, useState } from 'react';
import { StyleSheet, View, Alert, Text, ScrollView } from 'react-native';
import Container from '../components/Container';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import InputComponent from '../components/InputComponent';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ButtonPrimary from '../components/ButtonPrimary';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { API_URL } from '@env';
import { logOut } from '../redux/apiRequest';
import { logOutSuccess } from '../redux/authSlice';
import { createAxios } from '../createInstance';
import ModalNotify from '../components/ModalNotify';
export default function ChangePassword() {
    const currentUser = useSelector((state) => state.auth.login.currentUser);

    // State for each password field
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPass, setShowPass] = useState(false); // Manage password visibility
    const [errors, setErrors] = useState(''); // State to store error messages
    const dispatch = useDispatch();
    const axiosJWT = createAxios(currentUser, dispatch, logOutSuccess);
    const [modalVisible, setModalVisible] = useState(false);
    const [title, setTitle] = useState('Lỗi');
    const toggleShowPass = () => {
        setShowPass(!showPass);
    };

    const validate = () => {
        const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
        let errorMessages = '';
        let valid = true;
        let modal = false;
        // Validate fields and set error messages
        if (!currentPassword || !newPassword || !confirmPassword) {
            errorMessages = 'Vui lòng nhập đầy đủ thông tin.';
            modal = true;
            valid = false;
        } else if (currentPassword === newPassword) {
            errorMessages = 'Mật khẩu mới không được trùng với mật khẩu cũ.';
            modal = true;
            valid = false;
        } else if (!passRegex.test(newPassword)) {
            errorMessages = 'Mật khẩu mới ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số.';
            modal = true;
            valid = false;
        } else if (newPassword !== confirmPassword) {
            errorMessages = 'Xác nhận mật khẩu không khớp.';
            modal = true;
            valid = false;
        }

        setErrors(errorMessages);
        setModalVisible(modal);
        return valid;
    };

    const handleOnChangePass = async () => {
        if (!validate()) return;

        try {
            console.log('currentUser', currentPassword);
            await axios.post(API_URL + '/api/users/forgotPassword', {
                code: currentUser?.code,
                password: currentPassword,
                passwordNew: newPassword,
            });

            Alert.alert(
                'Thành công',
                'Vui lòng đăng nhập lại',
                [{ text: 'Đóng', onPress: () => console.log('OK Pressed') }],
                {
                    cancelable: false,
                },
            );

            logOut(dispatch, currentUser.accessToken, axiosJWT);
        } catch (error) {
            setTitle('Lỗi');
            setErrors('Mật khẩu cũ không đúng');
            setModalVisible(true);
        }
    };

    return (
        <Container back={true} isScroll={false} title="Đổi mật khẩu" style={{ color: 'white', fontWeight: '700' }}>
            <View className="items-center  flex-1 pt-5">
                <ScrollView
                    style={{
                        width: wp(90),

                        height: hp(70),
                    }}
                >
                    <ModalNotify
                        title={title}
                        modalVisible={modalVisible}
                        setModalVisible={setModalVisible}
                        message={errors}
                    />
                    <View className=" flex-1 ">
                        <InputComponent
                            title="Mật khẩu hiện tại"
                            placeholder="Nhập"
                            placeholderColor="gray"
                            value={currentPassword}
                            onChange={setCurrentPassword}
                            showPass={showPass}
                            inputStyles={styles.input}
                            password={true}
                            setShowPass={toggleShowPass}
                            prefix={<Icon name="key-variant" size={20} color="#fff" />}
                        />
                    </View>

                    <View className=" flex-1">
                        <InputComponent
                            title="Mật khẩu mới"
                            placeholder="Nhập"
                            placeholderColor="gray"
                            value={newPassword}
                            onChange={setNewPassword}
                            showPass={showPass}
                            inputStyles={styles.input}
                            password={true}
                            setShowPass={toggleShowPass}
                            prefix={<Icon name="key-variant" size={20} color="#fff" />}
                        />
                    </View>

                    <View className=" flex-1">
                        <InputComponent
                            title="Xác nhận mật khẩu mới"
                            placeholder="Nhập"
                            placeholderColor="gray"
                            value={confirmPassword}
                            onChange={setConfirmPassword}
                            showPass={showPass}
                            inputStyles={styles.input}
                            password={true}
                            setShowPass={toggleShowPass}
                            prefix={<Icon name="key-variant" size={20} color="#fff" />}
                        />
                    </View>
                </ScrollView>

                {/* Confirm Button */}
                <View style={styles.footer}>
                    <ButtonPrimary title="Xác nhận" onPress={handleOnChangePass} />
                </View>
            </View>
        </Container>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    footer: {
        flex: 1,
        justifyContent: 'center',
    },
    input: {
        color: 'white',
    },
    errorText: {
        color: 'red',
        fontSize: 12,
    },
});
