/* eslint-disable react/prop-types */

import { Requestcontainer } from '../requestContainer/Requestcontainer';
import { Taskcounter } from '../taskCounter/Taskcounter';
import { EditRequestContainer } from '../editRequestContainer/EditRequestContainer.jsx';
import './Dashboard.css';

import { useState } from 'react';

export const Dashboard = ({
  isOnMobile,
  requests,
  onEventApproved,
}) => {
  const [editRequest, setEditRequest] = useState(false);
  const [currentRequest, setCurrentRequest] = useState(null);

  const handleOnEditRequest = (request) => {
    setEditRequest((editRequest) => !editRequest);
    setCurrentRequest(request);
  };

  return (
    <div className="dashboard">
      <Taskcounter requests={requests} isOnMobile={isOnMobile} />
      {editRequest ? (
        <EditRequestContainer
          onEditRequest={handleOnEditRequest}
          currentRequest={currentRequest}
          onEventApproved={onEventApproved}
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
