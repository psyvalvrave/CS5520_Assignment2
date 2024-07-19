import React from 'react';
import { FlatList, Text, View, StyleSheet } from 'react-native';

const ItemsList = ({ items, itemType }) => {
  return (
    <FlatList
      data={items}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <View style={styles.itemContainer}>
          <Text style={[styles.text, styles.title]}>{item.title}</Text>
          {itemType === 'activity' && (
            <>
              <Text style={[styles.text, styles.detail]}>{item.duration}</Text>
              <Text style={[styles.text, styles.detail]}>{item.date}</Text>
            </>
          )}
          {itemType === 'diet' && (
            <>
              <Text style={[styles.text, styles.detail]}>{item.date}</Text>
              <Text style={[styles.text, styles.detail]}>{item.time}</Text>
            </>
          )}
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    padding: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc'
  },
  text: {
    fontSize: 14
  },
  title: {
    flex: 2, 
    fontWeight: 'bold'
  },
  detail: {
    flex: 1 
  }
});

export default ItemsList;
