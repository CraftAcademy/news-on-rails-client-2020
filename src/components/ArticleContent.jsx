import React from "react";
import LoginButton from "./LoginButton";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Grid, Divider, Segment, Button, Image } from "semantic-ui-react";

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
          <Link id="article-become-subscriber" to={{ pathname: "/subscription" }}>Become Subscriber</Link>
        </>
      );
    }
  } else {
    articleContent = <p id="content">{props.article.content}</p>;
  }

  return (
    <Segment>
      <Grid className="article-list">
        <Grid.Column width={4}>
          <Image src={props.article.image} />
        </Grid.Column>
        <Grid.Column width={9} id={`article-${props.article.id}`} data-id={props.article.id}>
          <h1 id="title">{props.article.title}</h1>
          <Divider horizental></Divider>
          <h2 id="lead">{props.article.lead}</h2>

          {props.singleArticle ? (
            <>
              {articleContent}
              <Button id="button" onClick={props.closeSingleArticle}>
                Close article
            </Button>
            </>
          ) : (
              <Button id="button" onClick={props.getSingleArticle}>
                Read more
              </Button>
            )}
        </Grid.Column>
      </Grid>
    </Segment>
  );
};

const mapStateToProps = (state) => {
  return {
    authenticated: state.authenticated,
    userRole: state.currentUser.role,
  };
};

export default connect(mapStateToProps)(ArticleContent);