/* eslint-disable react/prop-types */

import './Navbar.css';
import { useNavigate } from 'react-router-dom';

export const Navbar = ({ currentPage, onSetCurrentPage }) => {
  const role = JSON.parse(localStorage.getItem('role')).role;
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  let id = currentUser[role == 'student' ? role : 'user'];
  id = id[role == 'student' ? 'studentID' : 'schoolID'];
  let cname = `${
    currentUser[role == 'student' ? role : 'user'].firstName
  } ${currentUser[role == 'student' ? role : 'user'].lastName}`;
  let adminRole = currentUser[role == 'student' ? role : 'user'];

  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
  };
  return (
    <nav>
      <div className="sd">
        <img
          src="temp-icon.png"
          alt="swift-docs-icon"
          width={'1.875rem'}
        />
        <h1 className="app-name">
          Sias Connect <span>v.01</span>
        </h1>
      </div>

      <div className="dash-tab">
        <div className="tab-conatiner">
          <div
            className={`tab ${
              currentPage == 'dashboard' ? 'active' : ''
            }`}
            onClick={() => onSetCurrentPage('dashboard')}
          >
            <img
              width="24"
              height="24"
              src={`https://img.icons8.com/material-outlined/24/${
                currentPage == 'dashboard' ? 'ffffff' : '000000'
              }/control-panel.png`}
              alt="control-panel"
            />
            <div>
              <p>Dashboard</p>
              <img
                width="12"
                height="12"
                src="https://img.icons8.com/metro/26/ffffff/forward.png"
                alt="forward"
              />
            </div>
          </div>
          {role == 'student' && (
            <>
              <div
                className={`tab ${
                  currentPage == 'cog' ? 'active' : ''
                }`}
                onClick={() => onSetCurrentPage('cog')}
              >
                <img
                  width="24"
                  height="24"
                  src={`https://img.icons8.com/material-outlined/24/${
                    currentPage == 'cog' ? 'ffffff' : '000000'
                  }/document--v1.png`}
                  alt="document--v1"
                />
                <div>
                  <p>Request for COG</p>
                  <img
                    width="12"
                    height="12"
                    src="https://img.icons8.com/metro/26/ffffff/forward.png"
                    alt="forward"
                  />
                </div>
              </div>
              <div
                className={`tab ${
                  currentPage == 'cor' ? 'active' : ''
                }`}
                onClick={() => onSetCurrentPage('cor')}
              >
                <img
                  width="24"
                  height="24"
                  src={`https://img.icons8.com/material-outlined/24/${
                    currentPage == 'cor' ? 'ffffff' : '000000'
                  }/document--v1.png`}
                  alt="document--v1"
                />
                <div>
                  <p>Request for COR</p>
                  <img
                    width="12"
                    height="12"
                    src="https://img.icons8.com/metro/26/ffffff/forward.png"
                    alt="forward"
                  />
                </div>
              </div>
              <div
                className={`tab ${
                  currentPage == 'tor' ? 'active' : ''
                }`}
                onClick={() => onSetCurrentPage('tor')}
              >
                <img
                  width="24"
                  height="24"
                  src={`https://img.icons8.com/material-outlined/24/${
                    currentPage == 'tor' ? 'ffffff' : '000000'
                  }/document--v1.png`}
                  alt="document--v1"
                />
                <div>
                  <p>Request for TOR</p>
                  <img
                    width="12"
                    height="12"
                    src="https://img.icons8.com/metro/26/ffffff/forward.png"
                    alt="forward"
                  />
                </div>
              </div>
              <div
                className={`tab ${
                  currentPage == 'coe' ? 'active' : ''
                }`}
                onClick={() => onSetCurrentPage('coe')}
              >
                <img
                  width="24"
                  height="24"
                  src={`https://img.icons8.com/material-outlined/24/${
                    currentPage == 'coe' ? 'ffffff' : '000000'
                  }/document--v1.png`}
                  alt="document--v1"
                />
                <div>
                  <p>Request for COE</p>
                  <img
                    width="12"
                    height="12"
                    src="https://img.icons8.com/metro/26/ffffff/forward.png"
                    alt="forward"
                  />
                </div>
              </div>
            </>
          )}
        </div>

        <div className="profile-tab">
          <img
            src="prmsu-logo.png"
            alt="profile-pic"
            style={{
              borderRadius: '50%',
              objectFit: 'cover',
              width: '2.5rem',
              height: '2.5rem',
            }}
          />
          <div className="profile-right">
            <div className="profile-info">
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <p className="role">
                  {role == 'student'
                    ? 'Student'
                    : `${adminRole.role}`}
                </p>{' '}
                <p
                  style={{
                    fontSize: '12px',
                    color: '#909090',
                    fontWeight: '400',
                    marginLeft: '10px',
                  }}
                >
                  {id}
                </p>
              </div>
              <p className="sub-role">{cname}</p>
            </div>
            <img
              width="25"
              height="25"
              src="https://img.icons8.com/fluency-systems-filled/48/exit.png"
              alt="exit"
              onClick={handleLogout}
              className="logout"
            />
          </div>
        </div>
      </div>
    </nav>
  );
};
