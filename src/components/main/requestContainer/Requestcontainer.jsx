/* eslint-disable react/prop-types */

import { useEffect, useState } from 'react';
import { TableList } from '../../tableList/Tablelist';
import { Pagination } from '../../pagination/Pagination';

export const Requestcontainer = ({ requests, onEditRequest }) => {
  const [selected, setSelected] = useState('oldest');
  const [selectedRequests, setSelectedRequests] = useState(null);
  const [search, setSearch] = useState('');
  const [currentContent, setCurrentContent] = useState(0);

  useEffect(() => {
    let fullNameCopy = requests.slice().map((req) => {
      return {
        ...req,
        fullName: `${req.studentData.firstName
          .split('')
          .map((c) => c.toLowerCase())
          .join('')} ${req.studentData.lastName
          .split('')
          .map((c) => c.toLowerCase())
          .join('')}`,
      };
    });

    const searchName = (names) => {
      if (search === '') setSelectedRequests(null);
      if (search != '')
        setSelectedRequests(
          names.filter((name) => name.fullName == search)
        );
    };
    searchName(fullNameCopy);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  let convertedCreatedAt = requests.slice().map((req) => {
    return {
      ...req,
      conCreatedAt: dateToSeconds(req?.createdAt?.split('T')),
    };
  });

  const newestRequest = convertedCreatedAt
    .slice()
    .sort((a, b) => b.conCreatedAt - a.conCreatedAt);

  const oldestRequest = convertedCreatedAt
    .slice()
    .sort((a, b) => a.conCreatedAt - b.conCreatedAt);

  const pendingRequest = convertedCreatedAt
    .slice()
    .sort((a, b) => b.conCreatedAt - a.conCreatedAt)
    .filter((req) => req.status == 'Pending');

  const approvedRequest = convertedCreatedAt
    .slice()
    .sort((a, b) => b.conCreatedAt - a.conCreatedAt)
    .filter((req) => req.status == 'Approved');

  const handleSelect = (e) => {
    setSelected(e?.target?.value);

    switch (e?.target?.value) {
      case 'newest':
        setSelectedRequests(newestRequest);
        break;
      case 'oldest':
        setSelectedRequests(oldestRequest);
        break;
      case 'pending':
        setSelectedRequests(pendingRequest);
        break;
      case 'approved':
        setSelectedRequests(approvedRequest);
        break;
    }
  };

  const handleOnCurrentContent = (index) => {
    setCurrentContent(() => index);
  };

  function dateToSeconds(date) {
    if (date)
      return [
        date[0]
          .split('-')
          .map((date, i) =>
            i == 0
              ? Number(date) * 31536000
              : i == 1
              ? Number(
                  date
                    .split('')
                    .filter((n, ind) =>
                      ind == 0 ? (n == '0' ? '' : n) : n
                    )
                ) * 2629746
              : Number(date) * 8640 - 0
          )
          .reduce((acc, i) => acc + i),

        date[1]
          .split(':')
          .map((t) =>
            t
              .split('')
              .filter((l) => l !== 'Z')
              .join('')
              .split('.')
          )
          .filter((_, i) => i != 2)
          .map((time, i) => (i == 0 ? time * 3600 : time * 60))
          .reduce((acc, i) => acc + i),
      ].reduce((acc, i) => acc + i);
  }

  return (
    <div className="request-container">
      <div className="title-form-container">
        <div className="title">
          <h3>All Request</h3>
          {selected == 'newest' && (
            <p style={{ color: '#cbcbcb' }}>Newest Request</p>
          )}
          {selected == 'oldest' && (
            <p style={{ color: '#cbcbcb' }}>Oldest Request</p>
          )}
          {selected == 'pending' && (
            <p style={{ color: '#f0bf0f' }}>Pending Request</p>
          )}
          {selected == 'approved' && (
            <p style={{ color: '#008767' }}>Approved Request</p>
          )}
        </div>
        <form action="" className="form-container">
          <div className="search">
            <img
              width="30"
              height="30"
              src="https://img.icons8.com/ios-glyphs/30/7e7e7e/search--v1.png"
              alt="search--v1"
            />
            <input
              type="text"
              placeholder="Search"
              onChange={(e) => setSearch(e.target.value)}
              value={search}
            />
          </div>
          <div className="sort">
            <span>Sort by: </span>
            <select
              value={selected}
              name=""
              id=""
              onChange={(e) => handleSelect(e)}
            >
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
            </select>
          </div>
        </form>
      </div>
      <div className="bot-dash">
        <TableList
          requests={
            selectedRequests == null ? requests : selectedRequests
          }
          onEditRequest={onEditRequest}
          currentContent={currentContent}
        />
        <div className="pagination">
          <div className="pagination-status">
            <p>
              Showing data {requests.length == 0 ? '0' : '1'} to{' '}
              {requests.length <= 8 ? requests.length : '8'} of{' '}
              {requests.length} entries
            </p>
          </div>
          <Pagination
            items={requests}
            onCurrentContent={handleOnCurrentContent}
          />
          {/* <button onClick={handlePrevious}>
              <img
                width="12"
                height="12"
                src="https://img.icons8.com/metro/26/000000/back.png"
                alt="forward"
              />
            </button>

            <button onClick={handleNext}>
              <img
                width="12"
                height="12"
                src="https://img.icons8.com/metro/26/000000/forward.png"
                alt="forward"
              />
            </button> */}
        </div>
      </div>
    </div>
  );
};
