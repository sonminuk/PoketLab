import React, { useState, useEffect } from 'react';
import database from '../../firebase';
import './NoticeMain.css';
import Sidebar from './Sidebar'; // 게시판 목록 컴포넌트
import UserInfo from './UserInfo'; // 회원 정보 컴포넌트
import PostTable from './PostTable'; // 게시글 목록 컴포넌트
import PostForm from './PostForm'; // 글쓰기 폼 컴포넌트

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
      <Sidebar />
      <main className="content">
        <h2>게시판</h2>
        {showPostForm ? (
  <PostForm
    title={title}
    content={content}
    setTitle={setTitle}
    setContent={setContent}
    isEditing={isEditing}
    handleSaveEdit={handleSaveEdit}
    handleAddPost={handleAddPost}
    setShowPostForm={setShowPostForm}
  />
) : (
  <button 
    onClick={() => {
      setTitle(''); // 새 글 작성 시 제목 초기화
      setContent(''); // 새 글 작성 시 내용 초기화
      setShowPostForm(true); // 글쓰기 폼 표시
    }}
  >
    글쓰기
  </button>
)}


        <PostTable
          posts={posts}
          handleEditPost={handleEditPost}
          handleDeletePost={handleDeletePost}
        />
      </main>
      <UserInfo />
    </div>
  );
};

export default NoticeMain;
