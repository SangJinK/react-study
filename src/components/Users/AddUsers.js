import React, { useRef, useState } from 'react';
import Button from '../UI/Button/Button';
import styles from './AddUsers.module.css';
import Card from '../UI/Card';
import ErrorModal from '../UI/Modal/ErrorModal';

const AddUsers = () => {
  const [userValue, setUserValue] = useState({
    userName: '',
    age: '',
  });
  const nameInput = useRef();
  const ageInput = useRef();
  const [error, setError] = useState(null);

  const userNameChangeHandler = (e) => {
    setUserValue((prevUserValue) => {
      return {
        ...prevUserValue,
        userName: e.target.value,
      };
    });
  };

  const ageChangeHandler = (e) => {
    setUserValue((prevUserValue) => {
      return {
        ...prevUserValue,
        age: e.target.value,
      };
    });
  };

  const userSubmitHandler = (e) => {
    e.preventDefault();
    const username = nameInput.current.value;
    const age = ageInput.current.value;

    if (username.userName.trim() === '' || age.trim() === '') {
      setError({
        title: '입력값이 잘못되었습니다.',
        message: '이름과 나이를 모두 입력해주세요.',
      });
      return;
    }

    if (+age < 1) {
      setError({
        title: '입력값이 잘못되었습니다.',
        message: '나이는 1 이상의 숫자를 입력해주세요.',
      });
    }
    nameInput.current.value = '';
    ageInput.current.value = '';
  };

  return (
    <>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={() => setError(null)}
        />
      )}
      <Card className={styles.input}>
        <form onSubmit={userSubmitHandler}>
          <label htmlFor="username">이름</label>
          <input id="username" type="text" ref={nameInput} />
          <label htmlFor="age">나이</label>
          <input id="age" type="number" ref={ageInput} />
          <Button type="submit">가입하기</Button>
        </form>
      </Card>
    </>
  );
};

export default AddUsers;
