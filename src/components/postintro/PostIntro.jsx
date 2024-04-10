/* eslint-disable react/prop-types */

import './PostIntro.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const useTypewriter = (text, speed = 50) => {
  const [displayText, setDisplayText] = useState('');
  const [isTypingFinished, setIsTypingFinished] = useState(false);

  useEffect(() => {
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < text.length) {
        setDisplayText((prevText) => prevText + text.charAt(i));
        i++;
      } else {
        clearInterval(typingInterval);
        setIsTypingFinished(true);
      }
    }, speed);

    return () => {
      clearInterval(typingInterval);
    };
  }, [text, speed]);

  return { displayText, isTypingFinished };
};

const Typewriter = ({ text, speed, onFinish }) => {
  const { displayText, isTypingFinished } = useTypewriter(
    text,
    speed
  );

  useEffect(() => {
    if (isTypingFinished && onFinish) {
      onFinish();
    }
  }, [isTypingFinished, onFinish]);

  return (
    <p className="header-text" style={{ marginBottom: '10px' }}>
      {displayText}
    </p>
  );
};

const Description = ({ text, speed, onFinish }) => {
  const { displayText, isTypingFinished } = useTypewriter(
    text,
    speed
  );

  useEffect(() => {
    if (isTypingFinished && onFinish) {
      onFinish();
    }
  }, [isTypingFinished, onFinish]);

  return <p className="description-text">{displayText}</p>;
};

export const PostIntro = () => {
  const [isTypewriterFinished, setIsTypewriterFinished] =
    useState(false);
  const [showButtons, setShowButtons] = useState(false);
  const navigate = useNavigate();

  const handleTypewriterFinish = () => {
    setIsTypewriterFinished(true);
  };

  const handleOnStudent = () => {
    localStorage.setItem('role', JSON.stringify({ role: 'student' }));
    navigate('/login/student');
  };

  const handleOnAdmin = () => {
    localStorage.setItem('role', JSON.stringify({ role: 'admin' }));
    navigate('/login/admin');
  };

  useEffect(() => {
    if (isTypewriterFinished) {
      setShowButtons(true);
    }
  }, [isTypewriterFinished]);

  return (
    <div className="post-intro-container">
      <div className="post-intro-content">
        <Typewriter
          text="Beefore we start"
          speed={50}
          onFinish={handleTypewriterFinish}
        />
        {isTypewriterFinished && (
          <Description text="Iddentify yourself as:" speed={20} />
        )}

        <div
          className={`button-container ${showButtons ? 'show' : ''}`}
        >
          <button
            className="btn-int"
            onClick={() => handleOnStudent()}
          >
            Student
          </button>
          <button className="btn-int" onClick={() => handleOnAdmin()}>
            Admin
          </button>
        </div>
      </div>
    </div>
  );
};
