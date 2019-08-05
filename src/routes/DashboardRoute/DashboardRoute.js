import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Button from '../../components/Button/Button';
import WordList from '../../components/WordList/WordList';
import MyLanguage from '../../components/MyLanguage/MyLanguage';
import UserContext from '../../contexts/UserContext';

class DashboardRoute extends Component {

  static contextType = UserContext;
  
  render() {
    console.log(this.context);
    return (
      <section>
          <MyLanguage />
          <WordList />
          <Link to='/learn'>
            <Button type='button'>
              Start Learning
            </Button>
          </Link>
          {this.context.language && (<p>Total Score: {this.context.language.total_score}</p>) }
      </section>
    );
  }
}

export default DashboardRoute
