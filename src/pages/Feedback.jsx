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
    const { name, email, history, score, hit } = this.props;
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
            hit >= number
              ? <p>Well Done!</p>
              : <p>Could be better... </p>
          }
        </section>
        <section>
          <p>{`Você acertou ${hit} questões!`}</p>
          <p>{`Um total de ${score} pontos`}</p>
        </section>
        <div>
          <button
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
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.player.name,
  email: state.player.email,
  score: state.player.score,
  hit: state.player.hit,
  notHit: state.player.notHit,
});

export default connect(mapStateToProps)(Feedback);

Feedback.propTypes = {
  score: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  hit: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
