import React, { useState } from 'react';

const QuestionBankModal = ({ show, onClose, questions, onSelectQuestions }) => {
  const [selectedQuestions, setSelectedQuestions] = useState([]);

  if (!show) return null;

  const handleCheckboxChange = (question) => {
    setSelectedQuestions(prev => {
      const isSelected = prev.some(q => q.id === question.id);
      if (isSelected) {
        return prev.filter(q => q.id !== question.id);
      } else {
        return [...prev, question];
      }
    });
  };

  const handleSelect = () => {
    onSelectQuestions(selectedQuestions);
    setSelectedQuestions([]); // Clear selection
    onClose();
  };

  return (
    <div className="modal show d-block" tabIndex="-1" role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Question Bank</h5>
            <button type="button" className="btn-close" onClick={onClose}>
              <span>&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <ul className="list-group">
              {questions.length > 0 ? (
                questions.map((question) => (
                  <li key={question.id} className="list-group-item">
                    <input
                      type="checkbox"
                      checked={selectedQuestions.some(q => q.id === question.id)}
                      onChange={() => handleCheckboxChange(question)}
                      className="me-2"
                    />
                    <div><strong>Question:</strong> {question.title}</div>
                    <div><strong>Options:</strong></div>
                    <ul>
                      {question.options.map((option, i) => (
                        <li key={i}>{option}</li>
                      ))}
                    </ul>
                    <div><strong>Category:</strong> {question.category}</div>
                  </li>
                ))
              ) : (
                <li className="list-group-item">No questions available</li>
              )}
            </ul>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Close
            </button>
            <button type="button" className="btn btn-primary" onClick={handleSelect}>
              Select
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionBankModal;
