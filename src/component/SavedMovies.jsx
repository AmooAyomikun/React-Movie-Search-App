import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRemove } from '@fortawesome/free-solid-svg-icons'
import { faFilm } from '@fortawesome/free-solid-svg-icons/faFilm'

const SavedMovies = ({movies, onRemove, onSelect}) => {
  return (
    <div className='saved-movies'>
      <header className='saved-header'>
        <h3>Saved movies</h3>
        <p>{movies.length}</p>
      </header>

      {movies.length === 0 
              ? (
                <div className="empty-state">
                  <p>No saved movies yet</p> 
                </div>
              )
              : movies.map((movie) => {
                return <div key={movie.imdbID} onClick={() => onSelect(movie)} className='saved-row'>
                      <div className="saved-thumb">
                        {movie.Poster && movie.Poster !== "N/A" ? 
                          <img src={movie.Poster} alt={movie.Title} />
                          : <div className="thumb-placeholder">
                              <FontAwesomeIcon icon={faFilm} />
                          </div>
                        }
                      </div>
                      <p>{movie.Title}</p>
                      <p>
                        {movie.Year}
                        {movie.imdbRating && ` • ⭐ ${movie.imdbRating}`}
                      </p>

                      <button onClick={(e) => 
                        {e.stopPropagation();
                        onRemove(movie.imdbID)
                        }}><FontAwesomeIcon icon={faRemove} /></button>
                </div>
              })
      }
      
    </div>
  )
}

export default SavedMovies