import React, { useState } from 'react';
import {
    View,
    Text,
    Image,
    SafeAreaView,
    Dimensions,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    TouchableWithoutFeedback,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import phim1 from '../../assets/phim1.png';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { LinearGradient } from 'expo-linear-gradient';
import Container from '../components/Container';
import { colors } from '../constants/colors';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
export default function Review({ navigation }) {
    var { height, width } = Dimensions.get('window');
    const icons = Array(10).fill(0);
    const [text, setText] = useState('');
    const maxLength = 200;

    return (
        <Container isScroll={false} back={true} title="Viết đánh giá" style={{ color: 'white', fontWeight: 700 }}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ height: hp(60) }}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 70 : 130}
            >
                <ScrollView scrollEnabled={false}>
                    <View className="items-center mt-6" style={{ height: hp(60) }}>
                        <View
                            className="bg-[#2D2D2D] h-20 w-11/12 items-center  rounded-xl flex-row px-5 "
                            style={{ backgroundColor: colors.backgroundColor }}
                        >
                            <Image source={phim1} className="h-16 w-16 rounded" resizeMode="fill" />
                            <View className="ml-6">
                                <Text className="text-white text-base font-bold">Đẹp trai thấy sai sai</Text>
                                <Text className="text-white text-sm font-normal">Hài hước, Kinh dị</Text>
                            </View>
                        </View>

                        <Text className="py-4 text-white">Nhấn để đánh giá</Text>
                        <View className="flex-row space-x-1">
                            {icons.map((_, index) => (
                                <TouchableOpacity key={index}>
                                    <Icon key={index} name="star-outline" size={25} color="white" />
                                </TouchableOpacity>
                            ))}
                        </View>
                        <View className="border-[0.5px] my-4 border-[#62656A]" style={{ width: width * 0.9 }} />
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
                </ScrollView>
            </KeyboardAvoidingView>
            <View className="px-5 " style={{ height: hp(30) }}>
                <TouchableOpacity className="border border-white h-14 w-[80px] items-center justify-center rounded-[10px]">
                    <Ionicons name="image-outline" size={26} color="#FF9900" />
                    <Text className="text-white font-normal">Thêm ảnh</Text>
                </TouchableOpacity>
                <View className="border-[0.5px] my-4 border-[#62656A]" style={{ width: width * 0.9 }} />

                <TouchableOpacity className=" py-3 my-5">
                    <LinearGradient
                        colors={['#ED999A', '#F6D365']}
                        style={styles.gradient}
                        start={{ x: 0.4, y: 0.1 }}
                        end={{ x: 0.9, y: 0.2 }}
                        className="absolute rounded-lg"
                    />
                    <Text
                        style={styles.buttonText}
                        className="text-center text-[18px] 
                  font-medium text-black leading-5 "
                    >
                        Gửi đánh giá
                    </Text>
                </TouchableOpacity>
            </View>
        </Container>
    );
}
const styles = StyleSheet.create({
    textArea: {
        height: 180,
        borderColor: 'gray',
        borderWidth: 1,
        width: '90%',
        borderRadius: 20,
        backgroundColor: '#2D2D2D',
        color: 'white',
        padding: 10,
        marginTop: 10,
        fontSize: 14,
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
