/* eslint-disable react/prop-types */

export const List = ({ request, onEditRequest }) => {
  const fullName = `${request.studentData.firstName} ${request.studentData.lastName}`;

  return (
    <tr
      className="list-content"
      onClick={() => onEditRequest(request)}
    >
      <td>{fullName}</td>
      <td>{request.type}</td>
      <td>{request.studentData.studentID}</td>
      <td>{request.studentData.phoneNumber}</td>
      <td>
        <span
          className={
            request.status == 'Pending' ? 'pending' : 'approved'
          }
        >
          {request.status}
        </span>
      </td>
    </tr>
  );
};
