import React from 'react';
import { View } from 'react-native';
import ItemsList from '../Components/ItemsList';
import {FontAwesome5} from '@expo/vector-icons';

const dietData = [
  { id: 1, title: 'Oatmeal', date: '2024-07-18', time: '07:30 AM' },
  { id: 2, title: 'Chicken Salad', date: '2024-07-18', time: '12:45 PM' },
];

const handlePress = (item) => {
  console.log('Selected Diet', `Title: ${item.title}`);
};

const Diet = () => {
  return (
    <View style={{ flex: 1 }}>
      <ItemsList items={dietData} itemType="diet" onPressItem={handlePress}/>
    </View>
  );
};

export default Diet;
