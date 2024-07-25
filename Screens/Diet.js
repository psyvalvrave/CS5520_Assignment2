import React, { useState, useEffect, useLayoutEffect } from 'react';
import { View } from 'react-native';
import ItemsList from '../Components/ItemsList';
import { FontAwesome5, AntDesign } from '@expo/vector-icons';
import HeaderButtonHolder from '../Components/HeaderButtonHolder';
import { collection, onSnapshot } from 'firebase/firestore';
import { database } from "../Firebase/FirebaseSetup";
import helper from '../Config/Helper';

const Diet = ({ navigation }) => {
  const [diet, setDiet] = useState([]);

  useEffect(() => {
    const subscriber = onSnapshot(collection(database, "diets"), (querySnapshot) => {
      const loadedDiet = querySnapshot.docs.map(documentSnapshot => {
        const data = documentSnapshot.data();
        // Convert Firebase timestamps to JavaScript Date objects, or handle null dates
        if (data.date && data.date.toDate) {
          data.date = data.date.toDate().toISOString();  // Convert to ISO string for uniform handling
        } else {
          data.date = null;
        }
        return {
          ...data,
          id: documentSnapshot.id,
        };
      });
      setDiet(loadedDiet);
    });

    return () => subscriber();  // Clean up on unmount
  }, []);

  const handlePress = (item) => {
    // Prepare item for navigation, ensuring date is properly formatted
    const modifiedItem = {
      ...item,
      date: item.date ? new Date(item.date).toISOString() : null
    };
    navigation.navigate('DietForm', { dietEntry: modifiedItem });
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderButtonHolder onPress={() => navigation.navigate('DietForm')}>
          <AntDesign name="plus" size={helper.fontSize.headerButton} color={helper.color.headerButton} />
          <FontAwesome5 name="utensils" size={helper.fontSize.headerButton} color={helper.color.headerButton} />
        </HeaderButtonHolder>
      )
    });
  }, [navigation]);

  return (
    <View style={{ flex: 1 }}>
      <ItemsList items={diet} itemType="diet" onPressItem={handlePress}/>
    </View>
  );
};

export default Diet;
