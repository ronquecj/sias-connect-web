/* eslint-disable react/prop-types */

export const Taskcounter = ({ requests, isOnMobile }) => {
  const totalRequest = requests.length;
  const totalPendingRequests = requests.filter(
    (request) => request.status === 'Pending'
  ).length;
  const totalCompletedTasks = requests.filter(
    (request) => request.status !== 'Pending'
  ).length;

  return (
    <div
      className="task-count-container"
      style={
        isOnMobile
          ? {
              padding: '20px',
              display: 'flex',
              justifyContent: 'space-between',
              borderRadius: '10px',
            }
          : {}
      }
    >
      <div className="counter">
        {isOnMobile || (
          <div className="c-icon">
            <img
              className="counter-icon"
              width="30"
              height="30"
              src="https://img.icons8.com/external-thin-kawalan-studio/48/13b259/external-users-users-thin-kawalan-studio.png"
              alt="external-users-users-thin-kawalan-studio"
            />
          </div>
        )}
        <div className="counter-container">
          <p>Total Request</p>
          <span className="count-number">{totalRequest}</span>
        </div>
      </div>
      <div className={`counter ${isOnMobile ? '' : 'mid-c'}`}>
        {isOnMobile || (
          <div className="c-icon">
            <img
              className="counter-icon"
              width="30"
              height="30"
              src="https://img.icons8.com/external-thin-kawalan-studio/48/13b259/external-user-check-users-thin-kawalan-studio.png"
              alt="external-user-check-users-thin-kawalan-studio"
            />
          </div>
        )}
        <div className="counter-container">
          <p>Completed Request</p>
          <span className="count-number">{totalCompletedTasks}</span>
        </div>
      </div>
      <div className="counter">
        {isOnMobile || (
          <div
            className="c-icon"
            style={{ backgroundColor: '#f9e7a4' }}
          >
            <img
              className="counter-icon"
              width="30"
              height="30"
              src="https://img.icons8.com/ios/50/c7a00e/monitor--v1.png"
              alt="monitor--v1"
            />
          </div>
        )}
        <div className="counter-container">
          <p>Pending Request</p>
          <span className="count-number">{totalPendingRequests}</span>
        </div>
      </div>
    </div>
  );
};
