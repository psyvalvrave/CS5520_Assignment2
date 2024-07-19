import React, {useLayoutEffect} from 'react';
import { View } from 'react-native';
import ItemsList from '../Components/ItemsList';

const activitiesData = [
  { id: Math.random(), title: 'Jogging', duration: '30 mins', date: '2024-07-15' },
  { id: Math.random(), title: 'Swimming', duration: '45 mins', date: '2024-07-14' },
];


const handlePress = (item) => {
    console.log('Selected Activity', `Title: ${item.title}`);
  };

const Activities = () => {
  return (
    <View style={{ flex: 1 }}>
      <ItemsList items={activitiesData} itemType="activity" onPressItem={handlePress}/>
    </View>
  );
};

export default Activities;
