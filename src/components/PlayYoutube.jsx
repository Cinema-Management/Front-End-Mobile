import React from 'react';
import { View, StyleSheet, SafeAreaView, TouchableOpacity, Text } from 'react-native';
import WebView from 'react-native-webview';
import Container from './Container';
import ButtonComponent from './ButtonComponent';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { colors } from '../constants/colors';

const PlayYoutube = ({ route, navigation }) => {
    const { videoUri } = route.params;

    const getVideoIdFromUri = (uri) => {
        const regex = /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^&\n]{11})/;
        const match = uri.match(regex);
        return match ? match[1] : null;
    };

    const videoId = getVideoIdFromUri(videoUri);
    const youtubeEmbedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&fullscreen=1`;

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <ButtonComponent
                    type="text"
                    styleBack={styles.backButton}
                    icon={<Ionicons name="arrow-back-sharp" size={30} color="white" />}
                    onPress={() => navigation.goBack()}
                />
                <WebView
                    style={styles.webview}
                    source={{ uri: youtubeEmbedUrl }}
                    javaScriptEnabled={true}
                    allowsInlineMediaPlayback={true}
                    mediaPlaybackRequiresUserAction={false}
                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: 'black',
    },
    container: {
        flex: 1,
        position: 'relative',
    },
    backButton: {
        position: 'absolute',
        top: 60,
        left: 15,
        padding: 10,
        // borderRadius: 5,
        zIndex: 1,
    },
    backButtonText: {
        color: 'white',
        fontSize: 16,
    },
    webview: {
        flex: 1,
    },
});

export default PlayYoutube;
