import React from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

const ModalNotify = ({ modalVisible, setModalVisible, title, message }) => {
    return (
        <Modal transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
            <View className=" justify-center items-center bg-black/30  flex-1 ">
                {/* Nội dung modal */}
                <View className="bg-white  rounded-lg " style={{ height: hp(15), width: wp(70) }}>
                    <View
                        style={{ height: hp(10), width: wp(70) }}
                        className="justify-center items-center border-b-[0.5px] border-gray-300 px-1"
                    >
                        <Text className="text-base font-bold">{title}</Text>
                        <Text className="text-sm mt-1 text-center">{message}</Text>
                    </View>
                    <View className="flex-row items-center justify-center  h-[50%] flex-1 rounded-b-lg">
                        <TouchableOpacity
                            onPress={() => setModalVisible(false)}
                            className="justify-center items-center bg-white  flex-1 h-[100%] border-r-0.5 rounded-b-lg"
                            underlayColor="#DDDDDD"
                        >
                            <Text className="text-red-500 text-center text-base ">Đóng</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default ModalNotify;
