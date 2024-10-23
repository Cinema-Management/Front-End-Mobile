import React, { useState } from 'react';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import Container from '../components/Container';
import Avatar from '../components/Avatar';
import bg from '../../assets/BG.png';

const DeleteAccount = () => {
    const [selectedValue, setSelectedValue] = useState(null);
    const data = [
        { label: 'Option 1 ', value: 'option1' },
        { label: 'Option 2', value: 'option2' },
        { label: 'Option 3', value: 'option3' },
        { label: 'Option 1 ', value: 'option1' },
        { label: 'Option 2', value: 'option2' },
        { label: 'Option 3', value: 'option3' },
        { label: 'Option 1 ', value: 'option1' },
        { label: 'Option 2', value: 'option2' },
        { label: 'Option 3', value: 'option3' },
        { label: 'Option 1 ', value: 'option1' },
        { label: 'Option 2', value: 'option2' },
        { label: 'Option 3', value: 'option3' },
        { label: 'Option 1 ', value: 'option1' },
        { label: 'Option 2', value: 'option2' },
        { label: 'Option 3', value: 'option3' },
        { label: 'Option 1 ', value: 'option1' },
        { label: 'Option 2', value: 'option2' },
        { label: 'Option 3', value: 'option3' },
        { label: 'Option 1 ', value: 'option1' },
        { label: 'Option 2', value: 'option2' },
        { label: 'Option 3', value: 'option3' },
        { label: 'Option 1 ', value: 'option1' },
        { label: 'Option 2', value: 'option2' },
        { label: 'Option 3', value: 'option3' },
    ];

    console.log('selectedValue', selectedValue);
    return (
        <ImageBackground source={bg} className="flex-1 ">
            <View style={styles.test}>
                <Avatar
                    photoUrl="https://scontent.fsgn19-1.fna.fbcdn.net/v/t39.30808-1/450102416_1532548330972410_7544170289850089664_n.jpg?stp=dst-jpg_s200x200&_nc_cat=107&ccb=1-7&_nc_sid=0ecb9b&_nc_ohc=cLygH_oipV0Q7kNvgEgi617&_nc_zt=24&_nc_ht=scontent.fsgn19-1.fna&_nc_gid=AbIjCos_kSNmyB59fkfXenS&oh=00_AYAzq8BiFHQO9-foDqtN00tZV-aD7BMr-Jii7hezFw4Wug&oe=671D8B18" // URL của ảnh
                    size={80}
                    bordered={true}
                />
            </View>
        </ImageBackground>
    );
};
const styles = StyleSheet.create({
    container: {
        // backgroundColor: 'red',
        flex: 1,
    },
    test: {
        backgroundImage: 'linear-gradient(180deg, rgba(0, 111, 111, 0.36) 0%, #00CCF9 100%)',
    },
});
export default DeleteAccount;
