import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Game from './pages/Game';
import Ranking from './pages/Ranking';
import Settings from './pages/Settings';
import Feedback from './pages/Feedback';
<<<<<<< HEAD
=======
import Login from './pages/Login';
>>>>>>> main-group-7
import './App.css';

export default function App() {
  return (
    <Switch>
<<<<<<< HEAD
      <Route path="/feedback" component={ Feedback } />
      <Route path="/ranking" component={ Ranking } />
=======
>>>>>>> main-group-7
      <Route path="/game" component={ Game } />
      <Route path="/ranking" component={ Ranking } />
      <Route path="/settings" component={ Settings } />
      <Route path="/feedback" component={ Feedback } />
      <Route path="/" component={ Login } />
    </Switch>
  );
}
