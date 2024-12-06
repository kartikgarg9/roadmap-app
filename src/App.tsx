import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';

import QuizApp from './components/QuizApp';

import QuizTopics from './components/QuizTopics';

const App: React.FC = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/home" element={<QuizTopics />} />
        <Route path="/quiz/:category" element={<QuizApp />} />
      </Routes>
    </Router>
  );
};

export default App;
