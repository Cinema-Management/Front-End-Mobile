import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    TouchableWithoutFeedback,
    Modal,
    ActivityIndicator,
} from 'react-native';
import Container from '../components/Container';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { EvilIcons, Feather, FontAwesome } from '@expo/vector-icons';
import { parseFormattedDateWithTime, generateDates, formatTime } from '../utils/Date';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { LinearGradient } from 'expo-linear-gradient';
import dayjs from 'dayjs';
import 'dayjs/locale/vi';
import useSchedule from '../queries/useSchedule';
dayjs.locale('vi');
const Film = ({ navigate, route }) => {
    const { item, showtime } = route.params || {};
    const navigation = useNavigation();
    const [selectedDate, setSelectedDate] = useState(dayjs().format('DD-MM'));
    const [displayDate, setDisplayDate] = useState(generateDates()[0].fullDateString);
    const isoDate = useMemo(() => parseFormattedDateWithTime(displayDate), [displayDate]);
    const [openCinemas, setOpenCinemas] = useState({});
    const [cityCounts, setCityCounts] = useState([]);
    const [title, setTitle] = useState('Tất cả rạp');
    const [filterData, setFilterData] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const handleDateSelection = (date) => {
        setSelectedDate(date.fullDate);
        setFilterData([]);
        setDisplayDate(date.fullDateString);
    };

    const { data, isLoading, isSuccess, refetch } = useSchedule(item?.code || showtime?.movieCode, isoDate);

    useFocusEffect(
        useCallback(() => {
            refetch();
        }, [refetch]),
    );

    const toggleCinema = (index) => {
        setOpenCinemas((prev) => ({
            ...prev,
            [index]: !prev[index],
        }));
    };
    const removeCityPrefix = (city) => {
        if (city.includes('Thành phố')) {
            return city.replace('Thành phố', '').trim();
        }
        if (city.includes('Tỉnh')) {
            return city.replace('Tỉnh', '').trim();
        }
        return city;
    };

    useEffect(() => {
        const counts = {};
        if (data && data.length > 0) {
            data[0]?.cinemas.forEach((cinema) => {
                const originalCity = cinema.province;
                const city = removeCityPrefix(originalCity);

                counts[city] = (counts[city] || 0) + 1;
            });
            setCityCounts(Object.entries(counts));
        } else {
            setCityCounts([]);
        }
    }, [data]);

    const handleFilter = (city) => {
        if (city === 'Tất cả') {
            setFilterData([]);
            setModalVisible(false);
            setTitle('Tất cả rạp');
            return;
        }
        const filteredData = data[0].cinemas.filter((item) => removeCityPrefix(item.province) === city);

        setTitle(city);
        setFilterData(filteredData);
        setModalVisible(false);
    };

    const renderCinemas = (data) => {
        return (data[0]?.cinemas || data).map((cinema, index) => (
            <View key={index} style={[styles.cinemaContainer, index === 0 ? styles.firstCinemaContainer : null]}>
                <TouchableWithoutFeedback onPress={() => toggleCinema(index)}>
                    <View>
                        <View style={styles.cinemaHeader}>
                            <Text style={styles.cinemaName} numberOfLines={1}>
                                {cinema.name}
                            </Text>
                            <View className="flex-row justify-center items-center ">
                                <Text className="mr-1 text-orange-500">2,1 Km</Text>

                                {openCinemas[index] ? (
                                    <FontAwesome name="angle-up" size={25} color="white" style={{ marginTop: -3 }} />
                                ) : (
                                    <FontAwesome name="angle-down" size={25} color="white" style={{ marginTop: -2 }} />
                                )}
                            </View>
                        </View>
                        <View className="flex-row items-center mb-2 ">
                            <EvilIcons name="location" size={20} color="rgba(255, 255, 255, 0.5)" />
                            <Text style={styles.cinemaAddress} numberOfLines={2}>
                                {cinema.address}
                            </Text>
                        </View>
                    </View>
                </TouchableWithoutFeedback>

                {openCinemas[index] && (
                    <View>
                        {cinema.screeningFormats.map((item, idx) => (
                            <View key={idx} className="mb-2">
                                <View className="flex-row items-center">
                                    <Feather name="circle" size={11} color="orange" />
                                    <Text
                                        className="text-white text-[15px] font-light ml-1 uppercase"
                                        numberOfLines={1}
                                    >
                                        {item.name} {item.audio === 'Gốc' ? '' : ' ' + item.audio}
                                        <Text className="text-[15px]"> Phụ đề </Text>
                                        {item.subtitle}
                                    </Text>
                                </View>
                                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                    <View className="flex-row py-2 ">
                                        {item.showtimes.map((time, idx) => (
                                            <TouchableOpacity
                                                key={idx}
                                                style={[styles.timeButton]}
                                                onPress={() =>
                                                    navigation.navigate('Seat', {
                                                        showtime: {
                                                            ...time,
                                                            screeningFormat: item.name,
                                                            audio: item.audio,
                                                            subtitle: item.subtitle,
                                                            cinema: cinema.name,
                                                            movie: item.movie,
                                                            movieCode: item.movieCode,
                                                            image: item.image,
                                                            ageRestriction: item.ageRestriction,
                                                            province: cinema.province,
                                                        },
                                                    })
                                                }
                                            >
                                                <Text style={[styles.timeText]}>{formatTime(time.startTime)}</Text>
                                            </TouchableOpacity>
                                        ))}
                                    </View>
                                </ScrollView>
                            </View>
                        ))}
                    </View>
                )}
            </View>
        ));
    };

    const renderCinemasFilter = (cinema) => {
        return cinema.map((cinema, index) => (
            <View key={index} style={[styles.cinemaContainer, index === 0 ? styles.firstCinemaContainer : null]}>
                <TouchableWithoutFeedback onPress={() => toggleCinema(index)}>
                    <View>
                        <View style={styles.cinemaHeader}>
                            <Text style={styles.cinemaName} numberOfLines={1}>
                                {cinema.name}
                            </Text>
                            <View className="flex-row justify-center items-center ">
                                <Text className="mr-1 text-orange-500">2,1 Km</Text>

                                {openCinemas[index] ? (
                                    <FontAwesome name="angle-up" size={25} color="white" style={{ marginTop: -3 }} />
                                ) : (
                                    <FontAwesome name="angle-down" size={25} color="white" style={{ marginTop: -2 }} />
                                )}
                            </View>
                        </View>
                        <View className="flex-row items-center mb-2 ">
                            <EvilIcons name="location" size={20} color="rgba(255, 255, 255, 0.5)" />
                            <Text style={styles.cinemaAddress} numberOfLines={2}>
                                {cinema.address}
                            </Text>
                        </View>
                    </View>
                </TouchableWithoutFeedback>

                {openCinemas[index] && (
                    <View>
                        {cinema.screeningFormats.map((item, idx) => (
                            <View key={idx} className="mb-2">
                                <View className="flex-row items-center">
                                    <Feather name="circle" size={11} color="orange" />
                                    <Text
                                        className="text-white text-[15px] font-light ml-1 uppercase"
                                        numberOfLines={1}
                                    >
                                        {item.name} <Text className="text-[15px]"> Phụ đề </Text>
                                        {item.subtitle}
                                    </Text>
                                </View>
                                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                    <View className="flex-row py-2 ">
                                        {item.showtimes.map((time, idx) => (
                                            <TouchableOpacity
                                                key={idx}
                                                style={[styles.timeButton]}
                                                onPress={() => navigation.navigate('Seat')}
                                            >
                                                <Text style={[styles.timeText]}>{formatTime(time.startTime)}</Text>
                                            </TouchableOpacity>
                                        ))}
                                    </View>
                                </ScrollView>
                            </View>
                        ))}
                    </View>
                )}
            </View>
        ));
    };
    return (
        <Container
            isScroll={false}
            title={item?.name || showtime?.movie}
            back={true}
            style={{
                color: 'white',
                fontWeight: 700,
                fontSize: 18,
                textTransform: 'uppercase',
            }}
            line={1}
            right={true}
            titleRight={title}
            styleRight={{ color: 'white', fontWeight: 300, fontSize: 14, textAlign: 'center' }}
            onPress={() => setModalVisible(true)}
        >
            <View style={styles.container}>
                <View style={{ gap: 4, paddingHorizontal: 12 }}>
                    <View className="justify-center flex-row items-center ">
                        <FontAwesome name="angle-left" size={22} color="white" style={{ marginTop: -2 }} />
                        <Text className="text-[15px] px-2 text-white font-normal"> {displayDate}</Text>
                        <FontAwesome name="angle-right" size={22} color="white" style={{ marginTop: -2 }} />
                    </View>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.dateContainer}>
                        {generateDates().map((date, idx) => (
                            <TouchableOpacity
                                key={idx}
                                style={styles.dateButton}
                                onPress={() => handleDateSelection(date)}
                            >
                                <LinearGradient
                                    colors={
                                        date.fullDate === selectedDate
                                            ? ['#ED999A', '#F6D365']
                                            : ['rgba(255, 255, 255, 0.1)', 'rgba(255, 255, 255, 0.2)']
                                    }
                                    start={{ x: 0.4, y: 0.1 }}
                                    end={{ x: 0.9, y: 0.2 }}
                                    style={styles.gradient}
                                >
                                    <View style={styles.buttonContent}>
                                        <Text
                                            style={[
                                                styles.dateText,
                                                date.fullDate === selectedDate ? styles.dateTextSelect : null,
                                            ]}
                                        >
                                            {date.label}
                                        </Text>
                                        <Text
                                            style={{
                                                fontSize: 14,
                                                color: date.fullDate === selectedDate ? 'black' : 'white',
                                            }}
                                        >
                                            {date.fullDate}
                                        </Text>
                                    </View>
                                </LinearGradient>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>
                {isLoading ? (
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size="large" color="white" />
                    </View>
                ) : (
                    <>
                        {isSuccess && data && data.length && data[0]?.cinemas ? (
                            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
                                {filterData.length > 0 ? renderCinemas(filterData) : renderCinemas(data)}
                            </ScrollView>
                        ) : (
                            <Text style={{ color: 'white', textAlign: 'center', marginTop: 20 }}>
                                Chưa có suất chiếu trong ngày
                            </Text>
                        )}
                    </>
                )}
            </View>
            <Modal
                animationType="none"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View className="flex-1 justify-end items-center bg-black/30">
                    <View className="bg-white rounded-lg" style={{ height: hp(90), width: wp(100) }}>
                        <View
                            style={{ height: 50, width: wp(100) }}
                            className="flex-row justify-between items-center  px-4"
                        >
                            <TouchableOpacity onPress={() => setModalVisible(false)}>
                                <Text className="text-3xl text-pink-800 font-bold">✕</Text>
                            </TouchableOpacity>

                            <Text className="text-base capitalize font-semibold">Chọn khu vực</Text>
                            <View style={{ width: 24 }} />
                        </View>
                        <ScrollView style={{ backgroundColor: '#c9c9c9' }} contentContainerStyle={{ flexGrow: 1 }}>
                            <View className="relative  py-6 border-b border-gray-300">
                                <Text className="absolute bottom-1 left-4 text-[#6d6d6d] text-[14px] uppercase">
                                    Khu vực
                                </Text>
                            </View>

                            <View className="flex-1 bg-white">
                                <TouchableWithoutFeedback onPress={() => handleFilter('Tất cả')}>
                                    <View className=" flex-row px-4 py-3 justify-between items-center border-b border-gray-300">
                                        <Text className="text-center text-black text-base uppercase">Tất cả</Text>
                                        <Text className="text-center text-[#6d6d6d] text-base">
                                            {data && data.length > 0 && data[0]?.cinemas ? data[0]?.cinemas.length : 0}
                                        </Text>
                                    </View>
                                </TouchableWithoutFeedback>
                                {cityCounts.map(([city, count]) => (
                                    <TouchableWithoutFeedback key={city} onPress={() => handleFilter(city)}>
                                        <View className="flex-row px-4 py-3 justify-between items-center border-b border-gray-300">
                                            <Text className="text-center text-black text-base">{city}</Text>
                                            <Text className="text-center text-[#6d6d6d] text-base">{count}</Text>
                                        </View>
                                    </TouchableWithoutFeedback>
                                ))}
                            </View>
                        </ScrollView>
                    </View>
                </View>
            </Modal>
        </Container>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    movieTitle: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    allCinemas: {
        color: '#ff9500',
        fontSize: 14,
    },
    dateContainer: {
        flexDirection: 'row',
        marginBottom: 5,
    },
    dateButton: {
        marginRight: 10,
        borderRadius: 10,
        overflow: 'hidden',
        paddingVertical: 7,
    },
    gradient: {
        paddingVertical: 7,
        paddingHorizontal: 10,
        borderRadius: 10,
    },
    buttonContent: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    selectedDateButton: {
        backgroundColor: '#ff3b30',
    },
    dateText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    dateTextSelect: {
        color: 'black',
    },
    cinemaHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
    },
    cinemaContainer: {
        borderBottomColor: 'rgba(255, 255, 255, 0.5)',
        borderBottomWidth: 1,
        paddingHorizontal: 12,
        paddingVertical: 8,
    },
    firstCinemaContainer: {
        borderTopWidth: 1,
        borderTopColor: 'rgba(255, 255, 255, 0.5)',
    },
    cinemaName: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        width: '80%',
    },
    cinemaAddress: {
        color: 'rgba(255, 255, 255, 0.5)',
        fontSize: 14,
    },
    cinemaDistance: {
        color: '#ff9500',
        fontSize: 14,
        marginBottom: 10,
    },
    timeButton: {
        marginRight: 10,
        borderRadius: 5,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        marginRight: 10,
        paddingHorizontal: 10,
        paddingVertical: 7,
    },
    selectedTimeButton: {
        backgroundColor: '#ff3b30',
    },
    timeText: {
        color: 'white',
        fontSize: 15,
    },
    selectedTimeText: {
        color: '#000',
    },
    continueButton: {
        backgroundColor: 'blue',
        borderRadius: 10,
        paddingVertical: 15,
    },
    loadingContainer: {
        height: '70%',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default memo(Film);
