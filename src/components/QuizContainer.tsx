import React, { useState, useEffect } from "react";
import MCQProgress from "./McqQuizProgress";
import QuestionMCQCard from "./QuestionCardMcq";

type Question = {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
};

type QuestionsData = {
  [key: string]: Question[];
};

const QuizContainer = () => {
  const [questions, setQuestions] = useState<QuestionsData>({});
  const [currentCategory, setCurrentCategory] = useState<string>("react");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch("/questionMcq.json");
        const data: QuestionsData = await response.json();
        setQuestions(data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch questions:", error);
      }
    };

    fetchQuestions();
  }, []);

  if (loading) return <div>Loading questions...</div>;

  const categoryQuestions = questions[currentCategory] || [];
  const totalQuestions = categoryQuestions.length;
  const currentQuestion = categoryQuestions[currentQuestionIndex];

  const handleCategoryChange = (category: string) => {
    setCurrentCategory(category);
    setCurrentQuestionIndex(0);
  };

  const handleOptionSelect = (isCorrect: boolean) => {
    console.log(isCorrect ? "Correct Answer!" : "Wrong Answer!");
    setTimeout(() => {
      if (currentQuestionIndex < totalQuestions - 1) {
        setCurrentQuestionIndex((prev) => prev + 1);
      }
    }, 500); // Small delay for user to see feedback
  };

  return (
    <div className="quiz-container">
      <div className="category-selector">
        {["react", "nextjs", "git"].map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryChange(category)}
            className={`btn ${currentCategory === category ? "active" : ""}`}
          >
            {category}
          </button>
        ))}
      </div>

      <MCQProgress
        currentQuestionIndex={currentQuestionIndex}
        totalQuestions={totalQuestions}
      />

      {currentQuestion && (
        <QuestionMCQCard
          question={currentQuestion.question}
          options={currentQuestion.options}
          correctAnswer={currentQuestion.correctAnswer}
          onOptionSelect={handleOptionSelect} // Pass result to parent
        />
      )}
    </div>
  );
};

export default QuizContainer;
