import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addScore } from '../redux/actions/actions';

class Ask extends Component {
  state = {
    timer: 29,
  };

  componentDidMount() {
    const TIMER = 1000;
    const stopwatch = setInterval(() => {
      const { timer } = this.state;
      if (timer >= 1) {
        this.setState({ timer: timer - 1 }, () => {
          if (timer === 0) {
            clearInterval(stopwatch);
          }
        });
      }
    }, TIMER);
  }

  calcScore = () => {
    const { ask } = this.props;
    const { timer } = this.state;
    const difficulty = {
      easy: 1,
      medium: 2,
      hard: 3,
    };
    const BASE_SCORE = 10;
    const score = (BASE_SCORE + (timer * difficulty[ask.difficulty]));
    return score;
  };

  clisckAnswer = ({ target: { name } }) => {
    const { dispatch, handleClick } = this.props;
    if (name === 'correct') {
      dispatch(addScore(this.calcScore()));
      handleClick();
    } else {
      handleClick();
    }
  };

  render() {
    const { ask, wasAnswered, answers } = this.props;
    const { timer } = this.state;
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
              name={ (answer === ask.correct_answer) ? 'correct' : 'incorrect' }
              type="button"
              key={ index }
              data-testid={
                (answer === ask.correct_answer)
                  ? 'correct-answer'
                  : `wrong-answer-${index}`
              }
              style={ { border: wasAnswered
                 && ((answer === ask.correct_answer) ? correct : incorrect) } }
              onClick={ this.clisckAnswer }
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
  answers: PropTypes.shape({
    map: PropTypes.func.isRequired,
  }).isRequired,
  ask: PropTypes.shape({
    category: PropTypes.string.isRequired,
    correct_answer: PropTypes.string.isRequired,
    difficulty: PropTypes.string.isRequired,
    incorrect_answers: PropTypes.string.isRequired,
    question: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired,
  wasAnswered: PropTypes.bool.isRequired,
};

export default connect()(Ask);
