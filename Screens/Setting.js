import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { useTheme } from '../Components/ThemeContext'; 
import TextHeader from '../Components/TextHeader';
import PressableItem from '../Components/PressableItem';
import helper from '../Config/Helper';

const SettingsScreen = () => {
    const { theme, toggleTheme } = useTheme();
    
    const styles = getStyles(theme); // Function to get styles based on the current theme
    return (
        <View style={styles.container}>
            <TextHeader style={styles.text}>Theme: {theme} </TextHeader>
            <PressableItem style={styles.button} onPress={toggleTheme}>
                <TextHeader style={styles.buttonText}>Toggle Theme</TextHeader>
            </PressableItem>
        </View>
    );
};

function getStyles(theme) {
    return StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: theme === 'light' ? helper.color.backColor : helper.color.backColorDark,
        },
        button:{
            borderColor: theme === 'dark' ? helper.color.inputBottomBorderDark : helper.color.inputBottomBorder,
            width: '50%',
            flexDirection: 'row',
            padding: helper.padding.listItemContainer,
            backgroundColor: theme === 'dark' ? helper.color.infoBoxDark : helper.color.infoBox,
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 2, 
            borderRadius: 10,
        },
        text: {
            color: theme === 'dark' ? helper.color.textColorDark : helper.color.textColor,
        }
    });
}

export default SettingsScreen;
