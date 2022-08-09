import React from "react";
import axios from "axios";
import { useState } from "react";
import userStore from "../store/userStore";
import { runInAction } from "mobx";
import { useCookies, Cookies } from "react-cookie";

const Test = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);

  const getFiles = () => {
    console.log("userStor token: ", userStore.token);
    console.log("cook token: ", cookies["token"]);
    axios({
      method: "get",
      url: "http://localhost:3000/tasks",
      headers: {
        Authorization: cookies["token"],
      },
    })
      .then(function (response) {
        runInAction(() => {
          console.log(response.data);
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const removeCooc = () => {
    removeCookie("token");
  };
  const logCooc = () => {
    console.log(" cook.token:  ", cookies.token);
    console.log(" document.cookie:  ", document.cookie);

    console.log('user store', userStore.token );
  };

  const getToken = () => {
    axios({
      method: "post",
      url: "http://localhost:3000/auth/login",
      data: {
        login: "new",
        password: "11",
      },
    })
      .then(function (response) {
        console.log("111 data ", response.data.token);
        setCookie("token", response.data.token, {
          path: "/",
          maxAge: 300,
          sameSite: "strict",
        });
        console.log("222 cook tok:  ", cookies["token"]);
      })
      .catch(function (error) {
        console.log(error);
      });
    // removeCookie("token");
  };

  return (
    <div>
      <button onClick={userStore.getToken}>Token</button>
      <button onClick={getFiles}>files</button>
      <button onClick={getToken}>get cookies</button>
      <button onClick={removeCooc}>remove cookies</button>
      <button onClick={logCooc}>log cookies</button>
    </div>
  );
};

export default Test;
