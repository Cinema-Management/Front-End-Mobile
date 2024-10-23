/** @format */

import { View, Image, StyleSheet } from 'react-native';
import React from 'react';
import TextComponent from './TextComponent';
import { globalStyles } from '../styles/globalStyles';

const Avatar = (props) => {
    const { photoUrl, size, bordered, border, styles } = props; // Thiết lập giá trị mặc định cho size

    // Kết hợp kích thước với các style khác
    const localStyles = [
        globalStyles.avatar,
        { width: size, height: size, borderRadius: size / 2 }, // Đảm bảo hình tròn
        bordered && border ? { borderWidth: border.width, borderColor: border.color } : {},
        styles,
    ];

    return (
        <View style={{ width: size, height: size }}>
            {photoUrl ? (
                <Image style={localStyles} source={photoUrl} />
            ) : (
                <View style={localStyles}>
                    <TextComponent text="A" />
                </View>
            )}
        </View>
    );
};

export default Avatar;
