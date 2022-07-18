import React, { useEffect } from "react";
import store from "../store/articlesStore";
import "./Pagination.css";
import axios from "axios";
import { action } from "mobx";
import { observer } from "mobx-react-lite";

const NewsPagination = (props) => {
  // const urlForAll = `https://62061fb7161670001741bf36.mockapi.io/api/news`;
  useEffect(() => {
    //  store.getAllArticles(urlForAll)
  }, [,]);

  let pages = [];

  for (let i = 1; i <= store.pages + 1; i++) {
    pages[i] = i;
  }

  return (
    <ul>
      <h2>{store.articlesLength}</h2>

      <h1>{store.articles.map((page) => {<p>{page}</p>})}</h1>
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
