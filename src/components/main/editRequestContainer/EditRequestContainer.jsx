/* eslint-disable react/prop-types */

import './EditRequestContainer.css';
import { Modal } from './modal/Modal.jsx';

import axios from '../../../api/axios.js';
const APPROVE_URL = 'request/approve/';
const DELETE_URL = 'request/delete/';
import { useNavigate } from 'react-router-dom';

import {
  patchDocument,
  PatchType,
  TextRun,
  UnderlineType,
} from 'docx';
import { useState } from 'react';
import { COR } from '../../../utils/docsPatcher.js';
export const EditRequestContainer = ({
  currentRequest,
  onEditRequest,
  onEventApproved,
}) => {
  const role = JSON.parse(localStorage.getItem('role')).role;
  const [btnClicked, setBtnClicked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const requestType =
    currentRequest.type == 'COR'
      ? 'COR'
      : currentRequest.type == 'COG'
      ? 'COG'
      : currentRequest.type == 'TOR'
      ? 'TOR'
      : 'COE';
  const navigate = useNavigate();

  console.log(currentRequest);

  const timestamp = Number(currentRequest.dateOfRequest);
  const date = new Date(timestamp);
  const formattedDate = `${
    date.getMonth() + 1
  }/${date.getDate()}/${date.getFullYear()}`;

  const handleOnApproved = async () => {
    const id = currentRequest._id;
    try {
      const response = await axios.post(`${APPROVE_URL}${id}`);

      if (response.status === 200) {
        onEventApproved();
        setBtnClicked((btnClicked) => !btnClicked);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async () => {
    const id = currentRequest._id;
    try {
      const response = await axios.delete(`${DELETE_URL}${id}`);

      if (response.status === 200) {
        onEventApproved();
        onEditRequest();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen((isModalOpen) => !isModalOpen);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const downloadFile = async () => {
    const date = new Date().toDateString();
    const day = date.split(' ')[2];
    const monthYear = [date.split(' ')[1], date.split(' ')[3]].join(
      ' '
    );

    try {
      const response = await fetch(`${requestType}.docx`);
      if (!response.ok) {
        throw new Error('Failed to load file');
      }

      const fileBuffer = await response.arrayBuffer();

      let docOb;

      switch (requestType) {
        case 'COR':
          docOb = COR(TextRun, PatchType);
          break;
      }

      const doc = await patchDocument(fileBuffer, docOb);
      if (doc) console.log('nice');

      const blob = new Blob([doc], {
        type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      });

      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');

      a.href = url;
      a.download = `${currentRequest.studentData.firstName}${
        currentRequest.studentData.lastName
      }-${currentRequest.type.split(' ').join('')}.docx`;
      a.click();

      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleOnClick = () => {
    downloadFile();
  };

  const handleOnPrint = async () => {
    const date = new Date().toDateString();
    const day = date.split(' ')[2];
    const monthYear = [date.split(' ')[1], date.split(' ')[3]].join(
      ' '
    );
    const age = currentRequest.studentData.age;

    try {
      const response = await fetch(`${requestType}.docx`);
      if (!response.ok) {
        throw new Error('Failed to load file');
      }
      console.log(requestType);

      const fileBuffer = await response.arrayBuffer();

      let docOb;

      const data = {
        name: `${currentRequest.studentData.firstName} ${currentRequest.studentData.lastName}`,
        studentID: currentRequest.studentData.studentID,
        address: currentRequest.studentData.address,
        courseYear: `${currentRequest.studentData.course} ${currentRequest.studentData.year}`,
        semester: currentRequest.currentSemester,
      };

      switch (requestType) {
        case 'COR':
          docOb = COR(TextRun, PatchType, data);
          break;
      }

      const doc = await patchDocument(fileBuffer, docOb);
      if (doc) console.log('nice');

      const blob = new Blob([doc], {
        type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      });

      const blobURL = URL.createObjectURL(blob);
      navigate(`/print?blobURL=${encodeURIComponent(blobURL)}`);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      {isModalOpen && (
        <Modal
          drake={currentRequest}
          onDelete={handleDelete}
          onClose={handleCloseModal}
        />
      )}
      <div className="edit-container">
        <div className="edit-head-container">
          <div className="title-form-container">
            <div className="title">
              <h3>Edit Request</h3>
              {currentRequest.status == 'Pending' && (
                <p>Pending Request</p>
              )}
              {currentRequest.status == 'Approved' && (
                <p style={{ color: '#008767' }}>Approved Request</p>
              )}
            </div>

            <img
              width="24"
              height="24"
              src="https://img.icons8.com/material-rounded/24/delete-sign.png"
              alt="delete-sign"
              style={{ marginTop: '10px' }}
              className="close-edit"
              onClick={onEditRequest}
            />
          </div>
          <p className="type-request">
            {currentRequest.type} <span>docx</span>
          </p>
        </div>
        <div className="details-container">
          <div className="actions">
            <div>
              <p className="file-name">
                {`${currentRequest.studentData.firstName
                  .split(' ')
                  .join('')}${
                  currentRequest.studentData.lastName
                }-${currentRequest.type.split(' ').join(' ')}.docx`}
              </p>
              <p className="quantity">
                Quantity: <span>{currentRequest.quantity}</span>
              </p>
            </div>
            <div className="buttons">
              {role == 'student' ? (
                <button
                  className="download"
                  onClick={handleOpenModal}
                >
                  Cancel
                </button>
              ) : (
                <>
                  {currentRequest.status == 'Approved' ||
                  btnClicked ? (
                    <>
                      <button
                        className="download"
                        onClick={handleOnClick}
                      >
                        Download
                      </button>
                      <button
                        className="print"
                        onClick={handleOnPrint}
                      >
                        Print
                      </button>
                    </>
                  ) : (
                    <>
                      <button disabled>Download</button>
                      {/* <button disabled>Print</button> */}
                    </>
                  )}
                </>
              )}
            </div>
          </div>
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
                <p>{`${currentRequest.studentData.firstName} ${currentRequest.studentData.lastName}`}</p>
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
                <p>{currentRequest.studentData.studentID}</p>
              </li>
              <li>
                <img
                  width="24"
                  height="24"
                  src="https://img.icons8.com/material-outlined/24/calendar--v1.png"
                  alt="calendar--v1"
                />
                <p
                  style={{
                    fontWeight: 'bold',
                    marginRight: '15px',
                    color: 'black',
                  }}
                >
                  Date of Request
                </p>
                <p>{formattedDate}</p>
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
                <p>{currentRequest.studentData.phoneNumber}</p>
              </li>
            </ul>
            {role != 'student' && (
              <>
                {currentRequest.status == 'Approved' || btnClicked ? (
                  <button className="dis" disabled>
                    Approved
                  </button>
                ) : (
                  <button
                    className="app-btn"
                    onClick={handleOnApproved}
                  >
                    Approve
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
