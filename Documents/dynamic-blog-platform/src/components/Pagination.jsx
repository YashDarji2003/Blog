import React from 'react';

const Pagination = () => {
  return (
    <div className="d-flex justify-content-center mt-4">
      <ul className="pagination pagination-sm">
        <li className="page-item">
          <button className="page-link bg-dark text-white border-secondary">Previous</button>
        </li>
        <li className="page-item">
          <button className="page-link bg-dark text-white border-secondary">1</button>
        </li>
        <li className="page-item">
          <button className="page-link bg-dark text-white border-secondary">2</button>
        </li>
        <li className="page-item">
          <button className="page-link bg-dark text-white border-secondary">Next</button>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
