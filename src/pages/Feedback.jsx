import PropTypes from 'prop-types';
import React, { Component } from 'react';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';
import teste from '../assets/teste.png';
import { resetPlayer } from '../redux/actions/actions';

class Feedback extends Component {
  state = {
    number: 3,
  };

  render() {
    const { number } = this.state;
    const { name, email, history, score, assertions, dispatch } = this.props;

    return (
      <div>
        <section>
          <img src={ teste } alt="teste" />
        </section>
        <section>
          <figure>
            <img
              src={ `https://www.gravatar.com/avatar/${md5(email).toString()}` }
              alt=""
              data-testid="header-profile-picture"
            />
            <h1
              data-testid="header-player-name"
            >
              { name }
            </h1>
          </figure>
        </section>
        <section>
          <p data-testid="header-score">{score}</p>
        </section>
        <section data-testid="feedback-text">
          {
            assertions < number && assertions >= 0
              ? <p>Could be better...</p>
              : <p>Well Done!</p>
          }
        </section>
        <p data-testid="feedback-total-question">{assertions}</p>
        <p data-testid="feedback-total-score">{score}</p>
        <div>
          <button
            data-testid="btn-ranking"
            onClick={ () => {
              history.push('/ranking');
            } }
          >
            VER RANKING
          </button>
          <button
            onClick={ () => {
              history.push('/game');
            } }
          >
            JOGAR NOVAMENTE
          </button>
          <button
            type="button"
            data-testid="btn-play-again"
            onClick={ () => {
              dispatch(resetPlayer());
              history.push('/');
            } }
          >
            Play Again
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.player.name,
  email: state.player.email,
  score: state.player.score,
  assertions: state.player.assertions,
  notHit: state.player.notHit,
});

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Feedback);
