import React, { Component } from 'react'
import LanguageService from '../../services/language-service'
import {Input} from '../../components/Form/Form'
import Button from '../../components/Button/Button'

class LearningRoute extends Component {
  state = {
    word: null,
    answer: null,
    nextWord: null,
    isCorrect: null,
    totalScore: null,
    wordCorrectCount: null,
    wordIncorrectCount: null,
    guess: null
  }

  componentDidMount() {
    LanguageService.getWord().then(word => this.setState({word}))
  }

  getNextWord = () => {
    this.setState({
      word: null,
      answer: null,
      nextWord: null,
      isCorrect: null,
      totalScore: null,
      wordCorrectCount: null,
      wordIncorrectCount: null,
      guess: null
    });
    
    LanguageService.getWord().then(word => this.setState({word}));
  }

  handleFormSubmit = (e) => {
   e.preventDefault();
   const guess = e.target['learn-guess-input'].value;
   return LanguageService.postGuess(guess).then(res =>
    this.setState({
      answer: res.answer,
      nextWord: res.nextWord,
      isCorrect: res.isCorrect,
      totalScore: res.totalScore,
      wordCorrectCount: res.wordCorrectCount,
      wordIncorrectCount: res.wordIncorrectCount,
      guess
    }))
  }

  render() {
    return (
      <div>
        {(this.state.word && this.state.guess === null) && (
          <section>
            <h2>Translate the word:</h2>
            <span>{this.state.word.nextWord}</span>
            <p>Your total score is: {this.state.word.totalScore}</p>
            <p>You have answered this word correctly {this.state.word.wordCorrectCount} times.</p>
            <p>You have answered this word incorrectly {this.state.word.wordIncorrectCount} times.</p>
            <form onSubmit={this.handleFormSubmit}>
              <label htmlFor='learn-guess-input'>What's the translation for this word?</label>
              <Input type='text' required id='learn-guess-input' name='learn-guess-input'></Input>
              <Button type='submit'>Submit your answer</Button>
            </form>
          </section>
        )}
        {this.state.isCorrect === false && (
          <div>
            <div className='DisplayScore'>
              <p>Your total score is: {this.state.totalScore}</p>
            </div>
            <h2>Good try, but not quite right :(</h2>
            <div className='DisplayFeedback'> 
              <p>The correct translation for {this.state.word.nextWord} was {this.state.answer} and you chose {this.state.guess}!</p>
            </div>
            <p>Total Correct: {this.state.word.wordCorrectCount}</p>
            <p>Total Incorrect: {this.state.word.wordIncorrectCount + 1}</p>
            <Button onClick={()=>this.getNextWord()}>Try another word!</Button>
          </div>
          )}
        {this.state.isCorrect === true && (
          <div>
            <h2>You were correct! :D</h2>
            <div className='DisplayScore'>
              <p>Your total score is: {this.state.totalScore}</p>
            </div>
            <div className='DisplayFeedback'> 
              <p>The correct translation for {this.state.word.nextWord} was {this.state.answer} and you chose {this.state.guess}!</p>
            </div>
            <p>Total Correct: {this.state.word.wordCorrectCount + 1}</p>
            <p>Total Incorrect: {this.state.word.wordIncorrectCount}</p>
            <Button onClick={()=>this.getNextWord()}>Try another word!</Button>
          </div>
          )}
        
      </div>
    );
  }
}

export default LearningRoute
