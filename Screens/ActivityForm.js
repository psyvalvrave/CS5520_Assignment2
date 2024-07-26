import React, { useState, useEffect, useLayoutEffect } from 'react';
import { View, Alert, StyleSheet, Pressable, Text } from 'react-native';
import InputField from '../Components/InputField';
import TextHeader from '../Components/TextHeader';
import TextGeneral from '../Components/TextGeneral';
import TextButton from '../Components/TextButton';
import PressableItem from '../Components/PressableItem';
import HeaderButtonHolder from '../Components/HeaderButtonHolder';
import DateTimePickerHolder from '../Components/DateTimePickerHolder';
import { editDocument, deleteDocument } from '../Firebase/FirestoreHelper';
import { useNavigation, useRoute } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import DropDownPicker from 'react-native-dropdown-picker';
import { AntDesign } from '@expo/vector-icons';
import Checkbox from 'expo-checkbox';
import helper from '../Config/Helper';

const ActivityForm = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const [activity, setActivity] = useState({
        title: '',
        duration: '',
        date: new Date(),
        special: false,
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
    const [isChecked, setChecked] = useState(false); // This state manages the checkbox independently

    useEffect(() => {
        if (route.params?.activity) {
            const { id, title, duration, date, special } = route.params.activity;
            setActivity(prev => ({
                ...prev,
                id: id,
                type: title,
                duration: duration.toString(),
                date: date ? new Date(date) : new Date(),
                special: special
            }));
        }
    }, [route.params?.activity]);

    useLayoutEffect(() => {
        const isEditing = !!route.params?.activity;
        navigation.setOptions({
            headerTitle: isEditing ? 'Edit Activity' : 'Create Activity',
            headerRight: () => (
                isEditing ? (
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
        setShowDatePicker(false);
        setActivity(prev => ({
            ...prev,
            date: currentDate
        }));
    };

    const handleSubmit = async () => {
        if (activity.duration.trim() === '' || isNaN(activity.duration)) {
            alert('Please enter a valid duration in minutes.');
            return;
        }
        if (!activity.type) {
            alert('Please select an activity type.');
            return;
        }

        let isSpecial = activity.special;
        if (!activity.id && parseInt(activity.duration) > 60 && (activity.type === 'Running' || activity.type === 'Weights')) {
            isSpecial = true;
        }

        Alert.alert(
            "Confirm Save",
            "Are you sure you want to save these changes?",
            [
                {
                    text: "No",
                    style: "cancel"
                },
                {
                    text: "Yes",
                    onPress: async () => {
                        try {
                            const activityData = {
                                ...activity,
                                title: activity.type,
                                duration: Number(activity.duration),
                                special: isSpecial,
                            };
                            if(isChecked){
                                activityData.special = !isChecked; // Update special if checkbox is checked
                            }
                            delete activityData.type;
                            await editDocument('activities', activityData);
                            navigation.goBack();
                        } catch (error) {
                            console.error('Failed to save the activity:', error);
                            alert('Failed to save the activity.');
                        }
                    },
                    style: "destructive"
                }
            ],
            { cancelable: false }
        );
    };

    const handleDelete = async () => {
        Alert.alert(
            "Confirm Deletion",
            "Are you sure you want to delete this activity?",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "Delete",
                    onPress: async () => {
                        try {
                            await deleteDocument("activities", activity.id);
                            navigation.goBack();
                        } catch (error) {
                            console.error('Error deleting the activity:', error);
                            alert('Failed to delete the activity.');
                        }
                    },
                    style: "destructive"
                }
            ],
            { cancelable: false }
        );
    };

    const handleCancel = () => {
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <TextHeader>Title * </TextHeader>
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
            <TextHeader>Duration * </TextHeader>
            <InputField
                placeholder="Duration (minutes)"
                value={activity.duration}
                onChangeText={(text) => handleChange('duration', text)}
            />
            <TextHeader style={{marginTop:helper.margin.submitFormTextTop}}>Date * </TextHeader>
            <DateTimePickerHolder onPress={() => setShowDatePicker(true)}>
                <TextGeneral>{activity.date.toLocaleDateString()} </TextGeneral>
            </DateTimePickerHolder>
            {showDatePicker && (
                <DateTimePicker
                    value={activity.date}
                    mode="date"
                    display="inline"
                    onChange={handleDateChange}
                />
            )}
            <View style={styles.bottom}>
                {activity.special && (
                    <View style={styles.section}>
                        <Checkbox
                            value={isChecked}
                            onValueChange={(newValue) => {
                                setChecked(newValue);
                            }}
                        />
                        <TextGeneral style={styles.checkboxText}>
                            This item is marked as special. Uncheck if you wish to remove this designation. 
                        </TextGeneral>
                    </View>
                )}
                <View style={styles.actionContainer}>
                    <PressableItem onPress={handleCancel} style={[styles.Button, styles.cancel]}>
                        <TextButton>Cancel </TextButton>
                    </PressableItem>
                    <PressableItem onPress={handleSubmit} style={[styles.Button, styles.save]}>
                        <TextButton>Save </TextButton>
                    </PressableItem>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: helper.padding.listItemContainer,
        justifyContent: 'flex-start',
    },
    dropdown: {
        marginBottom: 20,
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
        padding: helper.padding.checkBox,
    },
    checkboxText: {
        fontWeight: 'bold',
        marginLeft: 10,
    },
    actionContainer: {
        flexDirection: 'row',
        justifyContent: "space-evenly",
    },
    Button: {
        width: "45%",
        padding: helper.padding.listItemContainer,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    save: {
        backgroundColor: helper.color.saveButtonBackground,
    },
    cancel: {
        backgroundColor: helper.color.cancelButtonBackground,
    },
    bottom:{
        position: 'absolute',
        bottom: helper.buttonPosition.bottom,
        left: helper.buttonPosition.left,
        right: helper.buttonPosition.right,
    }
});

export default ActivityForm;
