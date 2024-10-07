import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import firebase from '../user/FirebaseConfig';

const MyPage = () => {
  const [myPosts, setMyPosts] = useState([]);
  const [myComments, setMyComments] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const { uid, email } = location.state || {}; // NoticeMain에서 받은 uid, email 사용

  useEffect(() => {
    if (uid) {
      // 유저가 있을 때만 포스트와 댓글을 불러옴
      fetchMyPosts();
      fetchMyComments();
    } else {
      // 유저 정보가 없을 경우 로그인 페이지로 리다이렉트
      navigate('/user', { replace: true });
    }
  }, [uid, navigate]);

  const fetchMyPosts = async () => {
    if (!uid) return; // 유저 정보 없으면 중지
    const postsRef = firebase.database().ref('posts');
    const snapshot = await postsRef.orderByChild('author/uid').equalTo(uid).once('value');
    const posts = [];
    snapshot.forEach((childSnapshot) => {
      posts.push({ id: childSnapshot.key, ...childSnapshot.val() });
    });
    setMyPosts(posts);
  };

  const fetchMyComments = async () => {
    if (!uid) return; // 유저 정보 없으면 중지
    const commentsRef = firebase.database().ref('comments');
    const snapshot = await commentsRef.once('value');
    const comments = [];
    snapshot.forEach((postSnapshot) => {
      postSnapshot.forEach((commentSnapshot) => {
        const comment = commentSnapshot.val();
        if (comment.author && comment.author.uid === uid) {
          comments.push({
            id: commentSnapshot.key,
            postId: postSnapshot.key,
            ...comment
          });
        }
      });
    });
    setMyComments(comments);
  };

  const handlePostClick = (postId) => {
    navigate(`/post/${postId}`, { state: { uid, email } });
  };

  if (!uid) {
    return <p>유저 정보를 불러오는 중...</p>; // 기본적으로 로딩 중이거나 리다이렉트 상태
  }

  return (
    <div style={styles.container}>
      <h2>마이페이지</h2>
      <h3>내가 쓴 글</h3>
      <ul style={styles.list}>
        {myPosts.length > 0 ? (
          myPosts.map((post) => (
            <li key={post.id} style={styles.item} onClick={() => handlePostClick(post.id)}>
              <span>[{post.board}] {post.title}</span>
              <span>{new Date(post.createdAt).toLocaleDateString()}</span>
            </li>
          ))
        ) : (
          <p>작성한 글이 없습니다.</p>
        )}
      </ul>
      <h3>내가 쓴 댓글</h3>
      <ul style={styles.list}>
        {myComments.length > 0 ? (
          myComments.map((comment) => (
            <li key={comment.id} style={styles.item} onClick={() => handlePostClick(comment.postId)}>
              <span>{comment.text}</span>
              <span>{new Date(comment.createdAt).toLocaleDateString()}</span>
            </li>
          ))
        ) : (
          <p>작성한 댓글이 없습니다.</p>
        )}
      </ul>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    maxWidth: '800px',
    margin: '0 auto',
  },
  list: {
    listStyle: 'none',
    padding: 0,
  },
  item: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px',
    borderBottom: '1px solid #ccc',
    cursor: 'pointer',
  },
};

export default MyPage;