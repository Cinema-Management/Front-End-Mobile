import React from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import { WebView } from 'react-native-webview'; // Nhập WebView từ thư viện
import Container from '../components/Container';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function MovieDetail({ navigation }) {
    const { height, width } = Dimensions.get('window');

    const videoUri = 'https://www.youtube.com/watch?v=6bA-U-hZ6ps';

    // Hàm lấy ID video từ URI
    const getVideoIdFromUri = (uri) => {
        const regex = /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^&\n]{11})/;
        const match = uri.match(regex);
        return match ? match[1] : null;
    };

    const videoId = getVideoIdFromUri(videoUri);

    // Tạo URL cho WebView
    const youtubeEmbedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1`; // Tự động phát video

    return (
        <Container isScroll={true} safeAreaView={false}>
            <View style={{ width: wp(100), height: hp(80) }}>
                {videoId ? (
                    <WebView
                        style={{ flex: 1 }} // Đảm bảo WebView chiếm toàn bộ chiều cao
                        source={{ uri: youtubeEmbedUrl }} // Sử dụng URL nhúng
                        javaScriptEnabled={true}
                        allowsInlineMediaPlayback={true}
                        mediaPlaybackRequiresUserAction={false} // Cho phép phát video mà không cần tương tác
                    />
                ) : (
                    //     <YoutubePlayer
                    //     height={hp(80)}
                    //     videoId={videoId}
                    //     forceAndroidAutoplay={true}
                    //     play={playing}
                    //     onChangeState={onStateChange}
                    // />
                    <View style={styles.errorContainer}>
                        <Text style={styles.errorText}>Không thể tải video.</Text>
                    </View>
                )}
                <View style={{ width: wp(100), height: hp(20), backgroundColor: 'black' }}>
                    <Text style={{ color: 'white', fontSize: 18, padding: 10 }}>Đây là phần mô tả của video</Text>
                </View>
            </View>
        </Container>
    );
}

const styles = StyleSheet.create({
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2D2D2D',
    },
    errorText: {
        color: 'white',
        fontSize: 18,
    },
});
