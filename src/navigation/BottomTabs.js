import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import TaiKhoan from '../screens/TaiKhoan';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import Promotion from '../screens/Promotion';
import Ticket from '../screens/Ticket';
import DeleteAccount from '../screens/DeleteAccount';
import Review from '../screens/Review';
import { Text } from 'react-native';
const Tab = createBottomTabNavigator();

const BottomTabs = ({ navigation }) => {
    return (
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: '#21242C',
                    position: 'absolute',
                    borderTopWidth: 0,
                },
                tabBarActiveTintColor: 'white',
            }}
        >
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarLabel: ({ focused }) => (
                        <Text
                            style={{
                                color: focused ? 'white' : '#555555',
                                fontSize: 14,
                                fontWeight: focused ? 700 : null,
                            }}
                        >
                            Trang chủ
                        </Text>
                    ),
                    tabBarIcon: ({ focused }) => (
                        <AntDesign name="home" size={22} color={focused ? 'white' : '#555555'} />
                    ),
                }}
            />
            <Tab.Screen
                name="Ticket"
                component={Ticket}
                options={{
                    tabBarLabel: ({ focused }) => (
                        <Text
                            style={{
                                color: focused ? 'white' : '#555555',
                                fontSize: 14,
                                fontWeight: focused ? 700 : null,
                            }}
                        >
                            Vé
                        </Text>
                    ),
                    tabBarIcon: ({ focused }) => (
                        <MaterialCommunityIcons
                            name="ticket-confirmation-outline"
                            size={22}
                            color={focused ? 'white' : '#555555'}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="KM"
                component={Promotion}
                options={{
                    tabBarLabel: ({ focused }) => (
                        <Text
                            style={{
                                color: focused ? 'white' : '#555555',
                                fontSize: 14,
                                fontWeight: focused ? 700 : null,
                            }}
                        >
                            Khuyến mãi
                        </Text>
                    ),
                    tabBarIcon: ({ focused }) => (
                        <AntDesign name="gift" size={22} color={focused ? 'white' : '#555555'} />
                    ),
                }}
            />
            <Tab.Screen
                name="TK"
                component={TaiKhoan}
                options={{
                    tabBarLabel: ({ focused }) => (
                        <Text
                            style={{
                                color: focused ? 'white' : '#555555',
                                fontSize: 14,
                                fontWeight: focused ? 700 : null,
                            }}
                        >
                            Tài khoản
                        </Text>
                    ),
                    tabBarIcon: ({ focused }) => (
                        <AntDesign name="user" size={22} color={focused ? 'white' : '#555555'} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
};

export default BottomTabs;
