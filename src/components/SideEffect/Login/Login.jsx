import React, { useState, useEffect, useReducer, useContext } from 'react';
import styles from './Login.module.css';
import Card from '../../UI/Card';
import Button from '../../UI/Button/Button';
import AuthContext from '../../store/auth-context';
import Input from '../../UI/Input/Input';
/*
  이 컴포넌트에서 사용하는 모든 상태와 상태 변경을 중앙 제어하는 함수.
  컴포넌트 내부 데이터를 사용하지 않고 상태에만 집중하기 때문에
  컴포넌트 바깥쪽에 선언하는 것이 일반적입니다.
  param1 - state: 변경 전의 상태값
  param2 - action: dispatch함수(상태 변경 등의 행동)가 전달한 상태 변경 객체
  return: 관리할 상태값들을 반환
*/

const emailReducer = (state, action) => {
  // 상태 변경을 위한 객체
  if (action.type === 'USER_INPUT') {
    return {
      value: action.value,
      isValid: action.value.includes('@'),
    };
  } else if (action.type === 'INPUT_VALIDATE') {
    return {
      value: state.value,
      isValid: state.value.includes('@'),
    };
  }
};

const passwordReducer = (state, action) => {
  // 상태 변경을 위한 객체
  if (action.type === 'USER_INPUT') {
    return {
      value: action.value,
      isValid: action.value.trim().length > 6,
    };
  } else if (action.type === 'INPUT_VALIDATE') {
    return {
      value: state.value,
      isValid: state.value.trim().length > 6,
    };
  }
};

const Login = () => {
  const { onLogin } = useContext(AuthContext);
  /*
    param1 - reducer function: 위에서 만든 리듀서 함수
    param2 - initial state: 초기 상태값
    return1 - 이메일 관련 상태변수
    return2 - dispatch함수: 상태를 변경할 수 있는 함수
  */
  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: '',
    isValid: null,
  });

  const [pwState, dispatchPw] = useReducer(passwordReducer, {
    value: '',
    isValid: null,
  });

  // 이메일, 패스워드가 둘 다 동시에 정상적인 상태인지 확인
  const [formIsValid, setFormIsValid] = useState(false);

  const { isValid: emailIsValid } = emailState;
  const { isValid: pwIsValid } = pwState;

  useEffect(() => {
    const timer = setTimeout(() => {
      console.log('gd');
      setFormIsValid(emailIsValid && pwIsValid);
    }, 1000);

    return () => {
      console.log('clean up!');
      clearTimeout(timer);
    };
  }, [emailIsValid, pwIsValid]);

  const emailChangeHandler = (e) => {
    dispatchEmail({
      type: 'USER_INPUT',
      value: e.target.value,
    });
  };

  const passwordChangeHandler = (e) => {
    dispatchPw({
      type: 'USER_INPUT',
      value: e.target.value,
    });
  };

  const validateEmailHandler = () => {
    dispatchEmail({
      type: 'INPUT_VALIDATE',
    });
  };

  const validatePasswordHandler = () => {
    dispatchPw({
      type: 'INPUT_VALIDATE',
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    onLogin(emailState.value, pwState.value);
  };

  return (
    <Card className={styles.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${styles.control} ${!emailIsValid ? styles.invalid : ''}`}
        >
          <label htmlFor="email">E-Mail</label>
          <Input
            type="email"
            id="email"
            label="E-mail"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${styles.control} ${!pwIsValid ? styles.invalid : ''}`}
        >
          <label htmlFor="password">Password</label>
          <Input
            type="password"
            id="password"
            label="Password"
            value={pwState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={styles.actions}>
          <Button type="submit" className={styles.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
