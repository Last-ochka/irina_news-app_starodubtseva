import React from "react";
import { Link } from "react-router-dom";
import "./SignForm.css";
import userStore from "../store/userStore";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const SignForm = () => {

  const navigate = useNavigate();

const onClickSubmit = () => {
 userStore.onCompletedForm ()
  if (userStore.authorized) {
navigate('/')
  };
 
}

// useEffect(() => {
//   if (userStore.authorized) {
//     navigate('/')
//       };
// }, [!userStore.authorized]);

  return (
    <div className="modal-window">
      <div className="openArticle openArticle__sign-container">
        <form className="sign-form">
          <h3>{userStore.signText}</h3>
          {(!userStore.invalidLogin && userStore.focusLogin) ? (
            <small className="wrong-login">Invalid username</small>
          ) : (
            <></>
          )}
          <input
            className="user-login"
            autoFocus
            value={userStore.userLogin}
            onChange={(e) => userStore.putUserLogin(e)}
            onBlur={userStore.onFocusLogin}
            onFocus={userStore.onFocusLogin}
            placeholder="login"
            type="text"         
          />
          {(!userStore.invalidPassword && userStore.focusPassword) ? (
            <small className="wrong-password">Invalid password</small>
          ) : (
            <></>
          )}
          <input
            className="user-password"
            value={userStore.userPassword}
            onChange={(e) => userStore.putUserPassword(e)}
            onBlur={userStore.onFocusPassword}
            onFocus={userStore.onFocusPassword}
            placeholder="password"
            type="password"
          />
          <button
          type="button"
            disabled={userStore.buttonDisabled}
            onClick={onClickSubmit}
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
          <Link onClick={userStore.refreshForm} to="/">Back</Link>
        </form>
      </div>
    </div>
  );
};

export default observer(SignForm);
