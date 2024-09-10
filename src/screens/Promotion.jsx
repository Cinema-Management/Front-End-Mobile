import React, { useState } from 'react';
import { SafeAreaView, View, Text, useWindowDimensions, Image, Dimensions } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import phim1 from '../../assets/phim1.png';

var { height, width } = Dimensions.get('window');

const FirstRoute = () => (
    <View className="flex-1 bg-[#1c1c1c]">
        <View className="items-center my-6 space-y-3 py-2">
            <View
                className="flex-row items-center justify-center h-24 bg-[#494949] rounded-xl px-4"
                style={{ width: width * 0.9 }}
            >
                <Image source={phim1} className="h-20 w-32 rounded" />
                <View className="flex-1 ml-3">
                    <Text className="text-white text-base font-bold ">Giá ưu đãi cho học sinh, sinh viên</Text>
                </View>
            </View>

            <View
                className="flex-row items-center justify-center h-24 bg-[#494949] rounded-xl px-4"
                style={{ width: width * 0.9 }}
            >
                <Image source={phim1} className="h-20 w-32 rounded" />
                <View className="flex-1 ml-3">
                    <Text className="text-white text-base font-bold">Giá ưu đãi cho học sinh, sinh viên</Text>
                </View>
            </View>
        </View>
    </View>
);

const SecondRoute = () => (
    <View className="flex-1 bg-[#1c1c1c]">
        <View className="items-center my-6 space-y-3 py-2">
            <View
                className="flex-row items-center justify-center h-24 bg-[#494949] rounded-xl px-4"
                style={{ width: width * 0.9 }}
            >
                <Image source={phim1} className="h-20 w-32 rounded" />
                <View className="flex-1 ml-3">
                    <Text className="text-white text-base font-bold ">Mừng ngày 2/9 khuyến mãi lớn</Text>
                </View>
            </View>
        </View>
    </View>
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
                    fontSize: 16,
                    fontWeight: focused ? 600 : 400,
                    paddingHorizontal: 10,
                }}
            >
                {route.title}
            </Text>
        )}
        indicatorStyle={{ backgroundColor: 'white' }}
        style={{ backgroundColor: '#1c1c1c' }}
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
        <SafeAreaView style={{ flex: 1, backgroundColor: '#1c1c1c' }}>
            <View
                style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row', paddingHorizontal: 20 }}
            >
                <Text style={{ fontSize: 24, color: 'white', fontWeight: '500' }}>Tin mới và Ưu đãi</Text>
            </View>
            <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={{ width: layout.width }}
                renderTabBar={renderTabBar}
                style={{ marginTop: 16 }}
            />
        </SafeAreaView>
    );
}
