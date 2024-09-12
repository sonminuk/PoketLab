import React, { useState, useEffect } from 'react';
import database from '../../firebase';
import './NoticeMain.css';

const NoticeMain = () => {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentPostId, setCurrentPostId] = useState(null);
  const [showPostForm, setShowPostForm] = useState(false); // 글쓰기 폼 표시 여부
  const [authorId] = useState("user123"); // 임시 작성자 ID (로그인 구현 시 변경)

  // Firebase에서 게시글 가져오기
  useEffect(() => {
    const fetchPosts = () => {
      database.ref('posts').on('value', (snapshot) => {
        const data = snapshot.val();
        if (data) {
          setPosts(Object.entries(data)); // Get posts as [id, data] pairs
        }
      });
    };
    fetchPosts();
  }, []);

  // Firebase에 게시글 추가
  const handleAddPost = () => {
    const newPostRef = database.ref('posts').push();
    const now = new Date().toISOString(); // 현재 시간을 작성일로 사용
    newPostRef.set({
      title,
      content,
      authorId,
      date: now,
      views: 0,
      recommendations: 0,
    });
    setTitle('');
    setContent('');
    setShowPostForm(false); // 글쓰기 폼 숨김
  };

  // 게시글 수정 모드 활성화
  const handleEditPost = (id, post) => {
    setIsEditing(true);
    setTitle(post.title);
    setContent(post.content);
    setCurrentPostId(id);
    setShowPostForm(true); // 글쓰기 폼 표시
  };

  // 게시글 수정 후 저장
  const handleSaveEdit = () => {
    database.ref(`posts/${currentPostId}`).update({
      title,
      content,
    });
    setTitle('');
    setContent('');
    setIsEditing(false);
    setCurrentPostId(null);
    setShowPostForm(false); // 글쓰기 폼 숨김
  };

  // Firebase에서 게시글 삭제
  const handleDeletePost = (id) => {
    database.ref(`posts/${id}`).remove();
  };

  return (
    <div className="notice-main">
      <aside className="sidebar">
        <h3>게시판 목록</h3>
        <ul>
          <li>공지사항</li>
          <li>자유게시판</li>
          <li>질문답변</li>
          {/* Add more boards as needed */}
        </ul>
      </aside>

      <main className="content">
        <h2>게시판</h2>

        {/* Show post form only if '글쓰기' button is clicked */}
        {showPostForm ? (
          <div className="post-form">
            <input
              type="text"
              placeholder="제목"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              placeholder="내용"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            {isEditing ? (
              <button onClick={handleSaveEdit}>저장</button>
            ) : (
              <button onClick={handleAddPost}>작성</button>
            )}
            <button onClick={() => setShowPostForm(false)}>취소</button>
          </div>
        ) : (
          <button onClick={() => setShowPostForm(true)}>글쓰기</button>
        )}

        {/* Post List */}
        <table className="post-table">
          <thead>
            <tr>
              <th>번호</th>
              <th>제목</th>
              <th>작성자</th>
              <th>작성일</th>
              <th>조회수</th>
              <th>추천수</th>
              <th>액션</th>
            </tr>
          </thead>
          <tbody>
            {posts.length > 0 ? (
              posts.map(([id, post], index) => (
                <tr key={id}>
                  <td>{index + 1}</td> {/* 번호 */}
                  <td>{post.title}</td> {/* 제목 */}
                  <td>{post.authorId}</td> {/* 작성자 */}
                  <td>{new Date(post.date).toLocaleDateString()}</td> {/* 작성일 */}
                  <td>{post.views}</td> {/* 조회수 */}
                  <td>{post.recommendations}</td> {/* 추천수 */}
                  <td>
                    <button onClick={() => handleEditPost(id, post)}>수정</button>
                    <button onClick={() => handleDeletePost(id)}>삭제</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7">게시물이 없습니다.</td>
              </tr>
            )}
          </tbody>
        </table>
      </main>

      <aside className="user-info">
        <h3>회원 정보</h3>
        <button>로그인</button>
        <button>회원가입</button>
        {/* If logged in, display user information */}
      </aside>
    </div>
  );
};

export default NoticeMain;
