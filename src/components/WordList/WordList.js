import React from 'react';

export default class WordList extends React.Component {
  renderWords() {
    const wordsArr = this.props.words.map(word => {
      return (<li>
        <p>{word.original}</p>
        <p>Correct Guesses: {word.correct_count}</p>
        <p>Incorrect Guesses: {word.incorrect_count}</p>
      </li>);
    });
    return wordsArr;
  }

  render() {
    return <ul>{this.renderWords}</ul>;
  }
}
