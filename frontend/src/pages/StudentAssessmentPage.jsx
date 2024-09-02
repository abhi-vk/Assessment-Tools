import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // If using React Router

const StudentAssessmentPage = () => {
  const { id } = useParams(); // Fetch assessment ID dynamically from URL if using React Router
  const [assessment, setAssessment] = useState(null);
  const [answers, setAnswers] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timer, setTimer] = useState(0);
  const [isSaved, setIsSaved] = useState(true);

  useEffect(() => {
    // Fetch the assessment data from the backend
    fetch(`http://localhost:5000/api/assessments/${id}`) // Use dynamic ID
      .then((response) => response.json())
      .then((data) => {
        console.log('Assessment data:', data); // Log data for debugging
        setAssessment(data); // Set the whole data object
        if (data && data.time_limit) {
          setTimer(data.time_limit * 60); // Set the timer
        }
      })
      .catch((error) => console.error('Error fetching assessment:', error));
  }, [id]);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleAnswerChange = (questionId, value) => {
    setAnswers({
      ...answers,
      [questionId]: value,
    });
    setIsSaved(false);
  };

  const handleSubmit = () => {
    // Logic to submit answers
    alert('Assessment submitted!');
  };

  const handleSaveProgress = () => {
    // Logic to save progress
    setIsSaved(true);
    alert('Progress saved!');
  };

  const handleNextQuestion = () => {
    if (assessment && currentQuestionIndex < (assessment.questions ? assessment.questions.length : 0) - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (assessment && currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const getFormattedTime = () => {
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  if (!assessment) {
    return <div>Loading assessment...</div>;
  }

  // Ensure currentQuestion is defined
  const currentQuestion = assessment.questions ? assessment.questions[currentQuestionIndex] : null;

  console.log('Current Question:', currentQuestion); // Log current question for debugging

  return (
    <div className="container my-4">
      <h1 className="mb-4">{assessment.assignment.title}</h1>
      <p className="mb-4">{assessment.instructions}</p>

      {/* Timer Display */}
      <div className="mb-4 font-weight-bold">
        Time Remaining: {getFormattedTime()}
      </div>

      {/* Question Navigation */}
      <div className="mb-4 d-flex">
        <button
          onClick={handlePreviousQuestion}
          className="btn btn-secondary me-2"
          disabled={currentQuestionIndex === 0}
        >
          Previous
        </button>
        <button
          onClick={handleNextQuestion}
          className="btn btn-secondary"
          disabled={currentQuestionIndex === (assessment.questions ? assessment.questions.length - 1 : 0)}
        >
          Next
        </button>
      </div>

      {/* Question Display */}
      {currentQuestion && (
        <div className="card mb-4">
          <div className="card-body">
            <h2 className="card-title mb-2">
              Question {currentQuestionIndex + 1}:
            </h2>
            <p className="card-text mb-4">
              {currentQuestion.title}
            </p>
            {/* Adjust the logic based on the question type */}
            {currentQuestion.type === 'Multiple-choice' && currentQuestion.options && (
              <div className="mb-4">
                {currentQuestion.options.map((option, index) => (
                  <div key={index} className="form-check">
                    <input
                      type="radio"
                      name={`question_${currentQuestion.id}`}
                      value={option}
                      checked={answers[currentQuestion.id] === option}
                      onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value)}
                      className="form-check-input"
                    />
                    <label className="form-check-label ms-2">{option}</label>
                  </div>
                ))}
              </div>
            )}
            {/* Essay type logic */}
            {currentQuestion.type === 'Essay' && (
              <textarea
                rows="4"
                className="form-control"
                value={answers[currentQuestion.id] || ''}
                onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value)}
              />
            )}
          </div>
        </div>
      )}

      {/* Save Progress and Submit Buttons */}
      <div className="mb-4 d-flex">
        <button
          onClick={handleSaveProgress}
          className={`btn ${isSaved ? 'btn-success' : 'btn-primary'} me-2`}
        >
          {isSaved ? 'Progress Saved' : 'Save Progress'}
        </button>
        <button onClick={handleSubmit} className="btn btn-danger">
          Submit Assessment
        </button>
      </div>

      {/* Feedback Display (Conditional) */}
      {assessment.feedback === 'Immediate' && (
        <div className="alert alert-warning">
          <h3 className="alert-heading">Immediate Feedback:</h3>
          <p>Your feedback will be displayed here after submission.</p>
        </div>
      )}
    </div>
  );
};

export default StudentAssessmentPage;
