import React from "react";
import { Link } from "react-router-dom";
import "./SignForm.css";
import userStore from "../store/userStore";
import { observer } from "mobx-react-lite";

const SignForm = () => {
  return (
    <div className="modal-window">
      <div className="openArticle openArticle__sign-container">
        <form className="sign-form">
          <h3>{userStore.signText}</h3>
          <input
            value={userStore.userLogin}
            onChange={(e) => userStore.putUserLogin(e)}
            placeholder="login"
            type="text"
          />
          <input
            value={userStore.userPassword}
            onChange={(e) => userStore.putUserPassword(e)}
            placeholder="password"
            type="password"
          />
          <button
          onClick={userStore.onCompletedForm}
          className="sign-in">{userStore.signText}</button>
          <button className="login" type="button" onClick={userStore.onSign}>
            {userStore.signLink}
          </button>
          <Link to="/">Back</Link>
        </form>
      </div>
    </div>
  );
};

export default observer(SignForm);
