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
      store.getArticles(
        `http://localhost:3000/${store.myOrAll}/page/${store.page}`,
        cookies["token"]
      ); // all -> store.myOrAll
      store.getAllArticles(
        `http://localhost:3000/${store.myOrAll}/length`,
        cookies["token"]
      );
      userStore.findUser(cookies["token"]);
    } else {
      store.getArticles(`http://localhost:3000/tasks/page/${store.page}`);
      store.getAllArticles(`http://localhost:3000/tasks/length`);
    }
  }, [
    store.articlesLength,
    store.pages,
    store.lengthIsChange,
    store.page,
    cookies["token"],
    store.showAllArticles,
  ]);

  useEffect(() => {
    if (userStore.token)
      setCookie("token", userStore.token, {
        path: "/",
        maxAge: 400,
        sameSite: "strict",
      });
  }, [userStore.token]);

  useEffect(() => {
    if (!userStore.authorized) logOut();
  }, [userStore.authorized]);

  const logOut = () => {
    removeCookie("token");
    userStore.removeToken();
  };

  return (
    <div className="news-page">
      <div className="header-container">
      <h1>Список новостей</h1>
      {store.loading ? (
        <h2>Wait...</h2>
      ) : (
        <h2>Amount of {store.myOrAll} news: {store.articlesLength}</h2>
      )}
      </div>
      <div className="nav-container">
        {cookies["token"] ? (
          <button onClick={store.changeShownArticlesToAll} className="allArticles">
            All articles
          </button>
        ) : (
          <></>
        )}
        {cookies["token"] ? (
          <button onClick={store.changeShownArticlesToMy} className="myArticles">
            My articles
          </button>
        ) : (
          <></>
        )}

        {cookies["token"] ? (
          <>
            <p className="loggedAs">
              {" "}
              Logged in as {userStore.curretnUser.login}
            </p>
            <Link onClick={userStore.onLogOut} to="/">
              Log out
            </Link>
          </>
        ) : (
          <Link onClick={userStore.onSignDefault} to="signin">
            Sign In
          </Link>
        )}
      </div>{" "}
      {cookies["token"] ? (
        <button onClick={store.createArticle} className="createArticle">
          New Article
        </button>
      ) : (
        <></>
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
        <ModalForm onClickModal={() => store.onEditSubmit(cookies["token"])} />
      ) : (
        <></>
      )}
      {store.newArticle ? (
        <ModalForm onClickModal={() => store.onNewSubmit(cookies["token"])} />
      ) : (
        <></>
      )}
      <NewsPagination />
    </div>
  );
};
export default observer(NewsPage);
