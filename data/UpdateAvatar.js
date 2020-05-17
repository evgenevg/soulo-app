import * as SQLite from "expo-sqlite";
const db = SQLite.openDatabase("profile_db");

export default async function updateAvatar(uri, height, width) {
  db.transaction((tx) => {
    tx.executeSql("select avatar_uri, height, width from profile_table", []);
    tx.executeSql("update profile_table set avatar_uri = ?", [uri]);
    // tx.executeSql("update profile_db set height = ?", [height]);
    // tx.executeSql("update profile_db set width = ?", [width]);
  });
  console.log("The avatar is updated!");
}
