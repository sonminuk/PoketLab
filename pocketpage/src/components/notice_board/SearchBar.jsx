// src/components/MainPage/SearchBar.js
import React, { useState } from 'react';

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    // 검색 로직 구현 (예: Firebase 데이터 필터링)
    console.log("검색어:", searchTerm);
  };

  return (
    <div className="search-bar">
      <input 
        type="text" 
        placeholder="검색어를 입력하세요..." 
        value={searchTerm} 
        onChange={(e) => setSearchTerm(e.target.value)} 
      />
      <button onClick={handleSearch}>검색</button>
    </div>
  );
}

export default SearchBar;
