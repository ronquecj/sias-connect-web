/* eslint-disable react/prop-types */

import { List } from '../list/List';

export const TableList = ({
  currentContent,
  requests,
  onEditRequest,
}) => {
  return (
    <table className="table-list">
      <thead>
        <tr>
          <th className="haha">Name</th>
          <th className="haha">Type</th>
          <th className="haha">Student ID</th>
          <th className="haha">Phone Number</th>
          <th className="haha">Status</th>
        </tr>
      </thead>
      <tbody className="table-list-body">
        {requests
          .slice(
            currentContent == 0 ? 0 : currentContent * 8,
            currentContent * 8 + 8
          )
          .map((request) => (
            <List
              key={request._id}
              request={request}
              onEditRequest={onEditRequest}
            />
          ))}
      </tbody>
    </table>
  );
};
