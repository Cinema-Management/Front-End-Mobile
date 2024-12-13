import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import Container from '../components/Container';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import ButtonPrimary from '../components/ButtonPrimary';

const TermsOfUse = ({ navigation }) => {
    return (
        <Container back={true} isScroll={false} title="Điều khoản sử dụng" style={{ color: 'white', fontWeight: 700 }}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {/* Policy Content */}
                <View style={styles.content}>
                    <Text style={styles.text}>
                        Chào mừng bạn đến với **TD Cinemas**! Bằng việc sử dụng dịch vụ của chúng tôi, bạn đồng ý tuân
                        theo các điều khoản sử dụng dưới đây. Vui lòng đọc kỹ để hiểu rõ quyền và nghĩa vụ của bạn.
                    </Text>

                    <Text style={styles.sectionTitle}>1. Quyền Sử Dụng</Text>
                    <Text style={styles.text}>
                        - Người dùng phải cung cấp thông tin chính xác khi đăng ký tài khoản.{'\n'}- Dịch vụ của TD
                        Cinemas chỉ được sử dụng cho mục đích cá nhân, không thương mại.
                    </Text>

                    <Text style={styles.sectionTitle}>2. Trách Nhiệm Người Dùng</Text>
                    <Text style={styles.text}>
                        - Bảo mật thông tin tài khoản và mật khẩu của bạn.{'\n'}- Không thực hiện các hành vi gian lận,
                        giả mạo thông tin.{'\n'}- Tuân thủ quy định pháp luật và các điều khoản của TD Cinemas.
                    </Text>

                    <Text style={styles.sectionTitle}>3. Quyền Hạn Của TD Cinemas</Text>
                    <Text style={styles.text}>
                        - TD Cinemas có quyền tạm ngừng hoặc chấm dứt tài khoản nếu phát hiện hành vi vi phạm.{'\n'}-
                        Dịch vụ có thể được thay đổi hoặc gián đoạn tạm thời mà không cần thông báo trước.
                    </Text>

                    <Text style={styles.sectionTitle}>4. Miễn Trừ Trách Nhiệm</Text>
                    <Text style={styles.text}>
                        - TD Cinemas không chịu trách nhiệm về thiệt hại phát sinh do người dùng vi phạm điều khoản sử
                        dụng.{'\n'}- Chúng tôi không đảm bảo dịch vụ sẽ luôn không có lỗi hoặc không bị gián đoạn.
                    </Text>

                    <Text style={styles.sectionTitle}>5. Sửa Đổi Điều Khoản</Text>
                    <Text style={styles.text}>
                        TD Cinemas có quyền sửa đổi nội dung điều khoản bất kỳ lúc nào. Các thay đổi sẽ được cập nhật
                        trên ứng dụng và có hiệu lực ngay sau khi được công bố.
                    </Text>
                </View>
            </ScrollView>
        </Container>
    );
};

const styles = StyleSheet.create({
    scrollContainer: {
        paddingVertical: hp(2),
        paddingHorizontal: wp(5),
    },
    content: {
        marginBottom: hp(4),
    },
    text: {
        fontSize: 16,
        lineHeight: 24,
        color: '#ffff',
        marginBottom: hp(1.5),
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'orange',
        marginTop: hp(2),
        marginBottom: hp(1),
    },
});

export default TermsOfUse;
