import React, { useState, useEffect } from 'react';
import './PokemonList.css';

function PokemonList({ data }) {
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [typeQuery, setTypeQuery] = useState('모든 타입');
  const [abilityQuery, setAbilityQuery] = useState('');
  const [sortBy, setSortBy] = useState('number');
  const [favorites, setFavorites] = useState([]);
  const [sortedData, setSortedData] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);

  const pokemonTypes = [
    '모든 타입', '불꽃', '물', '풀', '전기', '얼음', '격투', '독', '땅', '비행',
    '에스퍼', '벌레', '바위', '고스트', '드래곤', '악', '강철', '페어리'
  ];

  const extractNumber = (str) => {
    const match = str.match(/\d+/);
    return match ? parseInt(match[0]) : 0;
  };

  useEffect(() => {
    const storedFavorites = localStorage.getItem('pokemonFavorites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  useEffect(() => {
    const filteredData = Object.keys(data).filter(key => {
      const pokemon = data[key];
      const matchesName = pokemon.name.toLowerCase().includes(searchQuery);
      const matchesType = typeQuery === '모든 타입' || pokemon.types.includes(typeQuery);
      const matchesAbility = pokemon.abilities.toLowerCase().includes(abilityQuery);
      const matchesFavorite = !showFavorites || favorites.includes(pokemon.name);
      return matchesName && matchesType && matchesAbility && matchesFavorite;
    });

    const sorted = filteredData.sort((a, b) => {
      const pokemonA = data[a];
      const pokemonB = data[b];
      switch (sortBy) {
        case 'name':
          return pokemonA.name.localeCompare(pokemonB.name);
        case 'hp':
          return extractNumber(pokemonB.hp) - extractNumber(pokemonA.hp);
        case 'attack':
          return extractNumber(pokemonB.attack) - extractNumber(pokemonA.attack);
        case 'defense':
          return extractNumber(pokemonB.defense) - extractNumber(pokemonA.defense);
        case 'sp_attack':
          return extractNumber(pokemonB.sp_attack) - extractNumber(pokemonA.sp_attack);
        case 'sp_defense':
          return extractNumber(pokemonB.sp_defense) - extractNumber(pokemonA.sp_defense);
        case 'speed':
          return extractNumber(pokemonB.speed) - extractNumber(pokemonA.speed);
        case 'total':
          return extractNumber(pokemonB.total) - extractNumber(pokemonA.total);
        default:
          return a.localeCompare(b);
      }
    });

    setSortedData(sorted);
  }, [data, searchQuery, typeQuery, abilityQuery, sortBy, showFavorites, favorites]);

  const handlePokemonClick = (pokemon) => {
    setSelectedPokemon(pokemon === selectedPokemon ? null : pokemon);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const handleTypeSearchChange = (event) => {
    setTypeQuery(event.target.value);
  };

  const handleAbilitySearchChange = (event) => {
    setAbilityQuery(event.target.value.toLowerCase());
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  const toggleFavorite = (pokemon) => {
    const newFavorites = favorites.includes(pokemon.name)
      ? favorites.filter(name => name !== pokemon.name)
      : [...favorites, pokemon.name];
    setFavorites(newFavorites);
    localStorage.setItem('pokemonFavorites', JSON.stringify(newFavorites));
  };

  const toggleShowFavorites = () => {
    setShowFavorites(!showFavorites);
  };

  return (
    <div className="pokemon-list-container">
      <div className="search-filters">
        <input
          type="text"
          className="search-bar"
          placeholder="포켓몬 이름 검색..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <select
          className="dropdown"
          value={typeQuery}
          onChange={handleTypeSearchChange}
        >
          {pokemonTypes.map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
        <input
          type="text"
          className="search-bar"
          placeholder="특성 검색..."
          value={abilityQuery}
          onChange={handleAbilitySearchChange}
        />
        <select
          className="dropdown"
          value={sortBy}
          onChange={handleSortChange}
        >
          <option value="number">번호순</option>
          <option value="name">이름순</option>
          <option value="hp">HP순</option>
          <option value="attack">공격력순</option>
          <option value="defense">방어력순</option>
          <option value="sp_attack">특수공격순</option>
          <option value="sp_defense">특수방어순</option>
          <option value="speed">속도순</option>
          <option value="total">총합순</option>
        </select>
        <button onClick={toggleShowFavorites} className="favorite-toggle">
          {showFavorites ? '모든 포켓몬 보기' : '즐겨찾기만 보기'}
        </button>
      </div>

      <div className="pokemon-grid">
        {sortedData.map((key) => {
          const pokemon = data[key];
          const isFavorite = favorites.includes(pokemon.name);
          return (
            <div
              key={key}
              className={`pokemon-card ${selectedPokemon === pokemon ? 'selected' : ''} ${isFavorite ? 'favorite' : ''}`}
              onClick={() => handlePokemonClick(pokemon)}
            >
              <img className="pokemon-image" src={pokemon.img_href} alt={pokemon.name} />
              <h3 className="pokemon-name">{pokemon.name}</h3>
              <button
                className={`favorite-button ${isFavorite ? 'favorite' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorite(pokemon);
                }}
              >
                {isFavorite ? '★' : '☆'}
              </button>
              {selectedPokemon === pokemon && (
                <div className="pokemon-details">
                  <p><strong>타입:</strong> {pokemon.types}</p>
                  <p><strong>특성:</strong> {pokemon.abilities}</p>
                  <p><strong>HP:</strong> {pokemon.hp}</p>
                  <p><strong>공격:</strong> {pokemon.attack}</p>
                  <p><strong>방어:</strong> {pokemon.defense}</p>
                  <p><strong>특수 공격:</strong> {pokemon.sp_attack}</p>
                  <p><strong>특수 방어:</strong> {pokemon.sp_defense}</p>
                  <p><strong>속도:</strong> {pokemon.speed}</p>
                  <p><strong>총합:</strong> {pokemon.total}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default PokemonList;