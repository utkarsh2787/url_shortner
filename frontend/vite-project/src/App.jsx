import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header.jsx';
import HomePage from './pages/homePage.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import AuthWrapper from './components/AuthWrapper.jsx';

function App() {
  return (
    <AuthWrapper>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </AuthWrapper>
  );
}

export default App;