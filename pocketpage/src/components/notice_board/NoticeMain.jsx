import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PostList from './PostList';
import AuthObserver from '../user/AuthObserver';
import firebase from '../user/FirebaseConfig';

const NoticeMain = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await firebase.auth().signOut();
      setUser(null);
      console.log('User logged out');
    } catch (error) {
      console.error('Error logging out:', error.message);
    }
  };

  const navigateToPostForm = () => {
    if (user) {
      const { uid, email } = user;
      navigate('/postform', { state: { uid, email } });
    }
  };

  const navigateToPostDetail = (postId) => {
    if (user) {
      const { uid, email } = user;
      navigate(`/post/${postId}`, { state: { uid, email } });
    } else {
      navigate(`/post/${postId}`);
    }
  };

  return (
    <div style={styles.container}>
      <h1>공지사항 게시판</h1>

      <AuthObserver setUser={setUser} />

      {user ? (
        <>
          <p>안녕하세요, {user.email}님!</p>
          <button onClick={handleLogout} style={styles.logoutButton}>로그아웃</button>
          <button onClick={navigateToPostForm} style={styles.writeButton}>게시글 작성</button>
        </>
      ) : (
        <p>로그인 후 게시글 작성이 가능합니다.</p>
      )}

      <PostList user={user} navigateToPostDetail={navigateToPostDetail} />
    </div>
  );
};

// 스타일 객체 추가
const styles = {
  container: {
    padding: '20px',
    backgroundColor: '#f7f7f7',
    minHeight: '100vh',
  },
  logoutButton: {
    marginTop: '10px',
    backgroundColor: '#ff4b5c',
    color: '#fff',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  writeButton: {
    marginTop: '10px',
    backgroundColor: '#4CAF50',
    color: '#fff',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  }
};

export default NoticeMain;