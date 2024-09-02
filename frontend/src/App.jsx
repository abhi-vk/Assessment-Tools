import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AssessmentDashboardPage from './pages/AssessmentDashboardPage';
import AssessmentCreationPage from './pages/AssessmentCreationPage';
import QuestionBankManagementPage from './pages/QuestionBankManagementPage';
import StudentAssessmentPage from './pages/StudentAssessmentPage';
import AssessmentReviewAndFeedbackPage from './pages/AssessmentReviewAndFeedbackPage';
import GradingAndReviewPage from './pages/GradingAndReviewPage';
import AssessmentAnalyticsPage from './pages/AssessmentAnalyticsPage';
import AssessmentSettingsPage from './pages/AssessmentSettingsPage';
import AssessmentArchiveAndDeletionPage from './pages/AssessmentArchiveAndDeletionPage';
import AssessmentFeedbackSummaryPage from './pages/AssessmentFeedbackSummaryPage';
import AssessmentDetailsPage from './pages/AssessmentDetailsPage';
import StudentSignup from './userLoginPages/StudentSignup'; 
import TeacherSignup from './userLoginPages/TeacherSignup'; 
import StudentLogin from './userLoginPages/StudentLogin'; 
import TeacherLogin from './userLoginPages/TeacherLogin'; 
import HomePage from './userLoginPages/HomePage' 
import { AssessmentProvider } from './components/AssessmentContext';
import StudentDashboardPage from './pages/StudentDashboardPage';

const NotFound = () => (
  <div className="text-center my-5">
    <h1>404</h1>
    <p>Page Not Found</p>
  </div>
);

const App = () => {
  return (
    <AssessmentProvider>
      <Router>
        <div className="App">
          <Routes>
            {/* Combined Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/student-signup" element={<StudentSignup />} />
            <Route path="/teacher-signup" element={<TeacherSignup />} />
            <Route path="/student-login" element={<StudentLogin />} />
            <Route path="/teacher-login" element={<TeacherLogin />} />
            <Route path="/dashboard" element={<AssessmentDashboardPage />} />
            <Route path="/create-assessment" element={<AssessmentCreationPage />} />
            <Route path="/question-bank" element={<QuestionBankManagementPage />} />
            <Route path="/take-assessment/:id" element={<StudentAssessmentPage />} />
            <Route path="/review-feedback" element={<AssessmentReviewAndFeedbackPage />} />
            <Route path="/grading-review" element={<GradingAndReviewPage />} />
            <Route path="/analytics" element={<AssessmentAnalyticsPage />} />
            <Route path="/settings" element={<AssessmentSettingsPage />} />
            <Route path="/archive-deletion" element={<AssessmentArchiveAndDeletionPage />} />
            <Route path="/feedback-summary" element={<AssessmentFeedbackSummaryPage />} />
            <Route path="/details" element={<AssessmentDetailsPage />} />
            <Route path="/student-dashboard" element={<StudentDashboardPage/>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Router>
    </AssessmentProvider>
  );
};

export default App;
