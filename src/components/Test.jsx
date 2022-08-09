import React from "react";
import axios from "axios";
import { useState } from "react";
import userStore from "../store/userStore";
import { runInAction } from "mobx";
import { useCookies, Cookies } from "react-cookie";

const Test = () => {

    const [cookies, setCookie, removeCookie] = useCookies(['token']);

  const getFiles = () => {
      console.log('userStor token: ' , userStore.token);
      console.log('cook token: ' , cookies['token']);
    axios({
      method: "get",
      url: "http://localhost:3000/tasks",
      headers: {
        Authorization: cookies['token'],
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



  const getToken= () => {
    axios({
        method: "post",
        url: "http://localhost:3000/auth/login",
        data: {
            login: 'new',
            password: '11',
        },
    })
        .then(function (response) {
            console.log(response.data.token, "token store", userStore.token);
            setCookie('token', response.data.token, { path: '/' });
            let a = cookies['token']
            console.log(response.data.token, "cookies", a );
            console.log('cook tok:  ', a)
            // removeCookie('token')
            // console.log(document.cookie, 'end')
        })
        .catch(function (error) {
            console.log(error);
        });
};



  return (
    <div>
      <button onClick={userStore.getToken}>Token</button>
      <button onClick={getFiles}>files</button>
      <button onClick={getToken}>cookies</button>
      
    </div>
  );
};


export default Test;
