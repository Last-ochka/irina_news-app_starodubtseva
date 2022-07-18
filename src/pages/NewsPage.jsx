import React, { useEffect } from "react";
import "./NewsPage.css";
import { observer } from "mobx-react-lite";
import { action } from "mobx";
import store from "./../store/articlesStore.js";
import ModalForm from "../components/ModalForm";
import Card from "../components/Card";
import ModalWindow from "../components/ModalWindow";
import NewsPagination from "../components/NewsPagination";

const NewsPage = () => {
  const apiUrl = `https://62061fb7161670001741bf36.mockapi.io/api/news?page=${store.page}&limit=6`;
  const urlForAll = `https://62061fb7161670001741bf36.mockapi.io/api/news`;

  useEffect(() => {
    // store.startLoading();
    store.getArticles(apiUrl);
    store.getAllArticles(urlForAll);
  }, [apiUrl, urlForAll]);

  const deleteArticle = (id) => {
    console.log(id);
    store.deleteArticle(id, apiUrl);
  };

  const showArticle = action((article) => {
    store.shownArticle = article;
    viewArticle(article.id);
  });

  const viewArticle = action((id) => {
    console.log(id);
    store.showModal = !store.showModal;
  });
  const editArticle = action((article) => {
    store.editableArticle = article;
    editArticleModalForm(article.id);
  });

  const editArticleModalForm = (id) => {
    console.log(id);
    store.editModal = !store.editModal;
  };

  const createArticle = action(() => {
    store.newArticle = true; // !store.newArticle
  });

  // const newArticle = () => {
  //   console.log(90);
  //   axios({
  //     method: "post",
  //     url: "https://62061fb7161670001741bf36.mockapi.io/api/news",
  //     data: {
  //       createdAt: Date.now(),
  //       title: "2jhj",
  //       text: "tyj2",
  //       id: 90,
  //     },
  //   })
  //     .then(() => {
  //       return axios.get(apiUrl);
  //     })
  //     .then((res) => {
  //       setAppState({ loading: false, repos: res.data });
  //     });
  // };

  const text = store.lastArticleId;
  // console.log(store)
  // console.log(store.lastArticleId.text)

  return (
    <div>
      {store.loading ? <h2>Wait...</h2> : <></>}
      {store.articles.length < 1 ? (
        <p>No articles, sorry</p>
      ) : (
        <ul className="newsArticle">
          {store.articles.map((article) => {
            let data = new Date(article.createdAt).toLocaleDateString();
            return (
              <Card
                key={Math.random()}
                article={article}
                data={data}
                deleteArticle={deleteArticle}
                showArticle={showArticle}
                editArticle={editArticle}
              />
            );
          })}
        </ul>
      )}
      {store.showModal ? <ModalWindow viewArticle={viewArticle} /> : <></>}
      {store.editModal ? <ModalForm /> : <></>}
      <button onClick={createArticle} className="createArticle">
        new
      </button>
      {store.newArticle ? <ModalForm /> : <></>}
      <NewsPagination />

      <h2>{text}</h2>

      {store.allArticles.map((article) => {
        let data = new Date(article.createdAt).toLocaleDateString();
        return (
          <Card
            key={Math.random()}
            article={article}
            data={data}
            deleteArticle={deleteArticle}
            showArticle={showArticle}
            editArticle={editArticle}
          />
        );
      })}
    </div>
  );
};
export default observer(NewsPage);
