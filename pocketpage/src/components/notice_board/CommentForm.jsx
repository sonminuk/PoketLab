import React, { useState, useEffect } from 'react';
import firebase from '../user/FirebaseConfig';

const CommentForm = ({ uid, email, postId, commentToEdit, setCommentToEdit, onCommentChange }) => {
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (commentToEdit) {
      setComment(commentToEdit.text);
    }
  }, [commentToEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!comment.trim()) {
      alert('댓글을 입력해주세요.');
      return;
    }

    const commentData = {
      text: comment,
      author: { uid, email },
      createdAt: new Date().toISOString(),
    };

    setLoading(true);

    try {
      const commentsRef = firebase.database().ref(`comments/${postId}`);
      const postRef = firebase.database().ref(`posts/${postId}/commentsCount`);

      if (commentToEdit) {
        await commentsRef.child(commentToEdit.id).update({
          text: comment,
          updatedAt: new Date().toISOString(),
        });
        alert('댓글이 수정되었습니다.');
        setCommentToEdit(null);
      } else {
        await commentsRef.push(commentData);
        await postRef.transaction((currentCount) => (currentCount || 0) + 1);
        alert('댓글이 작성되었습니다.');
      }

      setComment('');
      onCommentChange(); // 댓글 변경 후 목록 갱신
    } catch (error) {
      console.error('댓글 처리 중 오류가 발생했습니다:', error.message);
      alert('댓글 작성/수정 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelEdit = () => {
    setComment('');
    setCommentToEdit(null);
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="댓글을 입력하세요"
        style={styles.textarea}
        disabled={loading}
      />
      <button type="submit" style={styles.button} disabled={loading}>
        {loading ? '처리 중...' : commentToEdit ? '댓글 수정' : '댓글 작성'}
      </button>
      {commentToEdit && (
        <button
          type="button"
          onClick={handleCancelEdit}
          style={styles.cancelButton}
          disabled={loading}
        >
          수정 취소
        </button>
      )}
    </form>
  );
};

const styles = {

  // 코드 너무 길어져서 옆으로 넣어서 임시로 압축시킴 일단 나중에 다듬으면서 css 파일에 넣을듯
  form: { display: 'flex', flexDirection: 'column', marginTop: '20px' },
  textarea: { marginBottom: '10px', padding: '10px', fontSize: '16px', minHeight: '100px', resize: 'none' },
  button: { padding: '10px 20px', fontSize: '16px', backgroundColor: '#4CAF50', color: 'white', border: 'none', cursor: 'pointer', opacity: 0.9 },
  cancelButton: { marginTop: '10px', padding: '10px 20px', fontSize: '16px', backgroundColor: '#f44336', color: 'white', border: 'none', cursor: 'pointer' },
};

export default CommentForm;

