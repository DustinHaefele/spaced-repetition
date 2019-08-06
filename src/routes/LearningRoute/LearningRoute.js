import React, { Component } from 'react'
import LanguageService from '../../services/language-service'
import {Input} from '../../components/Form/Form'
import Button from '../../components/Button/Button'

class LearningRoute extends Component {
  state = {
    word: null
  }
  componentDidMount() {
    LanguageService.getWord().then(word => this.setState({word}))
  }

  render() {
    return (
      <div>
        {this.state.word && (
          <section>
            <h2>Translate the word:</h2>
            <span>{this.state.word.nextWord}</span>
            <p>Your total score is: {this.state.word.totalScore}</p>
            <p>You have answered this word correctly {this.state.word.wordCorrectCount} times.</p>
            <p>You have answered this word incorrectly {this.state.word.wordIncorrectCount} times.</p>
          </section>
        )}
        <form>
          <label htmlFor='learn-guess-input'>What's the translation for this word?</label>
          <Input type='text' required id='learn-guess-input' name='learn-guess-input'></Input>
          <Button type='submit'>Submit your answer</Button>
        </form>
      </div>
    );
  }
}

export default LearningRoute
