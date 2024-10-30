// import axios from 'axios';
// import { API_URL } from '@env';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const instance = axios.create({
//     baseURL: API_URL,
//     timeout: 10000,
// });

// const login = async ({ phone, password }) => {
//     try {
//         const response = await instance.post('/api/auth/login', {
//             phone: phone,
//             password: password,
//             type: 0,
//         });

//         return response.data;
//     } catch (error) {
//         throw new Error(error);
//     }
// };

// const register = async (data) => {
//     try {
//         const response = await instance.post('/auth/register', {
//             name: data.name,
//             phone: data.phone,
//             email: data.email,
//             dateOfBirth: data.dateOfBirth,
//             image: data.image,
//             gender: data.gender,
//             password: data.password,
//         });
//         return response.data;
//     } catch (error) {
//         throw new Error(error);
//     }
// };

// const verifycation = async ({ username }) => {
//     try {
//         const response = await instance.post('/auth/verifycation', {
//             username: username,
//         });
//         return response.data;
//     } catch (error) {
//         throw new Error(error);
//     }
// };

// const forgotPassword = async ({ username }) => {
//     try {
//         const response = await instance.post('/forgotpassword', {
//             username: username,
//         });
//         return response.data;
//     } catch (error) {
//         throw new Error(error);
//     }
// };

// const refreshToken = async ({ token }) => {
//     console.log('token', token);
//     try {
//         const response = await instance.post('/api/auth/refresh', {
//             refreshToken: token,
//         });
//         console.log('responseapi', response.data);
//         return response.data;
//     } catch (error) {
//         console.log('error', error);
//         throw new Error(error);
//     }
// };

// const searchUsers = async ({ keyword, userId }) => {
//     const token = await AsyncStorage.getItem('accessToken');
//     const accessToken = JSON.parse(token);
//     const headers = {
//         Authorization: `Bearer ${accessToken}`,
//     };
//     try {
//         const data = { keyword: keyword, userId: userId };
//         const queryParam = new URLSearchParams(data).toString();
//         const response = await instance.get(`/users?` + queryParam, {
//             headers: headers,
//         });
//         return response.data;
//     } catch (error) {
//         console.log('error', error);
//         throw error;
//     }
// };

// const checkInfo = async ({ email }) => {
//     try {
//         const response = await instance.post('/checkInfo', {
//             email: email,
//         });
//         return response.data;
//     } catch (error) {
//         throw new Error(error);
//     }
// };
// //ham chinh sua thong tin ca nhan
// const editProfile = async (data) => {
//     const token = await AsyncStorage.getItem('accessToken');
//     const accessToken = JSON.parse(token);
//     const headers = {
//         Authorization: `Bearer ${accessToken}`,
//     };
//     console.log('data', data);
//     try {
//         const response = await instance.post(
//             '/editProfile',
//             {
//                 userId: data.userId,
//                 name: data.name,
//                 dateOfBirth: data.dateOfBirth,
//                 gender: data.gender,
//             },
//             {
//                 headers: headers,
//             },
//         );
//         return response.data;
//     } catch (error) {
//         throw new Error(error);
//     }
// };

// //ham change password
// const changePassword = async (data) => {
//     const token = await AsyncStorage.getItem('accessToken');
//     const accessToken = JSON.parse(token);
//     const headers = {
//         Authorization: `Bearer ${accessToken}`,
//     };
//     try {
//         const response = await instance.post(
//             '/changePassword',
//             {
//                 userId: data.userId,
//                 oldpassword: data.oldpassword,
//                 password: data.password,
//             },
//             {
//                 headers: headers,
//             },
//         );
//         return response.data;
//     } catch (error) {
//         throw new Error(error);
//     }
// };
// const changePassword1 = async (data) => {
//     try {
//         const response = await instance.post('/changePassword1', {
//             email: data.email,
//             password: data.password,
//         });
//         return response.data;
//     } catch (error) {
//         throw new Error(error);
//     }
// };

// export default {
//     login,
//     register,
//     verifycation,
//     forgotPassword,
//     refreshToken,
//     searchUsers,
//     checkInfo,
//     editProfile,
//     changePassword,
//     changePassword1,
// };
