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
import Payment from '../screens/Payment';
import TicketDetail from '../screens/TicketDetail';
import PrivacyPolicy from '../screens/PrivacyPolicy';
import TermsOfUse from '../screens/TermsOfUse';
import SupportContact from '../screens/SupportContact';
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
            <Stack.Screen name="Payment" component={Payment} />
            <Stack.Screen name="Film" component={Film} />
            <Stack.Screen name="Food" component={Food} />
            <Stack.Screen name="Seat" component={Seat} />
            <Stack.Screen name="TicketDetail" component={TicketDetail} />
            <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
            <Stack.Screen name="TermsOfUse" component={TermsOfUse} />
            <Stack.Screen name="SupportContact" component={SupportContact} />
        </Stack.Navigator>
    );
};

export default MainNavigator;
