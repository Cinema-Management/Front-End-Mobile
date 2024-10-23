/** @format */

import React from 'react';
import { View, SafeAreaView, ScrollView, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import { globalStyles } from '../styles/globalStyles';
import { colors } from '../constants/colors';
import Row from '../components/Row';
import ButtonComponent from '../components/ButtonComponent';
import TextComponent from '../components/TextComponent';

import bg from '../../assets/BG.png';
const Container = (props) => {
    const { children, styles, isScroll, title, back, style, right, alignItems = 'center' } = props;
    const navigation = useNavigation();

    const renderHeader = () =>
        (title || back || right) && (
            <Row styles={{ paddingHorizontal: 16, paddingVertical: 12 }}>
                {back && (
                    <ButtonComponent
                        type="text"
                        icon={<FontAwesome name="angle-left" size={32} color={colors.white} />}
                        onPress={() => navigation.goBack()}
                    />
                )}
                <View style={{ flex: 1, alignItems: alignItems }}>
                    {title && <TextComponent text={title} size={20} styles={style} />}
                </View>
                {right}
            </Row>
        );

    return (
        <ImageBackground source={bg} className="flex-1 ">
            <SafeAreaView style={{ flex: 1, paddingTop: 40 }}>
                {isScroll === false ? (
                    <View style={[globalStyles.container, styles]}>
                        {renderHeader()}
                        {children}
                    </View>
                ) : (
                    <View style={{ flex: 1 }}>
                        {renderHeader()}
                        <ScrollView
                            showsVerticalScrollIndicator={false}
                            style={[globalStyles.container, { flexGrow: 1 }, styles]}
                        >
                            {children}
                        </ScrollView>
                    </View>
                )}
            </SafeAreaView>
        </ImageBackground>
    );
};

export default Container;
