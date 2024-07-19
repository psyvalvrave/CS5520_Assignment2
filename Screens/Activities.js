import React from 'react';
import { View } from 'react-native';
import ItemsList from '../Components/ItemsList';

const activitiesData = [
  { id: Math.random(), title: 'Jogging', duration: '30 mins', date: '2024-07-15' },
  { id: Math.random(), title: 'Swimming', duration: '45 mins', date: '2024-07-14' },
  // Add more data as necessary
];

const Activities = () => {
  return (
    <View style={{ flex: 1 }}>
      <ItemsList items={activitiesData} itemType="activity" />
    </View>
  );
};

export default Activities;
