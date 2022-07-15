import { autorun, observable, action, makeObservable, runInAction } from "mobx";
import axios, * as others from 'axios';

const store = observable({
    showModal: false,
    shownArticle: {},
    loading: false,
    articles: [],
    newArticle: false,
    newArticleTitle: "",
    newArticleText: "",
    page: 8,

    //     constructor() {
    //         makeObservable(this, {
    //            startLoading: action,
    //            getArticles: action
    //         })
    //     }
    // ,


    //  apiUrl : `https://62061fb7161670001741bf36.mockapi.io/api/news?page=${store.page}&limit=6`,

    startLoading: action(function () { store.loading = true }),

    getArticles: (url) => axios
        .get(url)
        .then(function (response) {
            runInAction(() => {
                store.articles = response.data.items;
                store.loading = false;
            })
        })
        .catch(function (error) {
            console.log(error);
        })

    ,


})

export default store;
