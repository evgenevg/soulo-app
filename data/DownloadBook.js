import * as SQLite from "expo-sqlite";
import donwloadFile from "./DownloadFile";
const db = SQLite.openDatabase("posts");
const { v4: uuidv4 } = require("uuid");

export default async function downloadBook(
  image_uri,
  height,
  width,
  title,
  author
) {
  book_id = uuidv4();
  db.transaction((tx) => {
    tx.executeSql(
      "create table if not exists books (id integer primary key not null, book_id string, image_uri string, height integer, width integer, title string, author string);",
      []
    );

    tx.executeSql(
      "insert into books (book_id, image_uri, height, width, title, author) values (?, ?, ?, ?, ?, ?)",
      [book_id, image_uri, height, width, title, author]
    );
  });
  console.log(
    "the book is saved to the book_b with the following id = " + book_id
  );
  return book_id;
}
