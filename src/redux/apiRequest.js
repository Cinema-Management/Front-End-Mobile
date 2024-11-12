import axios from 'axios';
import { API_URL } from '@env';
import { loginFailed, loginStart, loginSuccess, logOutFailed, logOutStart, logOutSuccess } from './authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const loginUser = async (user, dispatch) => {
    dispatch(loginStart());
    try {
        const res = await axios.post(`${API_URL}/api/auth/login`, user);
        dispatch(loginSuccess(res.data));

        await AsyncStorage.setItem('user', JSON.stringify(res.data));

        return;
    } catch (err) {
        dispatch(loginFailed());
        return err;
    }
};
export const registerUser = async (user, dispatch) => {
    dispatch(loginStart());
    try {
        const res = await axios.post(`${API_URL}/api/auth/register`, user);
        dispatch(loginSuccess(res.data));
        await AsyncStorage.setItem('user', JSON.stringify(res.data));
        return;
    } catch (err) {
        dispatch(loginFailed());
        return err;
    }
};

export const logOut = async (dispatch, accessToken, axiosJWT) => {
    dispatch(logOutStart());

    try {
        await axiosJWT.post(
            `${API_URL}/api/auth/logout`,
            {},
            {
                headers: { token: `Bearer ${accessToken}` },
            },
        );
        dispatch(logOutSuccess());
    } catch (err) {
        console.error('Logout error:', err);
        dispatch(logOutFailed());
    }
};
