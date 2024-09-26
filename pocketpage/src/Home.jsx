import React, { useState } from 'react';
import './Home.css';

function Home() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    // Implement search functionality
    console.log('Searching for:', searchTerm);
  };

  return (
    <div className="home">
      <header className="home-header">
        <div className="container">
          <h1 className="title">포켓 로그 전략 가이드에 오신 것을 환영합니다!</h1>
          <p className="subtitle">포켓몬 마스터가 되기 위한 최고의 가이드</p>
          <form onSubmit={handleSearch} className="search-form">
            <input
              type="text"
              placeholder="포켓몬 또는 기술 검색..."
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit" className="search-button">검색</button>
          </form>
        </div>
      </header>

      <main className="main-content">
        <section className="features">
          <FeatureCard
            title="포켓몬 도감"
            description="모든 포켓몬의 상세 정보, 진화 계통, 출현 위치 등을 확인하세요."
          />
          <FeatureCard
            title="기술 데이터베이스"
            description="모든 기술의 상세 정보, 효과, 학습 가능한 포켓몬 목록을 제공합니다."
          />
          <FeatureCard
            title="특성 가이드"
            description="각 특성의 효과와 전략적 활용법을 상세히 설명합니다."
          />
          <FeatureCard
            title="배틀 시뮬레이터"
            description="다양한 포켓몬 조합으로 가상 배틀을 체험해보세요."
          />
          <FeatureCard
            title="커뮤니티 포럼"
            description="다른 트레이너들과 전략을 공유하고 토론하세요."
          />
        </section>

        <section className="popular-content">
          <h2 className="section-title">포켓 로그 인기 콘텐츠</h2>
          <div className="content-grid">
            <PopularContent title="이번 주 최강 포켓몬 TOP 10" />
            <PopularContent title="메타 대응 가이드" />
            <PopularContent title="초보자를 위한 팁 모음" />
            <PopularContent title="히든 아이템 위치 총정리" />
          </div>
        </section>

        <section className="cta-section">
          <h2 className="section-title">포켓 로그 시작하기</h2>
          <p>지금 바로 포켓 로그를 시작하고 최고의 트레이너가 되어보세요!</p>
          <button
            className="cta-button"
            onClick={() => window.open("https://pokerogue.net/", "_blank")}
          >
            무료로 시작하기
          </button>
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

function FeatureCard({ title, description }) {
  return (
    <div className="feature-card">
      <h3 className="feature-title">{title}</h3>
      <p className="feature-description">{description}</p>
    </div>
  );
}

function PopularContent({ title }) {
  return (
    <div className="popular-content-card">
      <h3 className="content-title">{title}</h3>
      <button className="content-button">자세히 보기</button>
    </div>
  );
}

export default Home;