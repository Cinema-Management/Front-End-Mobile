import React, { memo, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import {
    View,
    Text,
    Image,
    Dimensions,
    StyleSheet,
    TouchableOpacity,
    useWindowDimensions,
    TouchableWithoutFeedback,
    ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import Container from '../components/Container';
import Carousel from 'react-native-reanimated-carousel';
import BannerCarousel from '../components/BannerCarousel';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import useMovieSchedule from '../queries/useMovieSchedule';
import { LinearGradient } from 'expo-linear-gradient';
import { useFocusEffect } from '@react-navigation/native';
import { TimerContext } from '../utils/TimerContext';
import Animated, { Extrapolation, interpolate, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');
const CarouselComponent = memo(({ index, data, navigation }) => {
    const scrollX = useSharedValue(0);
    const renderItem = useCallback(
        ({ item, animationValue }) => {
            const animatedStyle = useAnimatedStyle(() => {
                const scale = interpolate(
                    animationValue.value,
                    [-1, 0, 1],
                    [0.5, 1, 0.5], // Scale ảnh giữa lớn nhất
                );

                const translateX = interpolate(
                    animationValue.value,
                    [-1, 0, 1],
                    [-50, -20, -50], // Dịch chuyển ảnh sang trái hoặc phải
                );

                return {
                    transform: [
                        { scale }, // Hiệu ứng thu phóng
                        { translateX }, // Hiệu ứng trượt ngang
                        { rotateZ: `${interpolate(animationValue.value, [-1, 0, 1], [14, 0, -10])}deg` }, // Hiệu ứng xoay
                    ],
                };
            });

            return (
                <TouchableWithoutFeedback onPress={() => navigation.navigate('MovieDetail', { item, index })}>
                    <Animated.View style={[animatedStyle, styles.item]} className="-mt-5  ">
                        <Image
                            source={{ uri: item.image }}
                            className="w-[100%] h-[75%] rounded-2xl "
                            resizeMode="stretch"
                        />
                        <View
                            className="h-auto rounded-3xl  absolute bottom-5 w-[95%] px-3 py-1 gap-y-2"
                            style={{ backgroundColor: 'rgba(60, 60, 60,0.5)' }}
                        >
                            <View className="">
                                <Text className="text-white uppercase text-base leading-8 font-bold" numberOfLines={2}>
                                    {item.name}
                                </Text>
                                <View className=" flex-row justify-between ">
                                    <View className="max-w-[65%] w-[65%]">
                                        <Text className="text-gray-400 text-sm">{item.duration} phút</Text>
                                        <Text className="text-gray-400 text-xs " numberOfLines={1}>
                                            {item.genres}
                                        </Text>
                                    </View>
                                    <TouchableOpacity
                                        className="w-20 mb-2 mr-2 py-1 mt-1 rounded-[100px] border border-white justify-center items-center  flex-1"
                                        disabled={index != 1 ? false : true}
                                        onPress={() => navigation.navigate('Film', { item })}
                                    >
                                        <LinearGradient
                                            colors={['#ED999A', '#F6D365']}
                                            style={styles.gradient}
                                            start={{ x: 0.4, y: 0.1 }}
                                            end={{ x: 0.9, y: 0.2 }}
                                            className="absolute rounded-[100px]"
                                        />

                                        <Text className="text-white font-bold text-sm  ">Đặt Vé</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </Animated.View>
                </TouchableWithoutFeedback>
            );
        },
        [navigation],
    );
    return (
        <View style={styles.carouselContainer}>
            <Carousel
                keyExtractor={(item) => item.id.toString()}
                width={width * 0.6}
                height={height * 0.6}
                data={data}
                renderItem={renderItem}
                scrollAnimationDuration={1000}
                autoPlayInterval={2000}
                style={{ width: width, justifyContent: 'center' }}
                loop
                // mode="parallax"
            />
        </View>
    );
});

const Home = memo(({ navigation }) => {
    const [scheduleId, setScheduleId] = useState(1);
    const { data, isLoading, isSuccess, refetch, isRefetching } = useMovieSchedule(scheduleId);
    const [index, setIndex] = useState(1);
    const layout = useWindowDimensions();
    const { stopTimer } = useContext(TimerContext);
    useFocusEffect(
        useCallback(() => {
            stopTimer();
        }, []),
    );
    const handleIndexChange = (newIndex) => {
        let newScheduleId;
        switch (newIndex) {
            case 0:
                newScheduleId = 3;
                break;
            case 1:
                newScheduleId = 1;
                break;
            case 2:
                newScheduleId = 2;
                break;
            default:
                newScheduleId = 1;
        }
        if (scheduleId !== newScheduleId) {
            setScheduleId(newScheduleId);
        }
        setIndex(newIndex);
    };
    const handleRefresh = async () => {
        refetch();
    };
    const banners = [
        { id: 1, img: 'https://td-cinemas.s3.ap-southeast-1.amazonaws.com/1730992044159.jpg' },
        { id: 2, img: 'https://td-cinemas.s3.ap-southeast-1.amazonaws.com/happyday.jpg' },
        { id: 3, img: 'https://td-cinemas.s3.ap-southeast-1.amazonaws.com/BANNERP11-01.jpg' },
        { id: 4, img: 'https://td-cinemas.s3.ap-southeast-1.amazonaws.com/zalopay.jpg' },
    ];

    const routes = useMemo(
        () => [
            { key: 'first', title: 'Sắp chiếu' },
            { key: 'second', title: 'Đang chiếu' },
            { key: 'third', title: 'Suất chiếu sớm' },
        ],
        [],
    );
    const tabData = useMemo(
        () => ({
            first: data,
            second: data,
            third: data,
        }),
        [data],
    );
    const renderScene = ({ route }) => {
        if (isLoading || isRefetching) {
            return (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="white" />
                </View>
            );
        }
        if (!data || !data.length) {
            return (
                <Text style={{ color: 'white', textAlign: 'center', marginTop: 20, fontSize: 16 }}>
                    Chưa có phim nào
                </Text>
            );
        }
        if (isSuccess) {
            switch (route.key) {
                case 'first':
                    return index === 0 ? (
                        <CarouselComponent index="1" data={tabData.first} navigation={navigation} />
                    ) : null;
                case 'second':
                    return index === 1 ? (
                        <CarouselComponent index="2" data={tabData.second} navigation={navigation} />
                    ) : null;
                case 'third':
                    return index === 2 ? (
                        <CarouselComponent index="3" data={tabData.third} navigation={navigation} />
                    ) : null;
                default:
                    return null;
            }
        }
    };

    const renderTabBar = (props) => (
        <TabBar
            {...props}
            renderLabel={({ route, focused, color }) => (
                <Text
                    style={{
                        fontSize: 15,
                        color: focused ? 'white' : 'gray',
                        fontWeight: focused ? '700' : '700',
                        textTransform: 'uppercase',
                        textAlign: route.key === 'third' ? 'center' : route.key === 'second' ? 'center' : 'center',
                        paddingVertical: 6,
                        paddingRight: route.key === 'first' ? 0 : route.key === 'second' ? 35 : 25,
                        width:
                            route.key === 'third' ? width * 0.45 : route.key === 'second' ? width * 0.4 : width * 0.25,
                    }}
                >
                    {route.title}
                </Text>
            )}
            indicatorStyle={{ backgroundColor: 'transparent', height: 0 }}
            style={{ backgroundColor: 'transparent', shadowColor: 'transparent' }}
        />
    );

    return (
        <Container isScroll={true} style={{ color: 'white', fontWeight: 700 }} onRefresh={handleRefresh}>
            <View style={{ height: hp(23.3) }}>
                <BannerCarousel banners={banners} />
            </View>

            <View style={{ height: hp(76.7) }}>
                <TabView
                    navigationState={{ index, routes }}
                    renderScene={renderScene}
                    initialLayout={{ width: layout.width }}
                    onIndexChange={handleIndexChange}
                    renderTabBar={renderTabBar}
                    lazy
                    animationEnabled={false}
                    swipeVelocityImpact={0.1}
                    swipeEnabled={false}
                />
            </View>
        </Container>
    );
});
export default Home;

const styles = StyleSheet.create({
    carouselContainer: {
        flex: 1,
        marginTop: -35,
    },
    item: {
        borderRadius: 10,
        width: width * 0.73,
        height: height * 0.6,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },

    loadingContainer: {
        height: '70%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    gradient: {
        ...StyleSheet.absoluteFillObject,
    },
});
