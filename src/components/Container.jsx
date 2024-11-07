/** @format */

import React, { useContext, useEffect, useState } from 'react';
import {
    View,
    ScrollView,
    ImageBackground,
    TouchableWithoutFeedback,
    RefreshControl,
    StyleSheet,
    Text,
    TouchableOpacity,
    Modal,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import { globalStyles } from '../styles/globalStyles';
import { colors } from '../constants/colors';
import Row from '../components/Row';
import ButtonComponent from '../components/ButtonComponent';
import TextComponent from '../components/TextComponent';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import bg from '../../assets/BG.png';
import image1 from '../../assets/img1.png';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import updateStatusSeat from '../queries/updateStatusSeat';
import { TimerContext } from '../utils/TimerContext';
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
        line,
        styleRight,
        titleRight,
        span,
        onPress,
        onRefresh,
        home,
        targetRoute,
        showtimeValue,
        selectedSeatValue,
        openModalPayment,
    } = props;
    const { stopTimer } = useContext(TimerContext);
    const navigation = useNavigation();
    const [refreshing, setRefreshing] = useState(false);

    const handleRefresh = () => {
        setRefreshing(true);
        if (onRefresh) {
            onRefresh().finally(() => setRefreshing(false));
        } else {
            setRefreshing(false);
        }
    };
    const [modalVisible, setModalVisible] = useState(false);

    const handleSuccess = () => {
        stopTimer();
        setModalVisible(false);
        updateStatusSeat(selectedSeatValue, 1, showtimeValue?.code);
        navigation.navigate(targetRoute, { showtime: showtimeValue });
    };

    useEffect(() => {
        if (!openModalPayment) setModalVisible(false);
    }, [openModalPayment]);

    const renderHeader = () =>
        (title || back || right) && (
            <Row
                styles={{
                    paddingTop: 5,
                    paddingBottom: 18,
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 49,
                }}
            >
                {back && (
                    <ButtonComponent
                        type="text"
                        styleBack={{
                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                            height: 40,
                            width: 40,
                            borderRadius: 50,
                            justifyContent: 'center',
                            alignItems: 'center',
                            left: 8,
                        }}
                        icon={<FontAwesome name="angle-left" size={35} color={colors.white} />}
                        onPress={() => {
                            if (targetRoute) {
                                if (openModalPayment) {
                                    setModalVisible(true);

                                    return;
                                } else {
                                    if (targetRoute === 'Film') {
                                        updateStatusSeat(selectedSeatValue, 1, showtimeValue?.code);
                                        stopTimer();
                                    }
                                    navigation.navigate(targetRoute, { showtime: showtimeValue });
                                }
                            } else {
                                navigation.goBack();
                            }
                        }}
                    />
                )}
                <View
                    style={{
                        flex: 1,
                        alignItems: alignItems,
                        marginTop: span ? 6 : 0,
                        gap: 5,
                        marginLeft: back === true ? 7 : 0,
                    }}
                    className={`${back === true && !right ? 'mr-6' : 'pl-3'}`}
                >
                    {title && <TextComponent text={title} size={20} styles={style} line={line} />}
                    {span && <TextComponent text={span} size={15} styles={styleSpan} />}
                </View>
                {right && (
                    <TouchableWithoutFeedback onPress={onPress}>
                        <View style={{ width: wp(18), marginRight: 8 }}>
                            <TextComponent text={titleRight} size={20} styles={styleRight} line={line} />
                        </View>
                    </TouchableWithoutFeedback>
                )}
            </Row>
        );

    return (
        <ImageBackground source={home === true ? image1 : bg} className="flex-1">
            {home === true && (
                <LinearGradient
                    colors={['rgba(0, 0, 0, 0.7)', 'rgba(0, 0, 0, 0.84)']}
                    style={{ ...StyleSheet.absoluteFillObject }}
                />
            )}
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
                                showsHorizontalScrollIndicator={false}
                                showsVerticalScrollIndicator={false}
                                style={[globalStyles.container, { flexGrow: 1 }, styles]}
                            >
                                {children}
                            </ScrollView>
                        </View>
                    )}
                </View>
            ) : (
                <SafeAreaView style={{ flex: 1 }} edges={['top']}>
                    {isScroll === false ? (
                        <View style={[globalStyles.container, styles]}>
                            {renderHeader()}
                            {children}
                            <Modal
                                transparent={true}
                                visible={modalVisible}
                                onRequestClose={() => setModalVisible(false)}
                            >
                                <View className=" justify-center items-center bg-black/30  flex-1 ">
                                    {/* Nội dung modal */}
                                    <View className="bg-white  rounded-lg " style={{ height: hp(15), width: wp(60) }}>
                                        <View
                                            style={{ height: hp(10), width: wp(60) }}
                                            className="justify-center items-center border-b-[0.5px] border-gray-300"
                                        >
                                            <Text className="text-sm font-bold">Thông báo</Text>
                                            <Text className="text-sm">Bạn có muốn thoát khỏi?</Text>
                                        </View>
                                        <View className="flex-row items-center justify-center  h-[50%] flex-1 rounded-b-lg">
                                            <TouchableOpacity
                                                onPress={() => setModalVisible(false)}
                                                className="justify-center items-center bg-white  flex-1 h-[100%] border-r-0.5 rounded-bl-lg"
                                                underlayColor="#DDDDDD"
                                            >
                                                <Text className="text-blue-500 text-center font-bold ">Hủy</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                onPress={handleSuccess}
                                                className="justify-center items-center bg-white rounded-b-lg flex-1 h-[100%]"
                                                underlayColor="#DDDDDD"
                                            >
                                                <Text className="text-blue-500 text-center">Đồng ý</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            </Modal>
                        </View>
                    ) : (
                        <View style={{ flex: 1 }}>
                            {renderHeader()}
                            <ScrollView
                                showsVerticalScrollIndicator={false}
                                style={[globalStyles.container, { flexGrow: 1 }, styles]}
                                refreshControl={
                                    <RefreshControl
                                        refreshing={refreshing}
                                        onRefresh={handleRefresh}
                                        colors={['white', 'white']}
                                        tintColor="white"
                                        title="Đang tải lại..."
                                        titleColor="white"
                                    />
                                }
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
const styles = StyleSheet.create({
    gradient: {
        ...StyleSheet.absoluteFillObject,
    },
});

export default Container;
