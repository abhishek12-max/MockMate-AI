import { BrowserRouter, Routes, Route } from "react-router-dom";

import Landing from "./pages/Landing";
import Features from "./pages/Features";
import HowItWorks from "./pages/HowItWorks";
import WhyMockMate from "./pages/WhyMockMate";
import VerifyOtp from "./pages/VerifyOtp";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Resume from "./pages/Resume";
import InterviewSetup from "./pages/InterviewSetup";
import Interview from "./pages/Interview";
import Report from "./pages/Report";
import InterviewHistory from "./pages/InterviewHistory";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/features" element={<Features />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/why-mockmate" element={<WhyMockMate />} />


        <Route path="/verify-otp" element={<VerifyOtp />}/>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login/>}/>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="/interviews/setup" element={<InterviewSetup />}/>
        <Route path="/interviews/:interviewId/report" element={<Report />}/>
        <Route path="/interviews/:interviewId" element={<Interview />}/>
        <Route path="/interviews" element={<InterviewHistory />}/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;