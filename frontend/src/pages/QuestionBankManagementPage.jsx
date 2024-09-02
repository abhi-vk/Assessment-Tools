import React, { useState, useEffect } from 'react';

const QuestionBankManagementPage = () => {
  const [questions, setQuestions] = useState(() => {
    const savedQuestions = localStorage.getItem('questions');
    if (savedQuestions) {
      return JSON.parse(savedQuestions);
    }
    return [];
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('');
  const [tag, setTag] = useState('');
  const [showQuestionForm, setShowQuestionForm] = useState(false);
  const [questionType, setQuestionType] = useState('quiz');
  const [newQuestion, setNewQuestion] = useState({
    id: null,
    title: '',
    category: '',
    tags: [],
    options: ['', '', '', ''],
    correctOption: null,
    details: '',
  });

  useEffect(() => {
    localStorage.setItem('questions', JSON.stringify(questions));
  }, [questions]);

  const handleSearch = () => {
    // Implement search logic here if needed
  };

  const handleAddQuestion = () => {
    setShowQuestionForm(true);
    resetQuestionForm();
  };

  const handleImport = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const importedQuestions = JSON.parse(e.target.result);
          setQuestions((prevQuestions) => [...prevQuestions, ...importedQuestions]);
        } catch (error) {
          alert('Failed to import questions. Please ensure the file format is correct.');
        }
      };
      reader.readAsText(file);
    }
  };

  const handleExport = () => {
    const dataStr = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(questions))}`;
    const downloadAnchor = document.createElement('a');
    downloadAnchor.href = dataStr;
    downloadAnchor.download = 'questions.json';
    downloadAnchor.click();
  };

  const handleEditQuestion = (id) => {
    const questionToEdit = questions.find((question) => question.id === id);
    if (questionToEdit) {
      setNewQuestion(questionToEdit);
      setQuestionType(questionToEdit.options.length ? 'quiz' : 'assignment');
      setShowQuestionForm(true);
    } else {
      alert('Question not found!');
    }
  };

  const handleDeleteQuestion = (id) => {
    const updatedQuestions = questions.filter((question) => question.id !== id);
    setQuestions(updatedQuestions);
  };

  const handleSaveQuestion = () => {
    if (!newQuestion.title || !newQuestion.category) {
      alert('Title and Category are required.');
      return;
    }

    if (newQuestion.id) {
      const updatedQuestions = questions.map((q) =>
        q.id === newQuestion.id ? newQuestion : q
      );
      setQuestions(updatedQuestions);
    } else {
      setQuestions([...questions, { ...newQuestion, id: Date.now() }]);
    }
    setShowQuestionForm(false);
    resetQuestionForm();
  };

  const resetQuestionForm = () => {
    setNewQuestion({
      id: null,
      title: '',
      category: '',
      tags: [],
      options: ['', '', '', ''],
      correctOption: null,
      details: '',
    });
  };

  const handleQuestionTypeChange = (e) => {
    setQuestionType(e.target.value);
  };

  return (
    <div className="container my-4">
      <h1 className="mb-4">Question Bank Management</h1>

      <div className="mb-4 d-flex flex-column flex-md-row align-items-md-center justify-content-md-between">
        <div className="mb-4 mb-md-0">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="form-control"
            placeholder="Search questions..."
          />
        </div>

        <div className="d-flex">
          <button onClick={handleAddQuestion} className="btn btn-primary me-2">
            Add New Question
          </button>
          <input
            type="file"
            accept=".json"
            onChange={handleImport}
            className="btn btn-secondary me-2"
          />
          <button onClick={handleExport} className="btn btn-success">
            Export Questions
          </button>
        </div>
      </div>

      {/* Question List */}
      <div className="card">
        <div className="card-body">
          <h2 className="card-title mb-4">Questions List</h2>
          <table className="table">
            <thead>
              <tr>
                <th>Question</th>
                <th>Category</th>
                <th>Tags</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {questions
                .filter(
                  (q) =>
                    q.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
                    (category ? q.category === category : true) &&
                    (tag ? q.tags.includes(tag) : true)
                )
                .map((question) => (
                  <tr key={question.id}>
                    <td>{question.title}</td>
                    <td>{question.category}</td>
                    <td>{question.tags.join(', ')}</td>
                    <td>
                      <button
                        onClick={() => handleEditQuestion(question.id)}
                        className="btn btn-warning me-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteQuestion(question.id)}
                        className="btn btn-danger"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Question Form */}
      {showQuestionForm && (
        <div className="modal show d-block">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {newQuestion.id ? 'Edit Question' : 'Add New Question'}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowQuestionForm(false)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Question Type</label>
                  <select
                    className="form-select"
                    value={questionType}
                    onChange={handleQuestionTypeChange}
                  >
                    <option value="quiz">Quiz</option>
                    <option value="assignment">Assignment</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label">Question</label>
                  <input
                    type="text"
                    className="form-control"
                    value={newQuestion.title}
                    onChange={(e) =>
                      setNewQuestion({ ...newQuestion, title: e.target.value })
                    }
                  />
                </div>

                {questionType === 'quiz' ? (
                  <>
                    <div className="mb-3">
                      <label className="form-label">Options</label>
                      {newQuestion.options.map((option, index) => (
                        <input
                          key={index}
                          type="text"
                          className="form-control mb-2"
                          value={option}
                          onChange={(e) => {
                            const updatedOptions = [...newQuestion.options];
                            updatedOptions[index] = e.target.value;
                            setNewQuestion({
                              ...newQuestion,
                              options: updatedOptions,
                            });
                          }}
                          placeholder={`Option ${index + 1}`}
                        />
                      ))}
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Correct Option</label>
                      <select
                        className="form-select"
                        value={newQuestion.correctOption || ''}
                        onChange={(e) =>
                          setNewQuestion({
                            ...newQuestion,
                            correctOption: e.target.value,
                          })
                        }
                      >
                        <option value="">Select Correct Option</option>
                        {newQuestion.options.map((_, index) => (
                          <option key={index} value={index}>
                            Option {index + 1}
                          </option>
                        ))}
                      </select>
                    </div>
                  </>
                ) : (
                  <div className="mb-3">
                    <label className="form-label">Details</label>
                    <textarea
                      className="form-control"
                      value={newQuestion.details}
                      onChange={(e) =>
                        setNewQuestion({ ...newQuestion, details: e.target.value })
                      }
                    />
                  </div>
                )}

                <div className="mb-3">
                  <label className="form-label">Category</label>
                  <input
                    type="text"
                    className="form-control"
                    value={newQuestion.category}
                    onChange={(e) =>
                      setNewQuestion({
                        ...newQuestion,
                        category: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Tags</label>
                  <input
                    type="text"
                    className="form-control"
                    value={newQuestion.tags.join(', ')}
                    onChange={(e) =>
                      setNewQuestion({
                        ...newQuestion,
                        tags: e.target.value
                          .split(',')
                          .map((tag) => tag.trim()),
                      })
                    }
                  />
                </div>
              </div>
              
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowQuestionForm(false)}>
                  Cancel
                </button>
                <button type="button" className="btn btn-primary" onClick={handleSaveQuestion}>
                  Save Question
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionBankManagementPage;
