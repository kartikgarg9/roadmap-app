import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import QuizApp from './components/QuizApp';
import Login from './components/LoginPage';

const App: React.FC = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/quiz/:category" element={<QuizApp />} />
      </Routes>
    </Router>
  );
};

export default App;
