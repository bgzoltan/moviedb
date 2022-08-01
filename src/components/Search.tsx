import React from "react";

export interface ISearch {
  searchInput: string;
  setSearchInput: React.Dispatch<React.SetStateAction<string>>;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setShowMovies: React.Dispatch<React.SetStateAction<boolean>>;
  setFetchEnable: React.Dispatch<React.SetStateAction<boolean>>;
}

const Search = ({
  searchInput,
  setSearchInput,
  setPage,
  setShowMovies,
  setFetchEnable
}: ISearch) => {
  const handleChange = (searchItem: string) => {
    setSearchInput(searchItem);
    setPage(1);
    if (searchItem.length >= 3) {
      setShowMovies(true);
      setFetchEnable(true);
    } else {
      setShowMovies(false);
      setFetchEnable(false);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="titles">Search your movie</h2>
      <input
        className="border-black border-solid border-[1px] mb-4 bg-slate-50 shadow-lg p-1 rounded-md"
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>
  );
};

export default Search;
