import { observable, action, makeObservable, runInAction, computed } from "mobx";
import axios, * as others from 'axios';

class Store {

    showModal = false;
    shownArticle = {};
    loading = false;
    articles = [];
    newArticle = false;
    newArticleTitle = "";
    newArticleText = "";
    page = 1;
    articlesLength = 0;
    editableArticle = {};
    editModal = false;
    allArticles = [];
    // lastArticleId = -1;

    constructor() {
        makeObservable(this, {
            showModal: observable,
            shownArticle: observable,
            loading: observable,
            articles: observable,
            newArticle: observable,
            newArticleTitle: observable,
            newArticleText: observable,
            page: observable,
            editableArticle: observable,
            editModal: observable,
            allArticles: observable,
            pages: computed,
            lastArticleId: computed,
            articlesLength: observable,
            getArticles: action,
            startLoading: action,
            getAllArticles: action,
            deleteArticle: action,

        })
    }

    getArticles = (url) => {
        store.loading = true;
        axios
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
    }
    getAllArticles = (url) =>
        axios
            .get(url)
            .then(function (response) {
                runInAction(() => {
                    store.articlesLength = response.data.items.length;
                    store.allArticles = response.data.items;
                })
            })
            .catch(function (error) {
                console.log(error);
            })
    deleteArticle = (id, apiUrl) =>
        axios.delete('https://62061fb7161670001741bf36.mockapi.io/api/news/' + id)
            .then(() => {
                return axios.get(apiUrl)
            })
            .then(response => {
                runInAction(() => {
                    store.articles = response.data.items;
                    store.loading = false;
                })
            })



    // editArticle = (id, apiUrl) =>
    //  axios({
    //     method: "patch",
    //     url: ("https://62061fb7161670001741bf36.mockapi.io/api/news"+id),
    //     data: {
    //       createdAt: Date.now(),
    //       title: store.newArticleTitle,
    //       text: newArticleTitleText,
    //       id: 90,
    //     },
    //   })
    //     .then(() => {
    //       return axios.get(apiUrl);
    //     })
    //     .then((res) => {
    //       setAppState({ loading: false, repos: res.data });
    //     });
    // };
    //     })

    get pages() {
        return this.articlesLength / 6;
    }
    get lastArticleId() {
        return (
            (((this.articlesLength === 0) || (this.allArticles === [])) ? [{ id: -1 }] : this.allArticles[this.articlesLength - 1])).id
    }
    setPage(curretPage) {
        runInAction(() => { store.page = curretPage; })
    }

    startLoading = () => { store.loading = true };

}
const store = new Store();

export default store;
