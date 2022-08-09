import { observable, action, makeObservable, runInAction, computed } from "mobx";
import axios, * as others from 'axios';


class UserStore {
    signIn = true;
    userLogin = '';
    userPassword = '';
    invalidPassword = false;
    invalidLogin = false;
    focusLogin = false;
    focusPassword = false;
    token = '';
   
    constructor() {
        makeObservable(this, {
            signIn: observable,
            userLogin: observable,
            userPassword: observable,
            invalidPassword: observable,
            invalidLogin: observable,
            focusLogin: observable,
            focusPassword: observable,
            signText: computed,
            signLink: computed,
            token: observable,
            buttonDisabled: computed,
            onSign: action,
            onSignDefault: action,
            putUserLogin: action,
            putUserPassword: action,
            onCompletedForm: action,
            onFocusLogin: action,
            onFocusPassword: action,
            refreshForm: action,
            getToken: action,

        })
    }

    onSign = () => {
        userStore.signIn = !userStore.signIn;
        userStore.userLogin = '';
        userStore.userPassword = '';
        if (userStore.userLogin.length < 5) userStore.invalidLogin = false;
        else userStore.invalidLogin = true;
        if (userStore.userPassword.length < 5) userStore.invalidPassword = false;
        else userStore.invalidPassword = true;

    }

    onSignDefault = () => {
        userStore.signIn = true;
    }

    get signText() {
        return (userStore.signIn === true ? 'Sign In' : 'Sign Up')
    }

    get signLink() {
        return (userStore.signIn === true ? 'Or create an account' : 'Or login')
    }

    putUserLogin(e) {
        userStore.userLogin = e.target.value;
        if (userStore.userLogin.length < 2) userStore.invalidLogin = false;
        else userStore.invalidLogin = true;
    }

    putUserPassword(e) {
        userStore.userPassword = e.target.value;
        if (userStore.userPassword.length < 2) userStore.invalidPassword = false;
        else userStore.invalidPassword = true;
    }

    get buttonDisabled() {

        if ((userStore.invalidLogin) && (userStore.invalidPassword)) {
            return false
        } else { return true }
    }
    onCompletedForm() {
        if (userStore.signIn) {
            axios({
                method: "post",
                url: "http://localhost:3000/auth/login",
                data: {
                    login: userStore.userLogin,
                    password: userStore.userPassword,
                },
              })
                .then(function (response) {
                  console.log("111 data ", response.data.token);
                //   setCookie("token", response.data.token, {
                //     path: "/",
                //     maxAge: 300,
                //     sameSite: "strict",
                //   });
                //   console.log("222 cook tok:  ", cookies["token"]);
                })
                .catch(function (error) {
                  console.log(error);
                });
        }
        else {
            axios({
                method: "post",
                url: "http://localhost:3000/users",
                data: {
                    login: userStore.userLogin,
                    password: userStore.userPassword,
                },
            });
            userStore.userPassword = '';
            userStore.userLogin = '';
        }
    }

    onFocusLogin() {
        userStore.focusLogin = !userStore.focusLogin;
    }
    onFocusPassword() {
        userStore.focusPassword = !userStore.focusPassword;
    }
    refreshForm() {
        userStore.userLogin = '';
        userStore.userPassword = '';
    }

    getToken() {
        axios({
            method: "post",
            url: "http://localhost:3000/auth/login",
            data: {
                login: 'new',
                password: '11',
            },
        })
            .then(function (response) {
                runInAction(() => {
                   userStore.token = response.data.token;
                   
                })
               
                
                console.log(response.data.token, "00000", userStore.token);
            })
            .catch(function (error) {
                console.log(error);
            });
    };

}
const userStore = new UserStore();
export default userStore;