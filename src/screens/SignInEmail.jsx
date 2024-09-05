import React, {useState} from "react";
import { StyleSheet,Platform, TouchableOpacity,View,Text,ImageBackground,Dimensions, ScrollView,Image, TextInput,KeyboardAvoidingView } from "react-native";
import image1 from '../../assets/img1.png';
import logo from '../../assets/logo.png';
import user from '../../assets/user.png';
import lock from '../../assets/lock.png';
import eye from '../../assets/eye.png';
import { LinearGradient } from "expo-linear-gradient";
import Checkbox from "expo-checkbox";
import { Icon } from "react-native-elements";



export default function SignInEmail({ navigation }) {
    var {height, width} = Dimensions.get('window');
    const [isSelected, setSelection] = useState(false);
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
              <KeyboardAvoidingView 
                 behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                 style={{flex: 1}}>
            <View className="flex-2 h-2/4 justify-center items-center  " >
               <Image source={logo}/>
            </View>
            <View className="flex-2 h-2/4 px-6 pb-10 gap-3 ">
 
                 <View className="h-[150px] ">
                     <View className="gap-1 mb-2 h-1/2">
                        <View className="flex-row  items-center px-4 rounded-[20px] border-white border-[1px] ">
                           <Image source={user} className="mr-6"/>
                           <TextInput
                              placeholder="Số điện thoại hoặc email"
                              placeholderTextColor="white" 
                              className="text-[15px] leading-5 font-bold w-64 h-[50px] text-white" />
                        </View>
                        <Text className="text-red-600 m-[-10px] pl-5 text-xs">Sai số điện thoại</Text>
                     </View>

                     <View className="gap-1 mb-3 h-1/2">
                        <View className="flex-row  items-center px-4 rounded-[20px] border-white border-[1px] ">
                           <Image source={lock} className="mr-6"/>
                           <TextInput 
                              placeholder="Mật khẩu" 
                              placeholderTextColor="white"
                              secureTextEntry={true}
                              className="text-[15px] leading-5 font-bold w-56 h-[50px] text-white " />
                           <TouchableOpacity>
                              <Image source={eye} className="ml-3"/>
                           </TouchableOpacity>
                        </View>
                        <Text className="text-red-600 m-[-10px]  pl-5 text-xs">Sai số điện thoại</Text>
                     </View>
                 </View>

                  <View className="flex-row justify-between items-center  ">
                     <View className="flex-row items-center ">
                        <Checkbox value={isSelected} onValueChange={setSelection} />
                        <Text className="text-white text-sm font-normal ml-2">Lưu mật khẩu</Text>
                     </View>
          
                     <TouchableOpacity>
                     <Text className="text-[#EC870E] text-sm font-bold">Quên mật khẩu?</Text>
                     </TouchableOpacity>
                  </View>

               <View className="flex-row items-center">
               <View className="flex-1 border-dashed border-[1px] border-[#62656A] " />
               <Text className="mx-4 text-sm font-bold text-white">hoặc</Text>
               <View className="flex-1 border-dashed border-[1px] border-[#62656A]" />
               </View>
               
               <TouchableOpacity
                  className="px-6 py-3 "
                  onPress={() => navigation.navigate("SignInHome")}
               >
                  <LinearGradient
                     colors={['#ED999A', '#F6D365']}
                     style={styles.gradient}
                     start={{x:0.4, y:0.1}}
                     end={{x:0.9, y: 0.2}}
                     className="absolute rounded-lg"
                     />
                  <Text style={styles.buttonText} className="text-center text-[18px] 
                  font-medium text-neutral-900 leading-5 font-kanit">Đăng nhập </Text>
               </TouchableOpacity>

               <View className="flex-row  justify-center ">
                  <TouchableOpacity className="bg-[#2f2f2f] p-4 rounded-xl mr-3">
                     <Icon name="facebook"
                      type="font-awesome" size={18} 
                      color="white" className="bg-[#3399FF] rounded-2xl px-2 py-1"/>
                  </TouchableOpacity>
                  <TouchableOpacity className="bg-[#2f2f2f] p-4 rounded-xl mr-3">
                     <Icon name="google"
                      type="font-awesome" size={18} 
                      color="white" className=" rounded-2xl px-2 py-1"/>
                  </TouchableOpacity>
                  <TouchableOpacity className="bg-[#2f2f2f] p-4 rounded-xl">
                       <Icon name="apple"
                      type="font-awesome" size={18} 
                      color="#999999" className="rounded-2xl px-2 py-1"/>
                   </TouchableOpacity>
               </View>

               <View className="items-center ">
                  <Text className="text-sm text-white font-bold">Không có tài khoản? 
                     <Text className="text-[#F6D365] font-bold" onPress={() => navigation.navigate("Register")}> Đăng ký</Text>
                  </Text>
               </View>
            </View>
            </KeyboardAvoidingView>
          </ImageBackground>
    );
    };
    const styles = StyleSheet.create({
      gradient: {
        ...StyleSheet.absoluteFillObject, 
      },
  });