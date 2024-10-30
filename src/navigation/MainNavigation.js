import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import BottomTabs from './BottomTabs';
import Film from '../screens/Film';
import Review from '../screens/Review';
import UpdateInfo from '../screens/UpdateInfo';
import MovieDetail from '../screens/MovieDetail';
import PlayYoutube from '../components/PlayYoutube';
import DeleteAccount from '../screens/DeleteAccount';
import ChangePassword from '../screens/ChangePassword';
import Food from '../screens/Food';
import Seat from '../screens/Seat';
import Pay from '../screens/Pay';
const Stack = createStackNavigator();

const MainNavigator = () => {
    return (
        <Stack.Navigator
            initialRouteName="Tabs"
            screenOptions={{
                headerShown: false,
                gestureEnabled: false,
            }}
        >
            <Stack.Screen name="Tabs" component={BottomTabs} />
            <Stack.Screen name="Review" component={Review} />
            <Stack.Screen name="UpdateInfo" component={UpdateInfo} />
            <Stack.Screen name="MovieDetail" component={MovieDetail} />
            <Stack.Screen name="PlayYoutube" component={PlayYoutube} />
            <Stack.Screen name="DeleteAccount" component={DeleteAccount} />
            <Stack.Screen name="ChangePassword" component={ChangePassword} />
            <Stack.Screen name="Pay" component={Pay} />
            <Stack.Screen name="Film" component={Film} />
            <Stack.Screen name="Food" component={Food} />
            <Stack.Screen name="Seat" component={Seat} />
        </Stack.Navigator>
    );
};

export default MainNavigator;
