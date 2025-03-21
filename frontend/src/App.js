import React, { useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Login from './pages/Login';
import LandingPage from './pages/LandingPage';
import StudentDashboard from './pages/StudentDashboard';
import Chatbot from './components/Chatbot';
import AptitudeLandingPage from './pages/AptitudeLanding';
import LogicalReasoning from './pages/LogicalReasoning';
import Results from './components/Results';
import RoadMap from './pages/RoadMap';
import CareerPredictionForm from './pages/Forms';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import ExploreCareerOptions from './pages/ExploreCareerOptions';
import ReportUpload from './pages/ReportUpload';
import ProfilePage from './pages/ProfilePage';
import ResultsPage from './pages/ResultsPage';
import Notifications from './pages/Notifications';
import VerbalAbility from './pages/VerbalAbility';
import NumericalAbility from './pages/NumericalAbility';
import StudentProfile from './pages/StudentProfile';
import PreAptitude from './pages/PreAptitude';
import StudentForm from './pages/StudentForm';
import GraduateForm from './pages/GraduateForm';
import ProfessionalForm from './pages/ProfessionalForm';
import Contact from './pages/Contact';
import ResumeUploader from './pages/ProfessionalForm';
import SkillGap from './pages/SkillGap';
import SkillQuestionPage from './pages/SkillQuestionPage';
import Community from './pages/Community';
import GroupDetail from './pages/GroupDetail';
import CareerRoadmapPage from './pages/CareerRoadmapPage';
import PreSkillGapLandingPage from './pages/PreSkillGapLandingPage';
import Interview_Landing from './components/Mock_Interview/Home';
import Interview_Questions from './components/Mock_Interview/Interview';
import Interview_Results from './components/Mock_Interview/Results';
import ReportStudent from './pages/ReportStudent';
import ReportGraduate from './pages/ReportGraduate';
import CareerRoadmapTimeline from './pages/CareerRoadmapTimeline';
import TestReport from './pages/TestReport';
//import PsychometricAssessment from './pages/TestAptitude';
import SpatialAbility from './pages/SpatialAbility';
import Feedback from './pages/Feedback';
import Welcome from './pages/WelcomeStd';
import ScholarshipForm from './pages/ScholarshipForm';
import ProfessionalWelcome from './pages/WelcomePro';


function App() {
  const [scores, setScores] = useState({ numerical: 0, verbal: 0, logical: 0 });

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/recommendations" element={<ReportUpload />} />
            <Route path="/spatial-ability" element={<SpatialAbility />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/chatbot" element={<Chatbot />} />
            <Route path="/student/dashboard" element={<StudentDashboard />} />
            <Route path="/numerical-ability/:userType" element={<NumericalAbility setScores={setScores} />} />
            <Route path="/verbal-ability" element={<VerbalAbility setScores={setScores} />} />
            <Route path="/logical-reasoning" element={<LogicalReasoning setScores={setScores} />} />
            <Route path="/results" element={<Results scores={scores} />} />
            <Route path="/aptitude/:userType" element={<AptitudeLandingPage />} />
            <Route path="/student/dashboard" element={<StudentDashboard />} />
            <Route path="/roadmap" element={<RoadMap />} />
            <Route path="/forms" element={<CareerPredictionForm />} />
            <Route path="/Dashboard" element={<Dashboard />} />
            <Route path="/ExploreCareerOptions" element={<ExploreCareerOptions />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/ResultsPage" element={<ResultsPage />} />
            <Route path="/Notifications" element={<Notifications />} />
            <Route path="/SkillGap" element={<SkillGap />} />
            <Route path="/pre-skill-gap" element={<PreSkillGapLandingPage />} />
            <Route path="/graduate-skill-gap" element={<SkillGap />} />
            <Route path="/community" element={<Community />} />
            <Route path="/community/:id" element={<GroupDetail />} />
            <Route path="/report" element={<ReportUpload />} />
            <Route path="/preaptitude" element={<PreAptitude />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/skill-gap" element={<SkillGap />} />
            <Route path="/student-form" element={<StudentForm />} />
            <Route path="/graduate-form" element={<GraduateForm />} />
            <Route path="/student-profile/:userId" element={<StudentProfile />} />
            <Route path="/professional-form" element={<ResumeUploader />} />
            <Route path="/skill-gap-test" element={<SkillQuestionPage />} />
            <Route path="/skill-question" element={<SkillQuestionPage />} />
            <Route path="/career-roadmap" element={<CareerRoadmapPage />} />
            <Route path="/interview-landing" element={<Interview_Landing />} />
            <Route path="/interview-questions" element={<Interview_Questions />} />
            <Route path="/interview-results" element={<Interview_Results />} />
            <Route path="/report-student" element={<ReportStudent />} />
            <Route path="/report-graduate" element={<ReportGraduate />} />
            <Route path="/career-roadmap" element={<CareerRoadmapTimeline />} />
            <Route path="/test-report" element={<TestReport />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/welcome" element={< Welcome/>} />
            <Route path="/scholarship" element={<ScholarshipForm />} />
            {<Route path="/welcome-pro" element={<ProfessionalWelcome />}/> }
             {/* <Route path="/test-aptitude" element={<PsychometricAssessment /}> */}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;