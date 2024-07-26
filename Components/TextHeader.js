import React from 'react';
import { Text, StyleSheet } from 'react-native';
import helper from '../Config/Helper';
import { useTheme } from '../Components/ThemeContext';

//Component for one of text type. It is use as header (relatively larger text)

const TextHeader = ({ children, style }) => {
    const { theme } = useTheme(); 

    const styles = StyleSheet.create({
        headerButton: {
            fontSize: helper.fontSize.headerButton,
            marginRight: helper.margin.headerButton,
            color: theme === 'dark' ? helper.color.textColorDark : helper.color.textColor,
        },
    });

    return (
        <Text style={[styles.headerButton, style]}>
        {children}
        </Text>
    );
};


export default TextHeader;
