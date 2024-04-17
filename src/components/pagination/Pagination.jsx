/* eslint-disable react/prop-types */

import ReactPaginate from 'react-paginate';
import { useState } from 'react';

export const Pagination = ({ items, onCurrentContent }) => {
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 8;

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = items.slice(itemOffset, endOffset);
  console.log(currentItems.length);
  const pageCount = Math.ceil(items.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    setItemOffset(newOffset);
    onCurrentContent(event.selected);
  };
  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel={
        <img
          width="12"
          height="12"
          src="https://img.icons8.com/metro/26/000000/forward.png"
          alt="forward"
        />
      }
      onPageChange={handlePageClick}
      pageRangeDisplayed={3}
      pageCount={pageCount}
      previousLabel={
        <img
          width="12"
          height="12"
          src="https://img.icons8.com/metro/26/000000/back.png"
          alt="forward"
        />
      }
      renderOnZeroPageCount={null}
      className="current-page"
      activeClassName="active-page"
      pageClassName="pages"
      previousClassName="prev"
      nextClassName="next"
    />
  );
};
