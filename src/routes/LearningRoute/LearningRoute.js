import React, { Component } from 'react';
import LangService from '../../services/language-service';
import { Input, Label } from '../../components/Form/Form';
import Button from '../../components/Button/Button';
import './Learning.css';

class LearningRoute extends Component {
  state = {
    answer: '',
    currentWord: '',
    nextWord: '',
    lastWord: '',
    correctAnswer: '',
    totalScore: 0,
    wordCorrectCount: 0,
    wordIncorrectCount: 0,
    isCorrect: null,
    hasAnswered: false,
  }

  componentDidMount() {
    LangService.getLanguageHead()
      .then(res => {
        this.setState({
          currentWord: res.nextWord,
          lastWord: res.nextWord,
          wordCorrectCount: res.wordCorrectCount,
          wordIncorrectCount: res.wordIncorrectCount,
          totalScore: res.totalScore
        })
      })
  }

  handleSubmitButton = e => {
    e.preventDefault()
    this.setState({ hasAnswered: true })

    LangService.postAnswer(this.state.answer)
      .then(res => {
        if(res.isCorrect) {
          this.setState({
            correctAnswer: res.answer,
            wordCorrectCount: this.state.wordCorrectCount + 1,
            totalScore: res.totalScore,
            isCorrect: true
          })
        } else {
          this.setState({
            correctAnswer: res.answer,
            wordIncorrectCount: this.state.wordIncorrectCount + 1,
            isCorrect: false
          })
        }
      })
  }

  handleNextButton = e => {
    e.preventDefault()
    this.setState({ hasAnswered: false, isCorrect: null })

    LangService.getLanguageHead()
      .then(res => {
        this.setState({
          currentWord: res.nextWord,
          lastWord: res.nextWord,
          wordCorrectCount: res.wordCorrectCount,
          wordIncorrectCount: res.wordIncorrectCount,
          totalScore: res.totalScore,
        })
      })
  }

  displayForm() {
    if (!this.state.hasAnswered) {
      return (
        <fieldset>
          <form onSubmit={this.handleSubmitButton}>
            <Label htmlFor='learning-answer-lable'>
              Your answer: 
            </Label>
            <Input 
              type='text' 
              id='learning-answer-input'
              name='answer_input'
              onChange={this.userInputTracker}
              required
            />
            <Button type='submit' className='button'>Submit</Button>
          </form>
        </fieldset>
      )
    } else {
      return (
        <Button type='click' onClick={this.handleNextButton} className='button'>
          New word
        </Button>
      )
    }
  }

  displayFeedback() {
    if (this.state.isCorrect) {
      return (
        <>
          <h2>Awesome! Correct answer!</h2>
          <p>The correct translation for {this.state.currentWord} was {this.state.correctAnswer} and you answered {this.state.answer}</p>
        </>
      )
    }
    if (!this.state.isCorrect) {
      return (
        <>
          <h2>DUMBASS! (┛◉Д◉)┛彡┻━┻</h2>
          <p>The correct translation for {this.state.currentWord} was {this.state.correctAnswer} and you answered {this.state.answer}</p>
        </>
      )
    }
  }

  userInputTracker = e => {
    this.setState({ answer: e.target.value })
  }

  render() {
    let header = (this.state.hasAnswered) ?
      <div className='display-feedback'>
        {this.displayFeedback()}
      </div> :
      <>
        <h2>What is the translation for this word?</h2>
        <span>{this.state.currentWord}</span>
      </>
    return (
      <section>
        <main role='main' className='learning-route'>
          <div className='translate-word'>
            {header}
          </div>

          <div className='display-answer-form'>
            {this.displayForm()}
          </div>

          <div className='display-total-score'>
            <p>Total score: {this.state.totalScore}</p>
          </div>

          <div className='display-current-score'>
            <p>Correct answer count: {this.state.wordCorrectCount}</p>
            <p>Incorrect answer count: {this.state.wordIncorrectCount}</p>
          </div>
        </main>
      </section>
    );
  }
}

export default LearningRoute;