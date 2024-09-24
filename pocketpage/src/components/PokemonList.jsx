import React, { useState } from 'react';
import './PokemonList.css';  // Import the CSS

function PokemonList({ data }) {
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [typeQuery, setTypeQuery] = useState('');
  const [abilityQuery, setAbilityQuery] = useState('');

  // Unique Pokémon types for dropdown
  const pokemonTypes = [
    '모든 타입',  // Placeholder for 'All Types'
    '불꽃',
    '물',
    '풀',
    '전기',
    '얼음',
    '격투',
    '독',
    '땅',
    '비행',
    '에스퍼',
    '벌레',
    '바위',
    '고스트',
    '드래곤',
    '악',
    '강철',
    '페어리'
  ];

  const handlePokemonClick = (pokemon) => {
    setSelectedPokemon(pokemon === selectedPokemon ? null : pokemon);  // Toggle selection
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const handleTypeSearchChange = (event) => {
    setTypeQuery(event.target.value);  // Directly use value from dropdown
  };

  const handleAbilitySearchChange = (event) => {
    setAbilityQuery(event.target.value.toLowerCase());
  };

  // Filter data based on name, type, or ability
  const filteredData = Object.keys(data).filter(key => {
    const pokemon = data[key];
    const matchesName = pokemon.name.toLowerCase().includes(searchQuery);
    const matchesType = typeQuery === '모든 타입' || pokemon.types.includes(typeQuery);  // Check type match or 'All Types'
    const matchesAbility = pokemon.abilities.toLowerCase().includes(abilityQuery);

    return matchesName && matchesType && matchesAbility;
  });

  return (
    <div className="table-container">
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
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>

      <input
        type="text"
        className="search-bar"
        placeholder="특성 검색..."
        value={abilityQuery}
        onChange={handleAbilitySearchChange}
      />

      <div className="pokemon-list">
        {filteredData.map((key) => {
          const pokemon = data[key];
          return (
            <div
              key={key}
              className={`pokemon-item ${selectedPokemon === pokemon ? 'selected' : ''}`}
              onClick={() => handlePokemonClick(pokemon)}
            >
              <img className="pokemon-image" src={pokemon.img_href} alt={pokemon.name} />
              <div className="pokemon-info">
                <p>{pokemon.name}</p>
                {selectedPokemon === pokemon && (
                  <div>
                    <p>타입: {pokemon.types}</p>
                    <p>특성: {pokemon.abilities}</p>
                    <p>HP: {pokemon.hp}</p>
                    <p>공격: {pokemon.attack}</p>
                    <p>방어: {pokemon.defense}</p>
                    <p>특수 공격: {pokemon.sp_attack}</p>
                    <p>특수 방어: {pokemon.sp_defense}</p>
                    <p>속도: {pokemon.speed}</p>
                    <p>총합: {pokemon.total}</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default PokemonList;
