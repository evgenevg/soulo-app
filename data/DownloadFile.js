import * as FileSystem from "expo-file-system";
var moment = require("moment");

import * as SQLite from "expo-sqlite";
const db = SQLite.openDatabase("posts");

const { v4: uuidv4 } = require("uuid");

const addDataToDb = (fileUri, image_id, height, width) => {
  db.transaction((tx) => {
    tx.executeSql(
      "create table if not exists imgs (id integer primary key not null, uri string, image_id string, date string, height integer, width integer);",
      []
    );

    tx.executeSql(
      "insert into imgs (uri, image_id, date, height, width) values (?, ?, ?, ?, ?)",
      [fileUri, image_id, moment().format("YYYY-MM-DD hh:mm:ss"), height, width]
    );
  });
};

export default async function donwloadFile(
  url,
  height,
  width,
  filename = uuidv4()
) {
  console.log("download image function is called!");
  const fileUri = FileSystem.documentDirectory + filename;

  let downloadObject = FileSystem.createDownloadResumable(url, fileUri);
  let response = await downloadObject.downloadAsync();

  addDataToDb(response.uri, filename, height, width);

  console.log("the file is saved with the following id " + filename);

  return filename;
}
