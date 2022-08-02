import React, { useEffect } from "react";
import "./NewsPage.css";
import { observer } from "mobx-react-lite";
import store from "./../store/articlesStore.js";
import ModalForm from "../components/ModalForm";
import Card from "../components/Card";
import ModalWindow from "../components/ModalWindow";
import NewsPagination from "../components/NewsPagination";
import { Link } from "react-router-dom";

const NewsPage = () => {
  useEffect(() => {
    store.getArticles();
    store.getAllArticles();
  }, [store.articlesLength, store.pages, store.page]);

  const text = store.lastArticleId;
  return (
    <div className="news-page">
      <h1>Список новостей</h1>
      {store.loading ? (
        <h2>Wait...</h2>
      ) : (
        <h2>Amount of news: {store.articlesLength}</h2>
      )}
      <button onClick={store.createArticle} className="createArticle">
        New Article
      </button>
      <Link onClick={store.onSignDefault} to="signin">
        Sign In
      </Link>
      {store.articles.length < 1 && store.loading === false ? (
        <p className="no-articles">No articles, sorry</p>
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
        <ModalForm onClickModal={() => store.onEditSubmit()} />
      ) : (
        <></>
      )}

      {store.newArticle ? (
        <ModalForm onClickModal={() => store.onNewSubmit()} />
      ) : (
        <></>
      )}
      <NewsPagination />
    </div>
  );
};
export default observer(NewsPage);
