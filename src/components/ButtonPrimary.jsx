import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
const ButtonPrimary = ({ onPress, title, style, colors = ['#ED999A', '#F1C46F'] }) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <LinearGradient colors={colors} style={[styles.button, style]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
                <Text style={styles.buttonText}>{title}</Text>
            </LinearGradient>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        paddingVertical: 12,
        borderRadius: 10,
    },
    buttonText: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
        width: wp(90),
    },
});

export default ButtonPrimary;
