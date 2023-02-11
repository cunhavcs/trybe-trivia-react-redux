import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';

class Header extends Component {
  render() {
    const { player, email, score } = this.props;
    return (
      <div>
        <img data-testid="header-profile-picture" src={ `https://www.gravatar.com/avatar/${md5(email).toString()}` } alt="player avatar" />
        <h2 data-testid="header-player-name">{player}</h2>
        <h2 data-testid="header-score">{score}</h2>
      </div>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  player: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  player: state.player.name,
  email: state.player.email,
  score: state.player.score,
});

export default connect(mapStateToProps)(Header);
