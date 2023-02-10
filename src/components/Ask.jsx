import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class Ask extends Component {
  render() {
    const { ask } = this.props;
    const answers = [...ask.incorrect_answers];
    console.log(answers);
    answers.splice(
      Math.floor(Math.random() * (ask.incorrect_answers.length + 1)),
      0,
      ask.correct_answer,
    );
    console.log(answers);
    console.log(ask);

    return (
      <div>
        <h3 data-testid="question-category">{ask.category}</h3>
        <h2 data-testid="question-text">{ask.question}</h2>
        <div data-testid="answer-options">
          {answers.map((answer, index) => (
            <button
              key={ index }
              data-testid={
                (answer === ask.correct_answer)
                  ? 'correct-answer'
                  : `wrong-answer-${index}`
              }
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
};
