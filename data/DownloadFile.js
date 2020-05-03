import * as FileSystem from "expo-file-system";
const { v4: uuidv4 } = require("uuid");

export default async function donwloadFile(url, filename = uuidv4()) {
  const fileUri = FileSystem.documentDirectory + filename;
  // const url = fileRoute;

  let downloadObject = FileSystem.createDownloadResumable(url, fileUri);
  let response = await downloadObject.downloadAsync();

  console.log("the file is saved");
}
