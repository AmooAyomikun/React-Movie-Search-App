import React from 'react'
import MovieCard from './MovieCard'

const MovieGrid = ({movies, savedIds, onSave, onSelect, totalResults}) => {
  return (
    <div>
      <div className="results-row">
        <p>{totalResults} for found</p> 
        
        <div className="view-toggle">
          <button>Grid</button>
          <button>List</button>
        </div>
      </div>

      {movies.length === 0 ? <p>No result found</p> : 
        <div className="movie-grid">
          {movies.map((movie) => {
            const isSaved = savedIds.includes(movie.imdbID)

            return <MovieCard 
                  key={movie.imdbID}
                  movie={movie} 
                  isSaved={isSaved} 
                  onSave={onSave} 
                  onSelect={onSelect} 
                />
          })}
        </div>
      }
    </div>
  )
}

export default MovieGrid