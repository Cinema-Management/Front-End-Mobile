import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

const TaiKhoan = ({ navigation }) => {
  return (
    <View className="flex-1 justify-center items-center bg-gray-100">
      <Text className="text-2xl font-bold ">Trang tài khqoản</Text>
      <TouchableOpacity
        className="border p-2 mt-2 bg-blue-500 rounded"
        onPress={() => navigation.navigate("Home")}
      >
        <Text className="text-base font-bold">Trang Homssse</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TaiKhoan;
