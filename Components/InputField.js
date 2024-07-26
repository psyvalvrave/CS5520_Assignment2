import React from 'react';
import { TextInput, StyleSheet } from 'react-native';
import helper from '../Config/Helper';
import { useTheme } from '../Components/ThemeContext';

//Component for input field, the custom textInput

const InputField = ({ value, onChangeText, placeholder, onBlur, keyboardType, style, onFocus}) => { 
    const { theme } = useTheme();

    const styles = StyleSheet.create({
        input: {
            borderColor: theme === 'dark' ? helper.color.inputBottomBorderDark : helper.color.inputBottomBorder, 
            color: theme === 'dark' ? helper.color.textColorDark : helper.color.textColor,
            borderWidth: 1, 
            padding: helper.padding.input,
            width: '100%', 
        },
    });

    return (
        <TextInput
        style={[styles.input, style]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        onBlur={onBlur}
        keyboardType={keyboardType}
        onFocus = {onFocus}
        />
    );
};


export default InputField;
