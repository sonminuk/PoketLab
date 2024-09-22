// src/components/PokemonList.js
import React, { useState } from 'react';
import './PokemonList.css'; // Ensure you have this CSS file for styling

function PokemonList({ data }) {
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  const handleImageClick = (pokemon) => {
    if (selectedPokemon && selectedPokemon.name === pokemon.name) {
      setSelectedPokemon(null); // Close if already selected
    } else {
      setSelectedPokemon(pokemon); // Select new Pokémon
    }
  };

  return (
    <div className="pokemon-gallery">
      {Object.keys(data).map((key) => {
        const pokemon = data[key];
        return (
          <div key={key} className="pokemon-card">
            <img
              className="item-image"
              src={pokemon.img_href}
              alt={pokemon.name}
              onClick={() => handleImageClick(pokemon)}
            />
            {selectedPokemon && selectedPokemon.name === pokemon.name && (
              <div className="pokemon-info">
                <h3>{pokemon.name}</h3>
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
        );
      })}
    </div>
  );
}

export default PokemonList;
