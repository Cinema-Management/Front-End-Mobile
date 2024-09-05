import React, { useState } from "react";
import { View, Text, Image, SafeAreaView, Dimensions,StyleSheet, TouchableOpacity, TextInput, TouchableWithoutFeedback } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import phim1 from '../../assets/phim1.png';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import dismissKeyboard from 'react-native/Libraries/Utilities/dismissKeyboard';
import { LinearGradient } from "expo-linear-gradient";

export default function DanhGia({ navigation }) {
    var {height, width} = Dimensions.get('window');
    const icons = Array(10).fill(0); 
    const [text, setText] = useState('');
    const maxLength = 200;

    return (
        <TouchableWithoutFeedback style= { { flex:1}} onPress={dismissKeyboard}>
            <SafeAreaView className="flex-1 text-white p-3 bg-[#1c1c1c]">
                <View className="items-center flex-row  px-5 space-x-16">
                    <TouchableOpacity className=" bg-[#555555] w-10 h-10 rounded-[100px] justify-center items-center ">
                        <Ionicons name="chevron-back" size={30} color="white" style={{padding: '8px',}}/>
                    </TouchableOpacity>
                    <Text className="text-[24px] text-white leading-[26px] font-medium">Viết đánh giá</Text>
                </View>
                <View className="items-center mt-4" style={{height: height*0.6}}>
                    <View className="bg-[#2D2D2D] h-20 w-11/12 items-center  rounded-xl flex-row px-5 ">
                        <Image source={phim1} className="w-[50px] h-[50px]" style={{objectFit: "fill"}}/>
                        <View className="ml-6">
                            <Text className="text-white text-base font-bold">Đẹp trai thấy sai sai</Text>
                            <Text className="text-white text-sm font-normal">Hài hước, Kinh dị</Text>
                        </View>
                    </View>

                    <Text className="py-4 text-white">Nhấn để đánh giá</Text>
                    <View className="flex-row space-x-1">
                        {icons.map((_, index) => (
                            <TouchableOpacity>
                                <Icon key={index} name="star-outline" size={25} color="white" />
                            </TouchableOpacity>
                        ))}
                    </View>
                    <View className="border-[0.5px] my-4 border-[#62656A]" style={{width: width*0.9}}/>
                    <Text className="font-bold text-sm text-white py-2 relative -left-24">Cảm nhận về bộ phim</Text>
                    
                    <TextInput
                        style={styles.textArea}
                        multiline={true}
                        numberOfLines={5}
                        placeholder="Viết cảm nhận của bạn...."
                        placeholderTextColor="white"
                        value={text}
                        onChangeText={setText}
                        maxLength={maxLength}
                    />
                    <Text style={styles.counter}>{`${text.length}/${maxLength}`}</Text>
                </View>
                    
                <View className="flex-1 px-5 ">
                    <TouchableOpacity className="border border-white h-14 w-[80px] items-center justify-center rounded-[10px]"> 
                        <Ionicons name="image-outline" size={26} color="#FF9900" />
                        <Text className="text-white font-normal">Thêm ảnh</Text>
                    </TouchableOpacity>
                    <View className="border-[0.5px] my-4 border-[#62656A]" style={{width: width*0.9}}/>

                    <TouchableOpacity
                  className=" py-3 my-5"
               >
                  <LinearGradient
                     colors={['#ED999A', '#F6D365']}
                     style={styles.gradient}
                     start={{x:0.4, y:0.1}}
                     end={{x:0.9, y: 0.2}}
                     className="absolute rounded-lg"
                     />
                  <Text style={styles.buttonText} className="text-center text-[18px] 
                  font-medium text-black leading-5 font-kanit">Gửi đánh giá</Text>
               </TouchableOpacity>
                </View>
            </SafeAreaView>
  		</TouchableWithoutFeedback>
    );
    }
const styles = StyleSheet.create({
    textArea: {
        height: 180,
        borderColor: "gray",
        borderWidth: 1,
        width: '90%',
        borderRadius: 20,
        backgroundColor: '#2D2D2D',
        color: 'white',
        padding: 10,
        marginTop: 10,
        fontSize: 14
    },
    counter: {
        position: 'relative',
        bottom: 30,
        right: -120,
        color: 'white',
        fontSize: 14,
      },
    gradient: {
        ...StyleSheet.absoluteFillObject, 
    },
});