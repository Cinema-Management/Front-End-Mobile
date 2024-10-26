import React, { memo, useCallback, useMemo, useState } from 'react';
import {
    View,
    Text,
    Image,
    Dimensions,
    StyleSheet,
    TouchableOpacity,
    useWindowDimensions,
    TouchableWithoutFeedback,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import Container from '../components/Container';
import Carousel from 'react-native-reanimated-carousel';
import BannerCarousel from '../components/BannerCarousel';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ActivityIndicator } from 'react-native-paper';
import useMovieSchedule from '../queries/useMovieSchedule';
import { LinearGradient } from 'expo-linear-gradient';
const { width, height } = Dimensions.get('window');
const CarouselComponent = memo(({ index, data, navigation }) => {
    // console.log('reder CarouselComponent ', index);
    const renderItem = useCallback(
        ({ item }) => (
            <TouchableWithoutFeedback onPress={() => navigation.navigate('MovieDetail', { item })}>
                <View style={styles.item}>
                    <Image source={{ uri: item.image }} style={styles.image} />
                    <View
                        className="gap-x-5 gap-y-3 mx-2 h-auto rounded-3xl relative bottom-24"
                        style={{ backgroundColor: 'rgba(60, 60, 60,0.9)' }}
                    >
                        <View className="">
                            <Text className="text-white uppercase text-[22px] leading-8 font-bold" numberOfLines={2}>
                                {item.name}
                            </Text>
                            <Text className="text-gray-400 text-[15px]">{item.duration} phút</Text>
                            <Text className="text-gray-400 text-[15px]" numberOfLines={1}>
                                {item.genres}
                            </Text>
                        </View>
                        <View className="flex-row  justify-between items-center">
                            <View className="flex-row space-x-1">
                                <Icon name="star" size={20} color="#FF9933" />
                                <Text className="text-white font-bold text-sm">8.7/10</Text>
                            </View>
                            <TouchableOpacity
                                className="w-24 mb-2 mr-2 py-2 rounded-[100px] border border-white justify-center items-center "
                                onPress={() => navigation.navigate('Trailer', { item })}
                            >
                                <LinearGradient
                                    colors={['#ED999A', '#F6D365']}
                                    style={styles.gradient}
                                    start={{ x: 0.4, y: 0.1 }}
                                    end={{ x: 0.9, y: 0.2 }}
                                    className="absolute rounded-[100px]"
                                />

                                <Text className="text-white font-bold text-base  ">Đặt Vé</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        ),
        [navigation],
    );
    return (
        <View style={styles.carouselContainer}>
            <Carousel
                keyExtractor={(item) => item.id.toString()}
                width={width}
                height={height * 0.6}
                data={data}
                renderItem={renderItem}
                loop
                scrollAnimationDuration={1000}
                autoPlayInterval={2000}
                mode="parallax"
                // autoPlay
            />
        </View>
    );
});

export default function Home({ navigation }) {
    const [scheduleId, setScheduleId] = useState(1);
    const { data, isLoading, isSuccess } = useMovieSchedule(scheduleId);
    const [index, setIndex] = useState(0);
    const handleIndexChange = (newIndex) => {
        if (scheduleId !== newIndex + 1) {
            setScheduleId(newIndex + 1);
        }
        setIndex(newIndex);
    };

    const banners = [
        { id: 1, img: require('../../assets/img1.png') },
        { id: 2, img: require('../../assets/img1.png') },
        { id: 3, img: require('../../assets/img1.png') },
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
        if (isLoading) {
            return (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="white" />
                </View>
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

    const layout = useWindowDimensions();

    return (
        <Container isScroll={false} style={{ color: 'white', fontWeight: 700 }}>
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
}

const styles = StyleSheet.create({
    carouselContainer: {
        flex: 1,
        marginTop: -35,
    },
    item: {
        flexDirection: 'column',
        borderRadius: 10,
        width: width * 0.96,
        height: height * 0.7,
    },
    image: {
        width: width * 0.96,
        height: height * 0.55,
        objectFit: 'cover',
        borderRadius: 28,
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
