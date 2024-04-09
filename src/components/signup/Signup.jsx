import './Signup.css';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

import axios from '../../api/axios.js';
const REGISTER_URL = 'auth/admin/register';

export const Signup = () => {
  const [studenID, setStudenID] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const response = await axios.post(REGISTER_URL, {
        studenID,
        password,
      });

      if (response.status === 201) navigate('/login');
    } catch (err) {
      console.error(err.response.data.msg);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="login-container">
      <div className="login">
        <div className="lo">
          <img
            src="sign-up-3.png"
            alt=""
            height={'300px'}
            style={{ marginRight: '120px' }}
          />
          <form className="login-form" onSubmit={handleSubmit}>
            <h1>Sign up</h1>
            <label htmlFor="">Student ID</label>
            <input
              type="text"
              name="studenID"
              placeholder="randomuser"
              required
              onChange={(e) => setStudenID(e.target.value)}
            />
            <label htmlFor="">Password</label>
            <input
              type="password"
              name="studenID"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            {isLoading ? (
              <div className="loader">
                <div className="line-wobble"></div>
              </div>
            ) : (
              <button>Create Account</button>
            )}
            <p>
              Already have an account? Login{' '}
              <Link to={'/login'}>
                <span className="l-span">here</span>
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};
