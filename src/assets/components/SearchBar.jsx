// IMPORT REACT
import { useState } from 'react'

// FUNCION PRINCIPAL
function SearchBar() {
  // ESTADO
  const [searchItem, setSearchItem] = useState('')

  // HANDLER PARA CAMBIO DE BUSQUEDA
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
