import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import TaiKhoan from "../screens/TaiKhoan";
import { AntDesign } from "@expo/vector-icons";
import Welcome from "../screens/Welcome";
import Promotion from "../screens/Promotion";
const Tab = createBottomTabNavigator();

const BottomTabs = ({ navigation }) => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#21242C",
          borderRadius: 100,
          position: "absolute",
          borderTopWidth: 0,
        },
        tabBarActiveTintColor: "white",
        tabBarLabelStyle: {
          color: "gray",
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: "Trang chủ",
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="KM"
        component={Promotion}
        options={{
          tabBarLabel: "Khuyến mãi",
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="gift" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="TK"
        component={TaiKhoan}
        options={{
          tabBarLabel: "Tài khoản",
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="user" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabs;
