// App.jsx
import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useLocation,
} from "react-router-dom";
import database from "./firebase";
import PokemonList from "./components/PokemonList";
import MovesList from "./components/MovesList";
import AbilitiesList from "./components/AbilitiesList";
import BiomesList from "./components/BiomesList";
import BiomeDetail from "./components/BiomeDetail";
import NoticeMain from "./components/notice_board/NoticeMain";
import ToolsList from "./components/ToolsList";
import Home from "./Home";
import PokemonTypeCalculator from "./PokemonTypeCalculator";
import PostForm from "./components/notice_board/PostForm";
import PostDetail from "./components/notice_board/PostDetail";
import PostEdit from "./components/notice_board/PostEdit";
import MyPage from "./components/notice_board/MyPage";
import User from "./components/user/userMain";
import styles from "./App.module.css";

function App() {
  const [pokemonData, setPokemonData] = useState({});
  const [movesData, setMovesData] = useState({});
  const [abilitiesData, setAbilitiesData] = useState({});
  const [biomesData, setBiomesData] = useState({});
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Router>
      <div className={styles.App}>
        <main
          className={`${styles.content} ${
            isSidebarOpen ? styles.sidebarOpen : ""
          }`}
        >
          <button className={styles.sidebarToggle} onClick={toggleSidebar}>
            <span></span>
            <span></span>
            <span></span>
          </button>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/pokemon"
              element={<PokemonList data={pokemonData} />}
            />
            <Route path="/moves" element={<MovesList data={movesData} />} />
            <Route
              path="/abilities"
              element={<AbilitiesList data={abilitiesData} />}
            />
            <Route path="/biomes" element={<BiomesList data={biomesData} />} />
            <Route
              path="/biome/:id"
              element={<BiomeDetail data={biomesData} />}
            />
            <Route path="/tools" element={<ToolsList />} />
            <Route path="/notice" element={<NoticeMain />} />
            <Route
              path="/pokemon-type-calculator"
              element={<PokemonTypeCalculator />}
            />
            <Route path="/notice" element={<NoticeMain />} />
            <Route path="/postform" element={<PostForm />} />
            <Route path="/" element={<NoticeMain />} />
            <Route path="/post/:postId" element={<PostDetail />} />
            <Route path="/postedit/:postId" element={<PostEdit />} />
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/user" element={<User />} />
          </Routes>
        </main>
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      </div>
    </Router>
  );
}

function Sidebar({ isOpen, toggleSidebar }) {
  const location = useLocation();

  const menuItems = [
    { path: "/", label: "홈" },
    { path: "/pokemon", label: "포켓몬" },
    { path: "/moves", label: "기술" },
    { path: "/abilities", label: "특성" },
    { path: "/biomes", label: "바이옴" },
    { path: "/tools", label: "도구" },
    { path: "/notice", label: "게시판" },
    { path: "/user", label: "유저" },
    { path: "/pokemon-type-calculator", label: "포켓몬 타입 계산기" },
  ];

  return (
    <aside className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
      <div className={styles.sidebarHeader}>
        <h1>PocketLab</h1>
      </div>
      <nav className={styles.sidebarNav}>
        <ul>
          {menuItems.map((item, index) => (
            <li
              key={index}
              className={location.pathname === item.path ? styles.active : ""}
            >
              <Link to={item.path} onClick={toggleSidebar}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

export default App;
