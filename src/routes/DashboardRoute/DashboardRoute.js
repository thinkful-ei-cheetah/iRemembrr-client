import React, { Component } from 'react';
import langService from '../../services/language-service';
import { Link } from 'react-router-dom';
import './Dashboard.css';

class DashboardRoute extends Component {
  state ={
    totalScore: 0,
    words: [],
    language: ''
  }

  componentWillMount() {
    
  }

  renderWords() {
    let words = this.state.words.map((word, i) => 
      <ul key={i}>
        <li>{word.original}</li>
        <li>Correct answer count: {word.correct_count}</li>
        <li>Inorrect answer count: {word.incorrect_count}</li>
      </ul>
    )

    return words;
  }

  render() {
    const subtitle = this.state.language
    let totalScore = this.state.totalScore

    return (
      <section className='dashboard'>
        <h1 className='dashboard-score'>Total correct answers: {totalScore}</h1>
        <h2>{subtitle}</h2>
        <h2>Words to practice</h2>

        <div className='dashboard-words'>
          {this.renderWords()}
          <Link to='/learn' className='button'>Start</Link>
        </div>
      </section>
    );
  }
}

export default DashboardRoute;