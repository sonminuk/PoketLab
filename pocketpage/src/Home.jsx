import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBook,
  faBolt,
  faStar,
  faMap,
  faToolbox,
  faUsers,
  faCalculator,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import "./Home.css";
import SearchResults from "./SearchResults";
import database from "./firebase";

function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState({
    pokemon: [],
    items: [],
    moves: [],
    abilities: [],
  });
  const [isSearching, setIsSearching] = useState(false);
  const [pokemonData, setPokemonData] = useState({});
  const [itemsData, setItemsData] = useState([]);
  const [movesData, setMovesData] = useState({});
  const [abilitiesData, setAbilitiesData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const pokemonRef = database.ref("pokemon");
      const itemsRef = database.ref("items");
      const movesRef = database.ref("moves");
      const abilitiesRef = database.ref("abilities");

      pokemonRef.on("value", (snapshot) => {
        if (snapshot.exists()) {
          setPokemonData(snapshot.val() || {});
        }
      });

      itemsRef.on("value", (snapshot) => {
        if (snapshot.exists()) {
          const items = snapshot.val() || {};
          const flatItems = Object.values(items).flatMap((category) =>
            typeof category === "object" ? Object.values(category) : []
          );
          setItemsData(flatItems);
        }
      });

      movesRef.on("value", (snapshot) => {
        if (snapshot.exists()) {
          setMovesData(snapshot.val() || {});
        }
      });

      abilitiesRef.on("value", (snapshot) => {
        if (snapshot.exists()) {
          setAbilitiesData(snapshot.val() || {});
        }
      });
    };

    fetchData();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    setIsSearching(true);

    const pokemonResults = Object.values(pokemonData).filter(
      (pokemon) =>
        (pokemon &&
          pokemon.name &&
          pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (pokemon &&
          pokemon.types &&
          pokemon.types.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (pokemon &&
          pokemon.abilities &&
          pokemon.abilities.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const itemResults = itemsData.filter(
      (item) =>
        item &&
        item.name &&
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const moveResults = Object.values(movesData).filter(
      (move) =>
        move &&
        move.move_name &&
        move.move_name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const abilityResults = Object.values(abilitiesData).filter(
      (ability) =>
        ability &&
        ability.ability_name &&
        ability.ability_name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setSearchResults({
      pokemon: pokemonResults,
      items: itemResults,
      moves: moveResults,
      abilities: abilityResults,
    });
  };

  return (
    <div className="home">
      <header className="home-header">
        <div className="container">
          <h1 className="title">
            포켓 로그 전략 가이드에 오신 것을 환영합니다!
          </h1>
          <p className="subtitle">포켓몬 마스터가 되기 위한 최고의 가이드</p>
          <form onSubmit={handleSearch} className="search-form">
            <input
              type="text"
              placeholder="포켓몬, 도구, 기술, 특성 검색..."
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit" className="search-button">
              검색
            </button>
          </form>
        </div>
      </header>

      {isSearching && <SearchResults results={searchResults} />}

      <main className="main-content">
        <section className="features">
          <FeatureCard
            title="포켓몬 도감"
            description="모든 포켓몬의 상세 정보, 진화 계통, 출현 위치 등을 확인하세요."
            icon={faBook}
          />
          <FeatureCard
            title="기술 데이터베이스"
            description="모든 기술의 상세 정보, 효과, 학습 가능한 포켓몬 목록을 제공합니다."
            icon={faBolt}
          />
          <FeatureCard
            title="특성 가이드"
            description="각 특성의 효과와 전략적 활용법을 상세히 설명합니다."
            icon={faStar}
          />
          <FeatureCard
            title="바이옴 가이드"
            description="맵의 설명과 방향성을 제시해줍니다."
            icon={faMap}
          />
          <FeatureCard
            title="도구 가이드"
            description="각 도구의 효과를 상세히 설명합니다."
            icon={faToolbox}
          />
          <FeatureCard
            title="커뮤니티 포럼"
            description="다른 트레이너들과 전략을 공유하고 토론하세요."
            icon={faUsers}
          />
          <FeatureCard
            title="포켓몬 타입 계산기"
            description="포켓몬 타입 상성을 분석하고 최적의 전략을 세워보세요!"
            icon={faCalculator}
          />
        </section>

        <section className="cta-section">
          <div className="cta-content">
            <h2 className="section-title">포켓 로그 시작하기</h2>
            <p className="cta-description">
              지금 바로 포켓 로그를 시작하고 최고의 트레이너가 되어보세요!
            </p>
            <button
              className="cta-button"
              onClick={() => window.open("https://pokerogue.net/", "_blank")}
            >
              <span className="button-text">지금 시작하기</span>
              <FontAwesomeIcon icon={faArrowRight} className="button-icon" />
            </button>
          </div>

        </section>
      </main>

      <footer className="footer">
        <div className="container">
          <p>&copy; 2024 포켓 로그. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ title, description, icon }) {
  return (
    <div className="feature-card">
      <FontAwesomeIcon icon={icon} className="feature-icon" />
      <h3 className="feature-title">{title}</h3>
      <p className="feature-description">{description}</p>
    </div>
  );
}

export default Home;
