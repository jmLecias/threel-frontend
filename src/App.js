import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';

import Login from './Login';
import Register from './Register';
import Player from './Player';

function App() {
  const isUserLoggedIn = false;
  var lastRoute;

  return (
    <Router>
      <Routes>
        <Route path="/register" element={
            <Register />
          // <PrivateRoute isAuthenticated={!isUserLoggedIn}>
          // </PrivateRoute>
        } />
        <Route path="/login" element={
            <Login />
          // <PrivateRoute isAuthenticated={!isUserLoggedIn}>
          // </PrivateRoute>
        } />
        <Route path="/player" element={
            <Player />
          // <PrivateRoute isAuthenticated={isUserLoggedIn}>
          // </PrivateRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;
