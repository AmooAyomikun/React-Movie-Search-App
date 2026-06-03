import React from 'react'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const SearchBar = () => {
  return (
    <div className='search-bar'>
      <div className="search-container">
        <FontAwesomeIcon icon={faSearch} className='search-icon' />
        <input 
          type="text"
          placeholder= "search for a movie"
        />
      </div>
      <button className='search-button'>
        <FontAwesomeIcon icon={faSearch} />
        Search
      </button>
    </div>
  )
}

export default SearchBar