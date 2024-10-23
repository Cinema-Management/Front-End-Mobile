import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import TaiKhoan from '../screens/TaiKhoan';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import Promotion from '../screens/Promotion';
import Ticket from '../screens/Ticket';
import DeleteAccount from '../screens/DeleteAccount';
import Welcome from '../screens/Welcome';
const Tab = createBottomTabNavigator();

const BottomTabs = ({ navigation }) => {
    return (
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: '#21242C',
                    // borderRadius: 100,
                    position: 'absolute',
                    borderTopWidth: 0,
                },
                tabBarActiveTintColor: 'white',
                tabBarLabelStyle: {
                    color: 'gray',
                    // fontSize: '13px',
                },
            }}
        >
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarLabel: 'Trang chủ',
                    tabBarIcon: ({ color, size }) => <AntDesign name="home" size={size} color={color} />,
                }}
            />
            <Tab.Screen
                name="Ticket"
                component={Ticket}
                options={{
                    tabBarLabel: 'Vé',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="ticket-confirmation-outline" size={size} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="KM"
                component={Promotion}
                options={{
                    tabBarLabel: 'Khuyến mãi',
                    tabBarIcon: ({ color, size }) => <AntDesign name="gift" size={size} color={color} />,
                }}
            />
            <Tab.Screen
                name="TK"
                component={TaiKhoan}
                options={{
                    tabBarLabel: 'Tài khoản',
                    tabBarIcon: ({ color, size }) => <AntDesign name="user" size={size} color={color} />,
                }}
            />
        </Tab.Navigator>
    );
};

export default BottomTabs;
