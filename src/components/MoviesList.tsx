import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState, useEffect } from "react";
import MovieItem from "./MovieItem";
import Pagination from "./Pagination";
import Search from "./Search";

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

  const fetchMovies = () => {
    return axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=${APIKey}&query="${searchInput}"&language=en-US&page=${page}&include_adult=false`
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

  console.log(isLoading);
  if (isLoading && searchInput !== "") {
    return <h3>Loading...</h3>;
  }

  return (
    <div>
      <h2 className="text-2xl text-gray-400">List of movies</h2>
      <Search
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        setPage={setPage}
      />
      {searchInput && (
        <div>
          {data?.data.results.map((movie: IMovies) => (
            <div key={movie.id}>
              <MovieItem {...movie} />
            </div>
          ))}
        </div>
      )}
      <Pagination page={page} setPage={setPage} />
    </div>
  );
};

export default MoviesList;
