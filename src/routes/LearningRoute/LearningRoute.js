import React, { Component } from 'react'
import LanguageService from '../../services/language-service'
import {Input} from '../../components/Form/Form'
import Button from '../../components/Button/Button'
import LanguageContext from '../../contexts/LanguageContext'
import LearningContext from '../../contexts/LearningContext'

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
      <LanguageContext.Consumer>
        {language => (
          <LearningContext.Consumer>
            {learning => (
              <div>
                {(learning.nextWord && learning.guess === null) && (
                  <section>
                    <h2>Translate the word:</h2>
                    <span>{learning.nextWord}</span>
                    <p>Your total score is: {learning.totalScore}</p>
                    <p>You have answered this word correctly {learning.wordCorrectCount} times.</p>
                    <p>You have answered this word incorrectly {learning.wordIncorrectCount} times.</p>
                    <form onSubmit={learning.handleFormSubmit}> {/*This handleSubmit will need to be moved to context */}
                      <label htmlFor='learn-guess-input'>What's the translation for this word?</label>
                      <Input type='text' required id='learn-guess-input' name='learn-guess-input'></Input>
                      <Button type='submit'>Submit your answer</Button>
                    </form>
                  </section>
                )}
                {learning.isCorrect === false && (
                  <div>
                    <div className='DisplayScore'>
                      <p>Your total score is: {learning.totalScore}</p> 
                    </div>
                    <h2>Good try, but not quite right :(</h2>
                    <div className='DisplayFeedback'> 
                      <p>The correct translation for {learning.prevWord} was {learning.answer} and you chose {learning.guess}!</p> {/*change this.state to learning */}
                    </div>
                    <p>Total Correct: {learning.wordCorrectCount}</p> {/*this.state.word should be learning */}
                    <p>Total Incorrect: {learning.wordIncorrectCount + 1}</p>
                    <Button onClick={()=>this.getNextWord()}>Try another word!</Button>
                  </div>
                )}
                {learning.isCorrect === true && (
                  <div>
                    <h2>You were correct! :D</h2>
                    <div className='DisplayScore'>
                      <p>Your total score is: {learning.totalScore}</p>
                    </div>
                    <div className='DisplayFeedback'> 
                      <p>The correct translation for {learning.prevWord} was {learning.answer} and you chose {learning.guess}!</p>
                    </div>
                    <p>Total Correct: {learning.wordCorrectCount + 1}</p>
                    <p>Total Incorrect: {learning.wordIncorrectCount}</p>
                    <Button onClick={()=>this.getNextWord()}>Try another word!</Button>
                  </div>
                )}
              </div>
              )}
          </LearningContext.Consumer>
        )}
        </LanguageContext.Consumer>
    );
  }
}

export default LearningRoute
