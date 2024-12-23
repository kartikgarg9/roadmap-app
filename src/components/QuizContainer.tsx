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
  const { topic } = useParams();
  const [questions, setQuestions] = useState<QuestionsData>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<boolean[]>([]); // Track user answers
  const [score, setScore] = useState<number>(0); // Final score
  const [loading, setLoading] = useState<boolean>(true);
  const [isQuizComplete, setIsQuizComplete] = useState<boolean>(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch("/questionMcq.json");
        const data: QuestionsData = await response.json();
        setQuestions(data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch questions:", error);
        setLoading(false); // Ensure loading stops even on error
      }
    };

    fetchQuestions();
  }, []);

  // Handle answer selection
  const handleOptionSelect = (isCorrect: boolean) => {
    setUserAnswers((prevAnswers) => {
      const updatedAnswers = [...prevAnswers];
      updatedAnswers[currentQuestionIndex] = isCorrect;
      return updatedAnswers;
    });

    // Transition to next question with delay
    setTimeout(() => {
      if (currentQuestionIndex < totalQuestions - 1) {
        setCurrentQuestionIndex((prev) => prev + 1); // Move to next question
      } else {
        setIsQuizComplete(true);
        calculateScore();
      }
    }, 500); // Delay added for better feedback
  };

  // Calculate score
  const calculateScore = () => {
    const correctAnswersCount = userAnswers.filter((answer) => answer).length;
    const percentage = (correctAnswersCount / totalQuestions) * 100;
    setScore(percentage);
  };

  // Determine category questions based on topic
  const categoryQuestions = topic ? questions[topic] || [] : [];
  const totalQuestions = categoryQuestions.length;

  if (loading) return <div>Loading questions...</div>;

  const currentQuestion = categoryQuestions[currentQuestionIndex];

  return (
    <div className="quiz-container">
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => window.history.back()} // Go back to quiz topics
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          Back to Quiz Topics
        </button>
      </div>

      <MCQProgress
        currentQuestionIndex={currentQuestionIndex}
        totalQuestions={totalQuestions}
      />

      {!isQuizComplete && currentQuestion && (
        <QuestionMCQCard
          question={currentQuestion.question}
          options={currentQuestion.options}
          correctAnswer={currentQuestion.correctAnswer}
          onOptionSelect={handleOptionSelect}
        />
      )}

      {isQuizComplete && (
        <div className="score-display text-center">
          <h2 className="text-3xl font-bold mb-4">Quiz Completed!</h2>
          <p className="text-xl">
            Your Score: {score.toFixed(2)}%
          </p>

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
