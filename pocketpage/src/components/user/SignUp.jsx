import { useState } from 'react';
import firebase from './UserFirebaseConfig'; // Firebase 초기화된 인스턴스 가져오기

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault(); // 기본 form 제출 동작 방지

    // 비밀번호 길이 검사 (최소 6자 이상)
    if (password.length < 6) {
      setErrorMessage('비밀번호는 최소 6자 이상이어야 합니다.');
      return;
    }

    try {
      const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
      const user = userCredential.user;
      console.log('User signed up:', user);
      setErrorMessage(''); // 성공 시 에러 메시지 초기화
    } catch (error) {
      // Firebase에서 발생하는 에러 처리
      console.log("Error code:", error.code);
      console.log("Error message:", error.message);

      if (error.code === 'auth/email-already-in-use') {
        setErrorMessage('이미 사용 중인 이메일입니다.');
      } else if (error.code === 'auth/invalid-email') {
        setErrorMessage('유효하지 않은 이메일 형식입니다.');
      } else {
        setErrorMessage('회원가입에 실패했습니다. 다시 시도해주세요.');
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

      {/* 에러 메시지 출력 */}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </form>
  );
};

export default SignUp;
