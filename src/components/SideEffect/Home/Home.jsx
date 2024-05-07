import React, { useContext } from 'react';
import Card from '../../UI/Card';
import styles from './Home.module.css';
import AuthContext from '../../store/auth-context';
import Button from '../../UI/Button/Button';
const Home = () => {
  const { onLogout } = useContext(AuthContext);
  return (
    <Card className={styles.home}>
      <h1>Welcome Back!</h1>
      <Button onClick={onLogout}>로그아웃</Button>
    </Card>
  );
};

export default Home;
