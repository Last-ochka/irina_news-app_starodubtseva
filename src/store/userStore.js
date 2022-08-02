import { observable, action, makeObservable, runInAction, computed } from "mobx";
import axios, * as others from 'axios';

class UserStore {
    signIn = true;
    userLogin = '';
    userPassword = '';

    constructor() {
        makeObservable(this, {
            signIn: observable,
            userLogin: observable,
            userPassword: observable,
            signText: computed,
            signLink: computed,
            onSign: action,
            onSignDefault: action,
            putUserLogin: action,
            putUserPassword: action,
            onCompletedForm: action,
        })
    }

    onSign = () => {
        userStore.signIn = !userStore.signIn;
        userStore.userLogin = '';
        userStore.userPassword = '';

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
    }
    putUserPassword(e) {
        userStore.userPassword = e.target.value;
    }
    onCompletedForm() {
        if (userStore.signIn) { }
        else {
            axios({
                method: "post",
                url: "http://localhost:3000/users",
                data: {
                    login: userStore.userLogin,
                    password: userStore.userPassword,
                },
            });
            userStore.userPassword='';
            userStore.userLogin='';

        }
    }
}
    const userStore = new UserStore();
export default userStore;