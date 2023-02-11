import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Game from './pages/Game';
import Ranking from './pages/Ranking';
import Settings from './pages/Settings';
import Feedback from './pages/Feedback';
import Login from './pages/Login';
import './App.css';

export default function App() {
  return (
    <Switch>
      <Route path="/feedback" component={ Feedback } />
      <Route path="/ranking" component={ Ranking } />
      <Route path="/game" component={ Game } />
      <Route path="/ranking" component={ Ranking } />
      <Route path="/settings" component={ Settings } />
      <Route path="/feedback" component={ Feedback } />
      <Route path="/" component={ Login } />
    </Switch>
  );
}
