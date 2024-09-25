import { useState } from 'react';
import firebase from './UserFirebaseConfig'; // Firebase 초기화된 인스턴스 가져오기

const Login = () => {
  const [email, setEmail] = useState(''); // 이메일 상태 변수
  const [password, setPassword] = useState(''); // 비밀번호 상태 변수
  const [errorMessage, setErrorMessage] = useState(''); // 에러 메시지 상태 변수

  // 로그인 처리 함수
  const handleLogin = async (e) => {
    e.preventDefault(); // 기본 form 제출 동작 방지
    setErrorMessage(''); // 기존 에러 메시지 초기화

    try {
      // 이메일 형식이 잘못된 경우 사전 검증 (정규 표현식 사용)
      if (!/\S+@\S+\.\S+/.test(email)) {
        throw new Error("유효하지 않은 이메일 형식입니다.");
      }

      // Firebase Authentication을 사용하여 이메일과 비밀번호로 로그인
      const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
      console.log("User logged in:", userCredential.user);
      setErrorMessage(''); // 로그인 성공 시 에러 메시지 초기화
    } catch (error) {
      // 에러 콘솔 출력 (실제 발생한 에러 확인)
      console.log("Error code:", error.code);
      console.log("Error message:", error.message);

      // 로그인 실패 시 발생하는 에러 처리
      if (error.code) {
        switch (error.code) {
          case 'auth/user-not-found':
            setErrorMessage('존재하지 않는 이메일입니다.');
            break;
          case 'auth/wrong-password':
            setErrorMessage('비밀번호가 올바르지 않습니다.');
            break;
          case 'auth/invalid-email':
            setErrorMessage('유효하지 않은 이메일 형식입니다.');
            break;
          case 'auth/too-many-requests':
            setErrorMessage('너무 많은 시도로 인해 잠시 후 다시 시도해 주세요.');
            break;
          case 'auth/internal-error':
              setErrorMessage('비정상적이거나 존재하지 않는 정보입니다.');
            break;
          default:
            setErrorMessage('로그인에 실패했습니다. 다시 시도해주세요.');
        }
      } else {
        // Firebase 외의 일반적인 에러 처리
        setErrorMessage(error.message);
      }
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




