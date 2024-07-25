import React from 'react';
import { FlatList, Text, View, StyleSheet, Pressable } from 'react-native';
import helper from '../Config/Helper';
import PressableItem from './PressableItem';
import TextItemTitle from './TextItemTitle';
import TextGeneral from './TextGeneral';

const ItemsList = ({ items, itemType, onPressItem }) => {
  //Using GPT to generate a way to print the Weekdays + Date instead of just convert date to string with item.date.toLocaleDateString()
  const formatDateWithDay = (date) => {
    const options = {
        weekday: 'long',  
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };

    const dateObj = new Date(date);
    return dateObj.toLocaleDateString('en-US', options);  
};
  return (
    <FlatList
      data={items}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <PressableItem onPress={() => onPressItem(item)} style={styles.itemContainer}>
          <TextItemTitle>{item.title}</TextItemTitle>
          {itemType === 'activity' && (
            <> 
              <TextGeneral>{item.duration} mins</TextGeneral>
              <TextGeneral>{item.date ? formatDateWithDay(item.date) : 'No date'}</TextGeneral>
            </>
          )} 
          {itemType === 'diet' && (
            <>
              <TextGeneral>{item.date}</TextGeneral>
              <TextGeneral>{item.time}</TextGeneral>
            </>
          )}
        </PressableItem>
      )}
    />
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    padding: helper.padding.listItemContainer,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: helper.color.borderBottomColor,
  },
  title: {
    flex: 2, 
    fontWeight: 'bold'
  },
});

export default ItemsList;
