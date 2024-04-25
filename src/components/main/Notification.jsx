/* eslint-disable react/prop-types */

import './Notification.css';

export const Notification = ({ nData }) => {
  console.log(nData.type);
  const requestType = `${
    nData.type == 'COR'
      ? 'Certificate of Registration'
      : nData.type == 'COG'
      ? 'Certificate of Grades'
      : nData.type == 'COE'
      ? 'Certificate of Enrollment'
      : 'Transcript of Records'
  }`;
  return (
    <li>
      <div className="notif-profile">
        <img
          src="/prmsu-logo.png"
          alt=""
          width={'35px'}
          height={'35px'}
        />
      </div>
      <div className="notif-description">
        <p className="notif-title">{requestType}</p>
        <p className="notif-description">
          Your request has been approved by the Registrar
        </p>
      </div>
    </li>
  );
};
