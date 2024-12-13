import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import Container from '../components/Container';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { colors } from '../constants/colors';
import Icon from 'react-native-vector-icons/Ionicons';

const SupportContact = ({ navigation }) => {
    const contactList = [
        {
            name: 'Bùi Ngọc Tùng',
            phone: '0363922399',
            email: 'buingoctung1990@gmail.com',
        },
        {
            name: 'Cao Trùng Dương',
            phone: '0368636452',
            email: 'caotrungduong11@gmail.com',
        },
    ];

    return (
        <Container back={true} isScroll={false} title="Liên hệ hỗ trợ" style={{ color: 'white', fontWeight: 700 }}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.content}>
                    <Text style={styles.intro}>
                        Nếu bạn cần hỗ trợ, vui lòng liên hệ với đội ngũ hỗ trợ của chúng tôi theo thông tin bên dưới.
                    </Text>
                    {contactList.map((contact, index) => (
                        <View key={index} style={styles.contactCard}>
                            <Text style={styles.name}>{contact.name}</Text>
                            <View style={styles.row}>
                                <Icon name="call" size={20} color="red" style={styles.icon} />
                                <Text style={styles.text}>{contact.phone}</Text>
                            </View>
                            <View style={styles.row}>
                                <Icon name="mail" size={20} color="#ffff" style={styles.icon} />
                                <Text style={styles.text}>{contact.email}</Text>
                            </View>
                        </View>
                    ))}
                </View>
            </ScrollView>
        </Container>
    );
};

const styles = StyleSheet.create({
    scrollContainer: {
        paddingVertical: hp(2),
        paddingHorizontal: wp(5),
    },
    content: {
        marginBottom: hp(4),
    },
    intro: {
        fontSize: 16,
        lineHeight: 24,
        color: '#fff',
        marginBottom: hp(2),
    },
    contactCard: {
        padding: hp(2),
        borderRadius: 10,
        marginBottom: hp(2),
        backgroundColor: colors.backgroundColor,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'orange',
        marginBottom: hp(1),
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: hp(1),
    },
    icon: {
        marginRight: wp(2),
    },
    text: {
        fontSize: 16,
        color: '#fff',
    },
});

export default SupportContact;
