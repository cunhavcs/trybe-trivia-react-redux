import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Ranking extends Component {
  render() {
    return (
      <button
        type="button"
        data-testid="btn-go-home"
        onClick={ () => {
          const { history } = this.props;
          history.push('/');
        } }
      >
        Home
      </button>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
