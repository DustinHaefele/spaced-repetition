import React from 'react';
import UserContext from '../../contexts/UserContext';


export default class WordList extends React.Component {

  static contextType = UserContext;
  
  renderWords() {
    const wordsArr = this.context.words.map((word, i) => {
      return (
      <li key={i}>
        <h4>{word.original}</h4>
        <p>correct answer count: {word.correct_count}</p>
        <p>incorrect answer count: {word.incorrect_count}</p>
      </li>);
    });
    return wordsArr;
  }

  render() {
    if(this.context.words){
      return <ul>{this.renderWords()}</ul>
    } else {return (<></>)} 
}
}