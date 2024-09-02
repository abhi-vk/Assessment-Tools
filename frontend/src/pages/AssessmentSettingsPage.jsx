import React, { useState } from 'react';

const AssessmentSettingsPage = () => {
  // Example state - replace with actual data and logic
  const [visibility, setVisibility] = useState('all');
  const [accessPermissions, setAccessPermissions] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [attemptLimits, setAttemptLimits] = useState(1);
  const [feedbackTiming, setFeedbackTiming] = useState('after_closing');
  const [gradeDisplay, setGradeDisplay] = useState('after_grading');
  const [notifications, setNotifications] = useState(true);

  const handleSaveSettings = () => {
    // Logic to save the settings
    alert('Settings saved!');
  };

  return (
    <div className="container my-4">
      <h1 className="mb-4">Assessment Settings</h1>

      {/* Assessment Visibility */}
      <div className="mb-4">
        <h2 className="h4 mb-2">Assessment Visibility</h2>
        <select
          value={visibility}
          onChange={(e) => setVisibility(e.target.value)}
          className="form-select"
        >
          <option value="all">All Students</option>
          <option value="specific">Specific Groups</option>
          <option value="private">Private (Teacher Only)</option>
        </select>
      </div>

      {/* Access Permissions */}
      <div className="mb-4">
        <h2 className="h4 mb-2">Access Permissions</h2>
        <input
          type="text"
          placeholder="Enter student IDs or class names"
          value={accessPermissions}
          onChange={(e) => setAccessPermissions(e.target.value)}
          className="form-control"
        />
      </div>

      {/* Time and Date Settings */}
      <div className="mb-4">
        <h2 className="h4 mb-2">Time and Date Settings</h2>
        <div className="mb-2">
          <label className="form-label">Start Date</label>
          <input
            type="datetime-local"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="form-control"
          />
        </div>
        <div>
          <label className="form-label">End Date</label>
          <input
            type="datetime-local"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="form-control"
          />
        </div>
      </div>

      {/* Attempt Limits */}
      <div className="mb-4">
        <h2 className="h4 mb-2">Attempt Limits</h2>
        <input
          type="number"
          value={attemptLimits}
          onChange={(e) => setAttemptLimits(Number(e.target.value))}
          className="form-control"
          min="1"
        />
      </div>

      {/* Feedback Timing */}
      <div className="mb-4">
        <h2 className="h4 mb-2">Feedback Timing</h2>
        <select
          value={feedbackTiming}
          onChange={(e) => setFeedbackTiming(e.target.value)}
          className="form-select"
        >
          <option value="immediate">Immediately After Submission</option>
          <option value="after_closing">After Assessment Closes</option>
        </select>
      </div>

      {/* Grade Display Options */}
      <div className="mb-4">
        <h2 className="h4 mb-2">Grade Display Options</h2>
        <select
          value={gradeDisplay}
          onChange={(e) => setGradeDisplay(e.target.value)}
          className="form-select"
        >
          <option value="immediate">Immediately After Submission</option>
          <option value="after_grading">After All Submissions Are Graded</option>
        </select>
      </div>

      {/* Notification Settings */}
      <div className="mb-4">
        <h2 className="h4 mb-2">Notification Settings</h2>
        <div className="form-check">
          <input
            type="checkbox"
            checked={notifications}
            onChange={(e) => setNotifications(e.target.checked)}
            className="form-check-input"
            id="notifications"
          />
          <label className="form-check-label" htmlFor="notifications">
            Enable Notifications
          </label>
        </div>
      </div>

      {/* Save Settings Button */}
      <div>
        <button
          onClick={handleSaveSettings}
          className="btn btn-primary"
        >
          Save Settings
        </button>
      </div>
    </div>
  );
};

export default AssessmentSettingsPage;
