import React, { Component } from 'react'
import LanguageService from '../services/language-service'

const LanguageContext = React.createContext({
  language: {},
  word: [],
  error: null,
  setError: () => {},
  clearError: () => {},
  setLanguage: () => {},
})

export default LanguageContext

export class LanguageProvider extends Component {
  constructor(props) {
    super(props)
    const state = { language: {}, word: [], error: null }

    const langPayload = LanguageService.getLanguage()

    if (langPayload) {
      state.language = langPayload.language
      state.word = langPayload.word
    }

    this.state = state;
  }

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  setError = error => {
    console.error(error)
    this.setState({ error })
  }

  clearError = () => {
    this.setState({ error: null })
  }

  setLanguage = language => {
    this.setState({ language })
  }


  render() {
    const value = {
      language: this.state.language,
      word: this.state.word,
      error: this.state.error,
      setError: this.setError,
      clearError: this.clearError,
      setLanguage: this.setLanguage,
    }
    return (
      <LanguageContext.Provider value={value}>
        {this.props.children}
      </LanguageContext.Provider>
    )
  }
}
