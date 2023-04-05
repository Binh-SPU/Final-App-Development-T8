import { useState, useEffect } from "react";
import * as SQLite from "expo-sqlite";

function openDatabase() {
  const db = SQLite.openDatabase("Grocery-Checklist.db");
  return db;
}

const db = openDatabase();

export default function Database() {
  const [text, setText] = useState(null);
  const [forceUpdate, forceUpdateId] = useForceUpdate();

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        "create table if not exists items (ItemID integer primary key not null, ItemName text not null, Category text not null, Quantity text not null, Cost real, Status text not null default 'no', StoreID integer unique);"
      );
    });
  }, []);

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        "create table if not exists items (StoreID integer primary key not null unique, Name text not null, Address text not null unique, OpenTime text, CloseTime text);"
      );
    });
  }, []);

  db.transaction(
    (tx) => {
      tx.executeSql(
        "insert into items (ItemName, Category, Quantity, Cost, Status) values (?, ?, ?, ?, 'No')",
        [nameText, categoryText, quantityText, costNum]
      );
      // tx.executeSql("select * from items", [], (_, { rows }) =>
      //   console.log(JSON.stringify(rows))
      // );
    },
    null,
    forceUpdate
  );
}

db.transaction(
  (tx) => {
    tx.executeSql(
      "insert into items (Name, Address, OpenTime, CloseTime) values (?, ?, null, null)",
      [nameText, addressText, openTimeText, closeTimeText]
    );
  },
  null,
  forceUpdate
);

db.transaction(
  (tx) => {
    tx.executeSql(`delete from items where ItemID = ?;`, [id]);
  },
  null,
  forceUpdate
);

db.transaction(
  (tx) => {
    tx.executeSql(`delete from items where StoreID = ?;`, [id]);
  },
  null,
  forceUpdate
);

/*
  1) Ask about id.
  2) Do I need to design an interface for the database?
  3) Does my database look correctly inplemented right now?
  4) How to put [nameText, addressText, openTimeText, closeTimeText] in a function?
 */
