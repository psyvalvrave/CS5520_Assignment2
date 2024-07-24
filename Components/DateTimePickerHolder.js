import {StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react'
import helper from '../Config/Helper';

const DateTimePickerHolder = ({onPress, style, children}) => {
  return (
    <TouchableOpacity 
        onPress={onPress} 
        style={[styles.input, style]}>
        {children}
    </TouchableOpacity>
  )
}

export default DateTimePickerHolder

const styles = StyleSheet.create({
    input: {
        height: '5%',
        borderColor: helper.color.inputBottomBorder,
        borderWidth: 1,
        marginBottom: 20,
        padding: helper.padding.input,
        justifyContent: "center",
    }
})