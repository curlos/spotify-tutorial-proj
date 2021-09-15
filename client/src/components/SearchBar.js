import React, { useState } from 'react'

const SearchBar = () => {
  const [searchText, setSearchText] = useState('')

  const handleChange = (e) => {
    const newSearchText = e.target.value
    setSearchText(newSearchText)
    console.log(newSearchText)
  }

  return (
    <div className="searchInputContainer">
      <input className="searchInput" value={searchText} placeholder="Search Songs/Artists" onChange={handleChange}></input>
    </div>
  )
}

export default SearchBar;