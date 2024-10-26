import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Container from '../components/Container';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import InputComponent from '../components/InputComponent';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { BackgroundImage } from 'react-native-elements/dist/config';
const ChangePassword = () => {
    const [passWord, setPassWord] = useState('');
    const [showPass, setShowPass] = useState(false); // Quản lý trạng thái hiển thị/ẩn mật khẩu
    const toggleShowPass = () => {
        setShowPass(!showPass);
    };

    return (
        <Container back={true} isScroll={false} title="Đổi mật khẩu" style={{ color: 'white', fontWeight: 700 }}>
            <View style={{ height: hp(100) }}>
                {/* top */}
                <View className=" px-5 py-10" style={{ height: hp(70) }}>
                    <InputComponent
                        title="Mật khẩu hiện tại"
                        placeholder="Nhập"
                        placeholderColor="gray"
                        value={passWord}
                        onChange={setPassWord}
                        showPass={showPass}
                        inputStyles={styles.input}
                        password={true}
                        setShowPass={toggleShowPass}
                        prefix={<Icon name="key-variant" size={20} color="#fff" />}
                    />
                    <InputComponent
                        title="Mật khẩu mới"
                        placeholder="Nhập"
                        placeholderColor="gray"
                        value={passWord}
                        onChange={setPassWord}
                        showPass={showPass}
                        inputStyles={styles.input}
                        password={true}
                        prefix={<Icon name="key-variant" size={20} color="#fff" />}
                    />
                    <InputComponent
                        title="Xác nhận mật khẩu mới"
                        placeholder="Nhập"
                        placeholderColor="gray"
                        value={passWord}
                        onChange={setPassWord}
                        showPass={showPass}
                        inputStyles={styles.input}
                        password={true}
                        prefix={<Icon name="key-variant" size={20} color="#fff" />}
                    />
                </View>

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
        // backgroundColor: 'red',
        flex: 1,
    },

    footer: {
        height: hp(20),
        justifyContent: 'center',
    },
    input: {
        color: 'white',
    },
});
export default ChangePassword;
