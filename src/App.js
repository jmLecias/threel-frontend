import React from 'react';
import './css/App.css';
import 'chart.js/auto'; // VERY IMPORTANT
import 'react-pro-sidebar/dist/css/styles.css'; // VERY IMPORTANT
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import Login from './pages/Authentication/LoginPage';
import Register from './pages/Authentication/RegisterPage';
import NotFoundPage from './pages/Others/PageNotFound';
import Admin from './pages/Admin/Admin';
import Listener from './pages/Listener/Listener';

import AdminRoute from './components/Route/AdminRoute';
import PublicRoute from './components/Route/PublicRoute';

import { AuthProvider } from "./hooks/useAuth";
import { ArtistProvider } from './hooks/useArtist';
import { UserProvider } from './hooks/useUser';
import { ItemProvider } from './hooks/useItem';



function App() {
  return (
    <Router>
      <AuthProvider>
      <ArtistProvider>
      <UserProvider>
      <ItemProvider>
        <Routes>
          <Route index element={<Listener content={'explore'}/>} />
          <Route path="/play" element={<Listener content={'play'}/>} /> 
          <Route path="/register" element={<PublicRoute><Register/></PublicRoute>} />
          <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
          <Route path="/admin/*" element={
            <AdminRoute>
              <Routes>
                <Route path="dashboard" element={<Admin content={'dashboard'} />} />
                <Route path="listeners/*" element={
                  <Routes>
                    <Route path="/" element={<Admin content={'listenersList'} />} />
                    <Route path="profile" element={<Admin content={'listenerProfile'} />} />
                    <Route path="*" element={<Admin content={'not_found'} />} />
                  </Routes>
                } />
                <Route path="music" element={<Admin content={'music'} />} />
                <Route path="podcasts" element={<Admin content={'podcasts'} />} />
                <Route path="videocasts" element={<Admin content={'videocasts'} />} />
                <Route path="pricing" element={<Admin content={'pricing'} />} />
                <Route path="*" element={<Admin content={'not_found'} />} />
              </Routes>
            </AdminRoute>
          } />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </ItemProvider>
      </UserProvider>
      </ArtistProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
