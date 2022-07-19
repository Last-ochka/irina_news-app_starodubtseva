import React, { useEffect } from "react";
import "./NewsPage.css";
import { observer } from "mobx-react-lite";
import store from "./../store/articlesStore.js";
import ModalForm from "../components/ModalForm";
import Card from "../components/Card";
import ModalWindow from "../components/ModalWindow";
import NewsPagination from "../components/NewsPagination";

const NewsPage = () => {
  useEffect(() => {
    store.getArticles();
    store.getAllArticles();
  }, [ store.articlesLength, store.pages, store.page]);

  const text = store.lastArticleId;
  return (
    <div>
      {store.loading ? <h2>Wait...</h2> : <></>}
      {store.articles.length < 1 ? (
        <p>No articles, sorry</p>
      ) : (
        <ul className="newsArticle">
          {store.articles.map((article) => {
            let data = new Date(article.createdAt).toLocaleDateString();
            return <Card key={Math.random()} article={article} data={data} />;
          })}
        </ul>
      )}
      {store.showModal ? <ModalWindow /> : <></>}
      {store.editModal ? (
        <ModalForm
        onClickModal={() => store.onEditSubmit(store.editableArticle.id)}
         />
      ) : (
        <></>
      )}
      <button onClick={store.createArticle} className="createArticle">
        new
      </button>
      {store.newArticle ? (
        <ModalForm onClickModal={() => store.onNewSubmit()} />
      ) : (
        <></>
      )}
      <NewsPagination />
      <h2>last id: {text}</h2>
      <h1>page {store.page}</h1>
    </div>
  );
};
export default observer(NewsPage);
