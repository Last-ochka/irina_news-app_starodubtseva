import React, { useEffect } from "react";
import store from "../store/articlesStore";
import "./Pagination.css";
import { observer } from "mobx-react-lite";

const NewsPagination = (props) => {
  let pages = [];
  for (let i = 1; i < store.pages + 1; i++) {
    pages[i] = i;
  }
  useEffect(() => {
    store.setPage(store.page);
  }, [store.articlesLength]);

  return (
    <ul>
      <h2>amount of news: {store.articlesLength}</h2>

      <h1>
        {store.articles.map((page) => {
          <p>{page}</p>;
        })}
      </h1>
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
  );
};

export default observer(NewsPagination);
