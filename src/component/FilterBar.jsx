import React from 'react'

const FilterBar = ({genre, sortBy, onGenreChange, onSortChange}) => {
  const options = ["All", "Action", "Drama", "Sci-Fi", "Comedy", "Horror", "Thriller"]
  return (
    <div className='filter-bar'>
      <div className="genre-pills">
        {options.map((option) => {
          return <button 
                    className={option === genre ? "genre active" : "genre"} 
                    key={option}
                    onClick={() => onGenreChange(option)}
                    >
                      {option}
                  </button>
        })}
      </div>

      <select className="sort-select" value={sortBy} onChange={(e) => onSortChange(e.target.value)}>
        <option value="most relevant">Most Relevant</option>
        <option value="rating">Ratings High-Low</option>
        <option value="newest">Newest First</option>
        <option value="oldest">Oldest First</option>
      </select>
    </div>
  )
}

export default FilterBar