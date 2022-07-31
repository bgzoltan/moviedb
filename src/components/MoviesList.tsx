import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState, useEffect } from "react";
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
  const [page, setPage] = useState(1);
  const [favourites, setFavourites] = useState<string[]>(
    localStorage.getItem("Favourites")?.split(",") ?? []
  );

  const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "blue"
  };

  const fetchMovies = () => {
    return axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=${APIKey}&query=${searchInput}&page=${page}`
    );
  };

  const { isLoading, data, isError, error, isSuccess, refetch } = useQuery(
    ["movies"],
    fetchMovies,
    {
      enabled: true
    }
  );

  useEffect(() => {
    if (searchInput.length >= 3) {
      refetch();
    }
  }, [refetch, searchInput, page]);

  useEffect(() => {
    refetch();
  }, [page, refetch]);

  useEffect(() => {
    const enterHandler = (event: KeyboardEvent) => {
      if (event.code === "Enter" || event.code === "NumpadEnter") {
        event.preventDefault();
        refetch();
      }
    };
    document.addEventListener("keydown", enterHandler);
    return () => {
      document.removeEventListener("keydown", enterHandler);
    };
  }, [refetch]);

  return (
    <>
      <div className="flex justify-center border-black border-solid border-2 w-full">
        <Search
          searchInput={searchInput}
          setSearchInput={setSearchInput}
          setPage={setPage}
        />
      </div>

      <div className="flex flex-row items w-full h-screen">
        <div className="flex flex-col items-center w-1/2 bg-blue-200">
          <h2 className="titles">List of movies</h2>
          {isLoading && (
            <DotLoader
              color={"blue"}
              loading={true}
              cssOverride={override}
              size={60}
            />
          )}
          {searchInput !== "" ? (
            <div className="flex flex-col items-center w-full">
              {data?.data.results.map((movie: IMovies) => (
                <div key={movie.id}>
                  <MovieItem {...movie} />
                </div>
              ))}
            </div>
          ) : (
            <div>Type a testx in seacr bar...</div>
          )}
          <Pagination page={page} setPage={setPage} />
        </div>

        <div className="w-1/2 bg-blue-100">
          <Favourites
            favourites={favourites}
            setFavourites={setFavourites}
            movieList={data?.data.results}
          />
        </div>
      </div>
    </>
  );
};

export default MoviesList;
