import React, { useState } from 'react';

const AssessmentFeedbackSummaryPage = () => {
  // Example data - replace with actual data fetching and state management
  const [feedbackData, setFeedbackData] = useState([
    {
      id: 1,
      title: 'Quiz 1',
      feedback: 'Good job on the quiz. Focus on the multiplication tables.',
      progress: '80%',
      teacherComments: 'Great improvement!',
    },
    {
      id: 2,
      title: 'Assignment 1',
      feedback: 'Assignment completed well. Pay attention to grammar.',
      progress: '75%',
      teacherComments: 'Well done. Needs minor revisions.',
    },
    // Add more feedback data here
  ]);

  const handleDownloadSummary = () => {
    // Logic to generate and download a feedback summary report
    alert('Feedback summary downloaded!');
  };

  return (
    <div className="container my-4">
      <h1 className="mb-4">Assessment Feedback Summary</h1>

      {/* Feedback Overview */}
      <div className="mb-4">
        <h2 className="h4 mb-3">Feedback Overview</h2>
        {feedbackData.length > 0 ? (
          <ul className="list-unstyled">
            {feedbackData.map((feedback) => (
              <li key={feedback.id} className="mb-4 p-3 border rounded">
                <h3 className="h5 mb-2">{feedback.title}</h3>
                <p className="mb-2">{feedback.feedback}</p>
                <p className="text-muted">Progress: {feedback.progress}</p>
                <p className="text-muted mt-2">Teacher Comments: {feedback.teacherComments}</p>
                <a
                  href={`/feedback/${feedback.id}`}
                  className="text-primary"
                >
                  View Detailed Feedback
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p>No feedback available.</p>
        )}
      </div>

      {/* Progress Indicators */}
      <div className="mb-4">
        <h2 className="h4 mb-3">Progress Indicators</h2>
        {/* Example progress indicators - replace with actual visualizations */}
        <div className="bg-light p-3 rounded">
          <h3 className="h5 mb-2">Overall Progress</h3>
          <div className="progress">
            <div
              className="progress-bar"
              role="progressbar"
              style={{ width: '80%' }}
              aria-valuenow={80}
              aria-valuemin={0}
              aria-valuemax={100}
            ></div>
          </div>
          <p className="mt-2 text-muted">Overall progress: 80%</p>
        </div>
      </div>

      {/* Teacher Comments Summary */}
      <div className="mb-4">
        <h2 className="h4 mb-3">Teacher Comments Summary</h2>
        <p>
          {/* Example summary - replace with actual comments */}
          You have received positive feedback from your teachers across multiple assessments. Focus on areas where comments suggest improvements.
        </p>
      </div>

      {/* Download Feedback Summary */}
      <div>
        <button
          onClick={handleDownloadSummary}
          className="btn btn-primary"
        >
          Download Feedback Summary
        </button>
      </div>
    </div>
  );
};

export default AssessmentFeedbackSummaryPage;
