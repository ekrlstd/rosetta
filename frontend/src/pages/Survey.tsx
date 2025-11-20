import { useState } from "react";
import { Link } from "react-router-dom";
import DotGrid from "../components/DotGrid";

export default function Survey() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});

  const questions = [
    {
      id: 0,
      question: "How satisfied are you with our service?",
      options: ["Very Satisfied", "Satisfied", "Neutral", "Dissatisfied", "Very Dissatisfied"]
    },
    {
      id: 1,
      question: "How likely are you to recommend us?",
      options: ["Very Likely", "Likely", "Neutral", "Unlikely", "Very Unlikely"]
    },
    {
      id: 2,
      question: "What is your primary use case?",
      options: ["Personal", "Business", "Education", "Research", "Other"]
    }
  ];

  const handleAnswer = (answer: string) => {
    setAnswers({ ...answers, [currentQuestion]: answer });
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = () => {
    console.log("Survey submitted:", answers);
    alert("Thank you for completing the survey!");
  };

  const isLastQuestion = currentQuestion === questions.length - 1;
  const currentAnswer = answers[currentQuestion];

  return (
    <div style={{ width: "100%", height: "100vh", position: "relative", overflow: "hidden" }}>
      {/* Animated Background */}
      <DotGrid
        dotSize={6}
        baseColor="#271E37"
        activeColor="#5227FF"
        gap={25}
        proximity={120}
        shockRadius={250}
        shockStrength={5}
        resistance={750}
        returnDuration={1.5}
      />

      {/* Survey Container */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem",
          pointerEvents: "none"
        }}
      >
        {/* Survey Box */}
        <div
          style={{
            background: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(10px)",
            borderRadius: "24px",
            padding: "3rem",
            maxWidth: "600px",
            width: "100%",
            boxShadow: "0 20px 60px rgba(82, 39, 255, 0.3)",
            border: "1px solid rgba(82, 39, 255, 0.2)",
            pointerEvents: "all"
          }}
        >
          {/* Header */}
          <div style={{ marginBottom: "2rem", textAlign: "center" }}>
            <h1
              style={{
                fontSize: "2rem",
                margin: "0 0 0.5rem 0",
                color: "#271E37",
                fontWeight: "700"
              }}
            >
              Customer Survey
            </h1>
            <p style={{ color: "#666", margin: 0, fontSize: "0.95rem" }}>
              Question {currentQuestion + 1} of {questions.length}
            </p>
          </div>

          {/* Progress Bar */}
          <div
            style={{
              width: "100%",
              height: "6px",
              background: "#E5E5E5",
              borderRadius: "3px",
              marginBottom: "2.5rem",
              overflow: "hidden"
            }}
          >
            <div
              style={{
                width: `${((currentQuestion + 1) / questions.length) * 100}%`,
                height: "100%",
                background: "linear-gradient(90deg, #5227FF, #7C3AED)",
                transition: "width 0.3s ease",
                borderRadius: "3px"
              }}
            />
          </div>

          {/* Question */}
          <h2
            style={{
              fontSize: "1.5rem",
              marginBottom: "2rem",
              color: "#271E37",
              fontWeight: "600",
              lineHeight: "1.4"
            }}
          >
            {questions[currentQuestion].question}
          </h2>

          {/* Options */}
          <div style={{ marginBottom: "2rem" }}>
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(option)}
                style={{
                  width: "100%",
                  padding: "1rem 1.5rem",
                  marginBottom: "0.75rem",
                  background: currentAnswer === option
                    ? "linear-gradient(135deg, #5227FF, #7C3AED)"
                    : "#F8F9FA",
                  color: currentAnswer === option ? "#FFFFFF" : "#271E37",
                  border: currentAnswer === option
                    ? "2px solid #5227FF"
                    : "2px solid #E5E5E5",
                  borderRadius: "12px",
                  fontSize: "1rem",
                  fontWeight: "500",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  textAlign: "left"
                }}
                onMouseEnter={(e) => {
                  if (currentAnswer !== option) {
                    e.currentTarget.style.background = "#F0F0F0";
                    e.currentTarget.style.borderColor = "#5227FF";
                    e.currentTarget.style.transform = "translateX(4px)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (currentAnswer !== option) {
                    e.currentTarget.style.background = "#F8F9FA";
                    e.currentTarget.style.borderColor = "#E5E5E5";
                    e.currentTarget.style.transform = "translateX(0)";
                  }
                }}
              >
                {option}
              </button>
            ))}
          </div>

          {/* Navigation Buttons */}
          <div
            style={{
              display: "flex",
              gap: "1rem",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <button
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              style={{
                padding: "0.875rem 2rem",
                background: currentQuestion === 0 ? "#E5E5E5" : "#FFFFFF",
                color: currentQuestion === 0 ? "#999" : "#271E37",
                border: "2px solid #E5E5E5",
                borderRadius: "12px",
                fontSize: "1rem",
                fontWeight: "600",
                cursor: currentQuestion === 0 ? "not-allowed" : "pointer",
                transition: "all 0.2s ease"
              }}
              onMouseEnter={(e) => {
                if (currentQuestion !== 0) {
                  e.currentTarget.style.borderColor = "#5227FF";
                }
              }}
              onMouseLeave={(e) => {
                if (currentQuestion !== 0) {
                  e.currentTarget.style.borderColor = "#E5E5E5";
                }
              }}
            >
              Previous
            </button>

            <Link
              to="/"
              style={{
                color: "#666",
                textDecoration: "none",
                fontSize: "0.9rem",
                padding: "0.5rem"
              }}
            >
              Exit Survey
            </Link>

            {isLastQuestion ? (
              <button
                onClick={handleSubmit}
                disabled={!currentAnswer}
                style={{
                  padding: "0.875rem 2rem",
                  background: currentAnswer
                    ? "linear-gradient(135deg, #5227FF, #7C3AED)"
                    : "#E5E5E5",
                  color: currentAnswer ? "#FFFFFF" : "#999",
                  border: "none",
                  borderRadius: "12px",
                  fontSize: "1rem",
                  fontWeight: "600",
                  cursor: currentAnswer ? "pointer" : "not-allowed",
                  transition: "all 0.2s ease",
                  boxShadow: currentAnswer ? "0 4px 12px rgba(82, 39, 255, 0.3)" : "none"
                }}
                onMouseEnter={(e) => {
                  if (currentAnswer) {
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow = "0 6px 20px rgba(82, 39, 255, 0.4)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (currentAnswer) {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 4px 12px rgba(82, 39, 255, 0.3)";
                  }
                }}
              >
                Submit Survey
              </button>
            ) : (
              <button
                onClick={handleNext}
                disabled={!currentAnswer}
                style={{
                  padding: "0.875rem 2rem",
                  background: currentAnswer
                    ? "linear-gradient(135deg, #5227FF, #7C3AED)"
                    : "#E5E5E5",
                  color: currentAnswer ? "#FFFFFF" : "#999",
                  border: "none",
                  borderRadius: "12px",
                  fontSize: "1rem",
                  fontWeight: "600",
                  cursor: currentAnswer ? "pointer" : "not-allowed",
                  transition: "all 0.2s ease",
                  boxShadow: currentAnswer ? "0 4px 12px rgba(82, 39, 255, 0.3)" : "none"
                }}
                onMouseEnter={(e) => {
                  if (currentAnswer) {
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow = "0 6px 20px rgba(82, 39, 255, 0.4)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (currentAnswer) {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 4px 12px rgba(82, 39, 255, 0.3)";
                  }
                }}
              >
                Next Question
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}