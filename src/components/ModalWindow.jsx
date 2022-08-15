import React from "react";
import store from "../store/articlesStore";
import "./ModalWindow.css";
import userStore from "../store/userStore";

const ModalWindow = () => {
  return (
    <div className="modal-window">
      <div className="openArticle">
        <h2>{store.shownArticle.title}</h2>
        <button
          className="close-article"
          onClick={() => {
            store.viewArticle(store.shownArticle.id);
          }}
        >
          close
        </button>
        <p className="shownArticleText">{store.shownArticle.text}</p>
        <div>
          <small>author:</small>
          <p className="author">
            {store.shownArticle.user_id
              ? userStore.curretnUser.login
              : "unknown"}
          </p>
        </div>
        <small>
          {new Date(store.shownArticle.created_at).toLocaleDateString()}
        </small>
      </div>
    </div>
  );
};

export default ModalWindow;
