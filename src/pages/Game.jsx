import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Ask from '../components/Ask';

class Game extends Component {
  state = {
    currentAsk: 0,
    asks: [],
    token: localStorage.getItem('token'),
    wasAnswered: false,
  };

  componentDidMount() {
    const { token } = this.state;
    const TIMER_TO_ANSWER = 30000;
    this.fetchAsks(token);
    setTimeout(() => {
      this.setState({ wasAnswered: true });
    }, TIMER_TO_ANSWER);
  }

  shuffleAnswer = () => {
    const { currentAsk, asks } = this.state;
    const ask = asks[currentAsk];
    const answers = [...ask.incorrect_answers];
    answers.splice(
      Math.floor(Math.random() * (ask.incorrect_answers.length + 1)),
      0,
      ask.correct_answer,
    );
    return answers;
  };

  fetchAsks = async (token) => {
    const { history } = this.props;
    const data = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
    const asks = await data.json();
    if (asks.response_code !== 0) {
      localStorage.removeItem('token');
      history.push('/');
    }
    this.setState({
      asks: asks.results,
    });
  };

  handleClick = () => {
    this.setState({ wasAnswered: true });
  };

  nextAsk = () => {
    const { currentAsk, asks } = this.state;
    const { history } = this.props;
    if (currentAsk < asks.length - 1) {
      this.setState(
        {
          currentAsk: currentAsk + 1,
          wasAnswered: false,
        },
      );
    } else {
      history.push('/feedback');
    }
  };

  render() {
    const { asks, currentAsk, wasAnswered } = this.state;
    return (
      <>
        <Header />
        {(asks.length !== 0)
        && <Ask
          ask={ asks[currentAsk] }
          answers={ this.shuffleAnswer() }
          wasAnswered={ wasAnswered }
          handleClick={ this.handleClick }
          nextAsk={ this.nextAsk }
        />}
      </>
    );
  }
}

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect()(Game);
