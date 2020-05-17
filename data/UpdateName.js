import * as SQLite from "expo-sqlite";
const db = SQLite.openDatabase("profile_db");

export default async function updateName(name) {
  db.transaction((tx) => {
    tx.executeSql("select name from profile_table", []);
    tx.executeSql("update profile_table set name = ?", [name]);
  });
  console.log("The name is updated!");
}
