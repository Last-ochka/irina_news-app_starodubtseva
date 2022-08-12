import { observer } from "mobx-react-lite";
import React from "react";
import "./Card.css";
import store from "../store/articlesStore";
import { PropTypes } from "prop-types";
import userStore from "../store/userStore";

const Card = (props) => {
  const { article, data, logged } = props;
  return (
    <li key={Math.random()} className="Article">
      <h5>{article.title}</h5>
      <div className="buttons">
        {logged ? (
          <button
            onClick={() => {
              store.editArticle(article);
            }}
            className="buttons_edit-button"
          >
            Edit
          </button>
        ) : (
          <></>
        )}
        {logged ? (
          <button
            onClick={() => {
              store.deleteArticle(article.id, logged);
            }}
            className="buttons_delete-button"
          >
            Delete
          </button>
        ) : (
          <></>
        )}
      </div>
      <p className="article_text">{article.text.slice(0, 100)} </p>
      <button
        onClick={() => {
          store.showArticle(article);
        }}
        className="view-more"
      >
        View-more
      </button>
      <small>{data}</small>
      <p className="article_text">{userStore.curretnUser.login} </p>
    </li>
  );
};

Card.propTypes = {
  article: PropTypes.shape({
    createdAt: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    title: PropTypes.string,
    text: PropTypes.string,
    id: PropTypes.number,
  }),
  data: PropTypes.string,
};

export default observer(Card);
