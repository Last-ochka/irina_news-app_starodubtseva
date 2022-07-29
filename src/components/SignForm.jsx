import React from "react";
import { Link } from "react-router-dom";
import "./SignForm.css";
import store from "../store/articlesStore";
import { observer } from "mobx-react-lite";

const SignForm = () => {

  return (
    <div className="modal-window">
      <div className="openArticle openArticle__sign-container">
        <form className="sign-form">
          <h3>{store.signText}</h3>
          <input placeholder="login" type="text" />
          <input placeholder="password" type="password" />
          <button>{store.signText}</button>
          <button
          type="button"
          onClick={store.onSign}
        //   onClick={() => store.onSing()}
          >{store.signLink}</button>
          <Link to="/">Back</Link>
        </form>
      </div>
    </div>
  );
};

export default observer(SignForm);
