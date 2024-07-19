import React, { useState } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import InputField from '../Components/InputField';  

const ActivityForm = ({ navigation, route }) => {
  const [title, setTitle] = useState(route.params?.activity?.title || '');
  const [duration, setDuration] = useState(route.params?.activity?.duration || '');
  const [date, setDate] = useState(route.params?.activity?.date || '');

  const handleSubmit = () => {
    // Here you would handle saving the activity to your state or backend
    alert('Activity Saved!');
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <InputField
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />
      <InputField
        placeholder="Duration"
        value={duration}
        onChangeText={setDuration}
      />
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
