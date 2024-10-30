import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Button } from 'react-native-elements';
import { Text } from 'react-native';

const ButtonPrimary = ({ onPress, title }) => {
    const [isPressed, setIsPressed] = useState(false); // Trạng thái để theo dõi khi nút được nhấn

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#ED999A', '#F6D365']}
                start={{ x: 0.4, y: 0.1 }}
                end={{ x: 0.9, y: 0.2 }}
                style={styles.gradient}
            >
                <Button
                    title={title}
                    buttonStyle={{
                        backgroundColor: isPressed ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
                        borderRadius: 25,
                    }}
                    titleStyle={{
                        fontWeight: 'bold',
                        textTransform: 'capitalize',
                    }}
                    onPress={onPress}
                    onPressIn={() => setIsPressed(true)}
                    onPressOut={() => setIsPressed(false)}
                />
            </LinearGradient>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 25,
        left: 0,
        right: 0,
        alignItems: 'center',
    },
    gradient: {
        borderRadius: 25,
        padding: 2,
        width: wp(90),
    },
});

export default ButtonPrimary;
