import React from 'react';
import { StyleProp, Text, TextStyle } from 'react-native';
import { globalStyles } from '../styles/globalStyles';

const TextComponent = (props) => {
    const { text, color, size, height, line, weight, flex, styles } = props;

    return (
        <Text
            style={[
                globalStyles.text,
                {
                    color: color ?? '#212121',
                    fontSize: size ?? 16,
                    lineHeight: height ? height : size ? size + 6 : 19,
                    fontWeight: weight ?? 'normal',
                },
                styles,
            ]}
            numberOfLines={line}
        >
            {text}
        </Text>
    );
};

export default TextComponent;
