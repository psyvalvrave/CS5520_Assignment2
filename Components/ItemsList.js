import React from 'react';
import { FlatList, StyleSheet, View, Text } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import helper from '../Config/Helper';
import PressableItem from './PressableItem';
import TextItemTitle from './TextItemTitle';
import TextGeneral from './TextGeneral';

const ItemsList = ({ items, itemType, onPressItem }) => {
  //Using GPT to generate a way to print the Weekdays + Date instead of just convert date to string with item.date.toLocaleDateString()
  //from: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString
  const formatDateWithDay = (date) => {
    const options = {
        weekday: 'long',  
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString(undefined, options);  
  };

  return (
    <FlatList
      data={items}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <PressableItem onPress={() => onPressItem(item)} style={styles.itemContainer}>
          <View style={{flex: 2, flexDirection: "row", marginRight: 10}}>
            <TextItemTitle>{item.title}</TextItemTitle>
            {item.special && (
              <AntDesign name="infocirlce" size={helper.fontSize.headerButton} color={helper.color.warning} />
            )}
          </View>
          <View style={styles.right}>
            {itemType === 'activity' && (
              <>
              <View style={styles.holderLeft}>
                <TextGeneral>{item.date ? formatDateWithDay(item.date) : 'No date'}</TextGeneral>
                </View>
                <View style={styles.holderRight}>
                <TextGeneral>{item.duration} mins</TextGeneral>
                </View>
              </>
            )}
            {itemType === 'diet' && (
              <>
              <View style={styles.holderLeft}>
                <TextGeneral>{formatDateWithDay(item.date)}</TextGeneral>
                </View>
                <View style={styles.holderRight}>
                <TextGeneral>      {item.calories}</TextGeneral>
                </View>
              </>
            )}
          </View>
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
  right: {
    flex: 4, 
    flexDirection: "row", 
    alignItems: "center",
    justifyContent: 'space-between',
  },
  holderLeft:{
    backgroundColor:helper.color.infoBox,
    width:"60%",
    marginRight: helper.margin.holder,
  },
  holderRight:{
    backgroundColor:helper.color.infoBox,
    width:"35%",
    marginLeft:helper.margin.holder,
  }
  
});

export default ItemsList;
