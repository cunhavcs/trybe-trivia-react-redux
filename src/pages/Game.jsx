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
  };

  componentDidMount() {
    const { token } = this.state;
    this.fetchAsks(token);
  }

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

  render() {
    const { asks, currentAsk } = this.state;
    return (
      <>
        <Header />
        {(asks.length !== 0) && <Ask ask={ asks[currentAsk] } />}
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
