// SearchBar.js
import { useState } from 'react'

function SearchBar() {
  const [searchItem, setSearchItem] = useState('')

  const handleInputChange = (e) => { 
    const searchTerm = e.target.value;
    setSearchItem(searchTerm)
  }
  return (
    <div className="mb-4">
      <input
        type="text"
        value={searchItem}
        onChange={handleInputChange}
        placeholder="Search Users..."
        className="w-full border border-gray-300 p-2 rounded-xl"
      />
    </div>
  );
}

export default SearchBar;
