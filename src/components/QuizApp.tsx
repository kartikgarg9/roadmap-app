import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom"; // Import Link
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

  const [isQuizOver, setIsQuizOver] = useState(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      if (category) {
        try {
          const response = await fetch("/question.json");
          const data = await response.json();
          const fetchedQuestions = data[category] || [];
          setQuestions(fetchedQuestions);
          setRevealedAnswers(new Array(fetchedQuestions.length).fill(false));
          setIsQuizOver(false);
        } catch (error) {
          console.error("Failed to fetch questions:", error);
        }
      }
    };

    fetchQuestions();
  }, [category]);

  const handleAction = (type: "knew" | "learnt" | "skipped") => {
    if (!category) return;

    setProgress((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [type]: prev[category][type] + 1,
      },
    }));

    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    } else {
      setIsQuizOver(true);
    }
  };

  const revealAnswer = () => {
    const updatedAnswers = [...revealedAnswers];
    updatedAnswers[currentIndex] = true;
    setRevealedAnswers(updatedAnswers);
  };

  const resetQuiz = () => {
    setProgress({
      javascript: { knew: 0, learnt: 0, skipped: 0 },
      python: { knew: 0, learnt: 0, skipped: 0 },
      react: { knew: 0, learnt: 0, skipped: 0 },
      node: { knew: 0, learnt: 0, skipped: 0 },
    });
    setCurrentIndex(0);
    setRevealedAnswers(new Array(questions.length).fill(false));
    setIsQuizOver(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="flex w-full max-w-3xl flex-col items-center space-y-6">
        {/* Back to Categories Link */}
        <div className="w-full flex justify-start mb-4">
          <Link
            to="/home"
            className="text-blue-500 hover:underline text-lg flex items-center"
          >
            {"<"} Back to Categories
          </Link>
        </div>

        {/* Quiz Progress */}
        {category && (
          <QuizProgress
            knew={progress[category]?.knew || 0}
            learnt={progress[category]?.learnt || 0}
            skipped={progress[category]?.skipped || 0}
            total={questions.length}
            category={category}
            onReset={resetQuiz}
            isQuizOver={isQuizOver}
          />
        )}

        {/* Question Card */}
        {questions.length > 0 && !isQuizOver && (
          <div className="w-full flex justify-center">
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

        {/* Display a message if the quiz is over */}
        {isQuizOver && (
          <div className="mt-8 text-xl font-bold text-green-600">
            You have completed all the questions!
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizApp;
