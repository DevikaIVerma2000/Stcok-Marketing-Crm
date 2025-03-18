import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Leads from "./components/Lead";
import AgentPerformance from "./components/AgentPerformance";
import TeamPerformance from "./components/TeamPerformance";
import FreshLeadStats from "./components/FreshLeadStats";
import FreshLeads from "./components/FreshLeads";
import SalesLead from "./components/SalesLead";
import ListCustomers from "./components/ListCustomers";
import AllPackagesInvoices from "./components/AllPackagesInvoices";
import CustomerPayments from "./components/CustomerPayments";
import CustomerInvoices from "./components/CustomerInvoices";
import QualityAnalysis from "./components/QualityAnalysis";
import ListUsers from "./components/ListUsers ";
import TeamList from "./components/TeamList";
import ManageLeadSources from "./components/ManageLeadSources";
import ManageMarketingAgencies from "./components/ManageMarketingAgencies";
import UploadLeads from "./components/UploadLeads";

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
        <Route path="/sales-lead" element={<SalesLead />} /> 
        <Route path="/customers" element={<ListCustomers />} />
        <Route path="/all-packages-invoices" element={<AllPackagesInvoices />} /> 
        <Route path="/customer-payments" element={<CustomerPayments />} /> 
        <Route path="/customer-invoices" element={<CustomerInvoices />} />
        <Route path="/quality-analysis" element={<QualityAnalysis />} />  
        <Route path="/list-users" element={<ListUsers />} />
        <Route path="/team-list" element={<TeamList />} />
        <Route path="/manage-lead-sources" element={<ManageLeadSources />} />
        <Route path="/manage-marketing-agencies" element={<ManageMarketingAgencies />} />
        <Route path="/upload-leads" element={<UploadLeads />} />
      </Routes>
    </Router>
  );
};

export default App;
