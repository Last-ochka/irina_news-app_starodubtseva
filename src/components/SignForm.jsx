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
          {!userStore.invalidLogin ? (
            <small className="wrong-login">Invalid username</small>
          ) : (
            <></>
          )}
          <input
            className="user-login"
            value={userStore.userLogin}
            onChange={(e) => userStore.putUserLogin(e)}
            placeholder="login"
            type="text"
          />
          {!userStore.invalidPassword ? (
            <small className="wrong-password">Invalid password</small>
          ) : (
            <></>
          )}
          <input
            className="user-password"
            value={userStore.userPassword}
            onChange={(e) => userStore.putUserPassword(e)}
            placeholder="password"
            type="password"
          />
          <button
            disabled={userStore.buttonDisabled}
            onClick={userStore.onCompletedForm}
            className="sign-in"
          >
            {userStore.signText}
          </button>
          <button
            className="change-for-create"
            type="button"
            onClick={userStore.onSign}
          >
            {userStore.signLink}
          </button>
          <Link to="/">Back</Link>
        </form>
      </div>
    </div>
  );
};

export default observer(SignForm);
