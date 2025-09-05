import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import ExamResults from './pages/exam-results';
import Login from './pages/login';
import SystemAdministration from './pages/system-administration';
import QuestionBankManagement from './pages/question-bank-management';
import ExamCreation from './pages/exam-creation';
import StudentDashboard from './pages/student-dashboard';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<ExamCreation />} />
        <Route path="/exam-results" element={<ExamResults />} />
        <Route path="/login" element={<Login />} />
        <Route path="/system-administration" element={<SystemAdministration />} />
        <Route path="/question-bank-management" element={<QuestionBankManagement />} />
        <Route path="/exam-creation" element={<ExamCreation />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
