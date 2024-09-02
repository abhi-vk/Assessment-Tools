import React, { useState, useEffect } from 'react';
import axios from 'axios';
import QuestionBankModal from '../components/QuestionBankModal';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const AssessmentCreationPage = () => {
  const [title, setTitle] = useState('');
  const [type, setType] = useState('Quiz');
  const [questions, setQuestions] = useState([]);
  const [instructions, setInstructions] = useState('');
  const [timeLimit, setTimeLimit] = useState('');
  const [attempts, setAttempts] = useState(1);
  const [feedback, setFeedback] = useState('Immediate');
  const [courseContent, setCourseContent] = useState('');
  const [showQuestionBank, setShowQuestionBank] = useState(false);
  const [drafts, setDrafts] = useState([]);

  const ID_RANGE = { min: 1, max: 200 };

  // Load questions and drafts from localStorage
  useEffect(() => {
    const savedQuestions = JSON.parse(localStorage.getItem('questions')) || [];
    setQuestions(savedQuestions);

    const savedDrafts = JSON.parse(localStorage.getItem('drafts')) || [];
    setDrafts(savedDrafts);
  }, []);

  // Function to generate a unique ID within the range
  const generateIdInRange = (existingIds) => {
    let id;
    const availableIds = Array.from({ length: ID_RANGE.max - ID_RANGE.min + 1 }, (_, i) => i + ID_RANGE.min);
    const available = availableIds.filter(id => !existingIds.includes(id));

    if (available.length === 0) {
      throw new Error('No available IDs in the range');
    }

    id = available[Math.floor(Math.random() * available.length)];
    return id;
  };

  const handleSaveDraft = () => {
    if (!title.trim()) {
      toast.error('Title is required.');
      return;
    }

    const existingDraftIds = drafts.map(draft => draft.id);
    const draftId = generateIdInRange(existingDraftIds);

    const draft = {
      id: draftId,
      title,
      type,
      questions: questions.map((question, index) => ({
        id: index + 1,
        title: question.title,
        options: question.options,
        category: question.category
      })),
      instructions,
      timeLimit,
      attempts,
      feedback,
      courseContent,
      isDraft: true
    };

    const updatedDrafts = [...drafts, draft];
    setDrafts(updatedDrafts);
    localStorage.setItem('drafts', JSON.stringify(updatedDrafts));
    clearForm();
    toast.success('Draft saved successfully!');
  };

  const handlePublish = async () => {
    if (!title.trim()) {
      toast.error('Title is required.');
      return;
    }
  
    const teacherId = localStorage.getItem('teacherId'); // Assuming you store the teacherId in localStorage
  
    const assessment = {
      title,
      type,
      questions: questions.map((question, index) => ({
        id: index + 1,
        title: question.title,
        options: question.options,
        category: question.category
      })),
      instructions,
      timeLimit,
      attempts,
      feedback,
      courseContent,
      created_by: teacherId  // Include the teacherId as created_by
    };
  
    try {
      const response = await axios.post('http://localhost:5000/api/assessments', assessment, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });
      toast.success('Assessment published successfully!');

      // Notify the dashboard about the new assessment
      window.dispatchEvent(new CustomEvent('newAssessmentPublished', { detail: response.data }));

      clearForm();
    } catch (error) {
      if (error.response && error.response.status === 401) {
        toast.error('Session expired. Please log in again.');
        window.location.href = '/login';
      } else {
        console.error('Error publishing assessment:', error);
        toast.error('Failed to publish assessment');
      }
    }
  };

  const handleImportQuestions = () => {
    setShowQuestionBank(true);
  };

  const handleSelectQuestions = (selectedQuestions) => {
    setQuestions(prev => [...prev, ...selectedQuestions]);
  };

  const handlePublishDraft = async (draftId) => {
    const draft = drafts.find(d => d.id === draftId);
    if (draft) {
      try {
        await axios.post('http://localhost:5000/api/assessments', { ...draft, isDraft: false }, {
          headers: {
            'Content-Type': 'application/json'
          },
          withCredentials: true // Ensure cookies are sent with the request
        });
        toast.success('Draft published successfully!');
        const updatedDrafts = drafts.filter(d => d.id !== draftId);
        setDrafts(updatedDrafts);
        localStorage.setItem('drafts', JSON.stringify(updatedDrafts));
      } catch (error) {
        if (error.response && error.response.status === 401) {
          toast.error('Session expired. Please log in again.');
          window.location.href = '/';
        } else {
          console.error('Error publishing draft:', error.message);
          toast.error('Failed to publish draft');
        }
      }
    }
  };

  const clearForm = () => {
    setTitle('');
    setType('Quiz');
    setQuestions([]);
    setInstructions('');
    setTimeLimit('');
    setAttempts(1);
    setFeedback('Immediate');
    setCourseContent('');
  };

  return (
    <div className="container my-4">
      <h1 className="mb-4">Create New Assessment</h1>

      <form>
        {/* Assessment Title */}
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Assessment Title</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-control"
            placeholder="Enter assessment title"
          />
        </div>

        {/* Assessment Type */}
        <div className="mb-3">
          <label htmlFor="type" className="form-label">Assessment Type</label>
          <select
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="form-select"
          >
            <option value="Quiz">Quiz</option>
            <option value="Assignment">Assignment</option>
            <option value="Survey">Survey</option>
          </select>
        </div>

        {/* Instructions */}
        <div className="mb-3">
          <label htmlFor="instructions" className="form-label">Instructions</label>
          <textarea
            id="instructions"
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            className="form-control"
            placeholder="Enter instructions for the assessment"
          />
        </div>

        {/* Time Limit */}
        <div className="mb-3">
          <label htmlFor="timeLimit" className="form-label">Time Limit (minutes)</label>
          <input
            id="timeLimit"
            type="number"
            value={timeLimit}
            onChange={(e) => setTimeLimit(e.target.value)}
            className="form-control"
            placeholder="Enter time limit in minutes"
          />
        </div>

        {/* Attempts */}
        <div className="mb-3">
          <label htmlFor="attempts" className="form-label">Number of Attempts</label>
          <input
            id="attempts"
            type="number"
            value={attempts}
            onChange={(e) => setAttempts(e.target.value)}
            className="form-control"
            placeholder="Enter number of attempts allowed"
          />
        </div>

        {/* Feedback Options */}
        <div className="mb-3">
          <label htmlFor="feedback" className="form-label">Feedback Options</label>
          <select
            id="feedback"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            className="form-select"
          >
            <option value="Immediate">Immediate</option>
            <option value="Delayed">Delayed</option>
          </select>
        </div>

        {/* Course Content */}
        <div className="mb-3">
          <label htmlFor="courseContent" className="form-label">Link to Course Content</label>
          <input
            id="courseContent"
            type="text"
            value={courseContent}
            onChange={(e) => setCourseContent(e.target.value)}
            className="form-control"
            placeholder="Link to course content"
          />
        </div>

        {/* Import Questions */}
        <div className="mb-3">
          <button
            type="button"
            onClick={handleImportQuestions}
            className="btn btn-secondary me-2"
          >
            Open Question Bank
          </button>
        </div>

        {/* Save as Draft / Publish */}
        <div className="mb-3">
          <button
            type="button"
            onClick={handleSaveDraft}
            className="btn btn-secondary me-2"
          >
            Save as Draft
          </button>
          <button
            type="button"
            onClick={handlePublish}
            className="btn btn-primary"
          >
            Publish
          </button>
        </div>
      </form>

      {/* Drafts Section */}
      {drafts.length > 0 && (
        <div className="mt-5">
          <h3>Saved Drafts</h3>
          <div className="row">
            {drafts.map((draft) => (
              <div className="col-md-4 mb-3" key={draft.id}>
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">{draft.title}</h5>
                    <p className="card-text">Type: {draft.type}</p>
                    <button
                      className="btn btn-primary"
                      onClick={() => handlePublishDraft(draft.id)}
                    >
                      Publish
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Question Bank Modal */}
      <QuestionBankModal
        show={showQuestionBank}
        onClose={() => setShowQuestionBank(false)}
        questions={questions}
        onSelectQuestions={handleSelectQuestions}
      />

      {/* ToastContainer to show notifications */}
      <ToastContainer />
    </div>
  );
};

export default AssessmentCreationPage;
