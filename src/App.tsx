import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import SubmitUseCasePage from './pages/SubmitUseCasePage'
import RemoveTediumPage from './pages/RemoveTediumPage'
import DriveInnovationPage from './pages/DriveInnovationPage'
import WorkSmarterPage from './pages/WorkSmarterPage'
import FAQPage from './pages/FAQPage'
import CaseStudies from './pages/CaseStudies'
import DepartmentDashboard from './pages/DashboardPage'
import ProjectDetailPage from './pages/ProjectDetailPage'
import CaseStudiesPage from './pages/CaseStudies';
import ScrollToTop from './components/ui/ScrollToTop'
import CaseStudyDetailPage from './pages/CaseStudyDetailPage'

// timeline page
import TimelinePage from './pages/TimelinePage'
import WinFormula from './pages/WinFormula'

// teams formed page 
import TeamsFormedPage from './pages/TeamsFormedPage'
import SprintsPage from './pages/SprintsPage'
import TrainingAndResources from './pages/TrainingAndResources'


function App() {
  return (
    <Router>
      <ScrollToTop /> {/* Render the ScrollToTop component here */}
      <div className="min-h-screen bg-black">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/submit-use-case" element={<SubmitUseCasePage />} />
          <Route path="/remove-tedium" element={<RemoveTediumPage />} />
          <Route path="/drive-innovation" element={<DriveInnovationPage />} />
          <Route path="/work-smarter" element={<WorkSmarterPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/teams-formed" element={<TeamsFormedPage />} />
          <Route path="/project/:id" element={<ProjectDetailPage />} />
          <Route path="/dashboard" element={<DepartmentDashboard />} />
          <Route path="/case-studies" element={<CaseStudiesPage />} />
          <Route path="/win-formula" element={<WinFormula/>} />
          <Route path="/case-studies/:id" element={<CaseStudyDetailPage />} />


          {/* Timeline */}
          <Route path="/timeline" element={<TimelinePage />} />

          {/* Sprints */}
          <Route path="/sprints" element={<SprintsPage />} />

          {/* Training Resources */}
          <Route path="/training-resources" element={<TrainingAndResources />} />
          
          



        </Routes>
      </div>
    </Router>
  )
}

export default App