import React, { useState, useEffect, useLayoutEffect } from 'react';
import { View, Button, StyleSheet, Pressable } from 'react-native';
import InputField from '../Components/InputField';
import TextHeader from '../Components/TextHeader';
import TextGeneral from '../Components/TextGeneral';
import TextButton from '../Components/TextButton';
import PressableItem from '../Components/PressableItem';
import HeaderButtonHolder from '../Components/HeaderButtonHolder';
import DateTimePickerHolder from '../Components/DateTimePickerHolder';
import { editActivity, deleteActivity } from '../Firebase/FirestoreHelper';
import { useNavigation, useRoute } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import DropDownPicker from 'react-native-dropdown-picker';
import { AntDesign } from '@expo/vector-icons';
import helper from '../Config/Helper';

const ActivityForm = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const [activity, setActivity] = useState({
        title: '',
        duration: '',
        date: new Date()  // Default to current date
    });
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [open, setOpen] = useState(false);
    const [items, setItems] = useState([
        { label: 'Walking', value: 'Walking' },
        { label: 'Running', value: 'Running' },
        { label: 'Swimming', value: 'Swimming' },
        { label: 'Weights', value: 'Weights' },
        { label: 'Yoga', value: 'Yoga' },
        { label: 'Cycling', value: 'Cycling' },
        { label: 'Hiking', value: 'Hiking' },
    ]);

    useEffect(() => {
        if (route.params?.activity) {
            const {id, title, duration, date } = route.params.activity;
            setActivity(prev => ({
                ...prev,
                id: id,
                type: title, 
                duration: duration.toString(),
                date: date ? new Date(date) : new Date()  // Convert if necessary
            }));
        }
    }, [route.params?.activity]);
    

    useLayoutEffect(() => {
        const isEditing = !!route.params?.activity;
        navigation.setOptions({
            headerTitle: isEditing ? 'Edit Activity' : 'Create Activity',
            headerRight: () => (
                isEditing ? (
                    //I want to use my own HeaderButtonHolder, however, there is a bug when I use custom compontent at this point. The button will will place randomly, so I have to use Pressable instead
                    //Check https://github.com/software-mansion/react-native-screens/issues/432
                    <Pressable onPress={handleDelete}>
                        <AntDesign name="delete" size={helper.fontSize.headerButton} color={helper.color.headerButton} />
                    </Pressable>

                ) : undefined
            ),
        });
    }, [navigation, route.params?.activity, activity.id]);
    

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

    const handleSubmit = async () => {
        if (activity.duration.trim() === '' || isNaN(activity.duration)) {
            alert('Please enter a valid duration in minutes.');
            return;  // Stop the submission if the validation fails
        }
        if (!activity.type) {
            alert('Please select an activity type.');
            return; 
        }

        try {
            const activityData = {
                ...activity,
                title: activity.type, 
                duration: Number(activity.duration) // Ensure duration is a number
            };
            delete activityData.type;
            await editActivity('activities', activityData);
            navigation.goBack();
        } catch (error) {
            console.error('Failed to save the activity:', error);
        }
    };

    const handleDelete = async (i) => {
        try {
            await deleteActivity("activities", activity.id);
            navigation.goBack(); 
        } catch (error) {
            console.error('Error deleting the activity:', error);
            alert('Failed to delete the activity.');  // Notify the user of the error
        }
    };
    const handleCancel = () => {
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <TextHeader>Title</TextHeader>
            <DropDownPicker
                open={open}
                value={activity.type}
                items={items}
                setOpen={setOpen}
                setValue={(value) => handleChange('type', value())}
                setItems={setItems}
                style={styles.dropdown}
                placeholder="Select an activity type"
            />
            <TextHeader>Duration</TextHeader>
            <InputField
                placeholder="Duration (minutes)"
                value={activity.duration}
                onChangeText={(text) => handleChange('duration', text)}
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
            <View style={styles.actionContainer}>
                <PressableItem onPress={handleCancel} style={[styles.Button, styles.cancel]}>
                    <TextButton>Cancel</TextButton>
                </PressableItem>
                <PressableItem onPress={handleSubmit} style={[styles.Button, styles.save]}>
                    <TextButton>Save</TextButton>
                </PressableItem>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: helper.padding.listItemContainer,
    },
    dropdown: {
        marginBottom: 20,
    },
    actionContainer: {
        flexDirection: 'row',
        justifyContent: "space-evenly",
    },
    Button:{
        width:"45%",
        padding: helper.padding.listItemContainer,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    save:{
        backgroundColor: helper.color.saveButtonBackground,
    },
    cancel:{
        backgroundColor: helper.color.cancelButtonBackground,
    }
    
});

export default ActivityForm;
