import { observer } from "mobx-react-lite";
import React from "react";
import "./Card.css";

const Card = (props) => {
  const { article, data } = props;
  return (
    <li key={Math.random()} className="Article">
      <h5>{article.title}</h5>
      <div className="buttons">
        <button
          onClick={() => {
            props.editArticle(article);
          }}
          className="buttons_edit-button"
        >
          edit
        </button>
        <button
          onClick={() => {
            props.deleteArticle(article.id);
          }}
          className="buttons_delete-button"
        >
          del
        </button>
      </div>
      <p className="article_text">{article.text.slice(0, 100)} </p>
      <button
        onClick={() => {
          props.showArticle(article);
        }}
        className="view-more"
      >
        view-more
      </button>
      <small>{data}</small>
    </li>
  );
};
export default observer(Card);
