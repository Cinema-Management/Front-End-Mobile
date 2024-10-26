import React, { useState } from 'react';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import Container from '../components/Container';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const DeleteAccount = () => {
    return (
        <Container back={true} isScroll={false} title="Xóa tài khoản" style={{ color: 'white', fontWeight: 700 }}>
            <View style={{ height: hp(100) }}>
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

                    <Text className="text-base text-white">
                        - Vui lòng đọc kỹ <Text className="text-red-300">các chính sách điều kiện và điều khoản</Text>
                        của chúng tôi trước khi xóa.
                    </Text>
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
    test: {
        backgroundImage: 'linear-gradient(180deg, rgba(0, 111, 111, 0.36) 0%, #00CCF9 100%)',
    },
    footer: {
        height: hp(20),
        justifyContent: 'center',
    },
});
export default DeleteAccount;
