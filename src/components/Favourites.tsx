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
  const storeFavourite = () => {
    const newFavourites = movieList.map((movie: IMovies) => {
      return movie.original_title;
    });
    setFavourites([...favourites, ...newFavourites]);
    localStorage.setItem(
      "Favourites",
      [...favourites, ...newFavourites].join()
    );
  };

  const emptyFavourite = () => {
    localStorage.setItem("Favourites", "");
    setFavourites([]);
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="titles">Your favourites</h2>
      <div className="overflow-auto max-h-96">
        {favourites?.map((favourite) => (
          <div className="">{favourite}</div>
        ))}
      </div>

      <div>
        <button className="favourite-buttons" onClick={storeFavourite}>
          Store as favourite
        </button>
        <button className="favourite-buttons" onClick={emptyFavourite}>
          Empty your favourites
        </button>
      </div>
    </div>
  );
};

export default Favourites;
