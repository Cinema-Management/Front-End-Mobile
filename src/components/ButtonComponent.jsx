/** @format */

import { View, TouchableOpacity } from 'react-native';
import React from 'react';
import { globalStyles } from '../styles/globalStyles';
import TextComponent from './TextComponent';
import { colors } from '../constants/colors';

const ButtonComponent = (props) => {
    const { styles, text, icon, onPress, color, type, textStyles, styleBack } = props;

    return !type || type === 'primary' ? (
        <TouchableOpacity
            onPress={onPress}
            style={[
                globalStyles.button,
                {
                    backgroundColor: color ?? colors.blue,
                },
                styles,
            ]}
        >
            {icon && icon}
            {text && <TextComponent text={text} color={color ? colors.white : '#212121'} styles={textStyles} />}
        </TouchableOpacity>
    ) : type === 'link' || type === 'text' ? (
        <TouchableOpacity onPress={onPress} style={styleBack}>
            {icon}
        </TouchableOpacity>
    ) : (
        <></>
    );
};

export default ButtonComponent;
