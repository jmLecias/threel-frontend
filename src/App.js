import { useEffect } from 'react';
import './css/App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import Login from './pages/Authentication/LoginPage';
import Register from './pages/Authentication/RegisterPage';
import Player from './pages/User/PlayerPage';
import AdminDashboard from './pages/Others/AdminDashboardPage';
import AdminArtistList from './pages/Others/AdminArtistListPage';
import AdminListenerList from './pages/Others/AdminListenerListPage';
import NotFoundPage from './pages/Others/PageNotFound';
import Admin from './pages/Admin/Admin';

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
          <Route path="/admin/*" element={
            <Routes>
              <Route path="dashboard" element={<Admin content={'dashboard'} />} />
              <Route path="listeners/*" element={
                <Routes>
                  <Route path="/" element={<Admin content={'listenersList'} />} />
                  <Route path="profile" element={<Admin content={'listenerProfile'} />} />
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              } />
              <Route path="music" element={<Admin content={'music'} />} />
              <Route path="podcasts" element={<Admin content={'podcasts'} />} />
              <Route path="videocasts" element={<Admin content={'videocasts'} />} />
              <Route path="pricing" element={<Admin content={'pricing'} />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          } />
          <Route path="/artistlist" element={
            <ProtectedRoute>
              <AdminArtistList />
            </ProtectedRoute>
          } />
          <Route path="/listenerlist" element={
            <ProtectedRoute>
              <AdminListenerList />
            </ProtectedRoute>
          } />
          {/* <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Player />
              </ProtectedRoute>
            }
          /> */}
          {/* Should use a different view for routes not found */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
