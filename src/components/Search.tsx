import React from "react";

export interface ISearch {
  searchInput: string;
  setSearchInput: React.Dispatch<React.SetStateAction<string>>;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

const Search = ({ searchInput, setSearchInput, setPage }: ISearch) => {
  const handleChange = (searchItem: string) => {
    setSearchInput(searchItem);
    setPage(1);
  };

  return (
    <div>
      <h2 className="text-gray-400">Search your movie</h2>
      <input
        className="border-black border-solid border-2"
        value={searchInput}
        placeholder="search..."
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>
  );
};

export default Search;
