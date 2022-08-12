import React from "react";
import store from "../store/articlesStore";
import "./ModalWindow.css";
import userStore from "../store/userStore";

const ModalWindow = () => {
  return (
    <div className="modal-window">
      <div className="openArticle">
        <h3>{store.shownArticle.title}</h3>
        <button
        className="close-article"
          onClick={() => {
            store.viewArticle(store.shownArticle.id);
          }}
        >
          close
        </button>
        <p>{store.shownArticle.text}</p>
        <small>
          {new Date(store.shownArticle.created_at).toLocaleDateString()}
        </small>
        <p className="article_text">{userStore.curretnUser.login} </p>
      </div>
    </div>
  );
};

export default ModalWindow;
