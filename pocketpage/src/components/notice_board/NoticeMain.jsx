// src/components/notice_board/NoticeMain.js
import React from 'react';
import SearchBar from './SearchBar';
import ConceptPosts from './NoticePosts';
import NoticePosts from './NoticePosts';
import RecommendedPosts from './RecommendedPosts';
import './NoticeMain.css';

function NoticeMain() {
  return (
    <div className="main-page">
      <h1>포켓랩 게시판</h1>

      {/* 검색바 */}
      <SearchBar />

      {/* 공지글 섹션 */}
      <section className="notice-section">
        <h2>공지사항</h2>
        <NoticePosts />
      </section>

      {/* 개념글 섹션 */}
      <section className="concept-posts-section">
        <h2>개념글</h2>
        <ConceptPosts />
      </section>

      {/* 추천글 섹션 */}
      <section className="recommended-posts-section">
        <h2>추천 게시글</h2>
        <RecommendedPosts />
      </section>
    </div>
  );
}

export default NoticeMain;
