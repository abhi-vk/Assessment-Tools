import React, { useState } from 'react';

const AssessmentArchiveAndDeletionPage = () => {
  // Example state - replace with actual data and logic
  const [assessmentId, setAssessmentId] = useState('');
  const [restoreAssessment, setRestoreAssessment] = useState('');

  const handleArchiveAssessment = () => {
    // Logic to archive the assessment
    alert('Assessment archived!');
  };

  const handleDeleteAssessment = () => {
    // Logic to delete the assessment
    alert('Assessment deleted!');
  };

  const handleRestoreAssessment = () => {
    // Logic to restore the assessment
    alert('Assessment restored!');
  };

  const handleExportData = () => {
    // Logic to export assessment data
    alert('Data exported!');
  };

  return (
    <div className="container my-4">
      <h1 className="mb-4">Assessment Archive and Deletion</h1>

      {/* Archive Assessment Option */}
      <div className="mb-4">
        <h2 className="h4 mb-3">Archive Assessment</h2>
        <div className="card p-4">
          <div className="card-body">
            <input
              type="text"
              placeholder="Enter assessment ID to archive"
              value={assessmentId}
              onChange={(e) => setAssessmentId(e.target.value)}
              className="form-control mb-2"
            />
            <button
              onClick={handleArchiveAssessment}
              className="btn btn-warning"
            >
              Archive Assessment
            </button>
          </div>
        </div>
      </div>

      {/* Deletion Warning */}
      <div className="mb-4">
        <h2 className="h4 mb-3">Delete Assessment</h2>
        <div className="card p-4">
          <div className="card-body">
            <p className="mb-2">
              Deleting an assessment will permanently remove all associated data, including student responses and grades.
            </p>
            <input
              type="text"
              placeholder="Type assessment title to confirm deletion"
              value={assessmentId}
              onChange={(e) => setAssessmentId(e.target.value)}
              className="form-control mb-2"
            />
            <button
              onClick={handleDeleteAssessment}
              className="btn btn-danger"
            >
              Confirm Deletion
            </button>
          </div>
        </div>
      </div>

      {/* Restore Archived Assessment */}
      <div className="mb-4">
        <h2 className="h4 mb-3">Restore Archived Assessment</h2>
        <div className="card p-4">
          <div className="card-body">
            <input
              type="text"
              placeholder="Enter assessment ID to restore"
              value={restoreAssessment}
              onChange={(e) => setRestoreAssessment(e.target.value)}
              className="form-control mb-2"
            />
            <button
              onClick={handleRestoreAssessment}
              className="btn btn-success"
            >
              Restore Assessment
            </button>
          </div>
        </div>
      </div>

      {/* Export Assessment Data */}
      <div className="mb-4">
        <h2 className="h4 mb-3">Export Assessment Data</h2>
        <div className="card p-4">
          <div className="card-body">
            <button
              onClick={handleExportData}
              className="btn btn-primary"
            >
              Export Data
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssessmentArchiveAndDeletionPage;
