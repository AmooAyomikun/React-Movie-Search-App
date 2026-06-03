import React from 'react'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const SearchBar = ({query, onQueryChange, onSearch}) => {
  function handleKeyDown(){
    if(event.key === "Enter"){
      return onSearch
    }
  }
  return (
    <div className='search-bar'>
      <div className="search-container">
        <FontAwesomeIcon icon={faSearch} className='search-icon' />
        <input 
          type="text"
          placeholder= "search for a movie"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          onKeyDown= {handleKeyDown}
        />
      </div>
      <button className='search-button' onClick={onSearch}>
        <FontAwesomeIcon icon={faSearch} />
        Search
      </button>
    </div>
  )
}

export default SearchBar