import React, { Component } from 'react';
import DropDown from './DropDown.js';
import LoadingMessage from './LoadingMessage.js';
import NewsStory from './NewsStory.js';

class JapaneseNews extends Component {
  constructor() {
    super();
    this.state = {
    };
  }

  componentWillMount() {
    this.setState ({
      articles: this.props.state.articles,
      loading: this.props.state.loading,
      selectedSource: this.props.state.selectedSource
    });
  }

  render() {
    let articles = this.state.articles;
    let sources = articles.map(article => article.source.name);
    sources = removeDuplicateElements(sources);

    sources.unshift("全て");

    articles = articles.filter(article => {
      if(this.state.selectedSource !== "全て") {
        return (article.source.name.startsWith(this.state.selectedSource));
      }
      else {
        return article;
      }
    });

    const renderedArticles = articles.map((article, index) => {
      return (
        <div key={index}>
          <NewsStory
            title={article.title}
            sourceName={article.source.name}
            description={article.description}
            urlToImage={article.urlToImage}
            url={article.url}
          />
        <br />
        <br />
        </div>
      );
    });

    if (!this.state.loading) {
      return (
        <div>
          <h1>国内ニュース</h1>
          <form>
            <div>源泉:</div>
            <DropDown
              name="japaneseSourceSelection"
              options={sources}
              selected={this.state.selectedSource}
              onChange={this.props.handleInputChange}
            />
          </form>
          <br />
          <br />
          {renderedArticles}
        </div>
      );
    }
    else {
      return (
        <LoadingMessage />
      );
    }
  }
}

const removeDuplicateElements = a => [...new Set(a)];

export default JapaneseNews;
