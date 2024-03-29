import {useEffect} from 'react';
import './css/App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Login from './pages/LoginPage';
import Register from './pages/RegisterPage';
import Player from './pages/PlayerPage';
import AdminDashboard from './pages/AdminDashboardPage';
import NotFoundPage from './pages/PageNotFound';

import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./hooks/useAuth";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route index element={ <Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/adminboard" element={<AdminDashboard />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Player />
              </ProtectedRoute>
            }
          />
          {/* Should use a different view for routes not found */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
