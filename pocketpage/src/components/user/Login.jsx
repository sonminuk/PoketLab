import { useState } from 'react';
import firebase from './firebaseConfig'; // Firebase 초기화된 인스턴스 가져오기

const Login = () => {
  const [email, setEmail] = useState(''); // 이메일 상태 변수
  const [password, setPassword] = useState(''); // 비밀번호 상태 변수
  const [errorMessage, setErrorMessage] = useState(''); // 에러 메시지 상태 변수

  // 로그인 처리 함수
  const handleLogin = async (e) => {
    e.preventDefault(); // 기본 form 제출 동작 방지
    try {
      // Firebase Authentication을 사용하여 이메일과 비밀번호로 로그인
      const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
      console.log("User logged in:", userCredential.user);
      setErrorMessage(''); // 로그인 성공 시 에러 메시지 초기화
    } catch (error) {
      // 로그인 실패 시 사용자에게 단순 메시지 표시
      setErrorMessage("로그인에 실패했습니다.");
    }
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        {/* 이메일 입력 필드 */}
        <input 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          placeholder="Email" 
        />
        {/* 비밀번호 입력 필드 */}
        <input 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          placeholder="Password" 
        />
        <br />
        {/* 로그인 버튼 */}
        <button type="submit">로그인</button>
      </form>

      {/* 에러 메시지 출력 */}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
};

export default Login;

