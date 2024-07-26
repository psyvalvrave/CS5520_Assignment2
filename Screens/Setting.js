import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useTheme } from '../Components/ThemeContext'; // adjust the path as necessary
import TextHeader from '../Components/TextHeader';

const SettingsScreen = () => {
    const { theme, toggleTheme } = useTheme();
    
    const styles = getStyles(theme); // Function to get styles based on the current theme
    console.log(theme);
    return (
        <View style={styles.container}>
            <TextHeader style={styles.text}>Theme: {theme} </TextHeader>
            <Button title="Toggle Theme" onPress={toggleTheme} />
        </View>
    );
};

function getStyles(theme) {
    return StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: theme === 'light' ? '#fff' : '#333',
        },
        text: {
            color: theme === 'light' ? '#000' : '#fff',
        }
    });
}

export default SettingsScreen;
