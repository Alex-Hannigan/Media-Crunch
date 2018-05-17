import React, { Component } from 'react';
import { BrowserRouter, Route, NavLink } from 'react-router-dom';
import Horoscope from './Horoscope.js';
import News from './News.js';
import starSignDates from './starSignDates.js';

let today = new Date();
let dd = today.getDate();
let mm = today.getMonth() + 1;
const yyyy = today.getFullYear();
if(dd < 10) {
    dd = '0' + dd
}
if(mm < 10) {
    mm = '0' + mm
}
today = dd + '/' + mm + '/' + yyyy;

class ContentRouter extends Component {
  constructor() {
    super();
    this.state = {
      horoscope:
      {starSigns: [],
      horoscopes: [],
      selectedIndex: 0,
      loading: true},
      japaneseNews: {
        nationality: 'Japanese',
        articles: [],
        loading: true,
        selectedSource: 'All'
      },
      americanNews: {
        nationality: 'American',
        articles: [],
        loading: true,
        selectedSource: 'All'
      },
      irishNews: {
        nationality: 'Irish',
        articles: [],
        loading: true,
        selectedSource: 'All'
      }
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentWillMount() {
    // Fetch today's horoscope
    fetch('https://www.horoscopes-and-astrology.com/json')
    .then(response => {
      if(response.ok) return response.json();
      throw new Error('Request failed.');
    })
    .then(data => {
      const signs = Object.keys(data.dailyhoroscope);
      const horoscopes = [];
      for (let index in data.dailyhoroscope) {
        let horoscope = data.dailyhoroscope[index];
        horoscope = horoscope.substring(0, horoscope.indexOf("<"));
        horoscopes.push(horoscope);
      }
      this.setState({
        horoscope: {
        starSigns: signs,
        horoscopes: horoscopes,
        selectedIndex: 0,
        loading: false}
      });
    })
    .catch(error => {
      console.log(error);
    });

    // Fetch Japanese news articles
    fetch('https://newsapi.org/v2/top-headlines?country=jp&apiKey=88e0a99ff73742bfa3ef010a8fdc2a48')
    .then(response => {
      if(response.ok) return response.json();
      throw new Error('Request failed.');
    })
    .then(data => {
      this.setState({japaneseNews: {nationality: 'Japanese', articles: data.articles, loading: false, selectedSource: "All"}});
    })
    .catch(error => {
      console.log(error);
    });

    // Fetch American news articles
    fetch('https://newsapi.org/v2/top-headlines?country=us&apiKey=88e0a99ff73742bfa3ef010a8fdc2a48')
    .then(response => {
      if(response.ok) return response.json();
      throw new Error('Request failed.');
    })
    .then(data => {
      this.setState({americanNews: {nationality: 'American', articles: data.articles, loading: false, selectedSource: "All"}});
    })
    .catch(error => {
      console.log(error);
    });

    // Fetch Irish news articles
    fetch('https://newsapi.org/v2/top-headlines?country=ie&apiKey=88e0a99ff73742bfa3ef010a8fdc2a48')
    .then(response => {
      if(response.ok) return response.json();
      throw new Error('Request failed.');
    })
    .then(data => {
      this.setState({irishNews: {nationality: 'Irish', articles: data.articles, loading: false, selectedSource: "All"}});
    })
    .catch(error => {
      console.log(error);
    });
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
      if (name === 'Japanese') {
        const stateCopy = this.state;
        stateCopy.japaneseNews.selectedSource = value;
        this.setState(stateCopy);
      }
      else if (name === 'American') {
        const stateCopy = this.state;
        stateCopy.americanNews.selectedSource = value;
        this.setState(stateCopy);
      }
      else if (name === 'Irish') {
        const stateCopy = this.state;
        stateCopy.irishNews.selectedSource = value;
        this.setState(stateCopy);
      }
      else if (name === 'starSignSelection') {
        const index = this.state.horoscope.starSigns.indexOf(value);
        // A copy of state is made in order to update only one property while leaving other properties unchanged
        const stateCopy = this.state;
        stateCopy.horoscope.selectedIndex = index;
        this.setState(stateCopy);
      }
      else {
        const index = starSignDates.indexOf(value);
        // A copy of state is made in order to update only one property while leaving other properties unchanged
        const stateCopy = this.state;
        stateCopy.horoscope.selectedIndex = index;
        this.setState(stateCopy);
      }
  }

  render() {
    // Function which returns the Horoscope component with props
    const HoroscopeToRender = () => {
      return (
        <Horoscope state={this.state.horoscope}
          handleInputChange={this.handleInputChange}
        />
      );
    };

    // Function which returns the News component with Japanese news props
    const JapaneseNewsToRender = () => {
      return (
        <News state={this.state.japaneseNews}
          handleInputChange={this.handleInputChange}
        />
      )
    }

    // Function which returns the News component with American news props
    const AmericanNewsToRender = () => {
      return (
        <News state={this.state.americanNews}
          handleInputChange={this.handleInputChange}
        />
      )
    }

    // Function which returns the News component with Irish news props
    const IrishNewsToRender = () => {
      return (
        <News state={this.state.irishNews}
          handleInputChange={this.handleInputChange}
        />
      )
    }

    return (
      <div>
        <div className="dateDisplay">
          {today}
        </div>
        <br />
        <br />
        <BrowserRouter>
          <div id="content">
            <ul>
              <li><NavLink to="/" exact activeClassName="selected">Irish News</NavLink></li>
              <li><NavLink to="/AmericanNews" activeClassName="selected">American News</NavLink></li>
              <li><NavLink to="/JapaneseNews" activeClassName="selected">Japanese News</NavLink></li>
              <li><NavLink to="/Horoscope" activeClassName="selected">Horoscope</NavLink></li>
            </ul>

            <hr/>

            {/* The exact keyword ensures the '/' route matches only '/' and not '/anything-else' */}
            <Route exact path="/" component={IrishNewsToRender}/>
            <Route path="/AmericanNews" component={AmericanNewsToRender}/>
            <Route path="/JapaneseNews" component={JapaneseNewsToRender}/>
            <Route path="/Horoscope" component={HoroscopeToRender}/>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default ContentRouter;
