import React, { useEffect } from 'react'
import LoadingState from './component/LoadingState'
import ErrorState from './component/ErrorState'
import SearchBar from './component/SearchBar'

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
  const [sortBy, setSortBy] = React.useState("")
  const [showSaved, setShowSaved] = React.useState(false)

  function handleQueryChange(value){
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

  async function fetchMovies(searchQuery) {
    if(searchQuery.trim().length < 2){
      setMovies([])
      return
    }

    setLoading(true)
    setError(null)
    setMovies([])

    try{
      const apiKey = import.meta.env.VITE_OMDb_API
      const searchedMovie = searchQuery
      const url = `https://www.omdbapi.com/?apikey=${apiKey}&s=${searchQuery}`

      const movieResponse = await fetch(url)

      const data = await movieResponse.json()

      if(data.Response === "False"){
        throw new Error(`Error: ${data.Error}`)
      }

      setMovies(data.Search)
    }catch(error){
      setError(`Error: ${error.message}`);
    }

    finally{
      setLoading(false)
    }
  }

  React.useEffect(() => {
    const timer = setTimeout(() => {
      fetchMovies(query)
    }, 500)

    return () => {
      clearInterval(timer)
    }
  }, [query])

  function handleSearch(){
    fetchMovies(query)
  }

  const filteredMovies = [movies].filter((movie) => {
    if(genre === "All"){
      return true
    }

    return movie.Genre?.includes(genre)
  }).sort((a, b) => {
    if(sortBy === "newest"){
      return Number(b.Year) - Number(a.Year)
    }

    if(sortBy === "oldest"){
      return Number(a.Year) - Number(b.Year)
    }

    if(sortBy === "rating"){
      return Number(b.imdbRating || 0) - Number(a.imdbRating || 0)
    }

    return 0
  })

  function handleSavedMovie(movie){
    const isSaved = savedMovies.some((savedMovie) => {
      return savedMovie.imdbID === movie.imdbID
    })

    if(isSaved){
      const updatedMovie = savedMovies.filter((savedMovie) => {
        return savedMovie.imdbID !== movie.imdbID
      })

      setSavedMovies(updatedMovie)
    }else{
      const updatedMovie = [...savedMovies, movie]

      setSavedMovies(updatedMovie)
    }
  }

  function handleRemoveMovie(id){
    const filteredMovies = savedMovies.filter((savedMovie) => {
      return savedMovie.imdbID !== id
    })

    setSavedMovies(filteredMovies)
  }

  function handleSelectedMovie(movie){
    selectedMovie(movie)
  }

  function handleCloseModal(){
    setSelectedMovie(null)
  }

  return (
    <div>
      <LoadingState />
      <ErrorState />
      <SearchBar query={query} onQueryChange={handleQueryChange} onSearch={fetchMovies} />
    </div>
  )
}

export default App