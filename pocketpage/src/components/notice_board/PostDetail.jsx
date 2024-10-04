import React, { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
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
      const postRef = firebase.database().ref(`post2/${postId}`);
      postRef.once('value', (snapshot) => {
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
    };

    fetchPost();

    return () => {
      firebase.database().ref(`comments/${postId}`).off();
    };
  }, [postId]);

  const handleLike = async () => {
    if (post && uid) {
      const postRef = firebase.database().ref(`post2/${postId}/likes`);
      await postRef.transaction((currentLikes) => (currentLikes || 0) + 1);
    }
  };

  const handleDislike = async () => {
    if (post && uid) {
      const postRef = firebase.database().ref(`post2/${postId}/dislikes`);
      await postRef.transaction((currentDislikes) => (currentDislikes || 0) + 1);
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
          <button onClick={navigateToEdit} style={styles.button}>수정</button>
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
        <p>로그인 후 댓글을 작성할 수 있습니다.</p>
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