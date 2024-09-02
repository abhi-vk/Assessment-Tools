import React, { createContext, useState, useContext } from 'react';

// Create Context
const AssessmentContext = createContext();

// Custom Hook to use the context
export const useAssessments = () => useContext(AssessmentContext);

// Provider Component
export const AssessmentProvider = ({ children }) => {
  const [drafts, setDrafts] = useState([]);
  const [published, setPublished] = useState([]);

  // Function to save a draft
  const saveDraft = (assessment) => {
    setDrafts((prevDrafts) => [...prevDrafts, assessment]);
  };

  // Function to publish an assessment
  const publishAssessment = (assessment) => {
    setDrafts((prevDrafts) =>
      prevDrafts.filter((draft) => draft.id !== assessment.id)
    );
    setPublished((prevPublished) => [...prevPublished, assessment]);
  };

  // Provide the context value
  return (
    <AssessmentContext.Provider value={{ drafts, published, setPublished, saveDraft, publishAssessment }}>
      {children}
    </AssessmentContext.Provider>
  );
};

// Ensure that context and hook are properly exported
export { AssessmentContext };
