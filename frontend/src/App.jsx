import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Leads from "./components/Lead";
import AgentPerformance from "./components/AgentPerformance";
import TeamPerformance from "./components/TeamPerformance";
import FreshLeadStats from "./components/FreshLeadStats";
import FreshLeads from "./components/FreshLeads";


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/leads" element={<Leads />} />
        <Route path="/agent-performance" element={<AgentPerformance />} />
        <Route path="/team-performance" element={<TeamPerformance />} />
        <Route path="/fresh-lead-stats" element={<FreshLeadStats />} />
        <Route path="/fresh-leads" element={<FreshLeads />} />
      </Routes>
    </Router>
  );
};

export default App;
