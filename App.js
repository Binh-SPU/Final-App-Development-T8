import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';

export default function App() {

  const [itemsList, setItemsList] = useState([]);
  const [currtItem, setCurrItem] = useState('');
  const [currItemQuantity, setcurrItemQuantity] = useState('');

  const addingCurrItem = () => {

    const newCurrItem = [...itemsList, { holderItemName: currtItem, holderItemQuantity: currItemQuantity}];
    setItemsList(newCurrItem);
    setCurrItem('');
    setcurrItemQuantity('');
  };

  const deletingCurrItem = (index) => {
    const newCurrItem = [...itemsList];
    newCurrItem.splice(index, 1);
    setItemsList(newCurrItem);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Grocery List App</Text>
      <View style={styles.inputBox}>
        <TextInput style={styles.inputName} placeholder="Input Item's Name" value={currtItem} onChangeText={setCurrItem}/>
        <TextInput style={styles.inputQuantity} placeholder="Input Item's Quantity" value={currItemQuantity} onChangeText={setcurrItemQuantity} />

        <TouchableOpacity style={styles.submitButton} onPress={addingCurrItem}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.displayingItems}>

        {itemsList.map((perItem, index) => (
          <View style={styles.itemDisplay} key={index}>
            <View style={styles.itemInfo}>
              <Text style={styles.itemNameStyle}>{perItem.holderItemName}</Text>
              <Text style={styles.itemQuantityStyle}>x{perItem.holderItemQuantity}</Text>
            </View>
            <TouchableOpacity style={styles.delBtn} onPress={() => deletingCurrItem(index)}>
              <Text style={styles.delBtnText}>Delete</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFF00',
  },
  title: {
    textAlign: 'center',
    marginVertical: 24,
    fontSize: 30,
    fontWeight: 'bold',
    fontFamily: '',
  },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputName: {
    borderWidth: 3,
    padding: 8,
    borderRadius: 15,
    fontSize: 14,
    fontWeight: 'bold',
    marginRight: 5,
    flex: 1,
  },
  inputQuantity: {
    borderWidth: 3,
    padding: 8,
    borderRadius: 15,
    fontSize: 14,
    fontWeight: 'bold',
    marginRight: 2,
    marginLeft: 2,
    flex: 1,
  },
  submitButton: {
    padding: 15,
    backgroundColor: '#90EE90',
    borderRadius: 15,
    marginLeft: 5,
  },
  submitButtonText: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  displayingItems: {
    flex: 1,
    borderRadius: 7,
    padding: 15,
  },
  itemDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 2,
    borderBottomColor: 'black',
  },
  itemInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemNameStyle: {
    fontWeight: '500',
    fontSize: 18,
  },
  itemQuantityStyle: {
    fontSize: 18,
    marginLeft: 70,
  },
  delBtn: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    marginLeft: 10,
  },
  delBtnText: {
    fontWeight: '600',
  },
});