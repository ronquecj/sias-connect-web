/* eslint-disable react/prop-types */

import { useState } from 'react';
import { Dashboard } from './dashboard/Dashboard';
import './Main.css';

export const Main = ({ isOnMobile }) => {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const fName = currentUser.user.firstName
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

      {currentPage == 'dashboard' && (
        <Dashboard isOnMobile={isOnMobile} />
      )}
      {currentPage == 'coe' && <p>coe </p>}
      {currentPage == 'cor' && <p>cor</p>}
      {currentPage == 'cog' && <p>cog</p>}
    </main>
  );
};
