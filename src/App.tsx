import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthProvider"; // Import Auth context
import Header from "./components/Header";
import QuizApp from "./components/QuizApp";
import QuizTopics from "./components/QuizTopics";
import QuizContainer from "./components/QuizContainer";
import Login from "./components/LoginPage";
import McqQuizTopics from "./components/McqQuizTopic";
import HomeTopics from "./components/HomeTopics";
import StudyMaterialPage from "./components/StudyMaterialPage";
import StudyMaterialTopics from "./components/StudyMaterialTopics";

const App: React.FC = () => {
  const { user, loading } = useAuth(); // Get user and loading from AuthProvider

  if (loading) {
    return <div>Loading...</div>; // Show a loading screen while checking auth
  }

  return (
    <Router>
      {user && <Header />} {/* Show Header only if user is logged in */}
      <Routes>
        {/* Public Routes */}
        {!user && (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </>
        )}

        {/* Protected Routes */}
        {user && (
          <>
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route path="/home" element={<HomeTopics />} /> {/* Add HomeTopics */}
            <Route path="/mquiz" element={<McqQuizTopics />} />
            <Route path="/mcqquiz/:topic" element={<QuizContainer />} />
            <Route path="/quiz/:category" element={<QuizApp />} />
            <Route path="/topics" element={<QuizTopics />} />
            <Route path="/study-material" element={<StudyMaterialTopics />} />
            <Route path="/study-material/:topicId" element={<StudyMaterialPage />} />

            <Route path="*" element={<Navigate to="/home" replace />} />
          </>
        )}
      </Routes>
    </Router>
  );
};

export default App;
