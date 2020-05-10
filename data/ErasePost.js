import * as SQLite from "expo-sqlite";
const db = SQLite.openDatabase("posts");

export default async function erasePost(post_id) {
  db.transaction((tx) => {
    tx.executeSql("select id, erased from memories_db where id = ?", [post_id]);
    tx.executeSql("update memories_db set erased = 1 where id = ?", [post_id]);
  });
  console.log("the post with the following id is erased: " + post_id);
}
