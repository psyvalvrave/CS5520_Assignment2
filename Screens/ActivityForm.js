import React, { useState } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import InputField from '../Components/InputField';  
import TextHeader from '../Components/TextHeader';

const ActivityForm = ({ navigation, route }) => {
    const [id, setId] = useState(route.params?.activity?.id || '');
    const [title, setTitle] = useState(route.params?.activity?.title || '');
    const [duration, setDuration] = useState(route.params?.activity?.duration.toString() || '');
    const [date, setDate] = useState(route.params?.activity?.date || '');
    const { activity, updateActivity } = route.params;

    const handleSubmit = () => {
        const updatedActivity = { ...activity, title, duration: Number(duration), date };
        updateActivity(updatedActivity);
        console.log(activity);
        console.log(updateActivities);
        navigation.goBack();
      };

    return (
    <View style={styles.container}>
        <TextHeader>Title</TextHeader>
        <InputField
            placeholder="Title"
            value={title}
            onChangeText={setTitle}
        />
        <TextHeader>Duration</TextHeader>
        <InputField
            placeholder="Duration (minutes)"
            value={duration}
            keyboardType="numeric"
            onChangeText={setDuration}
        />
        <TextHeader>Date</TextHeader>
        <InputField
            placeholder="Date"
            value={date}
            onChangeText={setDate}
        />
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
