/* eslint-disable react/prop-types */

import { useState } from 'react';
import './Modal.css';

export const Modal = ({ drake, onDelete, onClose }) => {
  const [buttonDeleteConfig, setButtonDeleteConfig] = useState({
    buttonText: 'I want to delete this request',
    isDefault: true,
  });
  const [confirm, setConfirm] = useState('');

  const handlePreDelete = () => {
    setButtonDeleteConfig((buttonDeleteConfig) => ({
      ...buttonDeleteConfig,
      buttonText:
        buttonDeleteConfig.buttonText == 'Delete this request'
          ? 'I want to delete this request'
          : 'Delete this request',
      isDefault: !buttonDeleteConfig.isDefault,
    }));
  };
  return (
    <div className="modal-container">
      <div className="modal">
        <div className="header">
          <p>
            Delete {`${drake?.studentData.lastName}/${drake?.type}`}
          </p>
          <button onClick={onClose}>
            {' '}
            <img
              width="15"
              height="15"
              src="https://img.icons8.com/forma-bold-filled/24/delete-sign.png"
              alt="delete-sign"
              className="delete-close"
            />
          </button>
        </div>
        <div className="body">
          <img
            width="24"
            height="24"
            src="https://img.icons8.com/material-outlined/24/unlocked-file.png"
            alt="unlocked-file"
          />
          <p className="request-name">{`${drake?.studentData.lastName}/${drake?.type}`}</p>
          <div className="status">
            <img
              width="18"
              height="18"
              src="https://img.icons8.com/material-outlined/24/info--v1.png"
              alt="info--v1"
            />
            <span>Pending</span>
          </div>
        </div>
        <div className="footer">
          <form
            className="footer-content"
            onSubmit={(event) => {
              event.preventDefault();
              confirm ==
              `${drake?.studentData.lastName}/${drake?.type}`
                ? onDelete()
                : null;
            }}
          >
            {buttonDeleteConfig.isDefault ? (
              <></>
            ) : (
              <div className="input-form">
                <span
                  style={{ fontSize: '14px' }}
                >{`To confirm, type "${`${drake?.studentData.lastName}/${drake?.type}`}" in the box below`}</span>
                <input
                  type="text"
                  className="inp"
                  style={{ backgroundColor: 'white', color: 'black' }}
                  onChange={(e) => setConfirm(e.target.value)}
                />
              </div>
            )}
            <button
              type="submit"
              onClick={handlePreDelete}
              disabled={
                buttonDeleteConfig.isDefault ||
                confirm ==
                  `${drake?.studentData.lastName}/${drake?.type}`
                  ? false
                  : true
              }
              style={
                buttonDeleteConfig.isDefault ||
                confirm ==
                  `${drake?.studentData.lastName}/${drake?.type}`
                  ? {}
                  : { cursor: 'no-drop', opacity: '60%' }
              }
            >
              {buttonDeleteConfig.buttonText}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
