fetchAlbums = async (searchString) => {
  albums = await fetch(
    `http://ws.audioscrobbler.com/2.0/?method=album.search&album=${searchString}&api_key=084a775f24ff223cb6c04aceef2927c8&format=json`
  ).then((result) => result.json());
  return albums;
};

export default AlbumSearch = async (query) => {
  let searchString = query.replace(" ", "+");
  albums = await fetchAlbums(searchString);

  result = [];
  ablumData = albums.results.albummatches.album;
  Object(ablumData).map((album) => {
    result.push({
      title: album.name,
      author: album.artist,
      image: album.image[3]["#text"],
    });
  });
  return result;
};
