import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import database from "./firebase";
import PokemonList from "./components/PokemonList";
import MovesList from "./components/MovesList";
import AbilitiesList from "./components/AbilitiesList";
import BiomesList from "./components/BiomesList";
import BiomeDetail from "./components/BiomeDetail"; // 새로 추가
import NoticeMain from "./components/notice_board/NoticeMain";
import ToolsList from './components/ToolsList';
import Home from './Home';
import PokemonTypeCalculator from './PokemonTypeCalculator';
import PostForm from "./components/notice_board/PostForm";// 게시판 작성 컴포넌트
import PostDetail from "./components/notice_board/PostDetail";// 게시판 조회 컴포넌트
import PostEdit from './components/notice_board/PostEdit'; // 게시판 수정 컴포넌트
import User from './components/user/userMain'; // 유저 컴포넌트
import "./App.css";

function App() {
  const [pokemonData, setPokemonData] = useState({});
  const [movesData, setMovesData] = useState({});
  const [abilitiesData, setAbilitiesData] = useState({});
  const [biomesData, setBiomesData] = useState({});

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

    database.ref("biomes").on("value", (snapshot) => {
      setBiomesData(snapshot.val());
    });
  }, []);

  return (
    <Router>
      <div className="App">
        <header>
          <h1>PocketLab</h1>
          <nav>
            <ul>
              <li><Link to="/">홈</Link></li>
              <li><Link to="/pokemon">포켓몬</Link></li>
              <li><Link to="/moves">기술</Link></li>
              <li><Link to="/abilities">특성</Link></li>
              <li><Link to="/biomes">바이옴</Link></li>
              <li><Link to="/tools">도구</Link></li>
              <li><Link to="/notice">게시판</Link></li>
               <li><Link to="/user">유저</Link></li> {/* 유저 링크 추가 */}
              <li><Link to="/pokemon-type-calculator">포켓몬 타입 계산기</Link></li>
            </ul>
          </nav>
        </header>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pokemon" element={<PokemonList data={pokemonData} />} />
          <Route path="/moves" element={<MovesList data={movesData} />} />
          <Route path="/abilities" element={<AbilitiesList data={abilitiesData} />} />
          <Route path="/biomes" element={<BiomesList data={biomesData} />} />
          <Route path="/biome/:id" element={<BiomeDetail data={biomesData} />} /> {/* 새로 추가 */}
          <Route path="/tools" element={<ToolsList />} />
          <Route path="/notice" element={<NoticeMain />} />
          <Route path="/pokemon-type-calculator" element={<PokemonTypeCalculator />} />
           {/* 게시판 관련 라우트 추가 */}
          <Route path="/notice" element={<NoticeMain />} />
          <Route path="/postform" element={<PostForm />} />
          <Route path="/" element={<NoticeMain />} />
          <Route path="/post/:postId" element={<PostDetail />} /> 
          <Route path="/postedit/:postId" element={<PostEdit />} /> 
          {/* 유저 페이지 라우트 추가 */}
          <Route path="/user" element={<User />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;