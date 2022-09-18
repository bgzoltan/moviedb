import React, { useEffect } from "react";

type SearchProp= {
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
}: SearchProp) => {

  const handleChange = (searchItem: string) => {
    setSearchInput(searchItem);
    setPage(1);
    if (searchItem.length >= 3) {
      setShowMovies(true);
    } else {
      setShowMovies(false);
    }
  };

  useEffect(() => {
    const enterHandler = (event: KeyboardEvent) => {
      if (event.code === "Enter" || event.code === "NumpadEnter") {
        event.preventDefault();
        setShowMovies(true);  
      }
    };
    document.addEventListener("keydown", enterHandler);
    return () => {
      document.removeEventListener("keydown", enterHandler);
    };
  }, [setShowMovies]);

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
