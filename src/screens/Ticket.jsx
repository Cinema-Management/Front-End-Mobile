import React, { useState } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    useWindowDimensions,
    Image,
    Dimensions,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import phim1 from '../../assets/phim1.png';
import Container from '../components/Container';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { colors } from '../constants/colors';
import useTicket from '../queries/useTicket';
import { useSelector } from 'react-redux';
var { height, width } = Dimensions.get('window');
import { formatDateTicket } from '../utils/Date';
import { TouchableWithoutFeedback } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
const MovieList = ({ movies, navigation, inactive }) => {
    return (
        <ScrollView style={{ flex: 1, marginBottom: 30 }} showsVerticalScrollIndicator={false}>
            <View className="items-center my-6 space-y-3">
                {movies.map((movie, index) => (
                    <TouchableOpacity
                        key={index}
                        onPress={() => navigation.navigate('TicketDetail', { ticket: { ...movie, inactive } })}
                    >
                        <View
                            className="flex-row items-center mb-4 justify-center  rounded-xl px-6"
                            style={{
                                width: width * 0.9,
                                height: width * 0.28,
                                backgroundColor: 'rgba(255, 255, 255, 0.22)',
                            }}
                        >
                            <View className="absolute left-0 w-[3%] h-5 bg-black/70 rounded-r-full overflow-hidden shadow-2xl " />
                            <View className="absolute right-0 w-[3%] h-5 bg-black/70 rounded-l-full overflow-hidden shadow-2xl  " />
                            <Image
                                source={{ uri: movie.scheduleCode.movieCode.image }}
                                className=" rounded-[4px] "
                                style={{ width: width * 0.18, height: width * 0.23 }}
                                resizeMode="stretch"
                            />

                            <View className="flex-1 ml-3 ">
                                <Text
                                    className="text-white text-base font-bold truncate"
                                    ellipsizeMode="tail"
                                    numberOfLines={2}
                                >
                                    {movie.scheduleCode.movieCode.name}
                                </Text>
                                <Text className="text-white text-[14px] font-normal" numberOfLines={1}>
                                    {movie.scheduleCode.roomCode.cinemaCode.name}
                                </Text>
                                <Text className="text-white text-[14px] font-normal mt-2" numberOfLines={1}>
                                    {formatDateTicket(movie.scheduleCode.startTime)}
                                </Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                ))}
            </View>
        </ScrollView>
    );
};

const FirstRoute = ({ movies, navigation, inactive }) => {
    return <MovieList movies={movies} navigation={navigation} inactive={inactive} />;
};

const SecondRoute = ({ movies, navigation, inactive }) => {
    return <MovieList movies={movies} navigation={navigation} inactive={inactive} />;
};

const renderTabBar = (props) => (
    <TabBar
        {...props}
        renderLabel={({ route, focused, color }) => (
            <Text
                style={{
                    color: focused ? 'white' : 'gray',
                    textTransform: 'none',
                    fontWeight: focused ? '600' : '400',
                    paddingHorizontal: 10,
                    fontSize: 16,
                }}
            >
                {route.title}
            </Text>
        )}
        indicatorStyle={{ backgroundColor: 'white' }}
        style={{ backgroundColor: 'transparent' }}
    />
);

export default function Ticket({ navigation }) {
    const layout = useWindowDimensions();
    const currentUser = useSelector((state) => state.auth.login.currentUser);
    const { data = [], isLoading, isSuccess } = useTicket(currentUser.code);

    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'first', title: 'Phim sắp xem' },
        { key: 'second', title: 'Phim đã xem' },
    ]);
    const currentTime = new Date();

    const sortedDataUpcoming = data?.sort((a, b) => {
        return new Date(a.scheduleCode.startTime) - new Date(b.scheduleCode.startTime);
    });
    const sortedDataWatched = data?.sort((a, b) => {
        return new Date(b.scheduleCode.startTime) - new Date(a.scheduleCode.startTime);
    });

    const upcomingMovies = isSuccess
        ? sortedDataUpcoming.filter((movie) => new Date(movie.scheduleCode.startTime) > currentTime)
        : [];
    const watchedMovies = isSuccess
        ? sortedDataWatched.filter((movie) => new Date(movie.scheduleCode.startTime) <= currentTime)
        : [];

    return (
        <Container isScroll={false} title="Vé của tôi" style={{ color: 'white', fontWeight: 700 }}>
            <View style={styles.container}>
                {isLoading && (
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size="large" color="white" />
                    </View>
                )}
                <TabView
                    navigationState={{ index, routes }}
                    renderScene={({ route }) => {
                        const movies = route.key === 'first' ? upcomingMovies : watchedMovies;
                        return route.key === 'first' ? (
                            <FirstRoute movies={movies} navigation={navigation} inactive={false} />
                        ) : (
                            <SecondRoute movies={movies} navigation={navigation} inactive={true} />
                        );
                    }}
                    onIndexChange={setIndex}
                    initialLayout={{ width: layout.width }}
                    renderTabBar={renderTabBar}
                />
            </View>
        </Container>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: 'red',
    },
    loadingContainer: {
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
