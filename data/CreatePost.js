import * as SQLite from "expo-sqlite";
import donwloadFile from "./DownloadFile";
const db = SQLite.openDatabase("posts");
var moment = require("moment");

const addDataToDb = (
  text = null,
  images = null,
  album = null,
  book = null,
  podcast = null,
  link = null
) => {
  console.log("the funtion is called with the following images " + images);

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
      "create table if not exists memories_db (id integer primary key not null, date string, text string, image0 string, image1 string, image2 string, image3 string, image4 string, image5 string, image6 string, image7 string, image8 string, image9 string, album string, book integer, podcast integer, link integer, erased integer);",
      []
    );

    tx.executeSql(
      "insert into memories_db (date, text, album, book, podcast, link, image0, image1, image2, image3, image4, image5, image6, image7, image8, image9, erased) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0)",
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
      ]
    );
  });
};

export default async function createPost(
  text = null,
  images = null,
  heights = null,
  widths = null,
  album = null,
  book = null,
  podcast = null,
  link = null
) {
  // for image in images, save image into their image_db
  console.log("images are received in the create post: " + images);
  imageIDs = [];
  console.log("the image payload is : " + imageIDs);

  console.log(typeof images);
  console.log(Object.keys(images).length);
  for (i = 0; i < Object.keys(images).length; i++) {
    console.log("executing the download funciton on: " + images[i]);
    image_id = await donwloadFile(images[i], heights[i], widths[i]);
    console.log(typeof image_id);
    console.log("the image is saved with the following id: " + image_id);
    imageIDs.push(image_id);
    console.log("the image array with ids looks like this: " + imageIDs);
  }

  console.log("sending this payload to the post creator: " + text + imageIDs);
  addDataToDb(text, imageIDs, album, book, podcast, link);

  console.log("the post is saved!");

  return true;
}
