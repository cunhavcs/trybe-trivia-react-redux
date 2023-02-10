import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class Ask extends Component {
  state = {
    answers: [],
    timer: 29,
  };

  componentDidMount() {
    const { ask } = this.props;
    const answers = [...ask.incorrect_answers];
    const TIMER = 1000;
    answers.splice(
      Math.floor(Math.random() * (ask.incorrect_answers.length + 1)),
      0,
      ask.correct_answer,
    );
    this.setState({ answers });
    const stopwatch = setInterval(() => {
      const { timer } = this.state;
      this.setState({ timer: timer - 1 }, () => {
        if (timer === 0) {
          clearInterval(stopwatch);
        }
      });
    }, TIMER);
  }

  render() {
    const { ask, wasAnswered, handleClick } = this.props;
    const { answers, timer } = this.state;
    const correct = '3px solid rgb(6, 240, 15)';
    const incorrect = '3px solid red';

    return (
      <div>
        <h3>{timer}</h3>
        <h3 data-testid="question-category">{ask.category}</h3>
        <h2 data-testid="question-text">{ask.question}</h2>
        <div data-testid="answer-options">
          {answers.map((answer, index) => (
            <button
              type="button"
              key={ index }
              data-testid={
                (answer === ask.correct_answer)
                  ? 'correct-answer'
                  : `wrong-answer-${index}`
              }
              style={ { border: wasAnswered
                 && ((answer === ask.correct_answer) ? correct : incorrect) } }
              onClick={ handleClick }
              disabled={ wasAnswered }
            >
              {answer}
            </button>
          ))}
        </div>
      </div>
    );
  }
}

Ask.propTypes = {
  ask: PropTypes.shape({
    category: PropTypes.string.isRequired,
    correct_answer: PropTypes.string.isRequired,
    incorrect_answers: PropTypes.arrayOf(String).isRequired,
    question: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  }).isRequired,
  handleClick: PropTypes.func.isRequired,
  wasAnswered: PropTypes.bool.isRequired,
};
