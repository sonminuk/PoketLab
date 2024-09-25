import { useState } from 'react';
import firebase from './UserFirebaseConfig'; // Firebase 초기화된 인스턴스 가져오기

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // 에러 메시지 상태 변수

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError(''); // 기존 에러 메시지 초기화

    try {
      // 이메일 형식이 잘못된 경우 사전 검증 (정규 표현식 사용)
      if (!/\S+@\S+\.\S+/.test(email)) {
        throw new Error("유효하지 않은 이메일 형식입니다.");
      }

      const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
      const user = userCredential.user;
      console.log("User signed up:", user);
    } catch (error) {
      // 에러를 catch하여 콘솔에 출력하지 않고, 커스텀 메시지 처리
      if (error.code) {
        switch (error.code) {
          case 'auth/email-already-in-use':
            setError('이미 등록된 이메일입니다.');
            break;
          case 'auth/invalid-email':
            setError('유효하지 않은 이메일 형식입니다.');
            break;
          case 'auth/weak-password':
            setError('비밀번호가 너무 짧습니다. 6자 이상 입력하세요.');
            break;
          default:
            setError('회원가입에 실패했습니다. 다시 시도해주세요.');
        }
      } else {
        // Firebase 외의 일반적인 에러 처리
        setError(error.message);
      }
    }
  };

  return (
    <form onSubmit={handleSignUp}>
      <input 
        type="email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
        placeholder="Email" 
      />
      <input 
        type="password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
        placeholder="Password" 
      />
      <br />
      <button type="submit">회원가입</button>

      {/* 커스텀 에러 메시지 출력 */}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
};

export default SignUp;
