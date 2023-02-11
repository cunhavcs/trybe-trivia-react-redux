import PropTypes from 'prop-types';
import React, { Component } from 'react';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';
import teste from '../assets/teste.png';

class Feedback extends Component {
  state = {
    result: 4,
    number: 1,
  };

  render() {
    const { result, number } = this.state;
    const { player, email, history } = this.props;
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
              { player }
            </h1>
          </figure>
        </section>
        <section>
          <p data-testid="header-score">{result}</p>
        </section>
        <section>
          {
            result < number
              ? <p data-testid="feedback-text">Could be better...</p>
              : <p data-testid="feedback-text">Well Done!</p>
          }
        </section>
        <section>
          <p>{`Você acertou ${result} questões!`}</p>
          <p>{`Um total de ${number} pontos`}</p>
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
  player: state.user.player,
  email: state.user.email,
});

export default connect(mapStateToProps)(Feedback);

Feedback.propTypes = {
  player: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
