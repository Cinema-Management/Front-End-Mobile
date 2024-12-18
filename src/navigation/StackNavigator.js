import React, { useEffect, useState } from 'react';
import Loading from '../components/Loading';
import MainNavigator from './MainNavigation';
import LoginNavigator from './LoginNavigator';
import { useSelector } from 'react-redux';
import { StatusBar } from 'react-native';

const StackNavigator = () => {
    const [isShowSplash, setIsShowSplash] = useState(true);

    const currentUser = useSelector((state) => state.auth.login.currentUser);
    useEffect(() => {
        const timeout = setTimeout(() => {
            setIsShowSplash(false);
        }, 2000);
        return () => {
            clearTimeout(timeout);
        };
    }, []);

    return (
        <>
            <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
            {isShowSplash ? <Loading /> : currentUser ? <MainNavigator /> : <LoginNavigator />}
        </>
    );
};

export default StackNavigator;
