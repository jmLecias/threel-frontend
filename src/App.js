import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Login from './Login';
import Register from './Register';
import Player from './Player';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/player" element={<Player />} /> {/* Testing only */}
      </Routes>
    </Router>
  );
}

export default App;
