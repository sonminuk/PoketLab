import React from 'react';
import './SearchResults.css';

function SearchResults({ results }) {
  const { pokemon = [], items = [], moves = [], abilities = [] } = results;

  if (pokemon.length === 0 && items.length === 0 && moves.length === 0 && abilities.length === 0) {
    return <p className="no-results">검색 결과가 없습니다.</p>;
  }

  return (
    <div className="search-results">
      <h2 className="results-title">검색 결과</h2>
      {pokemon.length > 0 && (
        <div className="result-section">
          <h3 className="section-title">포켓몬</h3>
          <div className="result-grid">
            {pokemon.map((p, index) => (
              <div key={index} className="result-card pokemon-card">
                <img src={p.img_href} alt={p.name} className="pokemon-image" />
                <h4 className="pokemon-name">{p.name}</h4>
                <p className="pokemon-type">타입: {p.types}</p>
                <div className="pokemon-stats">
                  <p>HP: {p.hp}</p>
                  <p>공격: {p.attack}</p>
                  <p>방어: {p.defense}</p>
                  <p>특수공격: {p.sp_attack}</p>
                  <p>특수방어: {p.sp_defense}</p>
                  <p>속도: {p.speed}</p>
                </div>
                <p className="pokemon-total">총합: {p.total}</p>
                <p className="pokemon-abilities">특성: {p.abilities}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      {items.length > 0 && (
        <div className="result-section">
          <h3 className="section-title">도구</h3>
          <div className="result-grid">
            {items.map((item, index) => (
              <div key={index} className="result-card item-card">
                <img src={item.img_href} alt={item.name} className="item-image" />
                <h4 className="item-name">{item.name}</h4>
                <p className="item-effect">{item.effect}</p>
                <p className="item-rarity">{item.rarity}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      {moves.length > 0 && (
        <div className="result-section">
          <h3 className="section-title">기술</h3>
          <div className="result-grid">
            {moves.map((move, index) => (
              <div key={index} className="result-card move-card">
                <img src={move.move_class_img} alt={move.move_name} className="move-image" />
                <h4 className="move-name">{move.move_name}</h4>
                <p className="move-type">타입: {move.move_type}</p>
                <p className="move-power">위력: {move.move_power}</p>
                <p className="move-accuracy">명중률: {move.move_accuracy}</p>
                <p className="move-pp">PP: {move.move_pp}</p>
                <p className="move-description">{move.move_description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      {abilities.length > 0 && (
        <div className="result-section">
          <h3 className="section-title">특성</h3>
          <div className="result-grid">
            {abilities.map((ability, index) => (
              <div key={index} className="result-card ability-card">
                <h4 className="ability-name">{ability.ability_name}</h4>
                <p className="ability-description">{ability.ability_description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default SearchResults;