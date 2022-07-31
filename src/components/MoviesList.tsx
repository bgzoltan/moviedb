import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

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

  if (isLoading && searchInput !== "") {
    return <h3>Loading...</h3>;
  }

  console.log(data);

  return (
    <div>
      <h2 className="text-2xl text-gray-400">List of movies</h2>
    </div>
  );
};

export default MoviesList;
