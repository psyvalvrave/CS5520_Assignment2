import React, { useState, useEffect } from 'react';
import { View, Button, StyleSheet, TouchableOpacity } from 'react-native';
import InputField from '../Components/InputField';
import TextHeader from '../Components/TextHeader';
import TextGeneral from '../Components/TextGeneral';
import DateTimePickerHolder from '../Components/DateTimePickerHolder';
import { editActivity } from '../Firebase/FirestoreHelper';
import { useNavigation, useRoute } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import helper from '../Config/Helper';

const ActivityForm = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const [activity, setActivity] = useState({
        id: '',
        title: '',
        duration: '',
        date: new Date()  // Default to current date
    });
    const [showDatePicker, setShowDatePicker] = useState(false);

    useEffect(() => {
        if (route.params?.activity) {
            const { id, title, duration, date } = route.params.activity;
            setActivity(prev => ({
                ...prev,
                id: id,
                title: title,
                duration: duration.toString(),
                date: date ? new Date(date) : new Date()  // Ensure it's a Date object
            }));
        }
    }, [route.params?.activity]);

    const handleChange = (name, value) => {
        setActivity(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || activity.date;
        setShowDatePicker(false);  // Hide picker after selection
        setActivity(prev => ({
            ...prev,
            date: currentDate
        }));
    };

    const toggleDatePicker = () => {
        console.log("Attempting to toggle DatePicker");
        setShowDatePicker(true);
    };

    const handleSubmit = async () => {
        try {
            const activityData = {
                ...activity,
                duration: Number(activity.duration) // Ensure duration is a number
            };
            await editActivity('activities', activityData);
            navigation.goBack();
        } catch (error) {
            console.error('Failed to save the activity:', error);
        }
    };

    return (
        <View style={styles.container}>
            <TextHeader>Title</TextHeader>
            <InputField
                placeholder="Title"
                value={activity.title}
                onChangeText={(text) => handleChange('title', text)}
            />
            <TextHeader>Duration</TextHeader>
            <InputField
                placeholder="Duration (minutes)"
                value={activity.duration}
                onChangeText={(text) => handleChange('duration', text)}
                keyboardType="numeric"
            />
            <TextHeader>Date</TextHeader>
            <DateTimePickerHolder onPress={() => setShowDatePicker(true)}>
                <TextGeneral>{activity.date.toLocaleDateString()}</TextGeneral>
            </DateTimePickerHolder>
            {showDatePicker && (
                <DateTimePicker
                    value={activity.date}
                    mode="date"
                    display="inline"
                    onChange={handleDateChange}
                />
            )}
            <Button title="Save Activity" onPress={handleSubmit} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
    }
});

export default ActivityForm;
