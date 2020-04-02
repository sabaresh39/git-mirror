import React, { useState, useEffect } from "react";

const FilterBar = ({ searchRepo }) => {
  const [searchTerm, setSearchTerm] = useState(null);
  const [language, setLanguage] = useState(null);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    searchRepo({ searchTerm, language });
  }, [searchTerm, language]);

  return (
    <div className='filter-bar'>
      <input
        type='text'
        placeholder='Find a repository…'
        onKeyUp={handleSearchChange}
      />
    </div>
  );
};

export default FilterBar;
