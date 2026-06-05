import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRemove } from '@fortawesome/free-solid-svg-icons'
import { faStar } from '@fortawesome/free-solid-svg-icons/faStar'

const MovieModal = ({movie, isSaved, onSave, onClose}) => {
  if(!movie) return null

  return (
    <div className='movie-modal' onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="modal-close">
          <FontAwesomeIcon icon={faRemove} />
        </button>

        <div className="modal-poster">
          {movie.Poster && movie.Poster !== "N/A" ? 
            <img src={movie.Poster} alt={`${movie.Title} Poster`} /> 
            : <div className="poster-placeholder">
              <span>No Poster Available</span>
            </div>
          }
        </div>

        <div className="modal-content">
          <div className="modal-info">
            <h2 id='modal-title'>{movie.Title}</h2>

            <div className="modal-meta">
              <span className='meta-badge accent'>
                {movie.imdbRating && movie.imdbRating !== "N/A" ?  
                  <>
                    <FontAwesomeIcon icon={faStar} /> 
                    {" "} 
                    {movie.imdbRating} 
                  </>
                  : 'N/A'
                  }
              </span>
              <span>{movie.Year}</span>
              <span>{movie.Runtime}</span>
            </div>

            <p className='modal-plot'>{movie.Plot}</p>

            <div className="genre-tags">
              {movie.Genre?.split(", ").map((genre) => (
                <span key={genre} className="genre-pill">{genre}</span>
              ))}
            </div>

            <hr className="modal-divider" />

            <div className="modal-credits">
              <p><strong>Director:</strong> <span>{movie.Director}</span></p>
              <p><strong>Actors:</strong> <span>{movie.Actors}</span></p>
              <p><strong>Released:</strong> <span>{movie.Released}</span></p>
              <p><strong>Language:</strong> <span>{movie.Language}</span></p>
            </div>
          </div>
        
          <div className="modal-actions">
            <button className={`btn ${isSaved ? 'btn-secondary' : 'btn-primary'}`} onClick={() => onSave(movie)}>
              {isSaved ? "Remove from Watchlist" : "Save to Watchlist"}
            </button>
            <button className="btn btn-outline" onClick={onClose}>
              Close Window
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}

export default MovieModal