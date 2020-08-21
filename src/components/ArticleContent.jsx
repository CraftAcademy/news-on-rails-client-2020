import React from "react";
import LoginButton from "./LoginButton";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const ArticleContent = (props) => {
  let isCurrentUserSubscriber = props.userRole === "subscriber" ? true : false;
  let isUserAuthenticated = props.authenticated;
  let isArticlePremium = props.article.premium;

  let articleContent;

  if (isArticlePremium && isCurrentUserSubscriber === false) {
    if (isUserAuthenticated === false) {
      articleContent = (
        <>
          <p>You need to log in to read this article</p>
          <LoginButton id="login" />
        </>
      );
    } else {
      articleContent = (
        <>
          <p id="become-sub-message">
            You need to become a subscriber to read this article
          </p>
          <Link id="article-become-subscriber" to={{ pathname: "/subscription" }}>Become a subscriber</Link>
        </>
      );
    }
  } else {
    articleContent = <p id="content">{props.article.content}</p>;
  }

  return (
    <div className="article-list">
      <div id={`article-${props.article.id}`} data-id={props.article.id}>
        <h1 id="title">{props.article.title}</h1>
        <h2 id="lead">{props.article.lead}</h2>
        {props.singleArticle ? (
          <>
            {articleContent}
            <button id="button" onClick={props.closeSingleArticle}>
              Close article
            </button>
          </>
        ) : (
            <button id="button" onClick={props.getSingleArticle}>
              Read more
            </button>
          )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    authenticated: state.authenticated,
    userRole: state.currentUser.role,
  };
};

export default connect(mapStateToProps)(ArticleContent);