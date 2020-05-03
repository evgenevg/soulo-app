// Deprecated. Remove later

import * as FileSystem from "expo-file-system";

let options = { encoding: FileSystem.EncodingType.Base64 };

export default async function readFile(filename) {
  const fileInfo = await FileSystem.getInfoAsync(
    FileSystem.documentDirectory + filename
  );
  console.log(fileInfo);
  if (fileInfo.exists) {
    console.log("file exists!");
    FileSystem.readAsStringAsync(filename, options)
      .then((data) => {
        const base64 = "data:image/jpg;base64" + data;
        resolve(base64);
        console.log("the file is read!");
      })
      .catch((err) => {
        console.log("​getFile -> err", err);
        reject(err);
      });
  }
}

// export default async function readFile(filename) {
//   FileSystem.readAsStringAsync(filename, options)
//     .then((data) => {
//       const base64 = "data:image/jpg;base64" + data;
//       resolve(base64); // are you sure you want to resolve the data and not the base64 string?
//     })
//     .catch((err) => {
//       console.log("​getFile -> err", err);
//       reject(err);
//     });
// }
