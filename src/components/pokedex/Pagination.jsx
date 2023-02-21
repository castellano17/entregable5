import React from "react";

const Pagination = ({
  handlePreviousPage,
  setCurrentPage,
  handleNextPage,
  pagesInBlock,
}) => {
  return (
    <section className="pagination">
      <ul className="pagination__container">
        <li
          className="pagination__prev pagination__active"
          onClick={handlePreviousPage}
        >
          {"<<"}
        </li>
        <li onClick={() => setCurrentPage(1)}>... </li>
        {pagesInBlock.map((page) => (
          <li
            className={`pagination__page ${
              page === page && "pagination__active"
            }`}
            onClick={() => setCurrentPage(page)}
            key={page}
          >
            {page}
          </li>
        ))}
        <li onClick={() => setCurrentPage(lastPage)}>... </li>
        <li
          className="pagination__next pagination__active"
          onClick={handleNextPage}
        >
          {">>"}
        </li>
      </ul>
    </section>
  );
};

export default Pagination;
