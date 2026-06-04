import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons/faStar'
import { faBookmark } from '@fortawesome/free-solid-svg-icons'
import { faFilmAlt } from '@fortawesome/free-solid-svg-icons/faFilmAlt'

const MovieCard = ({movie, isSaved, onSave, onSelect}) => {
  return (
    <div className='movie-card' onClick={() => onSelect(movie)}>
        <div className="poster">
          <div>
                {movie.Poster && movie.Poster !== "N/A" ? 
                  (<img src={movie.Poster} alt={movie.Title} />) : 
                  (<div className="poster-placeholder"><FontAwesomeIcon icon={faFilmAlt} /></div>)}
          </div>

          <div className="rating">
            <FontAwesomeIcon icon={faStar} />
            <span>{movie.imdbRating || "N/A"}</span>
          </div>

          <div className="save-bookmark">
            <button 
                  className={isSaved ? "bookmark-btn saved" : "bookmark-btn"}
                  onClick={(e) => {
                    e.stopPropagation(); 
                    onSave(movie)
                  }}>
                    <FontAwesomeIcon icon={faBookmark} />
            </button>
          </div>
        </div>

      <p className='title'>{movie.Title}</p>
      <p className='year'>{movie.Year}</p>
      <p className='type'>{movie.Type}</p>
    </div>
  )
}

export default MovieCard