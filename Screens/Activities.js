import React, {useLayoutEffect, useState, useEffect} from 'react';
import { View, StyleSheet   } from 'react-native';
import ItemsList from '../Components/ItemsList';
import { FontAwesome5, AntDesign  } from '@expo/vector-icons';
import HeaderButtonHolder from '../Components/HeaderButtonHolder';
import { database } from "../Firebase/FirebaseSetup";
import { collection, onSnapshot } from 'firebase/firestore';
import helper from '../Config/Helper';
import { useTheme } from '../Components/ThemeContext';

const Activities = ({ navigation }) => {
  const [activities, setActivities] = useState([ ]);
  const { theme } = useTheme(); 

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
    navigation.navigate('ActivityForm', { activity: modifiedItem }); //pass the object into edit screen when we try to edit
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme === 'dark' ? helper.color.backColorDark : helper.color.backColor, 
    }
  });

  //render the header with button, useLayoutEffect can make sure changes are visble for the user immediately, and it help avoiding the position of elements can be render in some weird spot
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
    <View style={styles.container}>
      <ItemsList items={activities} itemType="activity" onPressItem={handlePress}/>
    </View>
  );

  

};

export default Activities;

