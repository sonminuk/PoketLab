import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import database from './firebase';
import PokemonList from './components/PokemonList';
import MovesList from './components/MovesList';
import AbilitiesList from './components/AbilitiesList';
import NoticeMain from './components/notice_board/NoticeMain'; // 공지 게시판
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
    <Router>
      <div className="App">
        <header>
          <h1>PokeLab</h1>
          <nav>
            <ul>
              <li><Link to="/">홈</Link></li>
              <li><Link to="/pokemon">포켓몬</Link></li>
              <li><Link to="/moves">기술</Link></li>
              <li><Link to="/abilities">특성</Link></li>
              <li><Link to="/notice">게시판</Link></li>
            </ul>
          </nav>
        </header>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pokemon" element={<PokemonList data={pokemonData} />} />
          <Route path="/moves" element={<MovesList data={movesData} />} />
          <Route path="/abilities" element={<AbilitiesList data={abilitiesData} />} />
          <Route path="/notice" element={<NoticeMain />} />
        </Routes>
      </div>
    </Router>
  );
}

function Home() {
  return (
    <div>
      <h2>환영합니다!</h2>
      <p>포켓랩에 오신 것을 환영합니다. 상단 메뉴를 이용해 각 페이지로 이동하세요.</p>
    </div>
  );
}

export default App;
