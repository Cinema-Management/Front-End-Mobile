import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import BottomTabs from './BottomTabs';
import Phim from '../screens/Phim';
import Welcome from '../screens/Welcome';
import SignInHome from '../screens/SignInHome';
import SignInEmail from '../screens/SignInEmail';
import Register from '../screens/Register';
import DanhGia from '../screens/DanhGia';
import ForgotPassword from '../screens/ForgotPassword';
import NewPassword from '../screens/NewPassword';
import ForgotPasswordOTP from '../screens/ForgotPasswordOTP';
import UpdateInfo from '../screens/UpdateInfo';
const Stack = createStackNavigator();

const StackNavigator = () => {
    return (
        <Stack.Navigator
            initialRouteName="Tabs"
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="Tabs" component={BottomTabs} />

            <Stack.Screen name="Welcome" component={Welcome} />
            <Stack.Screen name="SignInHome" component={SignInHome} />
            <Stack.Screen name="SignInEmail" component={SignInEmail} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="DanhGia" component={DanhGia} />
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
            <Stack.Screen name="NewPassword" component={NewPassword} />
            <Stack.Screen name="ForgotPasswordOTP" component={ForgotPasswordOTP} />
            <Stack.Screen name="UpdateInfo" component={UpdateInfo} />
            <Stack.Screen
                name="Phim"
                component={Phim}
                options={{
                    headerShown: true,
                    headerTitle: 'Rạp phim',
                    headerBackTitleVisible: false,
                }}
            />
        </Stack.Navigator>
    );
};

export default StackNavigator;
