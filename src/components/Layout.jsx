import React, { useState } from 'react';
import {
    View,
    Text,
    ImageBackground,
    Dimensions,
    Image,
    ScrollView,
    SafeAreaView,
    TouchableOpacity,
    TextInput,
    StyleSheet,
    KeyboardAvoidingView,
    FlatList,
    Platform,
} from 'react-native';
import image1 from '../../assets/img1.png';
import phim1 from '../../assets/phim1.png';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from '@expo/vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { AntDesign } from '@expo/vector-icons';
import Checkbox from 'expo-checkbox';
export default function Layout({ navigation }) {
    var { height, width } = Dimensions.get('window');

    return (
        <ImageBackground source={image1} className="flex-1 " style={styles.container}>
            <LinearGradient
                colors={['transparent', 'rgba(23,23,23,0.9)', 'rgba(23,23,23,0.9)']}
                style={{ width, height }}
                start={{ x: 10, y: 0 }}
                end={{ x: 0, y: 0 }}
                className="absolute "
            />
            {/* <SafeAreaView style={styles.container}> */}
            {/* Header */}
            <View style={styles.header}>
                {/* <TouchableOpacity className="bg-[#555555] w-10 h-10 rounded-[100px] justify-center items-center">
                        <Ionicons name="chevron-back" size={30} color="white" style={{ padding: '8px' }} />
                    </TouchableOpacity>
                    <Text className="text-[24px] text-white leading-[26px] font-medium">Thông tin tài khoản</Text> */}
            </View>

            {/* Content */}
            <View style={styles.main}></View>

            {/* Footer */}
            <View style={styles.footer}>
                {/* <TouchableOpacity className="py-3 my-5">
                        <LinearGradient
                            colors={['#ED999A', '#F6D365']}
                            style={{ borderRadius: 10, padding: 15 }}
                            start={{ x: 0.4, y: 0.1 }}
                            end={{ x: 0.9, y: 0.2 }}
                        >
                            <Text style={{ textAlign: 'center', fontSize: 18, fontWeight: 'bold', color: 'black' }}>
                                Cập nhật
                            </Text>
                        </LinearGradient>
                    </TouchableOpacity> */}
            </View>
            {/* </SafeAreaView> */}
        </ImageBackground>
    );
}
const styles = StyleSheet.create({
    container: {
        height: hp(100),
        backgroundColor: 'red',
    },
    header: {
        height: hp(10),
        backgroundColor: 'blue',
    },
    main: {
        height: hp(80),
        backgroundColor: 'green',
    },
    footer: {
        height: hp(10),
        backgroundColor: 'yellow',
    },
    gradient: {
        ...StyleSheet.absoluteFillObject,
    },
});
