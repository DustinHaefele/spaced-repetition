import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Button from '../../components/Button/Button';
import WordList from '../../components/WordList/WordList';
import MyLanguage from '../../components/MyLanguage/MyLanguage';
import UserContext from '../../contexts/UserContext';
import LanguageService from '../../services/language-service'

class DashboardRoute extends Component {
  state = {
    language: null,
    words: null
  }

  componentDidMount() {
    this.fetchLanguage()
  }

  fetchLanguage = () => {
    const state = { language: {}, words: [], error: null }

    LanguageService.getLanguage().then( langPayload => {
      if (langPayload) {
        state.language = langPayload.language
        state.words = langPayload.words
      }
      this.setState({ language: state.language })
      this.setState({ words: state.words })
      this.context.language = this.state.language
      this.context.words = this.state.words
    })
  }

  static contextType = UserContext;
  
  render() {
    
    // return (
      // <UserContext.Consumer>
      // {(value) => { console.log(value)
        return (<section>
          <MyLanguage language={this.state.language}/>
          <h3>Words to practice</h3>
          <WordList words={this.state.words}/>
          <Link to='/learn'>
            <Button type='button'>
              Start practicing
            </Button>
          </Link>
          {this.state.language && (<p>Total correct answers: {this.state.language.total_score}</p>) }
      </section>)
      // </UserContext.Consumer>
    // );
  }
}

export default DashboardRoute
