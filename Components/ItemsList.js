import React from 'react';
import { FlatList, StyleSheet, View, Text } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import helper from '../Config/Helper';
import PressableItem from './PressableItem';
import TextItemTitle from './TextItemTitle';
import TextGeneral from './TextGeneral';
import { useTheme } from '../Components/ThemeContext';

const ItemsList = ({ items, itemType, onPressItem }) => {
  const { theme } = useTheme(); 
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

  const themeStyles = StyleSheet.create({
    text: {
      color: theme === 'dark' ? helper.color.textColorDark : helper.color.textColor, 
    },
    generalHolder:{
      backgroundColor: theme === 'dark' ? helper.color.infoBoxDark : helper.color.infoBox, 
      marginRight: helper.margin.holder,
      alignItems: "center",
      justifyContent:"center",
      borderWidth: 2, 
      borderColor: 'black', 
      borderRadius: 10,
    },
  });

  return (
    <FlatList
      data={items}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <PressableItem onPress={() => onPressItem(item)} style={styles.itemContainer}>
          <View style={{flex: 2, flexDirection: "row", marginRight: 10, alignItems:"center"}}>
            <TextItemTitle style={themeStyles.text}>{item.title} </TextItemTitle>
            {item.special && (
              <AntDesign name="infocirlce" size={helper.fontSize.headerButton} color={theme === 'dark' ? helper.color.warning:helper.color.warningDark} />
            )}
          </View>
          <View style={styles.right}>
            {itemType === 'activity' && (
              <>
              <View style={[styles.holderLeft, themeStyles.generalHolder]}>
                <TextGeneral>{item.date ? formatDateWithDay(item.date) : 'No date'} </TextGeneral>
                </View>
                <View style={[styles.holderRight, themeStyles.generalHolder]}>
                <TextGeneral>{item.duration} mins </TextGeneral>
                </View>
              </>
            )}
            {itemType === 'diet' && (
              <>
              <View style={[styles.holderLeft, themeStyles.generalHolder]}>
                <TextGeneral>{formatDateWithDay(item.date)} </TextGeneral>
                </View>
                <View style={[styles.holderRight, themeStyles.generalHolder]}>
                <TextGeneral>{item.calories} cal </TextGeneral>
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
    height: "100%",
  },
  holderLeft:{
    width:"60%",
  },
  holderRight:{
    width:"35%",
  }
  
});

export default ItemsList;
