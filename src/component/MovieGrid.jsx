import React from 'react'
import MovieCard from './MovieCard'

const MovieGrid = ({movies, savedIds, onSave, onSelect, totalResults, viewMode, setViewMode}) => {
  return (
    <div className="movie-container">
      <div className="results-row">
        <p>Showing {movies.length} of {totalResults} results</p> 
        
        <div className="view-toggle">
          <button className={viewMode === "grid" ? "active-view" : ""} onClick={() => setViewMode("grid")}>Grid</button>
          <button className={viewMode === "list" ? "active-view" : ""} onClick={() => setViewMode("list")}>List</button>
        </div>
      </div>

      {movies.length === 0 ? 
      <p>No results match your filter filters.</p> : 
        <div className={viewMode === "grid" ? "movie-grid" : "movie-list"}>
          {movies.map((movie) => {
            const isSaved = savedIds.includes(movie.imdbID)

            return <MovieCard 
                  key={movie.imdbID}
                  movie={movie} 
                  isSaved={isSaved} 
                  onSave={onSave} 
                  onSelect={onSelect} 
                  viewMode={viewMode} 
                />
          })}
        </div>
      }
    </div>
  )
}

export default MovieGrid