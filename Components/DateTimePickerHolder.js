import {StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react'
import helper from '../Config/Helper';
import { useTheme } from '../Components/ThemeContext';
const DateTimePickerHolder = ({onPress, style, children}) => {
  const { theme } = useTheme(); 
  const styles = StyleSheet.create({
    input: {
        height: '10%',
        borderColor: theme === 'dark' ? helper.color.inputBottomBorderDark : helper.color.inputBottomBorder,
        borderWidth: 1,
        marginBottom: 20,
        padding: helper.padding.input,
        justifyContent: "center",
        alignItems:"flex-start",
        flexDirection: "row",
    }
})
  return (
    <TouchableOpacity 
        onPress={onPress} 
        style={[styles.input, style]}>
        {children}
    </TouchableOpacity>
  )
}

export default DateTimePickerHolder
