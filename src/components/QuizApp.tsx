import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import QuizProgress from "../components/QuizProgress";
import QuestionCard from "../components/QuestionCard";

type Question = {
  question: string;
  answer: string;
};

type Progress = {
  knew: number;
  learnt: number;
  skipped: number;
};

const QuizApp: React.FC = () => {
  const { category } = useParams<{ category: string }>();

  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [revealedAnswers, setRevealedAnswers] = useState<boolean[]>([]);
  const [progress, setProgress] = useState<Record<string, Progress>>({
    javascript: { knew: 0, learnt: 0, skipped: 0 },
    python: { knew: 0, learnt: 0, skipped: 0 },
    react: { knew: 0, learnt: 0, skipped: 0 },
    node: { knew: 0, learnt: 0, skipped: 0 },
  });

  // Fetch questions based on category
  useEffect(() => {
    if (category) {
      const fetchedQuestions = fetchQuestionsByCategory(category);
      setQuestions(fetchedQuestions);
      setRevealedAnswers(new Array(fetchedQuestions.length).fill(false));
    }
  }, [category]);

  const fetchQuestionsByCategory = (category: string): Question[] => {
    switch (category) {
      case "javascript":
        return [
          { question: "What is JavaScript?", answer: "JavaScript is a programming language." },
          { question: "What is a function?", answer: "A function is a block of code that performs a specific task." },
        ];
      case "python":
        return [
          { question: "What is Python?", answer: "Python is a programming language." },
          { question: "What is a list?", answer: "A list is a collection of items in Python." },
        ];
      case "react":
        return [
          { question: "What is React?", answer: "React is a JavaScript library for building user interfaces." },
          { question: "What is a component?", answer: "A component is a reusable piece of UI in React." },
        ];
      case "node":
        return [
          { question: "What is Node.js?", answer: "Node.js is a JavaScript runtime environment." },
          { question: "What is npm?", answer: "npm is the Node.js package manager." },
        ];
      default:
        return [];
    }
  };

  const handleAction = (type: "knew" | "learnt" | "skipped") => {
    if (!category) return;

    // Update progress for the current category
    setProgress((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [type]: prev[category][type] + 1,
      },
    }));

    // Move to the next question
    setCurrentIndex((prevIndex) => (prevIndex + 1) % questions.length);
  };

  const revealAnswer = () => {
    const updatedAnswers = [...revealedAnswers];
    updatedAnswers[currentIndex] = true;
    setRevealedAnswers(updatedAnswers);
  };

  // Reset function to clear progress and reset quiz
  const resetQuiz = () => {
    setProgress({
      javascript: { knew: 0, learnt: 0, skipped: 0 },
      python: { knew: 0, learnt: 0, skipped: 0 },
      react: { knew: 0, learnt: 0, skipped: 0 },
      node: { knew: 0, learnt: 0, skipped: 0 },
    });
    setCurrentIndex(0);
    setRevealedAnswers(new Array(questions.length).fill(false));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      {/* Quiz Progress */}
      {category && (
        <QuizProgress
          knew={progress[category]?.knew || 0}
          learnt={progress[category]?.learnt || 0}
          skipped={progress[category]?.skipped || 0}
          total={questions.length}
          category={category}
          onReset={resetQuiz} // Pass resetQuiz function as prop
        />
      )}

      {/* Question Card */}
      {questions.length > 0 && (
        <div className="mt-8 w-full flex justify-center">
          <QuestionCard
            question={questions[currentIndex].question}
            answer={questions[currentIndex].answer}
            isAnswerRevealed={revealedAnswers[currentIndex]}
            onRevealAnswer={revealAnswer}
            onSkip={() => handleAction("skipped")}
            onKnow={() => handleAction("knew")}
            onDontKnow={() => handleAction("learnt")}
          />
        </div>
      )}
    </div>
  );
};

export default QuizApp;
