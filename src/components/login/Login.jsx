import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

import axios from '../../api/axios.js';
const LOGIN_URL = 'auth/admin/login';

export const Login = () => {
  const [schoolID, setSchoolID] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const response = await axios.post(LOGIN_URL, {
        schoolID,
        password,
      });

      localStorage.setItem(
        'currentUser',
        JSON.stringify(response?.data)
      );

      if (response.status === 200) {
        navigate('/dashboard');
      }
    } catch (err) {
      setErrorMessage(err.response.data.msg);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="login-container">
      <div className="login">
        <div className="lo">
          <img src="cherry-681.png" alt="" />
          <form className="login-form" onSubmit={handleSubmit}>
            <h1>Sign in</h1>
            <label htmlFor="schoolID">School ID</label>
            <input
              type="text"
              name="schoolID"
              placeholder="randomuser"
              required
              onChange={(e) => setSchoolID(e.target.value)}
              style={
                errorMessage !== ''
                  ? { border: '.5px solid #b3261e' }
                  : {}
              }
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="schoolID"
              required
              onChange={(e) => setPassword(e.target.value)}
              style={
                errorMessage !== ''
                  ? {
                      border: '.5px solid #b3261e',
                      marginBottom: '0',
                    }
                  : {}
              }
            />
            {errorMessage && (
              <p style={{ color: '#b3261e' }}>{errorMessage}</p>
            )}
            {isLoading ? (
              <div className="loader">
                <div className="line-wobble"></div>
              </div>
            ) : (
              <button>Login</button>
            )}
            <p>
              {`Don't`} have an account yet? Sign up{' '}
              <Link to={'/signup'}>
                <span className="l-span">here</span>
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};
