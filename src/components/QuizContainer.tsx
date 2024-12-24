import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import MCQProgress from "./McqQuizProgress";
import QuestionMCQCard from "./QuestionCardMcq";

type Question = {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
};

type QuestionsData = {
  [key: string]: Question[]; // Maps topic to an array of questions
};

const QuizContainer: React.FC = () => {
  const { topic } = useParams(); // Get the topic from the URL parameter
  const [questions, setQuestions] = useState<QuestionsData>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<boolean[]>([]); // Track user's answers (true for correct, false for incorrect)
  const [score, setScore] = useState<number>(0); // Final score
  const [loading, setLoading] = useState<boolean>(true);
  const [isQuizComplete, setIsQuizComplete] = useState<boolean>(false); // Track if quiz is complete
  const [isAnswering, setIsAnswering] = useState<boolean>(false); // Lock answering state while transitioning
  const [showAnswerFeedback, setShowAnswerFeedback] = useState<boolean>(false); // Show answer feedback before proceeding

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch("/questionMcq.json");
        const data: QuestionsData = await response.json();
        setQuestions(data);

        setLoading(false);
      } catch (error) {

        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  const handleOptionSelect = (isCorrect: boolean) => {


    // Update user answers for the current question
    setUserAnswers((prevAnswers) => {
      const updatedAnswers = [...prevAnswers];
      updatedAnswers[currentQuestionIndex] = isCorrect;

      return updatedAnswers;
    });

    // Lock the answering state while showing feedback
    setIsAnswering(true);
    setShowAnswerFeedback(true);

    // Wait for feedback before moving to the next question
    setTimeout(() => {
      // Move to the next question or complete the quiz
      if (currentQuestionIndex < totalQuestions - 1) {
        const nextIndex = currentQuestionIndex + 1;
        setCurrentQuestionIndex(nextIndex);

      } else {
        // Mark quiz as complete
        setIsQuizComplete(true);
      }

      // Reset feedback state and allow answering again
      setShowAnswerFeedback(false);
      setIsAnswering(false);
    }, 1500); // Delay for answer feedback (1.5s)
  };

  // Calculate score when quiz is complete or userAnswers changes
  useEffect(() => {
    if (isQuizComplete) {
      const correctAnswersCount = userAnswers.filter((answer) => answer).length;
      const percentage = (correctAnswersCount / totalQuestions) * 100;
      setScore(percentage);

    }
  }, [isQuizComplete, userAnswers]);

  const categoryQuestions = topic ? questions[topic] || [] : []; // Get questions for the current topic
  const totalQuestions = categoryQuestions.length;



  if (loading) return <div>Loading questions...</div>;

  if (!categoryQuestions.length) {
    return <div>No questions available for this topic.</div>;
  }

  const currentQuestion = categoryQuestions[currentQuestionIndex];

  return (
    <div className="quiz-container">
      {/* Back to Categories Button */}
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => window.history.back()} // Go back to the quiz topics list
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          Back to Quiz Topics
        </button>
      </div>

      {/* Progress Bar */}
      <MCQProgress
        userAnswers={userAnswers} // Pass the userAnswers array to calculate progress
        totalQuestions={totalQuestions}
      />

      {/* Current Question */}
      {!isQuizComplete && currentQuestion && (
        <QuestionMCQCard
          key={currentQuestion.id} // Ensure unique key for re-render
          question={currentQuestion.question}
          options={currentQuestion.options}
          correctAnswer={currentQuestion.correctAnswer}
          onOptionSelect={handleOptionSelect}
          isAnswering={isAnswering} // Pass answering state to disable buttons
          showAnswerFeedback={showAnswerFeedback} // Pass the feedback state to show correct answer
        />
      )}

      {/* Score Display */}
      {isQuizComplete && (
        <div className="score-display text-center">
          <h2 className="text-3xl font-bold mb-4">Quiz Completed!</h2>
          <p className="text-xl">
            Your Score: {score.toFixed(2)}%
          </p>

          {/* Celebration if score is above 70% */}
          {score >= 70 ? (
            <div className="celebration mt-6 text-2xl font-bold text-green-600">
              <p>🎉 Congratulations! You passed with flying colors! 🎉</p>
            </div>
          ) : (
            <div className="try-again mt-6 text-2xl font-bold text-red-600">
              <p>Oops! Better luck next time!</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default QuizContainer;
