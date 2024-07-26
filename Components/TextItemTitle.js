import React from 'react';
import { Text, StyleSheet } from 'react-native';
import helper from '../Config/Helper';
import { useTheme } from '../Components/ThemeContext';

const TextItemTitle = ({ children, style }) => {
    const { theme } = useTheme(); 
    const styles = StyleSheet.create({
        title: {
            fontSize: helper.fontSize.title,
            padding: helper.padding.text,
            flex: 1, 
            fontWeight: 'bold',
            color: theme === 'dark' ? helper.color.textColorDark : helper.color.textColor,
        },
    });

    return (
        <Text style={[styles.title, style]}>
        {children}
        </Text>
    );
};


export default TextItemTitle;
