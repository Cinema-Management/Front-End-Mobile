import React, { useCallback, useState } from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
    Text,
    ScrollView,
    TouchableWithoutFeedback,
    ActivityIndicator,
} from 'react-native';
import Container from '../components/Container';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Image } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { formatDate, formatDuration, handleChangAge, handleChangAgeRequirement } from '../utils/Date';
import ButtonPrimary from '../components/ButtonPrimary';
import { useFocusEffect } from '@react-navigation/native';
export default function MovieDetail({ navigation, route }) {
    const { item, index } = route.params;
    const [expanded, setExpanded] = useState(false);
    const maxLength = 265;
    const isTruncated = item.description.length > maxLength;
    const videoUri = item.trailer;
    const [loading, setLoading] = useState(false);
    useFocusEffect(
        useCallback(() => {
            setLoading(true);
            setTimeout(() => {
                setLoading(false);
            }, 500);
        }, []),
    );
    return (
        <Container isScroll={false} back={true} title="Phim" style={{ color: 'white', fontWeight: 700 }}>
            {loading && (
                <ActivityIndicator
                    animating={true}
                    color="#fff"
                    size="large"
                    className="flex-1 justify-center items-center"
                />
            )}
            {!loading && (
                <ScrollView>
                    <TouchableWithoutFeedback
                        onPress={() => navigation.navigate('PlayYoutube', { videoUri: videoUri })}
                    >
                        <View className="bg-red-200 relative">
                            <Image
                                source={{ uri: item.image }}
                                style={{ width: wp(100), height: hp(23) }}
                                resizeMode="cover"
                            />
                            <AntDesign name="playcircleo" size={55} color="white" style={styles.iconPlay} />
                        </View>
                    </TouchableWithoutFeedback>

                    <View className="flex-row px-3 ">
                        <Image source={{ uri: item.image }} style={styles.img} resizeMode="fill" />
                        <View className="flex-1">
                            <Text
                                className="text-white text-base font-bold uppercase mt-[-28px] mb-2"
                                numberOfLines={1}
                            >
                                {item.name}
                            </Text>
                            <View className="flex-row gap-2 ">
                                <View className="flex-row flex-1 p-1 rounded-md border-[#DDDDDD] border justify-center items-center">
                                    <AntDesign name="calendar" size={16} color="#DDDDDD" />
                                    <Text style={styles.text}>{formatDate(item.startDate)}</Text>
                                </View>
                                <View className="flex-row flex-1 p-1 justify-center items-center py-1 ju rounded-md border-gray-300 border">
                                    <AntDesign name="clockcircleo" size={16} color="#DDDDDD" />
                                    <Text style={styles.text}>{formatDuration(62)}</Text>
                                </View>
                            </View>
                            <View className="mt-2 flex-row w-[25%] bg-orange-500 border-orange-500 border justify-center items-center p-1 rounded-2xl ">
                                <Text className="text-[13px] font-bold text-white">
                                    {handleChangAge(item.ageRestriction)}
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ paddingHorizontal: 8, marginTop: 10 }}>
                        <Text style={styles.text}>
                            {expanded || !isTruncated
                                ? item.description
                                : `${item.description.substring(0, maxLength)}... `}
                            {isTruncated && !expanded && (
                                <TouchableWithoutFeedback onPress={() => setExpanded(!expanded)}>
                                    <Text style={{ color: 'orange' }}>Xem thêm</Text>
                                </TouchableWithoutFeedback>
                            )}
                        </Text>
                    </View>

                    <View style={{ borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.3)', marginTop: 8 }}></View>
                    <View className="px-2 py-2 ">
                        <View className="flex-row mb-1 ">
                            <Text style={styles.title}>Kiểm duyệt: </Text>
                            <Text style={styles.textMota} className="uppercase">
                                {handleChangAgeRequirement(item.ageRestriction)}
                            </Text>
                        </View>
                        <View className="flex-row mb-1 ">
                            <Text style={styles.title}>Thể loại: </Text>
                            <Text style={styles.textMota}>{item.genres}</Text>
                        </View>
                        <View className="flex-row mb-1 ">
                            <Text style={styles.title}>Đạo diễn: </Text>
                            <Text style={styles.textMota}>{item.director}</Text>
                        </View>
                        <View className="flex-row mb-1">
                            <Text style={styles.title}>Diễn viên: </Text>
                            <Text style={styles.textMota} numberOfLines={4}>
                                {item.cast}
                            </Text>
                        </View>
                        <View className="flex-row mb-1">
                            <Text style={styles.title}>Quốc gia: </Text>
                            <Text style={styles.textMota}>{item.country}</Text>
                        </View>
                    </View>
                </ScrollView>
            )}
            {index != 1 && !loading && (
                <ButtonPrimary title="Đặt vé" onPress={() => navigation.navigate('Film', { item })} />
            )}
        </Container>
    );
}

const styles = StyleSheet.create({
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2D2D2D',
    },
    errorText: {
        color: 'white',
        fontSize: 18,
    },
    gradient: {
        ...StyleSheet.absoluteFillObject,
    },
    iconPlay: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: [{ translateX: -25 }, { translateY: -25 }],
    },
    img: {
        height: hp(18),
        width: wp(30),
        marginTop: -70,
        borderRadius: 5,
        marginRight: 10,
    },

    text: {
        marginLeft: 4,
        color: '#DDDDDD',
        fontSize: 13,
        fontWeight: 'normal',
    },
    textMota: {
        marginLeft: 4,
        color: '#DDDDDD',
        fontSize: 13,
        fontWeight: 'normal',
        flexWrap: 'wrap',
        flex: 1,
    },
    title: {
        marginLeft: 4,
        color: '#DDDDDD',
        fontSize: 13,
        fontWeight: 'bold',
        width: wp(25),
    },
});
