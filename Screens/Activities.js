import React, {useLayoutEffect, useState} from 'react';
import { View, Button  } from 'react-native';
import ItemsList from '../Components/ItemsList';
import { FontAwesome5, AntDesign  } from '@expo/vector-icons';
import HeaderButtonHolder from '../Components/HeaderButtonHolder';
import helper from '../Config/Helper';

const Activities = ({ navigation }) => {
  const [activities, setActivities] = useState([
    { id: Math.random(), title: 'Jogging', duration: 30, date: '2024-07-15' },
    { id: Math.random(), title: 'Swimming', duration: 45, date: '2024-07-14' },
  ]);


  const updateActivity = (activity) => {
    const index = activities.findIndex(a => a.id === activity.id);
    const newActivities = [...activities]; 
    if (index !== -1) {
      newActivities[index] = activity; // Update existing
    } else {
      newActivities.push(activity); // Add new
    }
    setActivities(newActivities);
  };

  const handlePress = (item) => {
    navigation.navigate('ActivityForm', { activity: item, updateActivities: updateActivity  });
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderButtonHolder onPress={() => navigation.navigate('ActivityForm',{
          activity: { title: '', duration: 0, date: '' },
          updateActivities: updateActivities
        })}>
          <AntDesign name="plus" size={helper.fontSize.headerButton} color={helper.color.headerButton} />
          <FontAwesome5 name="running" size={helper.fontSize.headerButton} color={helper.color.headerButton} />
        </HeaderButtonHolder>
      )
    });
  }, [navigation]);
  return (
    <View style={{ flex: 1 }}>
      <ItemsList items={activities} itemType="activity" onPressItem={handlePress}/>
    </View>
  );
};

export default Activities;
