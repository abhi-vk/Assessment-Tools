import React, { useState } from 'react';

const AssessmentReviewAndFeedbackPage = () => {
  // Example state - replace with actual data and logic
  const [assessment, setAssessment] = useState({
    title: "Sample Assessment",
    score: 85, // Example score
    feedback: [
      { questionId: 1, feedbackText: "Correct! Paris is the capital of France.", correctAnswer: "Paris" },
      { questionId: 2, feedbackText: "Great explanation of relativity.", correctAnswer: "Einstein's theory of relativity" }
    ],
    submissionHistory: [
      { attempt: 1, score: 85, date: "2024-08-01", feedback: "Good attempt, but check the explanation for question 2." },
      { attempt: 2, score: 90, date: "2024-08-02", feedback: "Excellent improvement on question 2." }
    ],
    teacherComments: "Overall good performance, but needs to focus more on detailed explanations.",
    canRetake: true
  });

  const handleRetake = () => {
    // Logic to retake the assessment
    alert("You can now retake the assessment!");
  };

  const handleDownloadFeedback = () => {
    // Logic to download feedback as PDF or other format
    alert("Feedback downloaded!");
  };

  return (
    <div className="container my-4">
      <h1 className="mb-4">{assessment.title}</h1>

      {/* Overall Score Display */}
      <div className="bg-light p-4 rounded shadow-sm mb-4">
        <h2 className="h4 mb-2">Overall Score</h2>
        <p className="h5 font-weight-bold">{assessment.score} / 100</p>
      </div>

      {/* Detailed Feedback */}
      <div className="bg-light p-4 rounded shadow-sm mb-4">
        <h2 className="h4 mb-2">Detailed Feedback</h2>
        {assessment.feedback.map((feedback, index) => (
          <div key={index} className="mb-3">
            <h3 className="h5 mb-1">Question {feedback.questionId}</h3>
            <p>{feedback.feedbackText}</p>
            <p className="text-muted">Correct Answer: {feedback.correctAnswer}</p>
          </div>
        ))}
      </div>

      {/* Submission History */}
      <div className="bg-light p-4 rounded shadow-sm mb-4">
        <h2 className="h4 mb-2">Submission History</h2>
        {assessment.submissionHistory.map((submission, index) => (
          <div key={index} className="mb-3">
            <h3 className="h5 mb-1">Attempt {submission.attempt}</h3>
            <p>Score: {submission.score}</p>
            <p>Date: {submission.date}</p>
            <p className="text-muted">Feedback: {submission.feedback}</p>
          </div>
        ))}
      </div>

      {/* Teacher Comments */}
      <div className="bg-light p-4 rounded shadow-sm mb-4">
        <h2 className="h4 mb-2">Teacher Comments</h2>
        <p>{assessment.teacherComments}</p>
      </div>

      {/* Retake Option */}
      {assessment.canRetake && (
        <div className="mb-4">
          <button
            onClick={handleRetake}
            className="btn btn-primary"
          >
            Retake Assessment
          </button>
        </div>
      )}

      {/* Download Feedback */}
      <div>
        <button
          onClick={handleDownloadFeedback}
          className="btn btn-success"
        >
          Download Feedback
        </button>
      </div>
    </div>
  );
};

export default AssessmentReviewAndFeedbackPage;
