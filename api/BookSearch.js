import { BookSearch } from "react-native-google-books";

export default searchBooks = async (query) => {
  let books = await BookSearch.searchbook(
    query,
    "AIzaSyCLtg6w4qWqrYCOQZiSOCd2LvZhGG02kQw"
  );
  result = [];
  books.data.map((book) => {
    result.push({
      title: book.volumeInfo.title,
      author: book.volumeInfo.authors,
      image: book.volumeInfo.imageLinks.thumbnail,
    });
  });
  return result;
};
