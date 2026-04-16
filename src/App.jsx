import { useState } from "react";
import WelcomeScreen from "./components/WelcomeScreen";
import QuestionScreen from "./components/QuestionScreen";
import ThankYouScreen from "./components/ThankYouScreen";
import { questions } from "./data/questions";

const generateSessionId = () => Date.now().toString();

export default function App() {
  const [step, setStep] = useState("welcome");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [sessionId, setSessionId] = useState(null);

  const startSurvey = () => {
    setSessionId(generateSessionId());
    setStep("survey");
  };

  const handleAnswer = (questionId, value) => {
    setAnswers((prev) => {
      const existing = prev.find((a) => a.questionId === questionId);
      if (existing) {
        return prev.map((a) =>
          a.questionId === questionId ? { ...a, answer: value } : a
        );
      }
      return [...prev, { questionId, answer: value }];
    });
  };

  const next = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      submitSurvey();
    }
  };

  const prev = () => {
    if (currentIndex > 0) setCurrentIndex((prev) => prev - 1);
  };

  const submitSurvey = () => {
    const confirmSubmit = window.confirm("Submit survey?");
    if (!confirmSubmit) return;

    const data = {
      sessionId,
      status: "COMPLETED",
      answers,
    };

    localStorage.setItem("survey_" + sessionId, JSON.stringify(data));
    setStep("thankyou");
  };

  if (step === "welcome") return <WelcomeScreen onStart={startSurvey} />;

  if (step === "survey")
    return (
      <QuestionScreen
        question={questions[currentIndex]}
        index={currentIndex}
        total={questions.length}
        onAnswer={handleAnswer}
        onNext={next}
        onPrev={prev}
      />
    );

  if (step === "thankyou")
    return (
      <ThankYouScreen
        onRestart={() => {
          setStep("welcome");
          setCurrentIndex(0);
          setAnswers([]);
        }}
      />
    );
}

