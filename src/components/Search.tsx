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
