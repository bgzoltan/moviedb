import { useState, useEffect} from "react";

import Pagination from "./Pagination";
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

type MoviesListProps ={
  searchInput:string;
  page:number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  showMovies:boolean;
  setShowMovies: React.Dispatch<React.SetStateAction<boolean>>;
  movies:never[];
  setMovies:React.Dispatch<React.SetStateAction<never[]>>;
  selectedMovies:string[];
  setSelectedMovies:React.Dispatch<React.SetStateAction<string[]>>;
}

const MoviesList = ({searchInput, page, setPage, showMovies, setShowMovies, movies, setMovies, selectedMovies, setSelectedMovies}:MoviesListProps) => {
  const APIKey: string = "8d80f214b2fe7130c06b25fe5c695d25";
  const [isLoading, setIsLoading]=useState(false);
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
          `https://api.themoviedb.org/3/search/movie?api_key=${APIKey}&query=${searchInput}&page=${page}`
        );
  
        if (response.status >= 400 && response.status < 600) {
          throw new Error("Bad response from server");
        }
        const data = await response.json();
        setMovies(data.results);
        setIsLoading(false);
  
      } catch (e) {
        console.log(e)
      }
    }
    if (showMovies){
      fetchMovies(page);
    }

  }, [setMovies, page, searchInput, showMovies, setShowMovies])

  const handleSelectMovie=(event: any) =>{
    const newSelectedMovies=[...selectedMovies,event.target.value]
    setSelectedMovies(newSelectedMovies);
  }

  return (
    <>
      <div className="flex flex-col items-center lg:w-1/2 h-full bg-blue-200 border-solid border-black border-[3px]">
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
            <select name='movies' size={2} multiple className="flex flex-col items-center grow w-full">
              {movies.map((movie: IMovies) => (
                <option className="text-center text-red-600 hover:bg-orange-500" value={movie.original_title} key={movie.id} onClick={handleSelectMovie}>
                  {movie.original_title}
                </option>
              ))}
            </select>
          )}
          <Pagination page={page} setPage={setPage} />
      </div>
    </>
  );
};

export default MoviesList;
