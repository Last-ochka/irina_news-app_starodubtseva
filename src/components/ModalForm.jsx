import React from "react";
import store from "../store/articlesStore";
import "./ModalWindow.css";
import "./ModalForm.css";
import { PropTypes } from "prop-types";

const ModalForm = (props) => {
  return (
    <div className="modal-window">
      <div className="openArticle">
        <form>
          <input
            className="title"
            type="text"
            name="name"
            placeholder="Title"
            defaultValue={store.newArticleTitle}
            onChange={(e) => store.onChangeTitle(e.target.value)}
          />
          <button
            className="form-button"
            type="button"
            onClick={store.closeModalForm}
          >
            Close
          </button>
          <textarea
            className="text"
            type="text"
            onChange={(e) => store.onChangeText(e.target.value)}
            placeholder="Text"
            defaultValue={store.newArticleText}
          ></textarea>
          <div>
            <input
              type="checkbox"
              value={store.postAnonymously}
              onChange={store.changeAuthor}
            />{" "}
            <label>Post anonymously</label>
          </div>
          <input
            className="form-button"
            type="button"
            onClick={props.onClickModal}
            value="Save"
          />
        </form>
      </div>
    </div>
  );
};

ModalForm.propTypes = {
  onClickModal: PropTypes.func,
};

export default ModalForm;
