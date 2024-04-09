/* eslint-disable react/prop-types */

import { Requestcontainer } from '../requestContainer/Requestcontainer';
import { Taskcounter } from '../taskCounter/Taskcounter';
import { EditRequestContainer } from '../editRequestContainer/EditRequestContainer.jsx';
import './Dashboard.css';

import axios from '../../../api/axios.js';
import { useEffect, useState } from 'react';
const REQUEST_URL = '/request';

export const Dashboard = ({ isOnMobile }) => {
  const [requests, setRequests] = useState([]);
  const [editRequest, setEditRequest] = useState(false);
  const [currentRequest, setCurrentRequest] = useState(null);
  const [eventApproved, setEventApproved] = useState(false);
  const [count, setCount] = useState(0);

  const handleOnEditRequest = (request) => {
    setEditRequest((editRequest) => !editRequest);
    setCurrentRequest(request);
  };

  const handleOnEventApproved = () => {
    setEventApproved((eventApproved) => !eventApproved);
  };

  useEffect(() => {
    setInterval(() => {
      setCount((count) => (count += 1));
    }, 300000);
    const fetchAllRequest = async () => {
      try {
        const response = await axios.get(REQUEST_URL);
        const data = response.data;

        setRequests(() => [...data]);
      } catch (err) {
        console.error(err);
      }
    };

    fetchAllRequest();
  }, [eventApproved, count]);

  return (
    <div className="dashboard">
      <Taskcounter requests={requests} isOnMobile={isOnMobile} />
      {editRequest ? (
        <EditRequestContainer
          onEditRequest={handleOnEditRequest}
          currentRequest={currentRequest}
          onEventApproved={handleOnEventApproved}
        />
      ) : (
        <Requestcontainer
          requests={requests}
          onEditRequest={handleOnEditRequest}
        />
      )}
    </div>
  );
};
