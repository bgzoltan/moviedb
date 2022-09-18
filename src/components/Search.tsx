import React from "react";

type ISearchProp= {
  searchInput: string;
  setSearchInput: React.Dispatch<React.SetStateAction<string>>;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setShowMovies: React.Dispatch<React.SetStateAction<boolean>>;
}

const Search = ({
  searchInput,
  setSearchInput,
  setPage,
  setShowMovies,
}: ISearchProp) => {

  const handleChange = (searchItem: string) => {
    setSearchInput(searchItem);
    setPage(1);
    if (searchItem.length >= 3) {
      setShowMovies(true);
    } else {
      setShowMovies(false);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="titles">Search your movie</h2>
      <input
        className="border-black border-solid border-[1px] mb-4 bg-slate-50 shadow-lg p-1 rounded-md"
        onChange={(e) => handleChange(e.target.value)}
      />
      {searchInput.length < 3 && (
        <div>
          Min. 3 karaktert kérek vagy min. 1 karakter után nyomj Enter-t!
        </div>
      )}
    </div>
  );
};

export default Search;
