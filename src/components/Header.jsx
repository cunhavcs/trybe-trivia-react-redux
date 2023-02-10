import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';

class Header extends Component {
  render() {
    const { player, email } = this.props;
    return (
      <div>
        <img data-testid="header-profile-picture" src={ `https://www.gravatar.com/avatar/${md5(email).toString()}` } alt="player avatar" />
        <h2 data-testid="header-player-name">{player}</h2>
        <h2 data-testid="header-score">0</h2>
      </div>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  player: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  player: state.user.player,
  email: state.user.email,
});

export default connect(mapStateToProps)(Header);
