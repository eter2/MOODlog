import React from "react";
import Pagination from "react-js-pagination";

const Paging = ({total, page, setPage}) => {
  return (
    <div className="max-w-lg mx-auto p-5">
      <Pagination
      activePage={page}
      itemsCountPerPage={10}
      totalItemsCount={total}
      pageRangeDisplayed={5}
      prevPageText={"‹"}
      nextPageText={"›"}
      innerClass="flex justify-center items-center gap-3"
      activeClass="text-base text-main-color font-semibold"
      itemClass="text-sm"
      onChange={setPage}
    />
    </div>
  );
};

export default Paging;