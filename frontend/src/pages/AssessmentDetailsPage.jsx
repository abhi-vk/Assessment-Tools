import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const AssessmentDetailsPage = () => {
  return (
    <div className="container min-vh-100 p-4">
      <header className="bg-primary text-white p-3 mb-4 rounded shadow">
        <h1 className="display-4">Assessment Details</h1>
      </header>

      {/* General instructions for online assignments */}
      <section className="bg-light p-4 rounded shadow">
        <h2 className="h3 mb-3">General Instructions</h2>
        <ul className="list-unstyled">
          <li><strong>Read all instructions carefully:</strong> Ensure you understand the requirements and guidelines before starting your assignment.</li>
          <li><strong>Submission format:</strong> Follow the specified format for submitting your assignment, including any required file types or submission platforms.</li>
          <li><strong>Deadline:</strong> Be aware of the submission deadline and make sure to submit your assignment on time.</li>
          <li><strong>Academic integrity:</strong> Ensure that your work adheres to the academic integrity policies, including proper citation of sources and avoiding plagiarism.</li>
          <li><strong>Technical requirements:</strong> Verify that you have the necessary software or tools to complete the assignment as per the instructions provided.</li>
        </ul>
      </section>
    </div>
  );
};

export default AssessmentDetailsPage;
