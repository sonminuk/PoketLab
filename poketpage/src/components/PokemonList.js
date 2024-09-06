// src/components/PokemonList.js
import React from 'react';

function PokemonList({ data }) {
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>이미지</th>
            <th>이름</th>
            <th>타입</th>
            <th>특성</th>
            <th>HP</th>
            <th>공격</th>
            <th>방어</th>
            <th>특수 공격</th>
            <th>특수 방어</th>
            <th>속도</th>
            <th>총합</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(data).map((key) => {
            const pokemon = data[key];
            return (
              <tr key={key}>
                <td><img className="item-image" src={pokemon.img_href} alt={pokemon.name} /></td>
                <td>{pokemon.name}</td>
                <td>{pokemon.types}</td>
                <td>{pokemon.abilities}</td>
                <td>{pokemon.hp}</td>
                <td>{pokemon.attack}</td>
                <td>{pokemon.defense}</td>
                <td>{pokemon.sp_attack}</td>
                <td>{pokemon.sp_defense}</td>
                <td>{pokemon.speed}</td>
                <td>{pokemon.total}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default PokemonList;
