/* eslint-disable react/prop-types */

import axios from '../../api/axios';
const REQUEST_URL = 'request/new/';

import { useState } from 'react';

export const Request = ({
  type,
  onEventApproved,
  onSetCurrentPage,
}) => {
  const [quantity, setQuantity] = useState(1);
  const role = JSON.parse(localStorage.getItem('role')).role;

  const currentUser = JSON.parse(
    localStorage.getItem('currentUser')
  ).student;
  const fullName = `${currentUser.firstName} ${currentUser.lastName}`;

  const handleRquest = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(REQUEST_URL, {
        type: `${type
          .split(' ')
          .map((s) => s.slice(0, 1).toUpperCase())
          .join('')}`,
        academicYear: '2023-2024',
        quantity: quantity,
        id: `${currentUser._id}`,
      });
      if (response.status === 201) {
        onEventApproved();
        onSetCurrentPage('dashboard');
      }
    } catch (err) {
      console.error(err.response.data.msg);
    }
  };

  return (
    <div className="edit-container">
      <div className="edit-head-container">
        <div className="title-form-container">
          <div className="title">
            <h3>Request</h3>
          </div>
        </div>
        <p className="type-request">
          {type}
          <span>docx</span>
        </p>
      </div>
      <div className="details-container">
        <form className="actions" onSubmit={(e) => handleRquest(e)}>
          <div>
            <p className="file-name">{`${fullName
              .split(' ')
              .join('')}-${type
              .split(' ')
              .map((s) => s.slice(0, 1).toUpperCase())
              .join('')}.docx`}</p>
            <p className="quantity">
              Quantity:{' '}
              <span>
                <select
                  name=""
                  id=""
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                >
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                  <option value={5}>5</option>
                </select>
              </span>
            </p>
          </div>
          <div className="buttons">
            <button className="download" type="submit">
              Request
            </button>
          </div>
        </form>
        <div className="details">
          <p className="details-title">Details</p>
          <ul>
            <li>
              <img
                width="24"
                height="24"
                src="https://img.icons8.com/puffy/32/test-account.png"
                alt="test-account"
              />
              <p
                style={{
                  fontWeight: 'bold',
                  marginRight: '15px',
                  color: 'black',
                }}
              >
                Name
              </p>
              <p>{fullName}</p>
            </li>
            <li>
              <img
                width="24"
                height="24"
                src="https://img.icons8.com/material-outlined/24/new-post.png"
                alt="new-post"
              />
              <p
                style={{
                  fontWeight: 'bold',
                  marginRight: '15px',
                  color: 'black',
                }}
              >
                Student ID
              </p>
              <p>{currentUser.studentID}</p>
            </li>
            <li>
              <img
                width="24"
                height="24"
                src="https://img.icons8.com/forma-light/24/phone.png"
                alt="phone"
              />
              <p
                style={{
                  fontWeight: 'bold',
                  marginRight: '15px',
                  color: 'black',
                }}
              >
                Phone Number
              </p>
              <p>{currentUser.phoneNumber}</p>
            </li>
          </ul>
          {role != 'student' && <button>asdasdw23</button>}
        </div>
      </div>
    </div>
  );
};
