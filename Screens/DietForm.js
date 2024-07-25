import React, { useState, useEffect, useLayoutEffect } from 'react';
import { View, Alert, StyleSheet, Text } from 'react-native';
import InputField from '../Components/InputField';
import TextHeader from '../Components/TextHeader';
import TextGeneral from '../Components/TextGeneral';
import PressableItem from '../Components/PressableItem';
import TextButton from '../Components/TextButton';
import DateTimePickerHolder from '../Components/DateTimePickerHolder';
import { editDocument, deleteDocument } from '../Firebase/FirestoreHelper';
import { useNavigation, useRoute } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import helper from '../Config/Helper';

const DietForm = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const [dietEntry, setDietEntry] = useState({
        title: '',
        calories: '',
        date: new Date(),
        special: false,  // Default state for special
    });
    const [showDatePicker, setShowDatePicker] = useState(false);

    useEffect(() => {
        if (route.params?.dietEntry) {
            const { id, title, calories, date, special } = route.params.dietEntry;
            setDietEntry({
                id: id,
                title: title,
                calories: calories.toString(),
                date: date ? new Date(date) : new Date(),
                special: special,
            });
        }
    }, [route.params?.dietEntry]);

    useLayoutEffect(() => {
        const isEditing = !!route.params?.dietEntry;
        navigation.setOptions({
            headerTitle: isEditing ? 'Edit Diet' : 'Create Diet',
            headerRight: () => (
                isEditing ? (
                    <Pressable onPress={handleDelete}>
                        <AntDesign name="delete" size={helper.fontSize.headerButton} color={helper.color.headerButton} />
                    </Pressable>
                ) : undefined
            ),
        });
    }, [navigation, route.params?.dietEntry, dietEntry.id]);

    const handleDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || dietEntry.date;
        setShowDatePicker(false);
        setDietEntry(prev => ({
            ...prev,
            date: currentDate
        }));
    };

    const handleSubmit = async () => {
        if (dietEntry.calories.trim() === '' || isNaN(dietEntry.calories) || parseInt(dietEntry.calories) < 0) {
            alert('Please enter a valid non-negative integer for calories.');
            return;
        }

        // Determine if the entry should be marked as special based on calorie count
        const isSpecial = parseInt(dietEntry.calories) > 800;

        try {
            const dietData = {
                ...dietEntry,
                calories: Number(dietEntry.calories),
                special: isSpecial, // Update the special status based on calorie count
            };
            await editDocument('diets', dietData);
            navigation.goBack();
        } catch (error) {
            console.error('Failed to save the diet entry:', error);
            alert('Failed to save the diet entry.');
        }
    };

    const handleDelete = async () => {
        Alert.alert(
            "Confirm Deletion",
            "Are you sure you want to delete this diet entry?",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Delete", onPress: async () => {
                        try {
                            await deleteDocument("diets", dietEntry.id);
                            navigation.goBack();
                        } catch (error) {
                            console.error('Error deleting the diet entry:', error);
                            alert('Failed to delete the diet entry.');
                        }
                    }, style: "destructive"
                }
            ],
            { cancelable: false }
        );
    };

    return (
        <View style={styles.container}>
            <TextHeader>Title</TextHeader>
            <InputField
                value={dietEntry.title}
                onChangeText={(text) => setDietEntry(prev => ({ ...prev, title: text }))}
            />
            <TextHeader>Calories</TextHeader>
            <InputField
                value={dietEntry.calories}
                onChangeText={(text) => setDietEntry(prev => ({ ...prev, calories: text }))}
                keyboardType="numeric"
            />
            <TextHeader>Date</TextHeader>
            <DateTimePickerHolder onPress={() => setShowDatePicker(true)}>
                <TextGeneral>{dietEntry.date.toLocaleDateString()}</TextGeneral>
            </DateTimePickerHolder>
            {showDatePicker && (
                <DateTimePicker
                    value={dietEntry.date}
                    mode="date"
                    display="inline"
                    onChange={handleDateChange}
                />
            )}
            <View style={styles.actionContainer}>
                <PressableItem onPress={handleDelete} style={[styles.button, styles.cancel]}>
                    <TextButton>Cancel</TextButton>
                </PressableItem>
                <PressableItem onPress={handleSubmit} style={[styles.button, styles.save]}>
                    <TextButton>Save</TextButton>
                </PressableItem>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'flex-start',
    },
    actionContainer: {
        flexDirection: 'row',
        justifyContent: "space-evenly",
        marginTop: 20,
    },
    button: {
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
});

export default DietForm;
