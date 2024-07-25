import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useTheme } from '../Components/ThemeContext'; // adjust the path as necessary

const SettingsScreen = () => {
    const { theme, toggleTheme } = useTheme();
    
    const styles = getStyles(theme); // Function to get styles based on the current theme

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Current Theme: {theme}</Text>
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
