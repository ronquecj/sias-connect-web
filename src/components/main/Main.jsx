/* eslint-disable react/prop-types */

import { useState } from 'react';
import { Dashboard } from './dashboard/Dashboard';
import './Main.css';

export const Main = ({ isOnMobile }) => {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const role = JSON.parse(localStorage.getItem('role')).role;
  const fName = currentUser[
    `${role == 'student' ? role : 'user'}`
  ].firstName
    .split('')
    .map((c, i) => (i == 0 ? c.toUpperCase() : c))
    .join('');

  const lamar = () => {
    setCurrentPage('cor');
  };
  return (
    <main
      style={isOnMobile ? { padding: '20px', width: '100%' } : {}}
    >
      <h1 className="greetings" onClick={lamar}>
        Hello {fName}!
      </h1>

      {role == 'student' ? (
        <p>student</p>
      ) : (
        <>
          {currentPage == 'dashboard' && (
            <Dashboard isOnMobile={isOnMobile} />
          )}
          {currentPage == 'coe' && <p>coe </p>}
          {currentPage == 'cor' && <p>cor</p>}
          {currentPage == 'cog' && <p>cog</p>}
        </>
      )}
    </main>
  );
};
