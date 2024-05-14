import React, { useMemo } from "react";

const Pagination = ({ totalCount, size, setPageNumber, currentPage }) => {
  let paginationArray = useMemo(() => {
    let tempArray = new Array(Math.ceil(totalCount / size)).fill(0);
    for (let i = 1; i <= tempArray.length; i++) {
      tempArray[i - 1] = i;
    }
    return tempArray;
  }, [totalCount, size]);
  return (
    <div>
      {paginationArray?.map((page) => (
        <button key={page} onClick={() => setPageNumber(page)}>
          {page}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
