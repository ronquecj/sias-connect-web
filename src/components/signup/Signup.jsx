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
            <p className="header-text">{`You're one step away from easier document requesting.`}</p>
            <p className="description-text">
              Join SIAS Connect now to start requesting documents
              hassle-free. We ensure to provide you a smooth
              experience with our user-friendly interface and
              efficient document management system.
            </p>
            <p className="copr">&copy; SIAS Connect 2024</p>
          </div>
          <div className="lo">
            <form className="login-form" onSubmit={handleSubmit}>
              <h1>Sign up</h1>
              <div className="input-container">
                <div className="form-input">
                  <label htmlFor="" className="form-label">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    placeholder="Enter your first name"
                    required
                    onChange={(e) => setStudenID(e.target.value)}
                  />
                </div>
                <div className="form-input">
                  <label htmlFor="" className="form-label">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Enter your last name"
                    required
                    onChange={(e) => setStudenID(e.target.value)}
                  />
                </div>
              </div>
              <label htmlFor="">School ID</label>
              <input
                type="text"
                name="studenID"
                placeholder="Enter your School ID"
                required
                onChange={(e) => setStudenID(e.target.value)}
              />
              <div className="input-container">
                <div className="form-input">
                  <label htmlFor="" className="form-label">
                    Age
                  </label>
                  <input
                    type="text"
                    name="age"
                    placeholder="Enter your age"
                    required
                    onChange={(e) => setStudenID(e.target.value)}
                  />
                </div>
                <div className="form-input">
                  <label htmlFor="" className="form-label">
                    Date of Birth
                  </label>
                  <input
                    type="text"
                    name="dateOfBirth"
                    placeholder="Enter your date of birth"
                    required
                    onChange={(e) => setStudenID(e.target.value)}
                  />
                </div>
              </div>
              <label htmlFor="">Password</label>
              <input
                type="password"
                name="studenID"
                placeholder="Enter your password"
                required
                onChange={(e) => setPassword(e.target.value)}
              />{' '}
              <div className="input-container">
                <div className="form-input">
                  <label htmlFor="" className="form-label">
                    Gender
                  </label>
                  <input
                    type="text"
                    name="age"
                    placeholder="Enter your gender"
                    required
                    onChange={(e) => setStudenID(e.target.value)}
                  />
                </div>
                <div className="form-input">
                  <label htmlFor="" className="form-label">
                    Role
                  </label>
                  <input
                    type="text"
                    name="dateOfBirth"
                    placeholder="Enter your School Role"
                    required
                    onChange={(e) => setStudenID(e.target.value)}
                  />
                </div>
              </div>
              {isLoading ? (
                <div className="loader">
                  <div className="line-wobble"></div>
                </div>
              ) : (
                <button>Create Account</button>
              )}
              <div className="bot-form">
                <p>
                  Already have an account? Login{' '}
                  <Link to={'/login'}>
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
