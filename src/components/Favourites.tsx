import { useEffect } from "react";
import { IMovies } from "./MoviesList";

type FavouritesProps = {
  favourites: string[];
  setFavourites: React.Dispatch<React.SetStateAction<string[]>>;
  movieList: IMovies[];
}

const Favourites = ({
  favourites,
  setFavourites,
  movieList
}: FavouritesProps) => {


  const storeFavourite = () => {
    const newFavourites = movieList.map((movie: IMovies) =>
      movie.original_title
    );
    setFavourites([...favourites, ...newFavourites]);
  };

  const emptyFavourite = () => {
    setFavourites([]);
  };

  useEffect(() => {
    localStorage.setItem('favourites', JSON.stringify(favourites));
  }, [favourites]);

  return (
    <div className="flex flex-col items-center lg:w-1/2  bg-blue-200 border-solid border-black border-[3px]">
      <h2 className="titles">Your favourites</h2>

      {favourites.length!==0 && <div className="flex flex-col grow items-center overflow-auto w-full max-h-full">
        {favourites?.map((favourite, index) => (
          <div key={index}>{favourite}</div>
        ))}
      </div>}

      <div className="flex flex-none">
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
