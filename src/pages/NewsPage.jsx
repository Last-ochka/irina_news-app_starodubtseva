import React, { useEffect } from "react";
import "./NewsPage.css";
import { observer } from "mobx-react-lite";
import store from "./../store/articlesStore.js";
import ModalForm from "../components/ModalForm";
import Card from "../components/Card";
import ModalWindow from "../components/ModalWindow";
import NewsPagination from "../components/NewsPagination";
import { Link } from "react-router-dom";
import userStore from "../store/userStore";
import { useCookies } from "react-cookie";

const NewsPage = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  useEffect(() => {
    if (cookies["token"]) {
      store.getArticles(`http://localhost:3000/all/page/${store.page}`, cookies["token"]);
      store.getAllArticles(`http://localhost:3000/all/length`, cookies["token"]);
      userStore.findUser(cookies["token"]);
    } else {
      store.getArticles(`http://localhost:3000/tasks/page/${store.page}`);
      store.getAllArticles(`http://localhost:3000/tasks/length`);
    }
  }, [store.articlesLength, store.pages, store.page, cookies["token"]]);

  useEffect(() => {
    if (userStore.token)
      setCookie("token", userStore.token, {
        path: "/",
        maxAge: 30,
        sameSite: "strict",
      });
  }, [userStore.token]);

  useEffect(() => {
    if (!userStore.authorized) logOut();
  }, [userStore.authorized]);

  const logOut = () => {
    removeCookie("token");
  };
  // const text = store.lastArticleId;
  return (
    <div className="news-page">
      <h1>Список новостей</h1>
      {store.loading ? (
        <h2>Wait...</h2>
      ) : (
        <h2>Amount of news: {store.articlesLength}</h2>
      )}
      {cookies["token"] ? (
        <button onClick={store.createArticle} className="createArticle">
          New Article
        </button>
      ) : (
        <></>
      )}

      {cookies["token"] ? (
        <>
          <p> Logged in as {userStore.curretnUser.login}</p>
          <Link onClick={userStore.onLogOut} to="/">
            Log out
          </Link>
        </>
      ) : (
        <Link onClick={store.onSignDefault} to="signin">
          Sign In
        </Link>
      )}

      {store.articles.length < 1 && store.loading === false ? (
        <p className="no-articles">No articles, sorry</p>
      ) : (
        <ul className="newsArticle">
          {store.articles.map((article) => {
            let data = new Date(article.created_at).toLocaleDateString();
            return (
              <Card
                key={Math.random()}
                article={article}
                data={data}
                logged={cookies["token"]}
              />
            );
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
