/* eslint-disable react/prop-types */

import { useEffect, useState } from 'react';
import { Request } from '../request/Request';
import { Dashboard } from './dashboard/Dashboard';
import './Main.css';
const REQUEST_URL = '/request';
import axios from '../../api/axios';
import { NotificationContainer } from './NotificationContainer';

export const Main = ({
  isOnMobile,
  currentPage,
  onSetCurrentPage,
}) => {
  const [requests, setRequests] = useState([]);
  const [count, setCount] = useState(0);
  const [eventApproved, setEventApproved] = useState(false);
  const role = JSON.parse(localStorage.getItem('role')).role;
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const currentUserID =
    currentUser && currentUser.student ? currentUser.student._id : '';
  const [showNotif, setShowNotif] = useState(false);
  const notifData = requests.filter(
    (request) => request.status !== 'Pending'
  );

  const fName = currentUser[
    `${role == 'student' ? role : 'user'}`
  ].firstName
    .split('')
    .map((c, i) => (i == 0 ? c.toUpperCase() : c))
    .join('');

  const handleOnEventApproved = () => {
    setEventApproved((eventApproved) => !eventApproved);
  };

  const handleShowNotif = () => {
    setShowNotif(true);
  };

  useEffect(() => {
    setInterval(() => {
      setCount((count) => (count += 1));
    }, 300000);
    const fetchAllRequest = async () => {
      try {
        const response = await axios.get(
          `${REQUEST_URL}${
            role == 'student' ? `/${currentUserID}` : ''
          }`
        );

        if (role == 'student') {
          const data = response.data.requests;
          setRequests(() => [...data]);
        } else {
          const data = response.data;
          setRequests(() => [...data]);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchAllRequest(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventApproved, count]);

  return (
    <>
      {showNotif && (
        <NotificationContainer
          dis={showNotif}
          notifData={notifData}
        />
      )}
      <main
        style={isOnMobile ? { padding: '20px', width: '100%' } : {}}
      >
        <div
          className="header-main"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '30px',
          }}
        >
          <h1 className="greetings" style={{ marginBottom: '0' }}>
            Hello {fName}!
          </h1>
          <div
            className="notif-icon"
            style={{
              backgroundColor: '#DFE6E1',
              padding: '7px 10px',
              borderRadius: '100px',
            }}
            onClick={handleShowNotif}
          >
            <img
              width="24"
              height="24"
              src="https://img.icons8.com/material-rounded/24/appointment-reminders.png"
              alt="appointment-reminders"
            />
          </div>
        </div>

        {role == 'student' ? (
          <>
            {currentPage == 'dashboard' && (
              <Dashboard
                isOnMobile={isOnMobile}
                requests={requests}
                onEventApproved={handleOnEventApproved}
              />
            )}
            {currentPage == 'tor' && (
              <Request
                type={'Transcript of Records'}
                onEventApproved={handleOnEventApproved}
                onSetCurrentPage={onSetCurrentPage}
              />
            )}
            {currentPage == 'cor' && (
              <Request
                type={'Certificate of Registration'}
                onEventApproved={handleOnEventApproved}
                onSetCurrentPage={onSetCurrentPage}
              />
            )}
            {currentPage == 'cog' && (
              <Request
                type={'Certificate of Grades'}
                onEventApproved={handleOnEventApproved}
                onSetCurrentPage={onSetCurrentPage}
              />
            )}
          </>
        ) : (
          <>
            {currentPage == 'dashboard' && (
              <Dashboard
                isOnMobile={isOnMobile}
                requests={requests}
                onEventApproved={handleOnEventApproved}
              />
            )}
          </>
        )}
      </main>{' '}
    </>
  );
};
