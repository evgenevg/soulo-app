import * as SQLite from "expo-sqlite";
import donwloadFile from "./DownloadFile";
import downloadBook from "./DownloadBook";
import * as FileSystem from "expo-file-system";
import downloadAlbum from "./DownloadAlbum";
const db = SQLite.openDatabase("posts");
var moment = require("moment");
const { v4: uuidv4 } = require("uuid");

const addDataToDb = (
  text = null,
  images = null,
  album = null,
  book = null,
  podcast = null,
  link = null,
  tags = null,
  primary = null
) => {
  // resetting the global variables first, so that the images from previous posts are not added here
  for (i = 0; i < 11; i++) {
    this["image" + i] = null;
  }
  if (images) {
    for (i = 0; i < images.length; i++) {
      this["image" + i] = images[i];
    }
  }
  console.log(this.image0);

  db.transaction((tx) => {
    tx.executeSql(
      "create table if not exists memories_db (id integer primary key not null, date string, text string, image0 string, image1 string, image2 string, image3 string, image4 string, image5 string, image6 string, image7 string, image8 string, image9 string, album string, book integer, podcast integer, link integer, erased integer, tags string, primary string);",
      []
    );

    tx.executeSql(
      "insert into memories_db (date, text, album, book, podcast, link, image0, image1, image2, image3, image4, image5, image6, image7, image8, image9, erased, tags, primary) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0, ?, ?)",
      [
        moment().format("YYYY-MM-DD hh:mm:ss"),
        text,
        album,
        book,
        podcast,
        link,
        this.image0,
        this.image1,
        this.image2,
        this.image3,
        this.image4,
        this.image5,
        this.image6,
        this.image7,
        this.image8,
        this.image9,
        tags,
        primary,
      ]
    );
  });
};

export default async function createPost(
  text = null,
  images = null,
  heights = null,
  widths = null,
  book = null,
  album = null,
  podcast = null,
  link = null,
  tags = null,
  primary = null
) {
  imageIDs = [];
  book_id = null;
  album_id = null;

  for (i = 0; i < Object.keys(images).length; i++) {
    image_id = await donwloadFile(images[i], heights[i], widths[i]);
    imageIDs.push(image_id);
  }
  if (book[0]) {
    console.log("Book is interprted in the create post fxn: " + book);
    const fileUri = FileSystem.documentDirectory + uuidv4();
    let downloadObject = FileSystem.createDownloadResumable(book[2], fileUri);
    let response = await downloadObject.downloadAsync();
    console.log(response);

    book_id = await downloadBook(
      response.uri,
      response.height,
      response.width,
      book[0],
      book[1]
    );
  }
  if (album[0]) {
    const fileUri = FileSystem.documentDirectory + uuidv4();
    let downloadObject = FileSystem.createDownloadResumable(album[2], fileUri);
    let response = await downloadObject.downloadAsync();

    album_id = await downloadAlbum(
      response.uri,
      response.height,
      response.width,
      album[0],
      album[1]
    );
  }

  addDataToDb(text, imageIDs, album_id, book_id, podcast, link, tags, primary);

  console.log("the post is saved!");

  return true;
}
