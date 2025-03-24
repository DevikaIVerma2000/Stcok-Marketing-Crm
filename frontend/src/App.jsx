import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Leads from "./components/Lead"; // Note: File name is "Lead" but imported as "Leads"
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
import LeadsTable from "./components/LeadsTable";
import ManageAttendanceRequest from "./components/ManageAttendanceRequest";
import CompanyConfig from "./components/CompanyConfig";
import ListOfReports from "./components/ListOfReports";
import EmployeeWorkingStatus from "./components/EmployeeWorkingStatus";
import LeadDetails from "./components/LeadDetails";
import AddUser from "./components/AddUser";
import EditUser from "./components/EditUser";


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
        <Route path="/leads-table" element={<LeadsTable />} />
        <Route path="/manage-attendance-request" element={<ManageAttendanceRequest />} />
        <Route path="/company-config" element={<CompanyConfig />} />
        <Route path="/list-of-reports" element={<ListOfReports />} />
        <Route path="/employee-working-status" element={<EmployeeWorkingStatus />} />
        {/* Updated route to accept dynamic id parameter */}
        <Route path="/lead-details/:id" element={<LeadDetails />} />
        <Route path="/add-user" element={<AddUser />} />
        <Route path="/edit-user/:id" element={<EditUser />} />
      </Routes>
    </Router>
  );
};

export default App;