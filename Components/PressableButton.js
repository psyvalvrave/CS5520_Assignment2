import { StyleSheet, Text, View, Pressable } from 'react-native'
import React from 'react'


const PressableButton = ({children, onPress, style}) => {
    return (
        <Pressable 
            onPress={onPress}
            style={({ pressed }) => [
                style || styles.default,
                pressed && styles.pressedStyle  
              ]}>
          <View>
            {children}
          </View>
          </Pressable>
      )
}

export default PressableButton

const styles = StyleSheet.create({
    buttonStyle: {
        padding: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    pressedStyle: {
        opacity: 0.5,  
    },
    default:{
        backgroundColor: "purple",
        padding: 10, 
        minWidth: 100, 
        minHeight: 50, 
        justifyContent: 'center',
        alignItems: 'center',

    }  
})