// src/App.js
import React, { useEffect, useState } from 'react';
import database from './firebase';
import PokemonList from './components/PokemonList';
import MovesList from './components/MovesList';
import AbilitiesList from './components/AbilitiesList';
import './App.css';

function App() {
  const [pokemonData, setPokemonData] = useState({});
  const [movesData, setMovesData] = useState({});
  const [abilitiesData, setAbilitiesData] = useState({});

  // Firebase에서 데이터 가져오기
  useEffect(() => {
    database.ref('pokemon').on('value', (snapshot) => {
      setPokemonData(snapshot.val());
    });

    database.ref('moves').on('value', (snapshot) => {
      setMovesData(snapshot.val());
    });

    database.ref('abilities').on('value', (snapshot) => {
      setAbilitiesData(snapshot.val());
    });
  }, []);

  return (
    <div className="App">
      <header>
        <h1>PokeLab</h1>
        <nav>
          <ul>
            <li><a href="#pokemonList">포켓몬</a></li>
            <li><a href="#movesList">기술</a></li>
            <li><a href="#abilitiesList">특성</a></li>
          </ul>
        </nav>
      </header>

       {/* 비디오 추가 */}
       <div className="video-container">
            <video width="600" controls autoPlay muted>
              <source src={`${process.env.PUBLIC_URL}/intro.mp4`} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
        </div>

      <section id="pokemonList">
        <h2>포켓몬 목록</h2>
        <PokemonList data={pokemonData} />
      </section>

      <section id="movesList">
        <h2>기술 목록</h2>
        <MovesList data={movesData} />
      </section>

      <section id="abilitiesList">
        <h2>특성 목록</h2>
        <AbilitiesList data={abilitiesData} />
      </section>
    </div>
  );
}

export default App;
