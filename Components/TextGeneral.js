import React from 'react';
import { Text, StyleSheet } from 'react-native';
import helper from '../Config/Helper';
import { useTheme } from '../Components/ThemeContext';

const TextGeneral = ({ children, style }) => {
    const { theme } = useTheme(); 

    const styles = StyleSheet.create({
        general: {
            fontSize: helper.fontSize.general,
            flex: 1,
            color: theme === 'dark' ? helper.color.textColorDark : helper.color.textColor,
        },
    });
    
    return (
        <Text style={[styles.general, style]}>
        {children}
        </Text>
    );
    
};



export default TextGeneral;
