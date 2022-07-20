import React from "react";
import store from "../store/articlesStore";
import "./ModalWindow.css";

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
        </button>{" "}
        <p>{store.shownArticle.text}</p>
        <small>
          {new Date(store.shownArticle.createdAt).toLocaleDateString()}
        </small>
      </div>
    </div>
  );
};

export default ModalWindow;
