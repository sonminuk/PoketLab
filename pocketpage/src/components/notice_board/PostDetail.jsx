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
    const fetchData = async () => {
      const postRef = firebase.database().ref(`posts/${postId}`).once('value');
      const commentsRef = firebase.database().ref(`comments/${postId}`).once('value');

      const [postSnapshot, commentsSnapshot] = await Promise.all([postRef, commentsRef]);

      setPost(postSnapshot.val());
      setComments(snapshotToArray(commentsSnapshot));

      if (uid) {
        await firebase.database().ref(`posts/${postId}/views`).transaction((currentViews) => {
          return (currentViews || 0) + 1;
        });
      }
    };

    fetchData();
  }, [postId, uid]);

  const snapshotToArray = (snapshot) => {
    const arr = [];
    snapshot.forEach((childSnapshot) => {
      const comment = childSnapshot.val();
      comment.id = childSnapshot.key;
      arr.push(comment);
    });
    return arr;
  };

  const fetchComments = async () => {
    const commentsSnapshot = await firebase.database().ref(`comments/${postId}`).once('value');
    setComments(snapshotToArray(commentsSnapshot));
  };

  const handleLike = async () => {
    if (post && uid) {
      const likesRef = firebase.database().ref(`posts/${postId}/likes`);
      const userLikesRef = firebase.database().ref(`posts/${postId}/userLikes/${uid}`);

      const userLikeSnapshot = await userLikesRef.once('value');
      if (userLikeSnapshot.exists()) {
        alert('이미 추천하셨습니다.');
        return;
      }

      await likesRef.transaction((currentLikes) => (currentLikes || 0) + 1);
      await userLikesRef.set(true);
    }
  };

  const handleDislike = async () => {
    if (post && uid) {
      const dislikesRef = firebase.database().ref(`posts/${postId}/dislikes`);
      const userDislikesRef = firebase.database().ref(`posts/${postId}/userDislikes/${uid}`);

      const userDislikeSnapshot = await userDislikesRef.once('value');
      if (userDislikeSnapshot.exists()) {
        alert('이미 비추천하셨습니다.');
        return;
      }

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
    const commentsRef = firebase.database().ref(`comments/${postId}/${commentId}`);
    const postRef = firebase.database().ref(`posts/${postId}/commentsCount`);

    try {
      await commentsRef.remove();
      await postRef.transaction((currentCount) => {
        return (currentCount || 0) > 0 ? currentCount - 1 : 0;
      });
      alert('댓글이 삭제되었습니다.');
      fetchComments(); // 댓글 삭제 후 목록 갱신
    } catch (error) {
      console.error('댓글 삭제 중 오류 발생:', error.message);
      alert('댓글 삭제 중 문제가 발생했습니다. 다시 시도해주세요.');
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
        작성자: {post.author?.email || '알 수 없음'} &nbsp;&nbsp;
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
        {uid && post.author?.uid === uid && (
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
          onCommentChange={fetchComments} // 댓글 변경 후 호출
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

  // 코드 너무 길어져서 옆으로 넣어서 임시로 압축시킴 일단 나중에 다듬으면서 css 파일에 넣을듯
  container: { maxWidth: '800px', margin: '0 auto', padding: '20px' },
  title: { textAlign: 'center' },
  meta: { textAlign: 'right', fontSize: '0.9em', color: '#666' },
  content: { marginTop: '20px', marginBottom: '20px' },
  buttonContainer: { display: 'flex', justifyContent: 'center', marginBottom: '20px' },
  button: { margin: '0 10px', padding: '10px 20px', fontSize: '16px', cursor: 'pointer' },
  commentList: { listStyle: 'none', padding: 0 },
  commentItem: { marginBottom: '10px', padding: '10px', backgroundColor: '#f0f0f0', borderRadius: '5px' },
  commentButton: { marginRight: '5px', padding: '5px 10px', fontSize: '14px', cursor: 'pointer' },
};

export default PostDetail;
