import React, { Component } from 'react';

export default class Login extends Component {
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
        <button type="button" data-testid="btn-play" disabled={ disable }>Play</button>
      </div>
    );
  }
}
