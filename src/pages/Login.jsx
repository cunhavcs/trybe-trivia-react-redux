import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../redux/actions/actions';

class Login extends Component {
  state = {
    player: '',
    email: '',
    disable: true,
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    }, () => {
      const { player, email } = this.state;
      if (player !== '' && email !== '') {
        this.setState({
          disable: false,
        });
      } else {
        this.setState({
          disable: true,
        });
      }
    });
  };

  handleClick = async () => {
    const { history, dispatch } = this.props;
    const { player, email } = this.state;
    const linkAPI = 'https://opentdb.com/api_token.php?command=request';
    const fetchTrivia = await fetch(linkAPI);
    const response = await fetchTrivia.json();
    localStorage.setItem('token', response.token);
    dispatch(loginUser({ player, email }));
    history.push('/game');
  };

  render() {
    const { disable, player, email } = this.state;
    return (
      <div>
        <input
          type="text"
          data-testid="input-player-name"
          value={ player }
          name="player"
          onChange={ this.handleChange }
        />
        <input
          type="email"
          data-testid="input-gravatar-email"
          value={ email }
          name="email"
          onChange={ this.handleChange }
        />
        <button
          type="button"
          data-testid="btn-play"
          disabled={ disable }
          onClick={ this.handleClick }
        >
          Play
        </button>
        <button
          type="button"
          data-testid="btn-settings"
          onClick={ () => {
            const { history } = this.props;
            history.push('/settings');
          } }
        >
          Settings

        </button>
      </div>
    );
  }
}

export default connect()(Login);

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
