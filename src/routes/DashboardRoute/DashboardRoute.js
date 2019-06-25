import React, { Component } from 'react';
import languageService from '../../services/language-service';
import { Link } from 'react-router-dom';
import './Dashboard.css';

class DashboardRoute extends Component {
  state ={
    totalScore: 0,
    words: [],
    language: ''
  }

  componentWillMount() {
    languageService.getLanguageWords()
      .then(res => {
        this.setState({
          totalScore: res.language.total_score,
          words: res.words,
          language: res.language.name
        })
      })
  }

  renderWords() {
    let words = this.state.words.map((word, i) => 
      <ul key={i}>
        <li>
          <h4>{word.original}</h4>
          <p>correct answer count: {word.correct_count}</p>
          <p>incorrect answer count: {word.incorrect_count}</p>
        </li>
      </ul>
    )

    return words;
  }

  render() {
    const subtitle = this.state.language
    let totalScore = this.state.totalScore

    return (
      <section className='dashboard'>
        <h2>{subtitle}</h2>
        <h1 className='dashboard-score'>Total correct answers: {totalScore}</h1>
        <h3>Words to practice</h3>
        <div className='dashboard-words'>
          {this.renderWords()}
        </div>
        <div className='button'>
          <Link to='/learn'>Start practicing</Link>
        </div>
      </section>
    );
  }
}

export default DashboardRoute;