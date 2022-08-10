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
    authorized = true;
    curretnUser = {};

    constructor() {
        makeObservable(this, {
            signIn: observable,
            userLogin: observable,
            userPassword: observable,
            invalidPassword: observable,
            invalidLogin: observable,
            focusLogin: observable,
            focusPassword: observable,
            token: observable,
            curretnUser: observable, 
            authorized: observable,
            signText: computed,
            signLink: computed,
            buttonDisabled: computed,
            onSign: action,
            // onSignDefault: action,
            putUserLogin: action,
            putUserPassword: action,
            onCompletedForm: action,
            onFocusLogin: action,
            onFocusPassword: action,
            refreshForm: action,
            getToken: action,
            onLogOut: action,
            findUser: action,

        })
    }

    onSign = () => {
        userStore.signIn = !userStore.signIn;
        userStore.userLogin = '';
        userStore.userPassword = '';
        if (userStore.userLogin.length < 2) userStore.invalidLogin = false;
        else userStore.invalidLogin = true;
        if (userStore.userPassword.length < 2) userStore.invalidPassword = false;
        else userStore.invalidPassword = true;

    }

    // onSignDefault = () => {
    //     console.log('hi');
    //     userStore.signIn = true;
    // }

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
                    runInAction(() => {
                        userStore.token = response.data.token;
                        userStore.authorized = true;
                    })
                })
                .catch(function (error) {
                    console.log(error);
                });
            userStore.userPassword = '';
            userStore.userLogin = '';
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
    onLogOut() {
        userStore.authorized = false;
    }


    findUser(token) {
        axios({
            method: "get",
            url: "http://localhost:3000/login",
            headers: {
                Authorization: token,
            },
        })
            .then(function (response) {
                runInAction(() => {
                    userStore.curretnUser = response.data;
                })
            })
            .catch(function (error) {
                console.log(error);
            })
    }

}
const userStore = new UserStore();
export default userStore;