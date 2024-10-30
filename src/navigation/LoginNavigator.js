import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Welcome from '../screens/Welcome';
import SignInHome from '../screens/SignInHome';
import SignInEmail from '../screens/SignInEmail';
import Register from '../screens/Register';
import ForgotPassword from '../screens/ForgotPassword';
import NewPassword from '../screens/NewPassword';
import ForgotPasswordOTP from '../screens/ForgotPasswordOTP';

const Stack = createStackNavigator();

const LoginNavigator = () => {
    return (
        <Stack.Navigator
            initialRouteName="SignInEmail"
            screenOptions={{
                headerShown: false,
                gestureEnabled: false,
            }}
        >
            <Stack.Screen name="Welcome" component={Welcome} />
            <Stack.Screen name="SignInHome" component={SignInHome} />
            <Stack.Screen name="SignInEmail" component={SignInEmail} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
            <Stack.Screen name="NewPassword" component={NewPassword} />
            <Stack.Screen name="ForgotPasswordOTP" component={ForgotPasswordOTP} />
        </Stack.Navigator>
    );
};

export default LoginNavigator;
