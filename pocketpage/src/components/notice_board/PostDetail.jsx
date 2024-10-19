import React, { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate, Link } from 'react-router-dom';
import firebase from '../user/FirebaseConfig';
import CommentForm from './CommentForm';

const PostDetail = () => {
  const { postId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentToEdit, setCommentToEdit] = useState(null);

  const { uid, email } = location.state || {};

  useEffect(() => {
    const fetchPost = async () => {
      const postRef = firebase.database().ref(`posts/${postId}`);

      // 게시글 데이터 가져오기
      postRef.on('value', (snapshot) => {
        setPost(snapshot.val());
      });

      const commentsRef = firebase.database().ref(`comments/${postId}`);
      commentsRef.on('value', (snapshot) => {
        const commentsArray = [];
        snapshot.forEach((childSnapshot) => {
          const comment = childSnapshot.val();
          comment.id = childSnapshot.key;
          commentsArray.push(comment);
        });
        setComments(commentsArray);
      });

      // 조회수 증가 처리
      if (uid) {
        await postRef.child('views').transaction((currentViews) => {
          return (currentViews || 0) + 1;
        });
      }
    };

    fetchPost();

    // 클린업 함수: 이벤트 리스너 해제
    return () => {
      firebase.database().ref(`posts/${postId}`).off();
      firebase.database().ref(`comments/${postId}`).off();
    };
  }, [postId, uid]);

  const handleLike = async () => {
    if (post && uid) {
      const likesRef = firebase.database().ref(`posts/${postId}/likes`);
      const userLikesRef = firebase.database().ref(`posts/${postId}/userLikes/${uid}`);

      // 유저가 이미 추천했는지 확인
      const userLikeSnapshot = await userLikesRef.once('value');
      if (userLikeSnapshot.exists()) {
        alert('이미 추천하셨습니다.');
        return;
      }

      // 추천 수 증가 및 유저 추천 기록 저장
      await likesRef.transaction((currentLikes) => (currentLikes || 0) + 1);
      await userLikesRef.set(true);
    }
  };

  const handleDislike = async () => {
    if (post && uid) {
      const dislikesRef = firebase.database().ref(`posts/${postId}/dislikes`);
      const userDislikesRef = firebase.database().ref(`posts/${postId}/userDislikes/${uid}`);

      // 유저가 이미 비추천했는지 확인
      const userDislikeSnapshot = await userDislikesRef.once('value');
      if (userDislikeSnapshot.exists()) {
        alert('이미 비추천하셨습니다.');
        return;
      }

      // 비추천 수 증가 및 유저 비추천 기록 저장
      await dislikesRef.transaction((currentDislikes) => (currentDislikes || 0) + 1);
      await userDislikesRef.set(true);
    }
  };

  const navigateToEdit = () => {
    if (uid && post && post.author && post.author.uid === uid) {
      navigate(`/postedit/${postId}`, { state: { uid, email } });
    } else {
      alert('게시글 작성자만 수정할 수 있습니다.');
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (window.confirm('댓글을 삭제하시겠습니까?')) {
      try {
        await firebase.database().ref(`comments/${postId}/${commentId}`).remove();
        console.log('댓글이 성공적으로 삭제되었습니다.');
      } catch (error) {
        console.error('댓글 삭제 중 오류가 발생했습니다:', error.message);
      }
    }
  };

  const handleEditComment = (comment) => {
    setCommentToEdit(comment);
  };

  if (!post) {
    return <p>게시글을 불러오는 중입니다...</p>;
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>{post.title}</h2>
      <div style={styles.meta}>
        작성자: {post.author && post.author.email ? post.author.email : '알 수 없음'} &nbsp;&nbsp;
        추천 {post.likes || 0} &nbsp;&nbsp;
        비추천 {post.dislikes || 0} &nbsp;&nbsp;
        댓글 {comments.length} &nbsp;&nbsp;
        조회수 {post.views || 0} &nbsp;&nbsp;
        작성일 {post.createdAt}
      </div>
      <div style={styles.content}>
        <p>{post.content}</p>
      </div>
      <div style={styles.buttonContainer}>
        <button onClick={handleLike} style={styles.button}>추천</button>
        <button onClick={handleDislike} style={styles.button}>비추천</button>
        {uid && post.author && post.author.uid === uid && (
          <button onClick={navigateToEdit} style={styles.button}>수정/삭제</button>
        )}
      </div>
      <h3>댓글 [{comments.length}]</h3>
      <ul style={styles.commentList}>
        {comments.length === 0 ? (
          <p>댓글이 없습니다.</p>
        ) : (
          comments.map((comment) => (
            <li key={comment.id} style={styles.commentItem}>
              <strong>{comment.author.email}</strong>&nbsp;&nbsp;
              {comment.createdAt}
              <p>{comment.text}</p>
              {uid === comment.author.uid && (
                <div>
                  <button onClick={() => handleEditComment(comment)} style={styles.commentButton}>수정</button>
                  <button onClick={() => handleDeleteComment(comment.id)} style={styles.commentButton}>삭제</button>
                </div>
              )}
            </li>
          ))
        )}
      </ul>
      {uid ? (
        <CommentForm 
          uid={uid} 
          email={email} 
          postId={postId} 
          commentToEdit={commentToEdit}
          setCommentToEdit={setCommentToEdit}
        />
      ) : (
        <>
          <p>로그인 후 댓글을 작성할 수 있습니다.</p>
          <Link to="/user">
            <button className="noticeMainLoginButton">
              로그인 페이지로 이동
            </button>
          </Link>
        </>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
  },
  title: {
    textAlign: 'center',
  },
  meta: {
    textAlign: 'right',
    fontSize: '0.9em',
    color: '#666',
  },
  content: {
    marginTop: '20px',
    marginBottom: '20px',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '20px',
  },
  button: {
    margin: '0 10px',
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
  },
  commentList: {
    listStyle: 'none',
    padding: 0,
  },
  commentItem: {
    marginBottom: '10px',
    padding: '10px',
    backgroundColor: '#f0f0f0',
    borderRadius: '5px',
  },
  commentButton: {
    marginRight: '5px',
    padding: '5px 10px',
    fontSize: '14px',
    cursor: 'pointer',
  },
};

export default PostDetail;
