import React from 'react';
import './css/App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Login from './pages/Login';
import Register from './pages/Register';
import Player from './pages/Player';

import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./hooks/useAuth";

function App() {

  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route index element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Player />
              </ProtectedRoute>
            }
          />
          {/* Should use a different view for routes not found */}
          <Route path="*" element={<Login />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
