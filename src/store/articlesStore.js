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
    allArticles = [];
    // urlForArticles = true;

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
            // urlForArticles: observable,
            pages: computed,
            // lastArticleId: computed,
            articlesLength: computed,
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
                    store.allArticles = response.data;
                })
            })
            .catch(function (error) {
                console.log(error);
            })

    deleteArticle = (id) => {
        axios.delete('https://62061fb7161670001741bf36.mockapi.io/api/news/' + id)
            .then(() => {
                runInAction(() => {
                    store.getAllArticles();
                })
            })
    }

    get articlesLength() {
        return (
            store.allArticles.length
        )
    }

    get pages() {
        return Math.ceil(this.articlesLength / 6);
    }
    // get lastArticleId() {
        return (
            (this.allArticles?.[this.articlesLength - 1]?.id) ?

                this.allArticles[this.articlesLength - 1].id : -1
        )
        // (((this.articlesLength === 0) || (this.allArticles === [])) ? [{ id: -1 }] : this.allArticles[this.articlesLength - 1])).id
        // чтоб не забыть эквивалент 
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

    onNewSubmit = () => {
        if (!store.newArticleTitle) {
            alert("Title cannot be empty!")
        } else if (!store.newArticleText) {
            alert("Text cannot be empty!")
        }
        else
            axios({
                method: "post",
                url: "https://62061fb7161670001741bf36.mockapi.io/api/news",
                data: {

                    title: store.newArticleTitle,
                    text: store.newArticleText,

                },
            })
                .then(() => runInAction(() => {
                    store.getAllArticles();
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

    onEditSubmit = () => {
        if (!store.newArticleTitle) {
            alert("Title cannot be empty!")
        } else if (!store.newArticleText) {
            alert("Text cannot be empty!")
        } else {
            // axios({
            //     method: "PATCH",
            //     url: ("https://62061fb7161670001741bf36.mockapi.io/api/news" + id),
            //     data: {
            //         createdAt: Date.now(),
            //         title: store.newArticleTitle,
            //         text: store.newArticleText,
            //     },
            // })
            //     .then(() => {
            //         runInAction(() => {
            //             store.getAllArticles();
            //             store.closeModalForm();
            //             store.newArticleTitle = '';
            //             store.newArticleText = '';
            //         })
            //     })


            // console.log("start")
            // axios.delete('http://localhost:3000/tasks/13')
            axios({
                method: "put",
                url: ("https://62061fb7161670001741bf36.mockapi.io/api/news/" + store.editableArticle.id),
                data: {
                    createdAt: Date.now(),
                    title: store.newArticleTitle,
                    text: store.newArticleText,
                    id: store.editableArticle.id,
                },
            })
                .then(() => {
                    runInAction(() => {
                        store.getAllArticles();
                        store.getArticles();
                        store.closeModalForm();
                        store.newArticleTitle = '';
                        store.newArticleText = '';
                    })
                })
        }
    }
}
const store = new Store();

export default store;
