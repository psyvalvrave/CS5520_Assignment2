import React, {useLayoutEffect, useState, useEffect} from 'react';
import { View, Button  } from 'react-native';
import ItemsList from '../Components/ItemsList';
import { FontAwesome5, AntDesign  } from '@expo/vector-icons';
import HeaderButtonHolder from '../Components/HeaderButtonHolder';
import { database } from "../Firebase/FirebaseSetup";
import { collection, onSnapshot } from 'firebase/firestore';
import helper from '../Config/Helper';

const Activities = ({ navigation }) => {
  const [activities, setActivities] = useState([ ]);

  useEffect(() => {
    const subscriber = onSnapshot(collection(database, "activities"), (querySnapshot) => {
      const loadedActivities = querySnapshot.docs.map(documentSnapshot => {
        const data = documentSnapshot.data();
        // Ensure dates are converted to JavaScript Date objects
        if (data.date && data.date.toDate) {
          data.date = data.date.toDate();
        } else {
          // Set a default date or leave it undefined/null based on your application's requirements
          data.date = null;
        }
        return {
          ...data,
          id: documentSnapshot.id,
        };
      });
      setActivities(loadedActivities);
    });

    return () => subscriber();  // Cleanup on unmount
  }, []);

  const handlePress = (item) => {
    // Convert date to a timestamp or string before navigation
    const modifiedItem = {
        ...item,
        date: item.date ? item.date.toISOString() : null  // Use ISO string format
    };
    navigation.navigate('ActivityForm', { activity: modifiedItem });
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
      <ItemsList items={activities} itemType="activity" onPressItem={handlePress}/>
    </View>
  );
};

export default Activities;
