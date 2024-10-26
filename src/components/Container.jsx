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
    const {
        children,
        styles,
        isScroll,
        title,
        back,
        style,
        right,
        alignItems = 'center',
        safeAreaView,
        styleSpan,
        span,
    } = props;
    const navigation = useNavigation();

    const renderHeader = () =>
        (title || back || right) && (
            <Row styles={{ paddingHorizontal: 16, paddingTop: 5, paddingBottom: 18 }}>
                {back && (
                    <ButtonComponent
                        type="text"
                        styleBack={{
                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                            width: 40,
                            paddingVertical: 2,
                            borderRadius: 50,
                            justifyContent: 'center',
                            alignItems: 'center',
                            textAlign: 'center',
                            margin: 'auto',
                        }}
                        icon={<FontAwesome name="angle-left" size={35} color={colors.white} />}
                        onPress={() => navigation.goBack()}
                    />
                )}
                <View style={{ flex: 1, alignItems: alignItems }} className={`${back === true ? 'mr-6' : ''}`}>
                    {title && <TextComponent text={title} size={20} styles={style} />}
                    {span && <TextComponent text={span} size={16} styles={styleSpan} />}
                </View>
                {right}
            </Row>
        );

    return (
        <ImageBackground source={bg} className="flex-1">
            {safeAreaView == false ? (
                <View style={{ flex: 1 }}>
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
                </View>
            ) : (
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
            )}
        </ImageBackground>
    );
};

export default Container;
