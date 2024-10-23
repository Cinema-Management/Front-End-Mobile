/** @format */

import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { globalStyles } from '../styles/globalStyles';

const Row = (props) => {
    const { children, onPress, styles } = props;

    const localStyles = [globalStyles.row, globalStyles.center, styles];

    return onPress ? (
        <TouchableOpacity onPress={onPress} style={localStyles}>
            {children}
        </TouchableOpacity>
    ) : (
        <View style={localStyles}>{children}</View>
    );
};

export default Row;
