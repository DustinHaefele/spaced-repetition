import React, { Component } from 'react';
import Button from '../../components/Button/Button';
import WordList from '../../components/WordList/WordList';
import MyLanguage from '../../components/MyLanguage/MyLanguage';


class DashboardRoute extends Component {
  render() {
    return (
      <section>
          <MyLanguage />
          <WordList />
          <Button type='button'>
            Start Learning
          </Button>

      </section>
    );
  }
}

export default DashboardRoute
