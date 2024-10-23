import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import firebase from '../user/FirebaseConfig';
import "./NoticeMain.css"; 


// 특정 게시판(board)에 속하는 게시글 목록
const PostList = ({ user, board }) => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Firebase에서 게시글 데이터를 가져오는 함수
    const fetchPosts = async () => {
      const postRef = firebase.database().ref('posts');
      postRef.orderByChild('board').equalTo(board).on('value', (snapshot) => {
        const postArray = [];
        snapshot.forEach((childSnapshot) => {
          const post = childSnapshot.val();
          post.id = childSnapshot.key;
          postArray.push(post);
        });
        setPosts(postArray);
      });
    };

    fetchPosts();

    return () => {
      firebase.database().ref('posts').off();
    };
  }, [board]);
 // 게시글을 클릭했을 때 해당 게시글 상세 페이지로 이동하는 함수
  const handlePostClick = (postId) => {
    if (user) {
      navigate(`/post/${postId}`, { state: { uid: user.uid, email: user.email } });
    } else {
      navigate(`/post/${postId}`);
    }
  };

  return (
    <div>
      <h2>{board} 게시글 목록</h2>
      <hr />
      {/* 게시글 리스트의 헤더 (번호, 제목, 작성자 등) */}
      <div style={{ display: 'grid', gridTemplateColumns: '50px 1fr 200px 150px 80px 80px 80px', gap: '10px' }}>
        <div><strong>번호</strong></div>
        <div><strong>제목</strong></div>
        <div><strong>작성자</strong></div>
        <div><strong>작성시간</strong></div>
        <div><strong>조회수</strong></div>
        <div><strong>추천수</strong></div>
        <div><strong>비추수</strong></div>
      </div>
      <hr />
      {posts.length === 0 ? (
        <p>게시글이 없습니다.</p>
      ) : (
        posts.map((post, index) => (
          <div
            key={post.id}
            onClick={() => handlePostClick(post.id)}
            className="post-item"
          >
            <div>{index + 1}</div>
            <div>{post.title}</div>
            <div>{post.author && post.author.email ? post.author.email : '알 수 없음'}</div>
            <div>{new Date(post.createdAt).toLocaleString()}</div>
            <div>{post.views || 0}</div>
            <div>{post.likes || 0}</div>
            <div>{post.dislikes || 0}</div>
          </div>
        ))
      )}
      <hr />
    </div>
  );
};

export default PostList;
