import PropTypes from 'prop-types';
import React, { Component } from 'react';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';
import teste from '../assets/teste.png';

class Feedback extends Component {
  state = {
    number: 3,
  };

  render() {
    const { number } = this.state;
    const { name, email, history, score, assertions } = this.props;

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
        <section>
          {
            assertions < number && assertions >= 0
              ? <p data-testid="feedback-text">Could be better... </p>
              : <p data-testid="feedback-text">Well Done!</p>
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
  score: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  assertions: PropTypes.number.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps)(Feedback);
