import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import firebase from '../user/FirebaseConfig';

const PostForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedBoard, setSelectedBoard] = useState('공지사항');
  const navigate = useNavigate();
  const location = useLocation();
  const user = location.state;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !content) {
      alert('제목과 내용을 입력해주세요.');
      return;
    }

    if (!user) {
      alert('로그인 후 게시글 작성이 가능합니다.');
      return;
    }

    const postData = {
      title,
      content,
      author: {
        uid: user.uid,
        email: user.email,
      },
      createdAt: new Date().toISOString(),
      board: selectedBoard,
      views: 0,
      likes: 0,
      dislikes: 0,
    };

    try {
      const newPostRef = firebase.database().ref('posts').push();
      await newPostRef.set(postData);
      setTitle('');
      setContent('');
      console.log('게시글이 성공적으로 작성되었습니다.');

      navigate('/notice');
    } catch (error) {
      console.error('게시글 작성 중 오류가 발생했습니다:', error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.formContainer}>
      <div style={styles.boardSelector}>
        <label htmlFor="board-select">게시판 선택: </label>
        <select
          id="board-select"
          value={selectedBoard}
          onChange={(e) => setSelectedBoard(e.target.value)}
          style={styles.select}
        >
          <option value="공지사항">공지사항</option>
          <option value="정보">정보</option>
          <option value="질문">질문</option>
          <option value="일반">일반</option>
        </select>
      </div>
      <div style={styles.titleContainer}>
        <h2>제목</h2>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="제목을 입력하세요"
          style={styles.inputTitle}
        />
      </div>
      <hr />
      <div style={styles.contentContainer}>
        <h2>내용</h2>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="내용을 입력하세요"
          style={styles.textareaContent}
        />
      </div>
      <hr />
      <button type="submit" style={styles.submitButton}>게시글 작성</button>
    </form>
  );
};

// 스타일링
const styles = {
  formContainer: {
    padding: '20px',
    backgroundColor: '#f7f7f7',
    borderRadius: '5px',
    maxWidth: '600px',
    margin: '0 auto',
  },
  titleContainer: {
    marginBottom: '20px',
  },
  inputTitle: {
    width: '100%',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    boxSizing: 'border-box', // padding을 포함하여 전체 크기 조정
  },
  contentContainer: {
    marginBottom: '20px',
  },
  textareaContent: {
    width: '100%',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    minHeight: '200px', // 최소 높이 확보
    boxSizing: 'border-box', // padding을 포함하여 전체 크기 조정
  },
  submitButton: {
    display: 'block',
    width: '100%',
    backgroundColor: '#4CAF50',
    color: '#fff',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
  },
};

export default PostForm;
