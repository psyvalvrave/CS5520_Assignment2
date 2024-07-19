import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import helper from '../Config/Helper';


const headerButtonHolder = ({onPress, children, style }) => {
    return (
        <Pressable
            onPress={onPress} style={[styles.buttonContainer, style]}
            >
                {children}
            </Pressable>
    );
};

const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: "row",
        marginRight: helper.margin.headerButtonRight,
        alignContent:"center",
        justifyContent:"flex-end",
        width: "25%",
        height: "80%",
    },
});

export default headerButtonHolder;
