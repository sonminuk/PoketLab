import React, { useState, useEffect, useMemo } from 'react';
import { Star, Search, ChevronLeft, ChevronRight } from 'lucide-react';
import PropTypes from 'prop-types';
import './PokemonList.css';

const pokemonTypes = [
  '모든 타입', '불꽃', '물', '풀', '전기', '얼음', '격투', '독', '땅', '비행',
  '에스퍼', '벌레', '바위', '고스트', '드래곤', '악', '강철', '페어리'
];

const sortOptions = [
  { value: 'number', label: '번호순' },
  { value: 'name', label: '이름순' },
  { value: 'hp', label: 'HP순' },
  { value: 'attack', label: '공격력순' },
  { value: 'defense', label: '방어력순' },
  { value: 'sp_attack', label: '특수공격순' },
  { value: 'sp_defense', label: '특수방어순' },
  { value: 'speed', label: '속도순' },
  { value: 'total', label: '총합순' },
];

const ITEMS_PER_PAGE = 12;

const extractNumber = (stat) => {
  const matches = stat.match(/\d+/);
  return matches ? parseInt(matches[0], 10) : 0;
};

const cleanPokemonStats = (pokemon) => {
  return {
    ...pokemon,
    hp: extractNumber(pokemon.hp),
    attack: extractNumber(pokemon.attack),
    defense: extractNumber(pokemon.defense),
    sp_attack: extractNumber(pokemon.sp_attack),
    sp_defense: extractNumber(pokemon.sp_defense),
    speed: extractNumber(pokemon.speed),
    total: extractNumber(pokemon.total)
  };
};

export default function PokemonList({ data }) {
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [typeQuery, setTypeQuery] = useState('모든 타입');
  const [abilityQuery, setAbilityQuery] = useState('');
  const [sortBy, setSortBy] = useState('number');
  const [favorites, setFavorites] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const storedFavorites = localStorage.getItem('pokemonFavorites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  const sortedData = useMemo(() => {
    const filteredData = Object.entries(data).filter(([_, pokemon]) => {
      const matchesName = pokemon.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = typeQuery === '모든 타입' || (Array.isArray(pokemon.types) ? pokemon.types.includes(typeQuery) : pokemon.types === typeQuery);
      const matchesAbility = pokemon.abilities.toLowerCase().includes(abilityQuery.toLowerCase());
      const matchesFavorite = !showFavorites || favorites.includes(pokemon.name);
      return matchesName && matchesType && matchesAbility && matchesFavorite;
    });

    return filteredData.sort(([keyA, pokemonA], [keyB, pokemonB]) => {
      const cleanPokemonA = cleanPokemonStats(pokemonA);
      const cleanPokemonB = cleanPokemonStats(pokemonB);
      switch (sortBy) {
        case 'name':
          return pokemonA.name.localeCompare(pokemonB.name);
        case 'hp':
        case 'attack':
        case 'defense':
        case 'sp_attack':
        case 'sp_defense':
        case 'speed':
        case 'total':
          return cleanPokemonB[sortBy] - cleanPokemonA[sortBy];
        default:
          return keyA.localeCompare(keyB);
      }
    });
  }, [data, searchQuery, typeQuery, abilityQuery, sortBy, showFavorites, favorites]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return sortedData.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [sortedData, currentPage]);

  const toggleFavorite = (pokemon) => {
    const newFavorites = favorites.includes(pokemon.name)
      ? favorites.filter(name => name !== pokemon.name)
      : [...favorites, pokemon.name];
    setFavorites(newFavorites);
    localStorage.setItem('pokemonFavorites', JSON.stringify(newFavorites));
  };

  const totalPages = Math.ceil(sortedData.length / ITEMS_PER_PAGE);

  return (
    <div className="pokemon-list-container">
      <div className="search-filters">
        <div className="search-bar">
          <Search className="search-icon" />
          <input
            type="text"
            placeholder="포켓몬 이름 검색..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>
        <select
          value={typeQuery}
          onChange={(e) => setTypeQuery(e.target.value)}
          className="select-input"
        >
          {pokemonTypes.map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
        <input
          type="text"
          placeholder="특성 검색..."
          value={abilityQuery}
          onChange={(e) => setAbilityQuery(e.target.value)}
          className="search-input"
        />
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="select-input"
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
        <button
          className={`favorite-toggle ${showFavorites ? 'active' : ''}`}
          onClick={() => setShowFavorites(!showFavorites)}
        >
          {showFavorites ? '모든 포켓몬 보기' : '즐겨찾기만 보기'}
        </button>
      </div>
      <div className="pokemon-grid">
        {paginatedData.map(([key, pokemon]) => {
          const cleanedStats = cleanPokemonStats(pokemon);
          return (
            <div
              key={key}
              className={`pokemon-card ${selectedPokemon === pokemon ? 'selected' : ''}`}
              onClick={() => setSelectedPokemon(selectedPokemon === pokemon ? null : pokemon)}
            >
              <div className="pokemon-image-container">
                <img src={pokemon.img_href} alt={pokemon.name} className="pokemon-image" />
                <button
                  className={`favorite-button ${favorites.includes(pokemon.name) ? 'active' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(pokemon);
                  }}
                >
                  <Star className="star-icon" />
                </button>
              </div>
              <h3 className="pokemon-name">{pokemon.name}</h3>
              
              <div className="pokemon-types">
                {Array.isArray(pokemon.types)
                  ? pokemon.types.map(type => <span key={type} className={`type-badge ${type}`}>{type}</span>)
                  : <span className={`type-badge ${pokemon.types}`}>{pokemon.types}</span>
                }
              </div>
              
              {selectedPokemon === pokemon && (
                <div className="pokemon-details">
                  <p><strong>특성:</strong> {pokemon.abilities}</p>
                  <div className="stat-grid">
                    <div className="stat-item">
                      <span className="stat-label">HP</span>
                      <div className="stat-bar">
                        <div className="stat-fill hp" style={{width: `${(cleanedStats.hp / 255) * 100}%`}}></div>
                      </div>
                      <span className="stat-value">{cleanedStats.hp}</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-label">공격</span>
                      <div className="stat-bar">
                        <div className="stat-fill attack" style={{width: `${(cleanedStats.attack / 255) * 100}%`}}></div>
                      </div>
                      <span className="stat-value">{cleanedStats.attack}</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-label">방어</span>
                      <div className="stat-bar">
                        <div className="stat-fill defense" style={{width: `${(cleanedStats.defense / 255) * 100}%`}}></div>
                      </div>
                      <span className="stat-value">{cleanedStats.defense}</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-label">특수공격</span>
                      <div className="stat-bar">
                        <div className="stat-fill sp-attack" style={{width: `${(cleanedStats.sp_attack / 255) * 100}%`}}></div>
                      </div>
                      <span className="stat-value">{cleanedStats.sp_attack}</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-label">특수방어</span>
                      <div className="stat-bar">
                        <div className="stat-fill sp-defense" style={{width: `${(cleanedStats.sp_defense / 255) * 100}%`}}></div>
                      </div>
                      <span className="stat-value">{cleanedStats.sp_defense}</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-label">속도</span>
                      <div className="stat-bar">
                        <div className="stat-fill speed" style={{width: `${(cleanedStats.speed / 255) * 100}%`}}></div>
                      </div>
                      <span className="stat-value">{cleanedStats.speed}</span>
                    </div>
                  </div>
                  <p className="total-stats"><strong>총합:</strong> {cleanedStats.total}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className="pagination">
        <button
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="pagination-button"
        >
          <ChevronLeft />
        </button>
        <span>페이지 {currentPage} / {totalPages}</span>
        <button
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="pagination-button"
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  );
}

PokemonList.propTypes = {
  data: PropTypes.objectOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    img_href: PropTypes.string.isRequired,
    types: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string)
    ]).isRequired,
    abilities: PropTypes.string.isRequired,
    hp: PropTypes.string.isRequired,
    attack: PropTypes.string.isRequired,
    defense: PropTypes.string.isRequired,
    sp_attack: PropTypes.string.isRequired,
    sp_defense: PropTypes.string.isRequired,
    speed: PropTypes.string.isRequired,
    total: PropTypes.string.isRequired,
  })).isRequired,
};