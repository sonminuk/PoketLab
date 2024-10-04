import React, { useState, useEffect } from 'react';
import firebase from '../user/FirebaseConfig';

const CommentForm = ({ uid, email, postId, commentToEdit, setCommentToEdit }) => {
  const [comment, setComment] = useState('');

  useEffect(() => {
    if (commentToEdit) {
      setComment(commentToEdit.text);
    }
  }, [commentToEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!comment) {
      alert('댓글을 입력해주세요.');
      return;
    }

    const commentData = {
      text: comment,
      author: { uid, email },
      createdAt: new Date().toISOString(),
    };

    try {
      if (commentToEdit) {
        // 댓글 수정
        await firebase.database().ref(`comments/${postId}/${commentToEdit.id}`).update({
          text: comment,
          updatedAt: new Date().toISOString(),
        });
        setCommentToEdit(null);
      } else {
        // 새 댓글 작성
        await firebase.database().ref(`comments/${postId}`).push(commentData);
      }
      setComment('');
      console.log('댓글이 성공적으로 작성/수정되었습니다.');
    } catch (error) {
      console.error('댓글 작성/수정 중 오류가 발생했습니다:', error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="댓글을 입력하세요"
        style={styles.textarea}
      />
      <button type="submit" style={styles.button}>
        {commentToEdit ? '댓글 수정' : '댓글 작성'}
      </button>
      {commentToEdit && (
        <button type="button" onClick={() => setCommentToEdit(null)} style={styles.cancelButton}>
          수정 취소
        </button>
      )}
    </form>
  );
};

const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: '20px',
  },
  textarea: {
    marginBottom: '10px',
    padding: '10px',
    fontSize: '16px',
    minHeight: '100px',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
  },
  cancelButton: {
    marginTop: '10px',
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
  },
};

export default CommentForm;