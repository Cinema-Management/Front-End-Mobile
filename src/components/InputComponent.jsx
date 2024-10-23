import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import React from 'react';
import TextComponent from './TextComponent';
import Ionicons from '@expo/vector-icons/Ionicons';
import { AntDesign } from '@expo/vector-icons';

const InputComponent = (props) => {
    const {
        value,
        onChange,
        prefix,
        affix,
        title,
        helpText,
        placeholder,
        containerStyle,
        inputStyles,
        allowClear,
        type,
        password,
        showPass,
        setShowPass,
        onEnd,
    } = props;

    return (
        <View style={{ marginBottom: 16 }}>
            {title && <TextComponent text={title} />}
            <View
                style={[
                    {
                        flexDirection: 'row',
                        marginTop: title ? 8 : 0,
                        borderRadius: 12,
                        borderWidth: 1,
                        borderColor: '#e0e0e0',
                        paddingHorizontal: 10,
                        paddingVertical: 14,
                    },
                    containerStyle,
                ]}
            >
                {prefix && prefix}
                <TextInput
                    placeholder={placeholder}
                    value={value}
                    onChangeText={(val) => onChange(val)}
                    style={[
                        {
                            color: '#212121',
                            flex: 1,
                            fontSize: 14,
                            paddingHorizontal: prefix || affix ? 10 : 0,
                        },
                        inputStyles,
                    ]}
                    keyboardType={type ?? 'default'}
                    secureTextEntry={password ? !showPass : false}
                    onEndEditing={onEnd}
                />
                {affix && affix}
                {allowClear && value && (
                    <TouchableOpacity onPress={() => onChange('')}>
                        <AntDesign name="close" size={18} color={'#212121'} />
                    </TouchableOpacity>
                )}
                {password && (
                    <TouchableOpacity onPress={setShowPass}>
                        <Ionicons name={showPass ? 'eye-off-outline' : 'eye-outline'} size={20} color={'#676767'} />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};

export default InputComponent;
