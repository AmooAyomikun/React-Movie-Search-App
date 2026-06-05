import React from 'react'
import LoadingState from './component/LoadingState'
import ErrorState from './component/ErrorState'
import SearchBar from './component/SearchBar'
import FilterBar from './component/FilterBar'
import MovieCard from './component/MovieCard'
import MovieGrid from './component/MovieGrid'
import MovieModal from './component/MovieModal'
import SavedMovies from './component/SavedMovies'
import { faFilm } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookmark } from '@fortawesome/free-solid-svg-icons'

const App = () => {
  const [query, setQuery] = React.useState("")
  const [movies, setMovies] = React.useState([])
  const [selectedMovie, setSelectedMovie] = React.useState(null)
  const [savedMovies, setSavedMovies] = React.useState(() => {
    const savedMoviesFile = localStorage.getItem("savedMoviesFile")
    return savedMoviesFile ? JSON.parse(savedMoviesFile) : []
  })

  React.useEffect(() => {
    localStorage.setItem("savedMoviesFile", JSON.stringify(savedMovies))
  },[savedMovies])

  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState(null)
  const [genre, setGenre] = React.useState("All")
  const [sortBy, setSortBy] = React.useState("most relevant")
  
  const [showSaved, setShowSaved] = React.useState(() => {
    const savedMoviesFile = localStorage.getItem("savedMoviesFile")
    if (savedMoviesFile) {
      const parsed = JSON.parse(savedMoviesFile)
      return parsed.length > 0
    }
    return false
  })

  const [totalResults, setTotalResults] = React.useState(0)
  const [modalLoading, setModalLoading] = React.useState(false)
  const [viewMode, setViewMode] = React.useState("grid")

  function handleQueryChange(value){
    setError(null)
    setQuery(value)
  }

  function handleGenreChange(value){
    setGenre(value)
  }

  function handleSortChange(value){
    setSortBy(value)
  }

  function handleToggleSaved(){
    setShowSaved((prevState) => !prevState)
  }

  const fetchMovies = React.useCallback(async (searchQuery) => {
    if(searchQuery.trim().length < 2){
      setMovies([])
      return
    }

    setLoading(true)
    setError(null)

    try{
      const apiKey = import.meta.env.VITE_OMDb_API
      const url = `https://www.omdbapi.com/?apikey=${apiKey}&s=${searchQuery}`

      const movieResponse = await fetch(url)

      if (!movieResponse.ok) {
        throw new Error("Network connection error")
      }

      const data = await movieResponse.json()

      if(data.Response === "False"){
        throw new Error(data.Error || "No movies found")
      }

      const detailedMovies = await Promise.all(
        data.Search.map(async (movie) => {
          const res = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&i=${movie.imdbID}`)
          return res.json()
        })
      )

      setMovies(detailedMovies)
      setTotalResults(Number(data.totalResults))

    }catch(error){
      setError(`Error: ${error.message}`);
      setMovies([])
      setTotalResults(0)
    }

    finally{
      setLoading(false)
    }
  }, [])

  async function handleSelect(movie){
    try{
      setModalLoading(true)

      const apiKey = import.meta.env.VITE_OMDb_API
      const selectUrl = `https://www.omdbapi.com/?apikey=${apiKey}&i=${movie.imdbID}&plot=full`
      
      const response = await fetch(selectUrl)

      const data = await response.json()

      if(data.Response === "False"){
        throw new Error(data.Error)
      }
      
      setSelectedMovie(data)
    }catch(error){
      setError(error.message)
    }

    finally{
      setModalLoading(false)
    }
  }

  React.useEffect(() => {
    const timer = setTimeout(() => {
      fetchMovies(query)
    }, 500)

    return () => {
      clearTimeout(timer)
    }
  }, [query, fetchMovies])

  function handleSearch(){
    fetchMovies(query)
  }

  const getYear = (year) => Number(year.slice(0, 4))

  const filteredMovies = [...movies].filter((movie) => {
    if(genre === "All"){
      return true
    }
    return movie.Genre?.includes(genre)
  }).sort((a, b) => {
    if(sortBy === "most relevant"){
      return 0
    }

    if(sortBy === "newest"){
      return getYear(b.Year) - getYear(a.Year)
    }

    if(sortBy === "oldest"){
      return getYear(a.Year) - getYear(b.Year)
    }

    if(sortBy === "rating"){
      return Number(b.imdbRating || 0) - Number(a.imdbRating || 0)
    }

    return 0
  })

  function handleSaveMovie(movie){
    const isSaved = savedMovies.some((savedMovie) => {
      return savedMovie.imdbID === movie.imdbID
    })

    if(isSaved){
      const updatedMovies = savedMovies.filter((savedMovie) => {
        return savedMovie.imdbID !== movie.imdbID
      })

      setSavedMovies(updatedMovies)
    }else {
      const updatedMovies = [...savedMovies, movie]

      setSavedMovies(updatedMovies)
    }
  }

  function handleRemoveMovie(id){
    const updatedMovies = savedMovies.filter((savedMovie) => {
      return savedMovie.imdbID !== id
    })

    setSavedMovies(updatedMovies)
  }

  function handleCloseModal(){
    setSelectedMovie(null)
  }

  const savedIds = savedMovies.map((savedMovie) => {
    return savedMovie.imdbID 
  })

  const isSaved = selectedMovie ? savedIds.includes(selectedMovie.imdbID) : false
  
  return (
    <div className='app'>
      <div className="app-header">
        <div className="left-header">
          <FontAwesomeIcon icon={faFilm} />
          <h1>CineSearch</h1>
        </div>
        <div className="right-header" onClick={handleToggleSaved}>
          <FontAwesomeIcon icon={faBookmark} />
          <h3>Saved movies</h3>
          <span>{savedMovies.length}</span>
        </div>
      </div>
      
      <hr style={{ margin: '0 0 1.5rem 0', opacity: 0.1 }} />

      <div className="app-content" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <SearchBar 
              query={query} 
              onQueryChange={handleQueryChange} 
              onSearch={handleSearch} 
        />

        {movies.length > 0 && <FilterBar 
                  genre={genre} 
                  sortBy={sortBy} 
                  onGenreChange={handleGenreChange} 
                  onSortChange={handleSortChange} 
        />}

        {loading ? 
            <LoadingState/> 
            : error ? 
            <ErrorState message={error} /> :
            movies.length === 0 ? 
            <div className="empty-state" style={{ padding: '3rem 1rem' }}>
              <FontAwesomeIcon icon={faFilm} style={{ fontSize: '2rem', marginBottom: '1rem' }} />
              <h2>Search for a Movie</h2>
              <p>
                Find movies, view details, and build your watchlist.
              </p>
            </div> : 
            <MovieGrid 
                  movies={filteredMovies} 
                  savedIds={savedIds} 
                  onSave={handleSaveMovie} 
                  onSelect={handleSelect} 
                  totalResults={totalResults} 
                  viewMode={viewMode}
                  setViewMode={setViewMode}
            />
        }

        {showSaved && (
          <div className="saved-movies-section" style={{ marginTop: '1rem' }}>
            <SavedMovies 
                    movies={savedMovies} 
                    onRemove={handleRemoveMovie} 
                    onSelect={handleSelect} 
            />
          </div>
        )}
      </div>

      {selectedMovie && <MovieModal 
                movie={selectedMovie} 
                onSave={handleSaveMovie} 
                isSaved={isSaved} 
                onClose={handleCloseModal}  
      />}
    </div>
  )
}

export default App