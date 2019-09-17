import React, { Component } from 'react'
import LanguageService from '../services/language-service'

const initialState = ({
  language: {},
  words: [],
  error: null,
})

const LanguageContext = React.createContext({
  ...initialState,
  setError: () => { },
  clearError: () => { },
  fetchLanguage: () => { },
})

export default LanguageContext

export class LanguageProvider extends Component {
  state = {
    ...initialState,
  };

  setError = error => {
    console.error(error)
    this.setState({ error })
  }

  clearError = () => {
    this.setState({ error: null })
  }

  fetchLanguage = () => {
    const state = { language: {}, words: [], error: null }

    LanguageService.getLanguage().then(langPayload => {
      if (langPayload) {
        state.language = langPayload.language
        state.words = langPayload.words
      }
      this.setState({ language: state.language })
      this.setState({ words: state.words })
    })
  }

  render() {
    const value = {
      language: this.state.language,
      words: this.state.words,
      error: this.state.error,
      setError: this.setError,
      clearError: this.clearError,
      fetchLanguage: this.fetchLanguage,
    }
    return (
      <LanguageContext.Provider value={value}>
        {this.props.children}
      </LanguageContext.Provider>
    )
  }
}

