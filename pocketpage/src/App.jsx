import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import database from "./firebase";
import PokemonList from "./components/PokemonList";
import MovesList from "./components/MovesList";
import AbilitiesList from "./components/AbilitiesList";
import NoticeMain from "./components/notice_board/NoticeMain"; // 공지 게시판
import ToolsList from './components/ToolsList'; // 도구 목록 컴포넌트
import Home from './Home'; 
import "./App.css";

function App() {
  const [pokemonData, setPokemonData] = useState({});
  const [movesData, setMovesData] = useState({});
  const [abilitiesData, setAbilitiesData] = useState({});

  // Firebase에서 데이터 가져오기
  useEffect(() => {
    database.ref("pokemon").on("value", (snapshot) => {
      setPokemonData(snapshot.val());
    });

    database.ref("moves").on("value", (snapshot) => {
      setMovesData(snapshot.val());
    });

    database.ref("abilities").on("value", (snapshot) => {
      setAbilitiesData(snapshot.val());
    });
  }, []);

  return (
    <Router>
      <div className="App">
        <header>
          <h1>PocketLab</h1>
          <nav>
            <ul>
              <li>
                <Link to="/">홈</Link>
              </li>
              <li>
                <Link to="/pokemon">포켓몬</Link>
              </li>
              <li>
                <Link to="/moves">기술</Link>
              </li>
              <li>
                <Link to="/abilities">특성</Link>
              </li>
              <li>
                <Link to="/tools">도구</Link>
              </li>{" "}
              {/* 도구 페이지 링크 추가 */}
              <li>
                <Link to="/notice">게시판</Link>
              </li>
            </ul>
          </nav>
        </header>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pokemon" element={<PokemonList data={pokemonData} />} />
          <Route path="/moves" element={<MovesList data={movesData} />} />
          <Route
            path="/abilities"
            element={<AbilitiesList data={abilitiesData} />}
          />
          <Route path="/tools" element={<ToolsList />} />{" "}
          {/* 도구 페이지 라우트 추가 */}
          <Route path="/notice" element={<NoticeMain />} />
        </Routes>
      </div>
    </Router>
  );
}


export default App;
