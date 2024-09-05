import React, { useState } from 'react';
import { View, Text, Image, SafeAreaView, Dimensions,StyleSheet, TouchableOpacity, FlatList, useWindowDimensions } from 'react-native';
import phim1 from '../../assets/phim1.png';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
const { width,height } = Dimensions.get('window');

export default function Home({ navigation }) {

  const carouselItems = [
    { title: 'Đẹp trai có gì sai ', time: '102 phút', category: 'Hài hước, Kinh dị', img: phim1 },
    { title: 'Ma da', time: '102 phút', category: 'Hài hước, Kinh dị', img: phim1 },
    { title: 'Ngôi nhà ma', time: '102 phút', category: 'Hài hước, Kinh dị', img: phim1 },
  ];

  const FirstRoute = () => (
    <View className="flex-1 bg-[#1c1c1c]" >
      <View className="pt-3">
         <FlatList
           data={carouselItems}
           renderItem={renderItem}
           keyExtractor={(item, index) => index.toString()}
           horizontal
           showsHorizontalScrollIndicator={false}
         />
         </View>
    </View>
  );
  
  const SecondRoute = () => (
    <View className="flex-1 bg-[#1c1c1c]" >
      <View className="pt-3">
         <FlatList
           data={carouselItems}
           renderItem={renderItem}
           keyExtractor={(item, index) => index.toString()}
           horizontal
           showsHorizontalScrollIndicator={false}
         />
         </View>
    </View>
  );

  const ThirdRoute = () => (
    <View className="flex-1 bg-[#1c1c1c]" >
      <View className="pt-3">
         <FlatList
           data={carouselItems}
           renderItem={renderItem}
           keyExtractor={(item, index) => index.toString()}
           horizontal
           showsHorizontalScrollIndicator={false}
         />
         </View>
    </View>
  );
  
  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
    third: ThirdRoute,
  });
  
  const renderTabBar = (props) => (
    <TabBar
      {...props}
      renderLabel={({ route, focused, color }) => (
        <Text style={{ color: focused ? 'white' : 'gray', textTransform: 'none', fontSize: 16, fontWeight: focused ? 600 : 400, paddingHorizontal: 10 }}>
          {route.title}
        </Text>
      )}
      indicatorStyle={{ backgroundColor: '#1c1c1c' }}
      style={{ backgroundColor: '#1c1c1c' }}
    />
  );

  const layout = useWindowDimensions();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "first", title: "Đang chiếu" },
    { key: "second", title: "Đặc biệt" },
    { key: "third", title: "Sắp chiếu" },
  ]);


  const renderItem = ({ item }) => (
    <View style={styles.item} >
    <Image source={item.img} style={styles.image} />
    
    <View className="bg-[#494949] gap-5 left-8 w-11/12 h-auto rounded-3xl relative bottom-24">
      <View className=" ">
        <Text className="text-white text-[28px] leading-8 font-bold "
          numberOfLines={1} 
          ellipsizeMode="tail">{item.title}
        </Text>
        <Text className="text-gray-500 text-sm ">{item.time}</Text>
        <Text className="text-gray-500 text-sm">{item.category}</Text>
      </View>
      <View className = "flex-row justify-between items-center ">
        <View className="flex-row space-x-1 ">
          <Icon name="star" size={20} color="#FF9933"/>
          <Text className="text-white font-bold text-sm">8.7/10</Text>
        </View>
        <TouchableOpacity className="bg-red-400 w-24 mb-2 mr-2 h-10 rounded-[100px] justify-center items-center flex-row space-x-2 ">
          <Icon name="play-circle-outline" size={20} color="black"/>
          <Text className="text-black text-sm">Trailer</Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
  );

  return (
  <SafeAreaView style={{ flex: 1, backgroundColor: "#1c1c1c" }}>
    <View className=" h-[60px] justify-center ">
       <Text className="text-white text-[24px] leading-7 mx-6">Chào, Tùng</Text>
    </View>
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      renderTabBar={renderTabBar}
    />
  </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: 'column', 
    margin: 15,
    borderRadius: 10,
    width: width*0.9,
    height: height*0.6,
    
  },
  image: {
    width: '100%',
    height: height*0.55,
    objectFit: 'fill',
    borderRadius: 32,
  },
});

