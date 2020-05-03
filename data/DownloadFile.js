import * as FileSystem from "expo-file-system";

import * as SQLite from "expo-sqlite";
const db = SQLite.openDatabase("posts");

const { v4: uuidv4 } = require("uuid");

const addDataToDb = (fileUri, post_id, date) => {
  db.transaction((tx) => {
    tx.executeSql(
      "create table if not exists DataTable (id integer primary key not null, uri string, post_id string, date string);",
      []
    );

    tx.executeSql("insert into DataTable (uri, post_id) values (?, ?)", [
      fileUri,
      post_id,
    ]);
  });
};

export default async function donwloadFile(url, filename = uuidv4()) {
  const fileUri = FileSystem.documentDirectory + filename;
  // const url = fileRoute;

  let downloadObject = FileSystem.createDownloadResumable(url, fileUri);
  let response = await downloadObject.downloadAsync();
  addDataToDb(fileUri, "2", "06011996");

  console.log("the file is saved");
}
