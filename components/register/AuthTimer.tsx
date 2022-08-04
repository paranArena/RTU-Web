import { useEffect, useState } from 'react';
import styled from 'styled-components';

const AuthContainer = styled.span`
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 22px;

  color: #eb1808;
  position: absolute;
  right: 28%;
`;

function AuthTimer() {
  const [min, setMin] = useState<number>(5);
  const [sec, setSec] = useState<number>(0);

  useEffect(() => {
    // clearInterval(timer);
    const timer = setInterval(() => {
      if (Number(sec) > 0) {
        setSec(Number(sec) - 1);
      }
      if (Number(sec) === 0) {
        if (Number(min) === 0) {
          clearInterval(timer);
        } else {
          setMin(Number(min) - 1);
          setSec(59);
        }
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [min, sec]);

  return (
    <AuthContainer>
      {min}
      :
      {sec < 10 ? `0${sec}` : sec}
    </AuthContainer>
  );
}

export default AuthTimer;
