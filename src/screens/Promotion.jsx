import React, { useState } from 'react';
import { SafeAreaView, View, Text, useWindowDimensions, Image, Dimensions, ScrollView } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import phim1 from '../../assets/phim1.png';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Container from '../components/Container';
import { colors } from '../constants/colors';
var { height, width } = Dimensions.get('window');

const FirstRoute = () => (
    <ScrollView style={{ flex: 1, marginBottom: 30 }} showsVerticalScrollIndicator={false}>
        <View className="items-center my-6 space-y-3 py-2">
            <View
                className="flex-row items-center justify-center h-24 rounded-xl px-4"
                style={{ width: width * 0.9, backgroundColor: colors.backgroundColor }}
            >
                <Image source={phim1} className="h-20 w-16 rounded" resizeMode="contain" />
                <View className="flex-1 ml-3">
                    <Text className="text-white text-base font-bold ">Giá ưu đãi cho học sinh, sinh viên</Text>
                </View>
            </View>

            <View
                className="flex-row items-center justify-center h-24 rounded-xl px-4"
                style={{ width: width * 0.9, backgroundColor: colors.backgroundColor }}
            >
                <Image
                    source={phim1}
                    className="h-20 w-24 rounded"
                    resizeMode="center
                "
                />
                <View className="flex-1 ml-3">
                    <Text className="text-white text-base font-bold">Giá ưu đãi cho học sinh, sinh viên</Text>
                </View>
            </View>
        </View>
    </ScrollView>
);

const SecondRoute = () => (
    <ScrollView style={{ flex: 1, marginBottom: 30 }} showsVerticalScrollIndicator={false}>
        <View className="items-center my-6 space-y-3 py-2">
            <View
                className="flex-row items-center justify-center h-24 rounded-xl px-4"
                style={{ width: width * 0.9, backgroundColor: colors.backgroundColor }}
            >
                <Image source={phim1} className="h-20 w-16 rounded" resizeMode="contain" />
                <View className="flex-1 ml-3">
                    <Text className="text-white text-base font-bold ">Mừng ngày 2/9 khuyến mãi lớn</Text>
                </View>
            </View>
        </View>
    </ScrollView>
);

const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
});

const renderTabBar = (props) => (
    <TabBar
        {...props}
        renderLabel={({ route, focused, color }) => (
            <Text
                style={{
                    color: focused ? 'white' : 'gray',
                    textTransform: 'none',
                    fontWeight: focused ? 600 : 400,
                    paddingHorizontal: 10,
                    fontSize: 16,
                }}
            >
                {route.title}
            </Text>
        )}
        indicatorStyle={{ backgroundColor: 'white' }}
        style={{ backgroundColor: 'transparent' }}
    />
);

export default function Promotion() {
    const layout = useWindowDimensions();

    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'first', title: 'Khuyến mãi lớn' },
        { key: 'second', title: 'Tin bảng lề' },
    ]);

    return (
        <Container isScroll={false} title="Tin mới và Ưa đãi" style={{ color: 'white', fontWeight: 700 }}>
            <TabView
                style={{ height: hp(100) }}
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={{ width: layout.width }}
                renderTabBar={renderTabBar}
            />
        </Container>
    );
}
