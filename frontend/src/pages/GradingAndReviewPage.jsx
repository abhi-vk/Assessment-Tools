import React, { useState } from 'react';

const GradingAndReviewPage = () => {
  // Example state - replace with actual data and logic
  const [submissions, setSubmissions] = useState([
    {
      id: 1,
      studentName: "John Doe",
      submissionStatus: "Ungraded",
      responses: [
        { questionId: 1, answer: "Sample answer", isObjective: false },
        { questionId: 2, answer: "Another answer", isObjective: true }
      ]
    },
    // Add more student submissions as needed
  ]);
  
  const [grading, setGrading] = useState({});
  
  const handleGradeSubmission = (studentId) => {
    // Logic to submit final grades and feedback
    alert(`Grades and feedback submitted for student ${studentId}!`);
  };

  const handleBulkGrading = () => {
    // Logic to handle bulk grading
    alert("Bulk grading performed!");
  };

  const handleRegrade = (submissionId) => {
    // Logic to regrade a submission
    alert(`Regrading submission ${submissionId}!`);
  };

  const handleFeedbackChange = (studentId, questionId, feedback) => {
    // Update feedback in the state
    setGrading(prevState => ({
      ...prevState,
      [studentId]: {
        ...prevState[studentId],
        feedback: {
          ...prevState[studentId]?.feedback,
          [questionId]: feedback
        }
      }
    }));
  };

  return (
    <div className="container my-4">
      <h1 className="mb-4">Grading and Review</h1>

      {/* Student Submissions List */}
      {submissions.map(submission => (
        <div key={submission.id} className="card mb-4">
          <div className="card-body">
            <h2 className="card-title">{submission.studentName}</h2>
            <p>Status: {submission.submissionStatus}</p>
            <div className="mt-4">
              {submission.responses.map((response, index) => (
                <div key={index} className="mb-4">
                  <h3 className="h5">Question {response.questionId}</h3>
                  <p>Answer: {response.answer}</p>
                  {response.isObjective ? (
                    <div className="alert alert-secondary">
                      <p>Automated Grading Review: Review the automated results here.</p>
                    </div>
                  ) : (
                    <div className="bg-light p-2 rounded">
                      <textarea
                        className="form-control"
                        placeholder="Provide feedback here..."
                        onChange={(e) => handleFeedbackChange(submission.id, response.questionId, e.target.value)}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Feedback and Grade Submission */}
            <div className="mt-4">
              <button
                onClick={() => handleGradeSubmission(submission.id)}
                className="btn btn-primary me-2"
              >
                Submit Grade and Feedback
              </button>
              <button
                onClick={() => handleRegrade(submission.id)}
                className="btn btn-warning"
              >
                Regrade Submission
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* Bulk Grading Options */}
      <div className="mt-4">
        <button
          onClick={handleBulkGrading}
          className="btn btn-success"
        >
          Bulk Grading
        </button>
      </div>

      {/* Return to Student */}
      <div className="mt-4">
        <button
          className="btn btn-secondary"
        >
          Return to Student
        </button>
      </div>
    </div>
  );
};

export default GradingAndReviewPage;
