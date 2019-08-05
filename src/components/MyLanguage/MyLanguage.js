import React from 'react';
import UserContext from '../../contexts/UserContext';

class MyLanguage extends React.Component {

  static contextType = UserContext;

  render(){
    if(this.context.language) {
      return <h2>{this.context.language.name}</h2>
    } else{
      return <></>
    }
  }
}

export default MyLanguage;