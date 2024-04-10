import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

import axios from '../../api/axios.js';

export const Login = () => {
  const [schoolID, setSchoolID] = useState('');
  const [studentID, setStudentID] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const role = JSON.parse(localStorage.getItem('role')).role;
  const LOGIN_URL = `auth/${role == 'student' ? 'user' : role}/login`;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);

      if (role == 'student') {
        const response = await axios.post(LOGIN_URL, {
          studentID,
          password,
        });

        localStorage.setItem(
          'currentUser',
          JSON.stringify(response?.data)
        );

        console.log(response.data);

        if (response.status === 200) {
          navigate('/dashboard');
        }
      } else {
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
      }
    } catch (err) {
      setErrorMessage(err.response.data.msg);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <div className="bg-image">
        <img
          src="prmsu-logo.png"
          alt="prmsu-logo"
          width={'700px'}
          height={'700px'}
        />
      </div>
      <div className="login-container">
        <div className="login">
          <div className="d">
            <h4>SIAS Connect</h4>
            <p className="header-text">{`Welcome Back!`}</p>
            <p className="description-text">
              Log in to access your account and track your document
              requests. Stay updated with the status of your requests
              and manage your documents conveniently.
            </p>
            <p className="copr">&copy; SIAS Connect 2024</p>
          </div>
          <div className="lo">
            <form
              className="login-form"
              onSubmit={handleSubmit}
              style={{
                width: '300px',
              }}
            >
              <h1>Sign in</h1>
              <label htmlFor="schoolID">
                {role == 'student' ? 'Student ID' : 'School ID'}
              </label>
              <input
                type="text"
                name={`${
                  role == 'student' ? 'studentID' : 'schoolID'
                }`}
                placeholder="randomuser"
                required
                onChange={(e) =>
                  role == 'student'
                    ? setStudentID(e.target.value)
                    : setSchoolID(e.target.value)
                }
                style={
                  errorMessage !== ''
                    ? {
                        border: '.5px solid #b3261e',
                        color: '#b3261e',
                      }
                    : {}
                }
              />
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="schoolID"
                placeholder="password"
                required
                onChange={(e) => setPassword(e.target.value)}
                style={
                  errorMessage !== ''
                    ? {
                        border: '.5px solid #b3261e',
                        color: '#b3261e',
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
              <div className="bot-form">
                <p>
                  {`Don't`} have an account yet? Sign up{' '}
                  <Link to={`/signup/${role}`}>
                    <span className="l-span">here</span>
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
