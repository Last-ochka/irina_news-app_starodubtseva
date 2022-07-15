import React from "react";
import "./ModalWindow.css";

const ModalWindow = (props) => {
  return (
    <div className="modal-window">
      <div className="openArticle">
        <h5>{props.repo.title}</h5>
        <p>{props.repo.text}</p>
        <button
          onClick={() => {
            props.viewArticle(props.repo.id);
          }}
        >
          close
        </button>
        <small>{new Date(props.repo.createdAt).toLocaleDateString()}</small>
      </div>
    </div>
  );
};

export default ModalWindow;
