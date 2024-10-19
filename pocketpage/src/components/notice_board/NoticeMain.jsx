import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import PostList from "./PostList";
import AuthObserver from "../user/AuthObserver";
import firebase from "../user/FirebaseConfig";
import "./NoticeMain.css"; // CSS 파일 import

const NoticeMain = () => {
  const [user, setUser] = useState(null); // 유저 상태 추가
  const [currentBoard, setCurrentBoard] = useState("공지사항");
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await firebase.auth().signOut();
      console.log("User logged out");
      // 로그아웃 시 로그인 페이지로 이동
      navigate("/user", { replace: true });
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  };

  const navigateToPostForm = () => {
    if (user) {
      const { uid, email } = user;
      navigate("/postform", { state: { uid, email, board: currentBoard } });
    } else {
      alert("로그인이 필요합니다.");
    }
  };

  const navigateToPostDetail = (postId) => {
    navigate(`/post/${postId}`, {
      state: user ? { uid: user.uid, email: user.email } : {},
    });
  };

  const navigateToMyPage = () => {
    if (user) {
      // user 객체에서 uid와 email만 전달 (복제 가능한 항목만 전달)
      navigate("/mypage", { state: { uid: user.uid, email: user.email } });
    }
  };

  return (
    <div className="noticeMainContainer">
      <h1>{currentBoard} 게시판</h1>

      {/* AuthObserver를 통해 Firebase 인증 상태 감지 및 유저 상태 업데이트 */}
      <AuthObserver setUser={setUser} />

      {user ? (
        <>
          <p>안녕하세요, {user.email}님!</p>
          <button onClick={handleLogout} className="noticeMainLogoutButton">
            로그아웃
          </button>
          <button
            onClick={navigateToPostForm}
            className="noticeMainWriteButton"
          >
            게시글 작성
          </button>
          <button onClick={navigateToMyPage} className="noticeMainMyPageLink">
            마이페이지
          </button>
        </>
      ) : (
        <>
        <p>로그인 후 게시글 작성이 가능합니다.</p>
        <Link to="/user">
          <button className="noticeMainLoginButton">
            로그인 페이지로 이동
          </button>
         </Link>
      </>
        
      )}

      <div className="noticeMainBoardNavigation">
        {["공지사항", "정보", "질문", "일반"].map((board) => (
          <button
            key={board}
            onClick={() => setCurrentBoard(board)}
            className={
              currentBoard === board
                ? "noticeMainActiveBoardButton"
                : "noticeMainBoardButton"
            }
          >
            {board}
          </button>
        ))}
      </div>

      <PostList
        user={user}
        navigateToPostDetail={navigateToPostDetail}
        board={currentBoard}
      />
    </div>
  );
};

export default NoticeMain;
