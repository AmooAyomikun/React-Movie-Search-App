import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faBookmark } from '@fortawesome/free-solid-svg-icons'

const MovieCard = ({ movie, isSaved, onSave, onSelect, viewMode }) => {
  const handleBookmarkClick = (e) => {
    e.stopPropagation() 
    onSave(movie)
  }

  if (viewMode === 'list') {
    return (
      <div className="movie-card" onClick={() => onSelect(movie)}>
        <div className="poster">
          {movie.Poster && movie.Poster !== "N/A" ? (
            <img src={movie.Poster} alt={movie.Title} />
          ) : (
            <div className="poster-placeholder">?</div>
          )}
        </div>
        <div className="movie-details" style={{ padding: '1rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative' }}>
          <p className="title">{movie.Title}</p>
          <p className="year">{movie.Year}</p>
          <div>
            <span className="type">{movie.Type}</span>
          </div>
          
          {movie.imdbRating && movie.imdbRating !== "N/A" && (
            <div className="rating" style={{ position: 'absolute', top: '12px', right: '60px', bottom: 'auto', left: 'auto' }}>
              <FontAwesomeIcon icon={faStar} />
              <span>{movie.imdbRating}</span>
            </div>
          )}

          <button 
            className={isSaved ? "bookmark-btn saved" : "bookmark-btn"} 
            onClick={handleBookmarkClick}
            style={{ position: 'absolute', top: '50%', right: '12px', transform: 'translateY(-50%)' }}
          >
            <FontAwesomeIcon icon={faBookmark} />
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="movie-card" onClick={() => onSelect(movie)}>
      <div className="poster">
        {movie.Poster && movie.Poster !== "N/A" ? (
          <img src={movie.Poster} alt={movie.Title} />
        ) : (
          <div className="poster-placeholder">?</div>
        )}
        
        {movie.imdbRating && movie.imdbRating !== "N/A" && (
          <div className="rating">
            <FontAwesomeIcon icon={faStar} />
            <span>{movie.imdbRating}</span>
          </div>
        )}

        <button 
          className={isSaved ? "bookmark-btn saved" : "bookmark-btn"} 
          onClick={handleBookmarkClick}
        >
          <FontAwesomeIcon icon={faBookmark} />
        </button>
      </div>
      <div style={{ padding: '1rem' }}>
        <p className="title">{movie.Title}</p>
        <p className="year">{movie.Year}</p>
        <span className="type">{movie.Type}</span>
      </div>
    </div>
  )
}

export default MovieCard