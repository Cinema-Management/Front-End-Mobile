import React from "react";
import { View, Text, ImageBackground,Dimensions, Image, ScrollView, SafeAreaView,TouchableOpacity,TextInput,StyleSheet } from "react-native";
import image1 from '../../assets/img1.png';
import logo from '../../assets/logo.png';
import { LinearGradient } from "expo-linear-gradient";
import Ionicons from '@expo/vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { SelectList } from 'react-native-dropdown-select-list';

export default function Register({navigation}) {
    var {height, width} = Dimensions.get('window');
    const [selected, setSelected] = React.useState("");
    console.log(selected);
    const data = [
        {key:'0', value:'Nam'},
        {key:'1', value:'Nữ'},
    ]
  
    return (
       <ImageBackground
       source={image1}
       className="flex-1 " 
       style={{width,height}}>

         <LinearGradient
           colors={['transparent', 'rgba(23,23,23,0.9)','rgba(23,23,23,0.9)']}
           style={{width,height}}
           start={{x:10, y:0}}
           end={{x:0, y: 0}}
           className="absolute "
           />
            <SafeAreaView className="flex-1" >

              <View className="flex-1 h-2/6 ">
                   <TouchableOpacity className=" bg-[#555555] w-10 h-10 rounded-[100px] justify-center items-center ml-5">
                        <Ionicons name="chevron-back" size={30} color="white" style={{padding: '8px',}}/>
                    </TouchableOpacity>
                    <Image className="m-auto" source={logo}/>
              </View>
                <View className="flex-2 h-4/6 mx-5 " >
                  <View className="h-[75px]">
                    <View className="flex-row items-center rounded-[20px] h-[50px] bg-[#3b3b3b] justify-evenly border border-white">
                      <Icon name="account" size={20} color="#fff"/>
                      <TextInput
                                placeholder="Họ và tên"
                                placeholderTextColor="white" 
                                className="text-[15px] leading-5 font-bold w-64 h-[50px] text-white" />
                    </View>
                    <Text className="text-red-600 pl-4 mt-1">Bắt buộc nhập</Text>
                  </View>

                  <View className="h-[75px]">
                    <View className="flex-row items-center rounded-[20px] h-[50px] bg-[#3b3b3b] justify-evenly border border-white">
                      <Icon name="phone" size={20} color="#fff"/>
                      <TextInput
                                placeholder="Số điện thoại hoặc email"
                                placeholderTextColor="white" 
                                className="text-[15px] leading-5 font-bold w-64 h-[50px] text-white" />
                    </View>
                    <Text className="text-red-600 pl-4 mt-1">Bắt buộc nhập</Text>
                  </View>

                  <View className="h-[75px]">
                    <View className="flex-row items-center rounded-[20px] h-[50px] bg-[#3b3b3b] justify-evenly border border-white">
                      <Icon name="key-variant" size={20} color="#fff"/>
                      <TextInput
                                placeholder="Mật khẩu"
                                placeholderTextColor="white" 
                                className="text-[15px] leading-5 font-bold w-64 h-[50px] text-white" />
                      <Icon name="eye" size={20} color="#fff"/>
                    </View>
                    <Text className="text-red-600 pl-4 mt-1">Bắt buộc nhập</Text>
                  </View>
                  
                  <View className="h-[75px]">
                    <View className="flex-row items-center rounded-[20px] h-[50px] bg-[#3b3b3b] justify-evenly border border-white">
                      <Icon name="key-variant" size={20} color="#fff"/>
                      <TextInput
                                placeholder="Xác nhận mật khẩu"
                                placeholderTextColor="white" 
                                className="text-[15px] leading-5 font-bold w-64 h-[50px] text-white" />
                      <Icon name="eye-off" size={20} color="#fff"/>
                    </View>
                    <Text className="text-red-600 pl-4 mt-1">Bắt buộc nhập</Text>
                  </View>

                  <View className="h-[75px] flex-row justify-between">
                  <SelectList 
                    setSelected={(val) => setSelected(val)} 
                    data={data} 
                    save="value"
                    style={{color: 'red'}}
                    defaultOption={{value: 'Nam', key: '1'}} 
                    boxStyles={{ 
                      backgroundColor: '#3b3b3b', 
                      borderRadius: 20, 
                      width: 120, 
                      borderColor: 'white',
                      zIndex: 20, 
                      position: 'absolute'
                    }}
                    inputStyles={{ color: 'white', fontSize: 15 ,fontWeight: 'bold'}}
                    dropdownStyles={{ 
                      backgroundColor: '#3b3b3b', 
                      width: 120, 
                      height: 60,
                      fontSize: 15,
                      zIndex: 20, 
                      position: 'absolute' 
                    }}
                    dropdownTextStyles={{ color: 'white', fontSize: 15, marginTop: -10, fontWeight: 'bold' }}
                  />
                  </View>
                 

          
                  
                  <SelectList 
                    setSelected={(val) => setSelected(val)} 
                    data={data} 
                    save="value"
                    style={{color: 'red'}}
                    boxStyles={{ 
                      backgroundColor: '#3b3b3b', 
                      borderRadius: 20, 
                      width: 120, 
                      borderColor: 'white',
                      zIndex: 10, // Đặt zIndex thấp hơn
                      position: 'absolute' // Đảm bảo có thuộc tính position
                    }}
                    inputStyles={{ color: 'white', fontSize: 15 }}
                    dropdownStyles={{ 
                      backgroundColor: '#3b3b3b', 
                      width: 120, 
                      borderRadius: 20,
                      fontSize: 15,
                      zIndex: 10, // Đặt zIndex thấp hơn
                      position: 'absolute' // Đảm bảo có thuộc tính position
                    }}
                    dropdownTextStyles={{ color: 'white', fontSize: 15 }}
                  />

                </View>
            </SafeAreaView>
       </ImageBackground>
    );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#333',
  },
  dropdownBtnStyle: {
    width: '80%',
    height: 50,
    backgroundColor: '#3b3b3b',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#fff',
  },
  dropdownBtnTextStyle: {
    color: '#fff',
    textAlign: 'left',
    fontSize: 16,
  },
  dropdownStyle: {
    backgroundColor: '#3b3b3b',
  },
  rowTextStyle: {
    color: '#fff',
    textAlign: 'left',
  },
});
