import React, {useLayoutEffect} from 'react';
import { View, Button  } from 'react-native';
import ItemsList from '../Components/ItemsList';
import { FontAwesome5, AntDesign  } from '@expo/vector-icons';
import HeaderButtonHolder from '../Components/HeaderButtonHolder';
import TextHeaderButton from '../Components/TextHeaderButton';
import helper from '../Config/Helper';

const Activities = ({ navigation }) => {
  const activitiesData = [
    { id: Math.random(), title: 'Jogging', duration: '30 mins', date: '2024-07-15' },
    { id: Math.random(), title: 'Swimming', duration: '45 mins', date: '2024-07-14' },
  ];

  const handlePress = (item) => {
    navigation.navigate('ActivityForm', { activity: item });
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderButtonHolder onPress={() => navigation.navigate('ActivityForm')}>
          <AntDesign name="plus" size={helper.fontSize.headerButton} color={helper.color.headerButton} />
          <FontAwesome5 name="running" size={helper.fontSize.headerButton} color={helper.color.headerButton} />
        </HeaderButtonHolder>
      )
    });
  }, [navigation]);
  return (
    <View style={{ flex: 1 }}>
      <ItemsList items={activitiesData} itemType="activity" onPressItem={handlePress}/>
    </View>
  );
};

export default Activities;
