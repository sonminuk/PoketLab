import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import firebase from '../user/FirebaseConfig';

const PostEdit = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { uid, email } = location.state || {};

  const [post, setPost] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const postRef = firebase.database().ref(`post2/${postId}`);
        const snapshot = await postRef.once('value');
        const data = snapshot.val();
        if (data && data.author && data.author.uid === uid) {
          setPost(data);
          setTitle(data.title);
          setContent(data.content);
        } else {
          setError('이 게시글을 수정할 권한이 없습니다.');
        }
      } catch (error) {
        console.error('게시글을 불러오는 중 오류가 발생했습니다:', error);
        setError('게시글을 불러오는 중 오류가 발생했습니다.');
      }
    };

    if (uid) {
      fetchPost();
    } else {
      setError('로그인이 필요합니다.');
    }
  }, [postId, uid]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedPost = {
      title,
      content,
      author: post.author,
      createdAt: post.createdAt,
      updatedAt: new Date().toISOString(),
    };

    try {
      const postRef = firebase.database().ref(`post2/${postId}`);
      await postRef.update(updatedPost);
      navigate(`/post/${postId}`, { state: { uid, email } });
    } catch (error) {
      console.error('게시글 수정 중 오류가 발생했습니다:', error.message);
      setError('게시글 수정 중 오류가 발생했습니다.');
    }
  };

  const handleDelete = async () => {
    if (window.confirm('게시글을 삭제하시겠습니까?')) {
      try {
        const postRef = firebase.database().ref(`post2/${postId}`);
        await postRef.remove();
        navigate('/', { state: { uid, email } });
      } catch (error) {
        console.error('게시글 삭제 중 오류가 발생했습니다:', error.message);
        setError('게시글 삭제 중 오류가 발생했습니다.');
      }
    }
  };

  if (error) {
    return <p style={styles.error}>{error}</p>;
  }

  if (!post) {
    return <p>게시글을 불러오는 중입니다...</p>;
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>게시글 수정</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="제목"
            required
            style={styles.input}
          />
        </div>
        <div>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="내용"
            required
            style={styles.textarea}
          />
        </div>
        <div style={styles.buttonContainer}>
          <button type="submit" style={styles.submitButton}>수정 완료</button>
          <button type="button" onClick={handleDelete} style={styles.deleteButton}>삭제</button>
        </div>
      </form>
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
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    marginBottom: '10px',
    padding: '10px',
    fontSize: '16px',
  },
  textarea: {
    marginBottom: '10px',
    padding: '10px',
    fontSize: '16px',
    minHeight: '200px',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  submitButton: {
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
  },
  deleteButton: {
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
  },
  error: {
    color: 'red',
    textAlign: 'center',
  },
};

export default PostEdit;