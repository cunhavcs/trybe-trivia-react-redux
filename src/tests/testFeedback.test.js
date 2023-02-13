import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { act } from 'react-dom/test-utils';
import App from '../App';
import Feedback from '../pages/Feedback';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';

describe("Vamos testar a tela de feedback e se contem os arquivos necessários ", () => {
  it("verificar se contém a imagem do avatar na página", () => {
    renderWithRouterAndRedux(<Feedback />);
    const avatarImg = screen.getByTestId('header-profile-picture');
    expect(avatarImg).toBeInTheDocument();
  });

  it('Verificar se contém o nome do player na tela', () => {
    renderWithRouterAndRedux(<Feedback />);
    const nameAvatar = screen.getByTestId('header-player-name');
    expect(nameAvatar).toBeInTheDocument();
  });

  it('Verificar se contém o score do player', () => {
    renderWithRouterAndRedux(<Feedback />);
    const scoreAvatar = screen.getByTestId('header-score');
    expect(scoreAvatar).toBeInTheDocument();
  })

  it('Verificar se contém o texto de feedback do player', () => {
    const could = renderWithRouterAndRedux(<Feedback score={3} assertions={3}/>);
    const textToFeedback = screen.getByTestId('feedback-text');
    expect(textToFeedback).toBeInTheDocument();
  })

  it('Verificar se contém o total de questões que foram certas ou erradas', () => {
    renderWithRouterAndRedux(<Feedback />);
    const totalFeedbackToAssertions = screen.getByTestId('feedback-total-question');
    expect(totalFeedbackToAssertions).toBeInTheDocument();
  })

  it('Verificar se contém o total de score', () => {
    renderWithRouterAndRedux(<Feedback />);
    const totalScore = screen.getByTestId('feedback-total-score');
    expect(totalScore).toBeInTheDocument();
  })

  it('Verificando se a um botão VER RANKING leva para o ranking', () => {
    const initialState = {
      player: {
        name: '',
        assertions: 0,
        score: 0,
        email: '',
      }
    }
    const route = '/feedback'
    const { history } = renderWithRouterAndRedux(<App />, initialState, route)
    const button = screen.getByRole('button', { name:"VER RANKING"})
    expect(button).toBeInTheDocument();

    userEvent.click(button);

    const { pathname } = history.location
    expect(pathname).toBe('/ranking');
  })

  it('Verificando se a um botão Jogar novamente leva para o game', () => {
    const initialState = {
      player: {
        name: '',
        assertions: 0,
        score: 0,
        email: '',
      }
    }
    const route = '/feedback'
    const { history } = renderWithRouterAndRedux(<App />, initialState, route)
    const button = screen.getByRole('button', { name: "JOGAR NOVAMENTE" })
    expect(button).toBeInTheDocument();

    userEvent.click(button)

    const { pathname } = history.location
    expect(pathname).toBe('/game');
  })
  
  it('Verificando se a um botão playgain leva para a pagina inicial', () => {
    const initialState = {
      player: {
        name: '',
        assertions: 0,
        score: 0,
        email: '',
      }
    }
    const route = '/feedback'
    const { history } = renderWithRouterAndRedux(<App />, initialState, route)
    const button = screen.getByRole('button', { name: /play again/i })
    expect(button).toBeInTheDocument();

    userEvent.click(button)

    const { pathname } = history.location
    expect(pathname).toBe('/');
  })
});

