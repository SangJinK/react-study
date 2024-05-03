import React, { useState } from 'react';
import Button from '../UI/Button/Button';
import styles from './AddUsers.module.css';
import Card from '../UI/Card';
import ErrorModal from '../UI/Modal/ErrorModal';

const AddUsers = () => {
  const [userValue, setUserValue] = useState({
    userName: '',
    age: '',
  });

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

    if (userValue.userName.trim() === '' || userValue.age.trim() === '') {
      setError({
        title: '입력값이 잘못되었습니다.',
        message: '이름과 나이를 모두 입력해주세요.',
      });
      return;
    }

    if (+userValue.age < 1) {
      setError({
        title: '입력값이 잘못되었습니다.',
        message: '나이는 1 이상의 숫자를 입력해주세요.',
      });
      return;
    }

    console.log(userValue);

    setUserValue({
      userName: '',
      age: '',
    });
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
          <input
            id="username"
            type="text"
            onChange={userNameChangeHandler}
            value={userValue.userName}
          />
          <label htmlFor="age">나이</label>
          <input
            id="age"
            type="number"
            onChange={ageChangeHandler}
            value={userValue.age}
          />
          <Button type="submit">가입하기</Button>
        </form>
      </Card>
    </>
  );
};

export default AddUsers;
