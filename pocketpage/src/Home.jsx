// src/Home.js
import React from 'react';
import './Home.css';

function Home() {
  const handleGameStart = () => {
    window.open("https://pokerogue.net/", "_blank");
  };

  return (
    <div className="home-container">
      <header className="home-header">
        <h1>환영합니다, PokeLab에!</h1>
        <p>포켓몬 세계를 탐험하고 필요한 정보를 찾아보세요.</p>
      </header>
      <section className="home-features">
        <h2>주요 기능</h2>
        <ul className="feature-list">
          <li>포켓몬 목록: 다양한 포켓몬의 정보를 확인하세요.</li>
          <li>기술 및 특성: 포켓몬의 기술과 특성을 탐색하세요.</li>
          <li>공지사항: 최신 공지와 정보를 확인하세요.</li>
          <li>도구 정보: 다양한 도구와 아이템에 대한 정보를 찾아보세요.</li>
        </ul>
      </section>
      <button className="start-game-button" onClick={handleGameStart}>
        게임 시작하기
      </button>
      <section className="home-image-section">
        <img
          className="home-image"
          src="https://example.com/path-to-your-image.jpg"
          alt="PokeLab Illustration"
        />
      </section>
    </div>
  );
}

export default Home;
