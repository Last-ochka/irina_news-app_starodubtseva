import React from "react";
import store from "../store/articlesStore";
import "./ModalWindow.css";

const ModalWindow = (props) => {
  return (
    <div className="modal-window">
      <div className="openArticle">
        <h5>{store.shownArticle.title}</h5>
        <p>{store.shownArticle.text}</p>
        <button
          onClick={() => {
            store.viewArticle(store.shownArticle.id);
          }}
        >
          close
        </button>
        <small>{new Date(store.shownArticle.createdAt).toLocaleDateString()}</small>
      </div>
    </div>
  );
};

export default ModalWindow;
