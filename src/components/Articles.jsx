import axios from "axios";
import ArticleContent from "./ArticleContent";
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const Articles = (props) => {
  const [articles, setArticles] = useState([])
  const [singleArticle, setSingleArticle] = useState(null)
  const [country, setCountry] = useState(null)

  const location = useSelector(state => state.location)
  const pathName = props.history.location.pathname
  const category = props.match.params.category

  useEffect(() => {
    getArticles()
  }, [])

  useEffect(() => {
    setSingleArticle(null);
    getArticles();
  }, [pathName])

  const getArticles = async () => {
    let response;
    let currentPosition
    if (pathName === "/") {
      response = await axios.get(`/articles`);

    } else if (category === 'local') {
      currentPosition = location || { latitude: 60, longitude: 18 }

      response = await axios.get(`/articles`, {
        params: {
          latitude: currentPosition.latitude,
          longitude: currentPosition.longitude
        }
      });
  
      setCountry(response.data.articles[0].location)

    } else {
      response = await axios.get(`/articles`, {
        params: {
          category: category
        }
      });
    }

    setArticles(response.data.articles);
  };

  const getSingleArticle = async (event) => {
    let id = event.target.parentElement.dataset.id;
    let response = await axios.get(`/articles/${id}`);
    setSingleArticle(response.data.article);
  };

  const closeSingleArticle = () => {
    setSingleArticle(null);
  };

  let content;
  if (singleArticle) {
    content = (
      <ArticleContent
        article={singleArticle}
        singleArticle={true}
        closeSingleArticle={closeSingleArticle}
      />
    );
  } else {
    content = (
      <>
        {category === "local" && (
          <p id="current-position">Local News From {country}</p>
        )}
        {articles.map((article) => (
          <ArticleContent
            article={article}
            singleArticle={false}
            getSingleArticle={getSingleArticle}
          />
        ))}
      </>
    )
  }
  return <div>{content}</div>;

}

export default Articles

