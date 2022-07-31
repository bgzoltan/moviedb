import { IMovies } from "./MoviesList";

export interface IFavouritesProps {
  favourites: string[];
  setFavourites: React.Dispatch<React.SetStateAction<string[]>>;
  movieList: IMovies[];
}

const Favourites = ({
  favourites,
  setFavourites,
  movieList
}: IFavouritesProps) => {
  console.log("List...", movieList);
  const storeFavourite = () => {
    const favourites = movieList.map((movie: IMovies) => {
      return movie.original_title;
    });
    console.log(favourites);
    localStorage.setItem("Favourites", favourites.join());
  };

  const listFavourite = () => {
    const newFavourites = localStorage?.getItem("Favourites")?.split("," ?? []);
    setFavourites(newFavourites ?? []);
  };

  return (
    <div>
      <h2>Favourites</h2>
      <button onClick={storeFavourite}>Store as favourite</button>
      <button onClick={listFavourite}>List your favourite</button>
      {favourites?.map((favourite) => (
        <div>{favourite}</div>
      ))}
    </div>
  );
};

export default Favourites;
