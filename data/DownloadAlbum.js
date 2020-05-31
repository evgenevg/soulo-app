import * as SQLite from "expo-sqlite";
import donwloadFile from "./DownloadFile";
const db = SQLite.openDatabase("posts");
const { v4: uuidv4 } = require("uuid");

export default async function downloadAlbum(
  image_uri,
  height,
  width,
  title,
  author
) {
  album_id = uuidv4();
  db.transaction((tx) => {
    tx.executeSql(
      "create table if not exists albums (id integer primary key not null, album_id string, image_uri string, height integer, width integer, title string, author string);",
      []
    );

    tx.executeSql(
      "insert into albums (album_id, image_uri, height, width, title, author) values (?, ?, ?, ?, ?, ?)",
      [album_id, image_uri, height, width, title, author]
    );
  });
  console.log(
    "the album is saved to the album db with the following id = " + album_id
  );
  return album_id;
}
