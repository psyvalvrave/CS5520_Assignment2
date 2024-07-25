import React from 'react';
import { Text, StyleSheet } from 'react-native';
import helper from '../Config/Helper';

const TextButton = ({ children, style }) => {
    return (
        <Text style={[styles.title, style]}>
        {children}
        </Text>
    );
};

const styles = StyleSheet.create({
    title: {
        fontSize: helper.fontSize.title,
        padding: helper.padding.text,
        flex: 2, 
        fontWeight: 'bold',
        textAlign:"center",
    },
});

export default TextButton;
