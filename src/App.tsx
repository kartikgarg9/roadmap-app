import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useAuth } from "./context/AuthProvider"; // Import Auth context
import Header from "./components/Header";

import QuizApp from "./components/QuizApp";
import QuizTopics from "./components/QuizTopics";
import QuizContainer from "./components/QuizContainer";
import Login from "./components/LoginPage";
import McqQuizTopics from "./components/McqQuizTopic";

const App: React.FC = () => {
  const { user, loading } = useAuth(); // Get user and loading from AuthProvider

  if (loading) {
    return <div>Loading...</div>; // Show a loading screen while checking auth
  }

  return (
    <Router>
      {user && <Header />} {/* Show Header only if user is logged in */}
      <Routes>
        {!user ? (
          // Routes for non-logged-in users
          <Route path="*" element={<Login />} />
        ) : (
          // Routes for logged-in users
          <>
            <Route path="/mquiz" element={<McqQuizTopics />} />
            <Route path="/mcqquiz/:topic" element={<QuizContainer />} />
            <Route path="/" element={<QuizTopics />} />
            <Route path="/home" element={<QuizTopics />} />
            <Route path="/quiz/:category" element={<QuizApp />} />
          </>
        )}
      </Routes>
    </Router>
  );
};

export default App;
