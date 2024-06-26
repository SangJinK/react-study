import React from 'react';
import styles from './ErrorModal.module.css';
import Button from '../Button/Button';
import Card from '../Card';
import ReactDOM from 'react-dom';
import Portal from '../Portal/Portal';

const BackDrop = ({ onConfirm }) => {
  return <div className={styles.backdrop} onClick={onConfirm} />;
};
const ModalOverlay = ({ title, message, onConfirm }) => {
  return (
    <Card className={styles.modal}>
      <header className={styles.header}>
        <h2>{title}</h2>
      </header>
      <div className={styles.content}>
        <p>{message}</p>
      </div>
      <footer className={styles.actions}>
        <Button onClick={onConfirm}>Okay</Button>
      </footer>
    </Card>
  );
};

const ErrorModal = ({ title, message, onConfirm }) => {
  return (
    <>
      <Portal destId="backdrop-root">
        <BackDrop onConfirm={onConfirm} />
      </Portal>
      <Portal destId="overlay-root">
        <ModalOverlay title={title} message={message} onConfirm={onConfirm} />
      </Portal>
    </>
  );
};

export default ErrorModal;
