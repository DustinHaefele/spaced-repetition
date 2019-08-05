import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Button from '../../components/Button/Button';
import WordList from '../../components/WordList/WordList';
import MyLanguage from '../../components/MyLanguage/MyLanguage';


class DashboardRoute extends Component {
  render() {
    return (
      <section>
          <MyLanguage />
          <WordList />
          <Link to='/learn'>
            <Button type='button'>
              Start Learning
            </Button>
          </Link>
          <p>Total Score: {this.context.language.total_score}</p>
      </section>
    );
  }
}

export default DashboardRoute
