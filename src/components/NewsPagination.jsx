import React, { useEffect } from "react";
import store from "../store/articlesStore";
import "./Pagination.css";
import { observer } from "mobx-react-lite";

const NewsPagination = () => {
  let pages = [];
  for (let i = 1; i < store.pages + 1; i++) {
    pages[i] = i;
  }
  useEffect(() => {
    store.setPage(store.page);
  }, [store.articles.length]);

  return (
    <div className="pagination">
    <ul className="pagination-buttons">
      {pages.map((page) => {
        return (
          <button
            onClick={() => {
              store.setPage(page);
            }}
            key={Math.random()}
          >
            {page}
          </button>
        );
      })}
    </ul>  
    <h4>Page: {store.page}</h4>
    </div>
  );
};

export default observer(NewsPagination);
