import { useState, useEffect} from "react";
import Favourites from "./Favourites";
import MovieItem from "./MovieItem";
import Pagination from "./Pagination";
import Search from "./Search";
import { CSSProperties } from "react";
import DotLoader from "react-spinners/DotLoader";

export interface IMovies {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

const MoviesList = () => {
  const APIKey: string = "8d80f214b2fe7130c06b25fe5c695d25";
  const [searchInput, setSearchInput] = useState("");
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading]=useState(false);
  const [favourites, setFavourites] = useState<string[]>(
    localStorage.getItem("favourites")?.split(",") ?? []
  );
  const [showMovies, setShowMovies] = useState(false);

  const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "blue"
  };

  useEffect(() => {
    const fetchMovies= async (page:number)=>{
      try {
        setIsLoading(true);
        const response = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=${APIKey}&query=${searchInput}&page=${page}&language=en-US&include_adult=false`
        );
  
        if (response.status >= 400 && response.status < 600) {
          throw new Error("Bad response from server");
        }
        const data = await response.json();
        setMovies(data.results);
        setShowMovies(true);
        setIsLoading(false);
  
      } catch (e) {
        console.log(e)
      }
    }
    if (showMovies){
      fetchMovies(page);
    }

  }, [setMovies, page, searchInput, showMovies])

  return (
    <>
      <div className="flex justify-center border-black border-solid border-2 w-full">
        <Search
          searchInput={searchInput}
          setSearchInput={setSearchInput}
          setPage={setPage}
          setShowMovies={setShowMovies}
      
        />
      </div>

      <div className="flex flex-col lg:flex-row items w-full h-screen">
        <div className="flex flex-col items-center w-full lg:w-1/2 bg-blue-200">
          <h2 className="titles">List of movies</h2>

          {isLoading && (
            <DotLoader
              color={"blue"}
              loading={true}
              cssOverride={override}
              size={60}
            />
          )}

          {showMovies && (
            <div className="flex flex-col items-center w-full">
              {movies.map((movie: IMovies) => (
                <div key={movie.id}>
                  <MovieItem {...movie} />
                </div>
              ))}
            </div>
          )}
          <Pagination page={page} setPage={setPage} />
        </div>

        <div className="w-full lg:w-1/2 bg-blue-100">
          <Favourites
            favourites={favourites}
            setFavourites={setFavourites}
            movieList={movies}
          />
        </div>
      </div>
    </>
  );
};

export default MoviesList;
