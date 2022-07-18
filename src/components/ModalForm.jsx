import React from "react";
import store from "../store/articlesStore";
import "./ModalWindow.css";
import { action } from "mobx";

const ModalForm = (props) => {
  const onChangeTitle = action((e) => {
    const val = e.target.value;
    store.newArticleTitle = val;
  });
  const onChangeText = action((e) => {
    const val = e.target.value;
    store.newArticleText = val;
  });
  return (
    <div className="modal-window">
      <div className="openArticle">
        <form>
          <input
            type="text"
            name="name"
            placeholder="Title"
            onChange={onChangeTitle}
          />
          <textarea
            rows="10"
            cols="45"
            name="text"
            onChange={onChangeText}
            placeholder="Text"
          ></textarea>
          <input type="submit" value="Save" />
        </form>
      </div>
    </div>
  );
};

export default ModalForm;
