import React, { useState } from 'react';
import Button from '../UI/Button/Button';
import './CourseInput.css';

const CourseInput = ({ onAdd }) => {
  const [enteredText, setEnteredText] = useState('');

  const textChangeHandler = (e) => {
    setEnteredText(e.target.value);
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();

    onAdd(enteredText);
    setEnteredText('');
  };

  return (
    <form onSubmit={formSubmitHandler}>
      <div className="form-control">
        <label>나의 목표</label>
        <input type="text" onChange={textChangeHandler} value={enteredText} />
      </div>
      <Button type="submit">목표 추가하기</Button>
    </form>
  );
};

export default CourseInput;
