import React  from "react";
import store from "../store/articlesStore";
import "./ModalWindow.css";

const ModalForm = (props) => {
  return (
    <div className="modal-window">
      <div className="openArticle">
        <form>
          <input
            type="text"
            name="name"
            placeholder="Title"
            value={store.newArticleTitle}
          />
          <textarea rows="10" cols="45" name="text">
          </textarea>
          <input type="text" name="name" value={store.newArticleText} />
          <input type="submit" value="Save" />
        </form>
      </div>
    </div>
  );
};

export default ModalForm;
