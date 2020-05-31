import * as SQLite from "expo-sqlite";
const db = SQLite.openDatabase("profile_db");
var moment = require("moment");

insert = () => {
  db.transaction((tx) => {
    tx.executeSql(
      "insert into profile_table (date, name, avatar_uri, height, width, premium) values (?, ?, ?, ?, ?, ?)",
      [
        moment().format("YYYY-MM-DD hh:mm:ss"),
        "Name",
        "../assets/avatar.jpg",
        500,
        500,
        0,
      ]
    );
    tx.executeSql("SELECT * FROM profile_table", [], (tx, results) => {
      var temp = [];
      for (let i = 0; i < results.rows.length; ++i) {
        temp.push(results.rows.item(i));
      }
      return temp;
    });
  });
};

export default async function createProfile() {
  db.transaction((tx) => {
    tx.executeSql(
      "create table if not exists profile_table (id integer primary key not null, date string, name string, avatar_uri string, height integer, width integer, premium integer)",
      []
    );

    tx.executeSql("SELECT * FROM profile_table", [], (tx, results) => {
      var temp = [];
      for (let i = 0; i < results.rows.length; ++i) {
        temp.push(results.rows.item(i));
      }
      if (temp.length > 0) {
        return temp;
      } else {
        data = insert();
        return data;
      }
    });
  });
}
