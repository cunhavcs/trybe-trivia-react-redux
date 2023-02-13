import React, { Component } from 'react';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';
import { resetPlayer } from '../redux/actions/actions';

class Ranking extends Component {
  state = {
    ranking: JSON.parse(localStorage.getItem('ranking')) || [],
  };

  render() {
    const { ranking } = this.state;

    return (
      <>
        <div>
          <h1 data-testid="ranking-title">Title</h1>
        </div>
        {ranking.sort((a, b) => b.score - a.score)
          .map(({ name, email, score }, index) => (
            <div key={ email }>
              <img src={ `https://www.gravatar.com/avatar/${md5(email).toString()}` } alt="" />
              <p data-testid={ `player-name-${index}` }>{name}</p>
              <p data-testid={ `player-score-${index}` }>{score}</p>
            </div>
          ))}
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ () => {
            const { dispatch, history } = this.props;
            dispatch(resetPlayer());
            history.push('/');
          } }
        >
          Home
        </button>
      </>
    );
  }
}

Ranking.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect()(Ranking);
