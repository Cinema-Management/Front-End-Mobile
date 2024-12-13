import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import Container from '../components/Container';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import ButtonPrimary from '../components/ButtonPrimary';

const PrivacyPolicy = ({ navigation }) => {
    return (
        <Container back={true} isScroll={false} title="Chính sách bảo mật" style={{ color: 'white', fontWeight: 700 }}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {/* Header Section */}

                {/* Policy Content */}
                <View style={styles.content}>
                    <Text style={styles.text}>
                        Tại **TD Cinemas**, sự riêng tư và bảo mật thông tin của khách hàng là ưu tiên hàng đầu của
                        chúng tôi. Chính sách bảo mật này sẽ giúp bạn hiểu rõ về cách chúng tôi thu thập, sử dụng và bảo
                        vệ thông tin cá nhân của bạn.
                    </Text>

                    <Text style={styles.sectionTitle}>1. Thông Tin Thu Thập</Text>
                    <Text style={styles.text}>
                        Chúng tôi có thể thu thập các thông tin cá nhân như: họ tên, địa chỉ email, số điện thoại, lịch
                        sử giao dịch và các thông tin liên quan khác khi bạn đăng ký hoặc sử dụng các dịch vụ của chúng
                        tôi.
                    </Text>

                    <Text style={styles.sectionTitle}>2. Mục Đích Sử Dụng</Text>
                    <Text style={styles.text}>
                        - Cung cấp các dịch vụ liên quan đến việc đặt vé, cập nhật thông tin phim và chương trình ưu
                        đãi.{'\n'}- Nâng cao trải nghiệm khách hàng và cải thiện dịch vụ của TD Cinemas.{'\n'}- Thực
                        hiện các nghĩa vụ pháp lý theo quy định hiện hành.
                    </Text>

                    <Text style={styles.sectionTitle}>3. Bảo Mật Thông Tin</Text>
                    <Text style={styles.text}>
                        TD Cinemas cam kết sử dụng các biện pháp bảo mật hiện đại để bảo vệ thông tin cá nhân của bạn.
                        Tuy nhiên, bạn cũng cần bảo mật thông tin tài khoản và không chia sẻ thông tin đăng nhập với bất
                        kỳ ai.
                    </Text>

                    <Text style={styles.sectionTitle}>4. Quyền Lợi Của Người Dùng</Text>
                    <Text style={styles.text}>
                        - Quyền truy cập và cập nhật thông tin cá nhân.{'\n'}- Quyền yêu cầu xóa hoặc giới hạn việc sử
                        dụng thông tin cá nhân theo chính sách.{'\n'}- Quyền từ chối nhận thông báo tiếp thị từ TD
                        Cinemas.
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
    header: {
        marginBottom: hp(2),
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#1E88E5',
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

export default PrivacyPolicy;
