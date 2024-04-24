/* eslint-disable react/prop-types */

import { useEffect, useState } from 'react';
import './NotificationContainer.css';
import { Notification } from './Notification';

export const NotificationContainer = ({
  dis,
  notifData,
  onShowNotif,
}) => {
  const [s, setS] = useState('');
  useEffect(() => {
    setS('show');
  }, [dis]);

  return (
    <div className={`notification-container ${s}`}>
      <div className={`notif-header`}>
        <p>Notifications</p>
        <img
          width="24"
          height="24"
          src="https://img.icons8.com/forma-bold-filled/24/delete-sign.png"
          alt="delete-sign"
          className="notif-close"
          onClick={onShowNotif}
        />
      </div>
      <span
        style={{
          fontSize: '12px',
          lineHeight: '-5',
          margin: '10px 0',
        }}
      >
        {
          "Note: You can immediately proceed to the cashier's office after having your request approved to pay."
        }
      </span>
      <div className="notif-body">
        <ul>
          {notifData.map((nData) => (
            <Notification nData={nData} key={nData._id} />
          ))}
        </ul>
      </div>
    </div>
  );
};
