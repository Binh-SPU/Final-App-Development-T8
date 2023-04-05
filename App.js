import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import * as SQLite from "expo-sqlite";

function openDatabase() {
  const db = SQLite.openDatabase("Test.db");
  db.transaction((tx) => {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS List (ItemID INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL UNIQUE, ItemName TEXT NOT NULL, Quantity TEXT NOT NULL)"
    );
  });
  return db;
}

const db = openDatabase();

export default function App() {
  const [itemsList, setItemsList] = useState([]);
  const [currtItem, setCurrItem] = useState("");
  const [currItemQuantity, setcurrItemQuantity] = useState("");

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM List",
        null,
        (_, dataSet) => setItemsList(dataSet.rows._array),
        (_, errorMessage) => console.log(errorMessage)
      );
    });
  }, [db]);

  const addingCurrItem = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO List (ItemName, Quantity) VALUES (?, ?)",
        [currtItem, currItemQuantity],
        (_, dataSet) => {
          let existingItemList = [...itemsList];
          existingItemList.push({
            ItemID: dataSet.insertId,
            ItemName: currtItem,
            Quantity: currItemQuantity,
          });
          setItemsList(existingItemList);
          setCurrItem("");
          setcurrItemQuantity("");
        },
        (_, errorMessage) => console.log(errorMessage)
      );
    });
  };

  const deletingCurrItem = (id) => {
    db.transaction((tx) => {
      tx.executeSql(
        "DELETE FROM List WHERE ItemID = ?",
        [id],
        (_, dataSet) => {
          if (dataSet.rowsAffected > 0) {
            let existingItemList = [...itemsList].filter(
              (item) => item.ItemID !== id
            );
            setItemsList(existingItemList);
          }
        },
        (_, errorMessage) => console.log(errorMessage)
      );
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Grocery List App</Text>
      <View style={styles.inputBox}>
        <TextInput
          style={styles.inputName}
          placeholder="Input Item's Name"
          value={currtItem}
          onChangeText={setCurrItem}
        />
        <TextInput
          style={styles.inputQuantity}
          placeholder="Input Item's Quantity"
          value={currItemQuantity}
          onChangeText={setcurrItemQuantity}
        />

        <TouchableOpacity style={styles.submitButton} onPress={addingCurrItem}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.displayingItems}>
        {itemsList.map((perItem, ItemID) => (
          <View style={styles.itemDisplay} key={ItemID}>
            <View style={styles.itemInfo}>
              <Text style={styles.itemNameStyle}>{perItem.ItemName}</Text>
              <Text style={styles.itemQuantityStyle}>x{perItem.Quantity}</Text>
            </View>
            <TouchableOpacity
              style={styles.delBtn}
              onPress={() => deletingCurrItem(perItem.ItemID)}
            >
              <Text style={styles.delBtnText}>Delete</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7E551",
  },
  title: {
    textAlign: "center",
    marginVertical: 24,
    fontSize: 30,
    fontWeight: "bold",
    fontFamily: "",
  },
  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  inputName: {
    borderWidth: 3,
    padding: 8,
    borderRadius: 15,
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 5,
    flex: 1,
  },
  inputQuantity: {
    borderWidth: 3,
    padding: 8,
    borderRadius: 15,
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 2,
    marginLeft: 2,
    flex: 1,
  },
  submitButton: {
    padding: 15,
    backgroundColor: "#90EE90",
    borderRadius: 15,
    marginLeft: 5,
  },
  submitButtonText: {
    fontSize: 15,
    fontWeight: "bold",
  },
  displayingItems: {
    flex: 1,
    borderRadius: 7,
    padding: 15,
  },
  itemDisplay: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderColor: "black",
    borderRadius: 6,
    backgroundColor: "#FFFF00", //CHANGE
  },
  itemInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  itemNameStyle: {
    fontWeight: "500",
    fontSize: 18,
  },
  itemQuantityStyle: {
    fontSize: 18,
    marginLeft: 70,
  },
  delBtn: {
    backgroundColor: "#E70B0B",
    padding: 10,
    borderRadius: 5,
    marginLeft: 10,
  },
  delBtnText: {
    fontWeight: "600",
  },
});
