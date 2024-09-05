import React from "react";
import { StyleSheet, TouchableOpacity,View,Text,ImageBackground,Dimensions, ScrollView,Image } from "react-native";
import image1 from '../../assets/img1.png';
import logo from '../../assets/logo.png';
import fblogo from '../../assets/fblogo.png';
import gglogo from '../../assets/gglogo.png';
import aplogo from '../../assets/aplogo.png';
import { LinearGradient } from "expo-linear-gradient";
export default function SignInHome({ navigation }) {
    var {height, width} = Dimensions.get('window');
    return (
          <ImageBackground
          source={image1}
          className="flex-1 " 
          style={{width,height}}
          
        >
          <LinearGradient
           colors={['transparent', 'rgba(23,23,23,0.9)','rgba(23,23,23,0.97)']}
           style={{width,height}}
           start={{x:10, y:0}}
           end={{x:0, y: 0}}
           className="absolute "
           />

            <View className="flex-2 h-3/5 justify-center items-center  " >
               <Image source={logo}/>
            </View>
            <View className="flex-2 h-2/5 px-6 gap-2 pb-10  ">
               <TouchableOpacity className="flex-row py-3 px-6   rounded-[30px] bg-[#1977F3]"  onPress={() => navigation.navigate("Welcome")} >
                  <View className="flex-row items-center space-x-8">
                  <Image source={fblogo} className="h-6 w-6"/>
                  <Text className="text-white font-bold text-base">Đăng nhập bằng Facebook</Text>
                  </View>
               </TouchableOpacity>
               <TouchableOpacity className="flex-row py-3 px-6   rounded-[30px] bg-[#FFFFFF]">
                  <View className="flex-row items-center space-x-8">
                  <Image source={gglogo} className="h-6 w-6"/>
                  <Text className="text-black font-bold text-base">Đăng nhập bằng Google</Text>
                  </View>
               </TouchableOpacity>
               <TouchableOpacity className="flex-row py-3 px-6   rounded-[30px] bg-[#FFFFFF]">
                  <View className="flex-row items-center space-x-8">
                  <Image source={aplogo} className="h-6 w-5 "/>
                  <Text className="text-black font-bold text-base">Đăng nhập bằng Google</Text>
                  </View>
               </TouchableOpacity>

               <View className="flex-row items-center gap-2 ">
               <View className="flex-1 border-dashed border-[1px] border-[#62656A] " />
               <Text className="mx-4 text-sm font-bold text-white">hoặc</Text>
               <View className="flex-1 border-dashed border-[1px] border-[#62656A]" />
               </View>
               
               <TouchableOpacity
                  className="px-6 py-3 gap-2"
                  onPress={() => navigation.navigate("SignInEmail")}
               >
                  <LinearGradient
                     colors={['#ED999A', '#F6D365']}
                     style={styles.gradient}
                     start={{x:0.4, y:0.1}}
                     end={{x:0.5, y: 1}}
                     className="absolute rounded-lg"
                     />
                  <Text style={styles.buttonText} className="text-center text-lg text-[18px] font-medium text-neutral-900 leading-5 font-kanit">Đăng nhập bằng mật khẩu</Text>
               </TouchableOpacity>

               <View className="items-center gap-2">
                  <Text className="text-sm text-white font-bold">Không có tài khoản? 
                     <Text className="text-[#F6D365] font-bold" > Đăng ký</Text>
                  </Text>
               </View>
            </View>

          </ImageBackground>
    );
    };
    const styles = StyleSheet.create({
      gradient: {
        ...StyleSheet.absoluteFillObject, 
      },
  });
    
