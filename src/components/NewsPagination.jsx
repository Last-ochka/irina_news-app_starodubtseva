import React, { useEffect } from "react";
import store from "../store/articlesStore";
import "./Pagination.css";
import axios from "axios";
import { action } from "mobx";
import { observer } from "mobx-react-lite";

const NewsPagination = (props) => {
  useEffect(() => {
    //  store.getArticlesLength(urlApi)
  }, [,]);

  let pages = [];

  for (let i = 1; i <= store.pages + 1; i++) {
    pages[i] = i;
  }

  return (
    <ul>
      <h2>{store.articlesLength}</h2>
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


