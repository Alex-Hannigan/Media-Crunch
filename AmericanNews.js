import React, { Component } from 'react';
import DropDown from './DropDown.js';
import LoadingMessage from './LoadingMessage.js';
import NewsStory from './NewsStory.js';
import stopWords from './stopWords.js';

class AmericanNews extends Component {
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

    sources.unshift("All");

    // Get the most frequently occurring words in today's news
    let allTextFromAllArticles = "";
    for (let i = 0; i < articles.length; i++) {
      allTextFromAllArticles += articles[i].title;
      allTextFromAllArticles += " ";
    }
    let wordCounts = { };
    allTextFromAllArticles = allTextFromAllArticles.replace(/[^\w\s]|_/g, "")
         .replace(/\s+/g, " ");
    let words = allTextFromAllArticles.split(/\b/);
    words = words.filter(a => a !== ' ');
    words = words.filter(x => stopWords.indexOf(x) === -1);
    for(var i = 0; i < words.length; i++) {
      wordCounts[words[i].toLowerCase()] = (wordCounts[words[i].toLowerCase()] || 0) + 1;
    };

    let wordsToDisplay = [];
    let countsToDisplay = [];
    let indicesOfFrequentWords = [];
    let frequentWords = [];
    for (var property in wordCounts) {
       if ( ! wordCounts.hasOwnProperty(property)) {
          continue;
       }
       wordsToDisplay.push(property);
       countsToDisplay.push(wordCounts[property]);
    }

    for(let i = 0; i < countsToDisplay.length; i++) {
      if (countsToDisplay[i] > 1) {
        indicesOfFrequentWords.push(i);
      }
    }

    for(let i = 0; i < indicesOfFrequentWords.length; i++) {
      let index = indicesOfFrequentWords[i];
      frequentWords.push(wordsToDisplay[index]);
    }

    articles = articles.filter(article => {
      if(this.state.selectedSource !== "All") {
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

    const renderedFrequentWords = frequentWords.map((word, index) => {
      return <li key={index} className='frequentWords'>{word}</li>;
    });

    if (!this.state.loading) {
      return (
        <div>
          <h1>American News</h1>
          <form>
            <div>Source:</div>
            <DropDown
              name="americanSourceSelection"
              options={sources}
              selected={this.state.selectedSource}
              onChange={this.props.handleInputChange}
            />
          </form>
          <br />
          <br />
          {renderedArticles}
          <br />
          <br />
          <h2 className='frequentWordsTitle'>
            Frequently occurring words:
          </h2>
          <ul>
            {renderedFrequentWords}
          </ul>
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

export default AmericanNews;
