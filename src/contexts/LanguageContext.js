import React, { Component } from 'react';

const LanguageContext = React.createContext({
  language: '',
  totalScore: 0,
  wordCorrectCount: 0,
  wordIncorrectCount: 0,
  setLanguage: () => {},
  setWords: () => {},
  setTotalScore: () => {},
  setWordIncorrectCount: () => {},
  setWordCorrectCount: () => {}
})

export default LanguageContext

export class LanguageProvider extends Component {
  state = {
    language: '',
    totalScore: 0,
    wordCorrectCount: 0,
    wordIncorrectCount: 0,
    words: []
  };

  setLanguage = language => {
    this.setState({ language })
  }

  setWords = words => {
    this.setState({ words })
  }

  setTotalScore = totalScore => {
    this.setState({ totalScore })
  }
  
  setWordCorrectCount = wordCorrectCount => {
    this.setState({ wordCorrectCount })
  }

  setWordIncorrectCount = wordIncorrectCount => {
    this.setState({ wordIncorrectCount })
  }

  render() {
    const result = {
      language: this.state.language,
      totalScore: this.state.totalScore,
      wordIncorrectCount: this.state.wordIncorrectCount,
      wordCorrectCount: this.state.wordCorrectCount,
      words: this.state.words,
      setLanguage: this.setLanguage,
      setWords: this.setWords,
      setTotalScore: this.setTotalScore,
      setWordCorrectCount: this.setWordCorrectCount,
      setWordIncorrectCount: this.setWordIncorrectCount
    }

    return (
      <LanguageContext.Provider result={result}>
        {this.props.children}
      </LanguageContext.Provider>
    )
  }
}