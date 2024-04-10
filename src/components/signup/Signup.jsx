// import './Signup.css';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

import axios from '../../api/axios.js';

export const Signup = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [studentID, setStudentID] = useState('');
  const [schoolID, setSchoolID] = useState('');
  const [age, setAge] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState('');
  const [role, setRole] = useState('Admin');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [year, setYear] = useState(1);

  const crole = JSON.parse(localStorage.getItem('role')).role;
  const REGISTER_URL = `auth/${
    crole == 'student' ? 'user' : crole
  }/register`;

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      if (crole == 'student') {
        const response = await axios.post(REGISTER_URL, {
          firstName,
          lastName,
          studentID,
          age,
          dateOfBirth,
          password,
          gender,
          role,
          phoneNumber,
          year,
        });
        if (response.status === 201) navigate(`/login/${crole}`);
      } else {
        const response = await axios.post(REGISTER_URL, {
          firstName,
          lastName,
          schoolID,
          age,
          dateOfBirth,
          password,
          gender,
          role,
        });
        if (response.status === 201) navigate(`/login/${crole}`);
      }
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
                    onChange={(e) => setFirstName(e.target.value)}
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
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </div>
              <div
                className="input-container"
                style={
                  crole == 'student'
                    ? {}
                    : {
                        display: 'grid',
                        gridTemplateRows: 'auto 1fr',
                      }
                }
              >
                <div className="form-input">
                  <label htmlFor="">
                    {crole == 'student' ? 'Student ' : 'School '}ID
                  </label>
                  <input
                    type="text"
                    name={`${
                      crole == 'student' ? 'student' : 'school'
                    }ID`}
                    placeholder={`Enter your ${
                      crole == 'student' ? 'Student' : 'School'
                    } ID`}
                    required
                    onChange={(e) =>
                      crole == 'student'
                        ? setStudentID(e.target.value)
                        : setSchoolID(e.target.value)
                    }
                  />
                </div>
                {crole == 'student' && (
                  <div className="form-input">
                    <label htmlFor="" className="form-label">
                      Year
                    </label>
                    <select
                      className="select-role"
                      type="text"
                      name="year"
                      placeholder="Enter your year"
                      required
                      onChange={(e) => setYear(e.target.value)}
                      value={year}
                    >
                      <option value={1}>1</option>
                      <option value={2}>2</option>
                      <option value={3}>3</option>
                      <option value={4}>4</option>
                    </select>
                  </div>
                )}
              </div>

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
                    onChange={(e) => setAge(e.target.value)}
                  />
                </div>
                <div className="form-input">
                  <label htmlFor="" className="form-label">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    required
                    onChange={(e) => setDateOfBirth(e.target.value)}
                    className="dob"
                  />
                </div>
              </div>
              <label htmlFor="">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="input-container">
                <div className="form-input">
                  <label htmlFor="" className="form-label">
                    Gender
                  </label>
                  <input
                    type="text"
                    name="gender"
                    placeholder="Enter your gender"
                    required
                    onChange={(e) => setGender(e.target.value)}
                  />
                </div>
                {crole == 'student' ? (
                  <div className="form-input">
                    <label htmlFor="" className="form-label">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      name="phoneNumber"
                      placeholder="Enter phone number"
                      required
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </div>
                ) : (
                  <div className="form-input">
                    <label htmlFor="" className="form-label">
                      Role
                    </label>
                    <select
                      className="select-role"
                      type="text"
                      name="role"
                      placeholder="Enter your School Role"
                      required
                      onChange={(e) => setRole(e.target.value)}
                      value={role}
                    >
                      <option value={'Admin'}>Admin</option>
                      <option value={'Secretary'}>Secretary</option>
                      <option value={'Professor'}>Professor</option>
                    </select>
                  </div>
                )}
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
                  <Link to={`/login/${crole}`}>
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
