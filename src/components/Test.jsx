import React from "react";
import axios from "axios";
import { useState } from "react";
import userStore from "../store/userStore";
import { runInAction } from "mobx";

const Test = () => {
//   const getToken = () => {
//     axios({
//       method: "post",
//       url: "http://localhost:3000/auth/login",
//       data: {
//         login: 'new',
//         password: '11',
//       },
//     })
//       .then(function (response) {
//         runInAction(() => {
//           userStore.token = response.data.token;
//           console.log(response.data.token, "00000", userStore.token);
//         });
//       })
//       .catch(function (error) {
//         console.log(error);
//       });
//   };

  const getFiles = () => {
      console.log('token: ' , userStore.token);
    axios({
      method: "get",
      url: "http://localhost:3000/tasks",
      headers: {
        Authorization: userStore.token,
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

  return (
    <div>
      <button onClick={userStore.getToken}>Token</button>
      <button onClick={getFiles}>Test Ruby</button>
    </div>
  );
};

// axios
// .get("http://localhost:3000/users/24", {
//   method: "GET",

//   headers: {
//     Authorization:
//       "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoyNSwiZXhwIjoxN…TExfQ.-np_efe6OTEYZs-lhQuarvuKKcZqhazGbLcKLdhFY7M",
//   },
// })
// .then((res) => {
//   console.log(res.data);
// })
// .catch((error) => {
//   alert(error);
// });
//

export default Test;
