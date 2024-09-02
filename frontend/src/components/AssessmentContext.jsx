import React, { createContext, useState, useContext } from 'react';


const AssessmentContext = createContext();


export const useAssessments = () => useContext(AssessmentContext);


export const AssessmentProvider = ({ children }) => {
  const [drafts, setDrafts] = useState([]);
  const [published, setPublished] = useState([]);

  // Function to save a draft
  const saveDraft = (assessment) => {
    setDrafts((prevDrafts) => [...prevDrafts, assessment]);
  };


  const publishAssessment = (assessment) => {
    setDrafts((prevDrafts) =>
      prevDrafts.filter((draft) => draft.id !== assessment.id)
    );
    setPublished((prevPublished) => [...prevPublished, assessment]);
  };

 
  return (
    <AssessmentContext.Provider value={{ drafts, published, setPublished, saveDraft, publishAssessment }}>
      {children}
    </AssessmentContext.Provider>
  );
};


export { AssessmentContext };
