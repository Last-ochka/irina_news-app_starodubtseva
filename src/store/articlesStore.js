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
    page = 8;
    articlesLength = 0;

    constructor(articlesLength) {
        makeObservable(this, {
            showModal: observable,
            shownArticle: observable,
            loading: observable,
            articles: observable,
            newArticle: observable,
            newArticleTitle: observable,
            newArticleText: observable,
            page: observable,
            pages: computed,
            articlesLength: observable,
            getArticles: action,
            startLoading: action,
            getArticlesLength: action,

        })
        this.articlesLength = articlesLength;
    }

    getArticles = (url) => axios
        .get(url)
        .then(function (response) {
            runInAction(() => {
                store.articles = response.data.items;
                store.loading = false;
            })
            return response.data.items
        })
        .catch(function (error) {
            console.log(error);
        })

    getArticlesLength = (url) => axios
        .get(url)
        .then(function (response) {
            runInAction(() => {
                store.articlesLength = response.data.items.length;
            })
        })
        .catch(function (error) {
            console.log(error);
        })

    get pages() {
        return this.articlesLength / 6;
    }
    setPage(curretPage) {
        runInAction(() => { store.page = curretPage; })
    }

    startLoading = () => { store.loading = true };

}
const store = new Store();

export default store;
