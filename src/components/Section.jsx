import { View } from 'react-native';
import React from 'react';
import { globalStyles } from '../styles/globalStyles';

const Section = (props) => {
    const { children, styles } = props;

    return <View style={[globalStyles.section, styles]}>{children}</View>;
};

export default Section;
