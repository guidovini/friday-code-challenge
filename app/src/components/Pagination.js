import React from 'react';

const Pagination = ({ vehiclesPerPage, totalVehicles, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalVehicles / vehiclesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.map(number => (
          <li key={number} className="page-item">
            <a
              onClick={e => paginate(e, number)}
              href="!#"
              className="page-link"
            >
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
