import React from 'react'

const MovieModal = ({movie, isSaved, onSave, onClose}) => {
  return (
    <div className='movie-modal' onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        
        <div className="modal-poster">
          <img src={movie.Poster} alt="movie.Title" />
        </div>

        <div className="modal-info">
          <p>{movie.Title}</p>
          <p>{movie.Year}</p>
          <p>{movie.Runtime}</p>
          <p>{movie.imdbRating}</p>
          <p>{movie.Plot}</p>
        </div>

        <div className="genre-tags">
          {movie.Genre?.split(", ").map((genre) => (
            <span key={genre} className="genre-pill">{genre}</span>
          ))}
        </div>

        <button onClick={() => onSave(movie)}>
          {isSaved ? "Unsave" : "Save"}
        </button>

        <button onClick={onClose}>
          close
        </button>
      </div>
    </div>
  )
}

export default MovieModal