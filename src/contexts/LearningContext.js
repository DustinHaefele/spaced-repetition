import React, { Component } from 'react'
import LanguageService from '../services/language-service';

const initialState = ({
  totalScore: 0,
  wordCorrectCount: 0,
  wordIncorrectCount: 0,
  nextWord: null,
  guess: null,
  prevWord: null,
  isCorrect: null,
  answer: null,
  error: null,
});




const LearningContext = React.createContext({
  ...initialState,
  setError: () => { },
  clearError: () => { },
  setNextWord: () => { },
  setTotalScore: () => { },
  setWordCorrectCount: () => { },
  setWordIncorrectCount: () => { },
  setGuess: () => { },
  setAnswer: () => { },
  setIsCorrect: () => { },
  getWordAtHead: () =>{ },
  reset: () => { },
});

export default LearningContext;

export class LearningProvider extends Component {
  state = {
    ...initialState,
  };

  componentDidMount(){
    this.getWordAtHead();
  }
  
  setError = error => {
    console.error(error)
    this.setState({ error })
  }

  getWordAtHead = () => {
    LanguageService.getWord().then(word => this.setState({
      nextWord: word.nextWord,
      wordCorrectCount: word.wordCorrectCount,
      wordIncorrectCount: word.wordIncorrectCount,
      totalScore: word.totalScore}))
  }

  clearError = () => {
    this.setState({ error: null })
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

  setNextWord = nextWord => {
    this.setState({ nextWord })
  }

  setGuess = guess => {
    this.setState({ guess })
  }

  setPrevWord = prevWord => {
    this.setState({ prevWord })
  }

  setIsCorrect = isCorrect => {
    this.setState({ isCorrect })
  }

  setAnswer = answer => {
    this.setState({ answer })
  }

  handleFormSubmit = e => {
    e.preventDefault();
    const guess = e.target['learn-guess-input'].value;
    return LanguageService.postGuess(guess).then(res =>
     this.setState({
       answer: res.answer,
       prevWord: this.state.nextWord,
       nextWord: res.nextWord,
       isCorrect: res.isCorrect,
       totalScore: res.totalScore,
       wordCorrectCount: res.wordCorrectCount,
       wordIncorrectCount: res.wordIncorrectCount,
       guess
     }))
  }

  reset = () => {
    this.setState({
      ...initialState,
    })
  }

  render() {
    const value = {
      // values
      totalScore: this.state.totalScore,
      wordCorrectCount: this.state.wordCorrectCount,
      wordIncorrectCount: this.state.wordIncorrectCount,
      nextWord: this.state.nextWord,
      guess: this.state.guess,
      prevWord: this.state.prevWord,
      isCorrect: this.state.isCorrect,
      answer: this.state.answer,
      error: this.state.error,
      // methods
      setError: this.setError,
      clearError: this.clearError,
      setTotalScore: this.setTotalScore,
      setWordCorrectCount: this.setWordCorrectCount,
      setWordIncorrectCount: this.setWordIncorrectCount,
      setNextWord: this.setNextWord,
      setGuess: this.setGuess,
      setPrevWord: this.setPrevWord,
      setIsCorrect: this.setIsCorrect,
      setAnswer: this.setAnswer,
      handleFormSubmit: this.handleFormSubmit,
      reset: this.reset,
    }
    return (
      <LearningContext.Provider value={value}>
        {this.props.children}
      </LearningContext.Provider>
    )
  }
}