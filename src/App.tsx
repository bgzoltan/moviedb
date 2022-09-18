import { useState } from 'react'
import './App.css'
import MoviesList from './components/MoviesList'
import Search from './components/Search'
import Favourites from './components/Favourites'

function App() {
  const [movies, setMovies] = useState([])
  const [searchInput, setSearchInput] = useState('')
  const [page, setPage] = useState(1)
  const [showMovies, setShowMovies] = useState(false)
  const [favourites, setFavourites] = useState<string[]>(
    localStorage.getItem('favourites')?.split(',') ?? [],
  )

  return (
    <main className="flex flex-col h-screen">
      <header className="flex flex-col h-[20%] items-center font-bold max-h-screen box-border p-0 m-0">
        <h1 className="main-title">Movie Database</h1>
        <Search
          searchInput={searchInput}
          setSearchInput={setSearchInput}
          setPage={setPage}
          setShowMovies={setShowMovies}
        />
      </header>
      <section className="flex h-[80%]">
        <MoviesList
          searchInput={searchInput}
          page={page}
          setPage={setPage}
          showMovies={showMovies}
          setShowMovies={setShowMovies}
          movies={movies}
          setMovies={setMovies}
        />
        <Favourites
          favourites={favourites}
          setFavourites={setFavourites}
          movieList={movies}
        />
      </section>
    </main>
  )
}

export default App
