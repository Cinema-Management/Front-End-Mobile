import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { API_URL } from '@env';

const refreshToken = async (refreshTokenValue) => {
    try {
        const res = await axios.post(
            `${API_URL}/api/auth/refreshApp`,
            {
                refreshToken: refreshTokenValue,
            },
            {
                withCredentials: true,
            },
        );

        return res.data;
    } catch (err) {
        console.error('Failed to refresh token:', err);
        throw err;
    }
};

export const createAxios = (user, dispatch, stateSuccess) => {
    const token = user.accessToken;
    const refreshTokenValue = user.refreshToken;
    const decodedToken = jwtDecode(token);

    const newInstance = axios.create();

    newInstance.interceptors.request.use(
        async (config) => {
            let date = new Date();
            const decodedToken = jwtDecode(user?.accessToken);

            if (decodedToken.exp < date.getTime() / 1000) {
                try {
                    const data = await refreshToken(refreshTokenValue);
                    const refreshUser = {
                        ...user,
                        accessToken: data.accessToken,
                        refreshToken: data.refreshToken,
                    };
                    dispatch(stateSuccess(refreshUser));
                    config.headers['token'] = 'Bearer ' + data.accessToken;
                } catch (error) {
                    console.error('Error refreshing token:', error);
                }
            } else {
                config.headers['token'] = 'Bearer ' + token;
            }

            return config;
        },
        (err) => {
            return Promise.reject(err);
        },
    );

    return newInstance;
};
