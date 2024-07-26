import React, { useState, useEffect, useLayoutEffect } from 'react';
import { View, Alert, StyleSheet, Pressable } from 'react-native';
import InputField from '../Components/InputField';
import TextHeader from '../Components/TextHeader';
import TextGeneral from '../Components/TextGeneral';
import PressableItem from '../Components/PressableItem';
import TextButton from '../Components/TextButton';
import DateTimePickerHolder from '../Components/DateTimePickerHolder';
import { editDocument, deleteDocument } from '../Firebase/FirestoreHelper';
import { useNavigation, useRoute } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { AntDesign } from '@expo/vector-icons';
import Checkbox from 'expo-checkbox';
import helper from '../Config/Helper';
import { useTheme } from '../Components/ThemeContext';

const DietForm = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const [dietEntry, setDietEntry] = useState({
        title: '',
        calories: '',
        date: new Date(),
        special: false,
    });
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [isChecked, setChecked] = useState(false); // State for checkbox
    const { theme } = useTheme(); 
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
                            const dietData = {
                                ...dietEntry,
                                calories: Number(dietEntry.calories),
                                special: isChecked ? !isChecked : isSpecial, // Update special status based on checkbox or calorie count
                            };
                            await editDocument('diets', dietData);
                            navigation.goBack();
                        } catch (error) {
                            console.error('Failed to save the diet entry:', error);
                            alert('Failed to save the diet entry.');
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

    const handleCancel = () => {
        navigation.goBack();
    };

    const themeStyles = StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: theme === 'dark' ? helper.color.backColorDark : helper.color.backColor, 
        }
      });

    return (
        <View style={[styles.container, themeStyles.container]}>
            <TextHeader>Description * </TextHeader>
            <InputField
                value={dietEntry.title}
                onChangeText={(text) => setDietEntry(prev => ({ ...prev, title: text }))}
            />
            <TextHeader style={{marginTop:helper.margin.submitFormTextTop}}>Calories * </TextHeader>
            <InputField
                value={dietEntry.calories}
                onChangeText={(text) => setDietEntry(prev => ({ ...prev, calories: text }))}
                keyboardType="numeric"
            />
            <TextHeader style={{marginTop:helper.margin.submitFormTextTop}}>Date * </TextHeader>
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
            <View style={styles.bottom}>
                {dietEntry.special && (
                    <View style={styles.section}>
                        <Checkbox
                            value={isChecked}
                            onValueChange={setChecked}
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

export default DietForm;
