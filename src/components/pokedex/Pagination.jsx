import React from "react";
import "./styles/Pagination.css";

const Pagination = ({
  handlePreviousPage,
  setCurrentPage,
  handleNextPage,
  pagesInBlock,
  currentPage,
  lastPage,
}) => {
  return (
    <section className="pagination">
      <ul className="pagination__list">
        <li onClick={() => setCurrentPage(1)} title="Primera página">
          <i className="pagination__first-page bx bx-first-page"></i>
        </li>
        <li
          className="pagination__prev pagination__active"
          onClick={handlePreviousPage}
          title="Anterior"
        >
          <i className="bx bx-chevrons-left"></i>
        </li>

        {pagesInBlock.map((page) => (
          <li
            className={`pagination__page ${
              page === currentPage && "pagination__active"
            }`}
            onClick={() => setCurrentPage(page)}
            key={page}
          >
            {page}
          </li>
        ))}
        <li
          className="pagination__next pagination__active"
          onClick={handleNextPage}
          title="Siguiente"
        >
          <i className="bx bx-chevrons-right"></i>
        </li>
        <li onClick={() => setCurrentPage(lastPage)} title="Última página">
          <i className="pagination__last-page bx bx-last-page"></i>
        </li>
      </ul>
    </section>
  );
};

export default Pagination;
