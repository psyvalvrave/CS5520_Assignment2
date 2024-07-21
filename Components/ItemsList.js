import React from 'react';
import { FlatList, Text, View, StyleSheet, Pressable } from 'react-native';
import helper from '../Config/Helper';
import PressableItem from './PressableItem';
import TextItemTitle from './TextItemTitle';
import TextGeneral from './TextGeneral';

const ItemsList = ({ items, itemType, onPressItem }) => {
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
              <TextGeneral>{item.date}</TextGeneral>
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
  text: {
    fontSize: helper.fontSize.general,
    flex: 1,
  },
  title: {
    flex: 2, 
    fontWeight: 'bold'
  },
});

export default ItemsList;
