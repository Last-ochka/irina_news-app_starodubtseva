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
    editableArticle = {};
    editModal = false;
    articlesLength = 0;
    lengthIsChange = false;
    showAllArticles = true;
    

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
            lengthIsChange: observable,
            showAllArticles: observable,
            articlesLength: observable,
            myOrAll: computed, 
            pages: computed,
            getArticles: action,
            startLoading: action,
            getAllArticles: action,
            deleteArticle: action,
            onChangeText: action,
            onChangeTitle: action,
            onNewSubmit: action,
            viewArticle: action,
            showArticle: action,
            createArticle: action,
            closeModalForm: action,
            editArticleModalForm: action,
            editArticle: action,
            changeShownArticlesToAll: action,
            changeShownArticlesToMy: action,
        })
    }

    getArticles = (url, token) => {
        store.loading = true;
        axios({
            method: "get",
            url: url,
            headers: {
                Authorization: token,
            },
        })
            .then(function (response) {
                runInAction(() => {
                    store.articles = response.data;
                    store.loading = false;
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    getAllArticles = (url, token) =>
        axios({
            method: "get",
            url: url,
            headers: {
                Authorization: token,
            },
        })
            .then(function (response) {
                runInAction(() => {
                    store.articlesLength = response.data;
                })
            })
            .catch(function (error) {
                console.log(error);
            })

    deleteArticle = (id, token) => {
        axios({
            method: "delete",
            url: (`http://localhost:3000/tasks/` + id),
            headers: {
                Authorization: token,
            },
        })
            .then(() => {
                runInAction(() => {
                    store.lengthIsChange = !store.lengthIsChange;
                })
            })
    }
    get pages() {
        return Math.ceil(this.articlesLength / 6);
    }
    setPage(curretPage) {
        runInAction(() => {
            (store.articles.length > 0) ?
                (store.page = curretPage) :
                (store.page = 1)
        })
    }

    startLoading = () => { store.loading = true };

    onChangeTitle = (e) => {
        store.newArticleTitle = e;
    }
    onChangeText = (e) => {
        store.newArticleText = e;
    }

    viewArticle = (id) => {
        store.showModal = !store.showModal;
    };

    showArticle = (article) => {
        store.shownArticle = article;
        store.viewArticle(article.id);
    };

    editArticle = (article) => {
        store.editableArticle = article;
        store.newArticleTitle = article.title;
        store.newArticleText = article.text;
        store.editArticleModalForm(article.id);
    };

    editArticleModalForm = (id) => {
        store.editModal = !store.editModal;
    };

    onNewSubmit = (token) => {
        if (!store.newArticleTitle) {
            alert("Title cannot be empty!")
        } else if (!store.newArticleText) {
            alert("Text cannot be empty!")
        }
        else
            axios({
                method: "post",
                url: "http://localhost:3000/tasks",
                headers: {
                    Authorization: token,
                },
                data: {

                    title: store.newArticleTitle,
                    text: store.newArticleText,

                },
            })
                .then(() => runInAction(() => {
                    store.lengthIsChange = !store.lengthIsChange;

                    store.closeModalForm();
                    store.newArticleTitle = '';
                    store.newArticleText = '';
                }));
    }
    createArticle() {
        store.newArticle = true;
    };
    closeModalForm() {
        store.newArticle = false;
        store.editModal = false;
        store.newArticleTitle = '';
        store.newArticleText = '';
    };

    onEditSubmit = (token) => {
        if (!store.newArticleTitle) {
            alert("Title cannot be empty!")
        } else if (!store.newArticleText) {
            alert("Text cannot be empty!")
        } else {
            axios({
                method: "put",
                url: ("http://localhost:3000/tasks/" + store.editableArticle.id),
                data: {
                    title: store.newArticleTitle,
                    text: store.newArticleText,
                },
                headers: {
                    Authorization: token,
                },
            })
                .then(() => {
                    runInAction(() => {
                        store.lengthIsChange = !store.lengthIsChange;
                        store.closeModalForm();
                        store.newArticleTitle = '';
                        store.newArticleText = '';
                    })
                })
        }
    }
    changeShownArticlesToAll () {
        store.showAllArticles = true;
        store.page = 1;
    }
    changeShownArticlesToMy () {
        store.showAllArticles = false;
        store.page = 1;
    }
    get myOrAll (){
        if (store.showAllArticles) {
            return 'all'
        } else {
            return 'my'
        }
    }
}
const store = new Store();

export default store;
