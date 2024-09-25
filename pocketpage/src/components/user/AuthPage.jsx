import { useState } from 'react';
import AuthObserver from './AuthObserver'; // 로그인 상태를 감지하여 UI를 변경
import Login from './Login'; // 로그인 컴포넌트
import SignUp from './SignUp'; // 회원가입 컴포넌트
import firebase from './firebaseConfig'; // Firebase 초기화된 인스턴스 가져오기

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true); // 로그인/회원가입 상태 전환
  const [user, setUser] = useState(null); // 현재 로그인한 사용자 상태

  // 로그인/회원가입 전환 처리 함수
  const toggleAuthMode = () => {
    setIsLogin((prevState) => !prevState); // 상태 반전
  };

  // 로그아웃 처리 함수
  const handleLogout = async () => {
    try {
      await firebase.auth().signOut(); // Firebase 인증 로그아웃
      setUser(null); // 사용자 상태 초기화
      console.log('User logged out');
    } catch (error) {
      console.error('Error logging out:', error.message);
    }
  };

  return (
    <div style={styles.container}>
      <h1>테스트용 로그인/회원가입 페이지 입니다</h1>
      
      {/* 사용자 인증 상태를 감시하여 로그인 여부에 따라 메시지 출력 */}
      <AuthObserver setUser={setUser} />

      <div style={styles.formContainer}>
        {/* 로그인된 경우 로그아웃 버튼을 보여주고, 그렇지 않은 경우 로그인/회원가입 폼을 보여줌 */}
        {user ? (
          <div>
            <p>안녕하세요, {user.email}님!</p>
            <button onClick={handleLogout} style={styles.logoutButton}>로그아웃</button>
          </div>
        ) : (
          <>
            {/* 로그인 또는 회원가입 폼을 렌더링 */}
            {isLogin ? <Login /> : <SignUp />}
            
            {/* 로그인/회원가입 전환 버튼 */}
            <button onClick={toggleAuthMode} style={styles.toggleButton}>
              {isLogin ? "회원가입으로 변경" : "로그인으로 변경"}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

// 임시로 해놓은 스타일링
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f0f2f5',
  },
  formContainer: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    width: '300px',
    textAlign: 'center',
  },
  toggleButton: {
    marginTop: '10px',
    backgroundColor: '#007bff',
    color: '#fff',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  logoutButton: {
    marginTop: '10px',
    backgroundColor: '#ff4b5c',
    color: '#fff',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default AuthPage;
