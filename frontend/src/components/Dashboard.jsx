import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AgentPerformance from "./AgentPerformance";

const Dashboard = () => {
  const navigate = useNavigate();
  const [isAdminMenuOpen, setIsAdminMenuOpen] = useState(false);
  const stats = [
    { label: "Customer Enrolled - Today", value: "0" },
    { label: "Sales Amount - Today", value: "0" },
    { label: "Customer Enrolled in a Month", value: "0" },
    { label: "Sales Amount - Current Month", value: "0" },
  ];

  const toggleAdminMenu = () => {
    setIsAdminMenuOpen(!isAdminMenuOpen);
  };

  return (
    <div className="bg-gray-100 h-screen font-sans">
      {/* Header and Navigation */}
      <div className="bg-[#004f83] text-white py-4 px-6 flex items-center justify-between shadow-md">
        <div className="flex items-center">
          <span className="text-xl font-bold mr-4">TRUPOINT</span>
          <span className="text-sm">TRUPOINT RESEARCH ANALYST CRM</span>
        </div>
        <div className="flex items-center text-sm">
          <span className="mr-4">Time: {new Date().toLocaleTimeString()}</span>
          <span>Date: {new Date().toLocaleDateString()}</span>
        </div>
      </div>

      <div className="bg-blue-600 text-white py-2 px-6">
        <h2 className="text-xl font-semibold">Welcome</h2>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className="bg-[#004f83] text-white w-64 py-6 px-3 space-y-3">
          <div className="font-semibold text-lg px-2"></div>
          <ul className="space-y-[-4px]">
            <li>
              <button className="block py-2 px-4 hover:bg-blue-800 w-full text-left">
                Dashboard
              </button>
            </li>
            <li>
              <button
                className="block py-2 px-4 hover:bg-blue-800 w-full text-left"
                onClick={() => navigate("/leads")}
              >
                Leads
              </button>
            </li>
            <li>
              <button className="block py-2 px-4 hover:bg-blue-800 w-full text-left"
                onClick={() => navigate("/sales-lead")}
              >
                Sales Lead
              </button>
            </li>
            <li>
              <button className="block py-2 px-4 hover:bg-blue-800 w-full text-left"
                onClick={() => navigate("/customers")}
              >
                Customers
              </button>
            </li>
            <li>
              <button className="block py-2 px-4 hover:bg-blue-800 w-full text-left"
                onClick={() => navigate("/all-packages-invoices")}
              >
                List Packages
              </button>
            </li>
            <li>
              <button className="block py-2 px-4 hover:bg-blue-800 w-full text-left"
                onClick={() => navigate("/customer-payments")}
              >
                List Payments
              </button>
            </li>
            <li>
              <button className="block py-2 px-4 hover:bg-blue-800 w-full text-left"
                onClick={() => navigate("/customer-invoices")}
              >
                List Invoices
              </button>
            </li>
            <li>
              <button className="block py-2 px-4 hover:bg-blue-800 w-full text-left">
                Stock Tips
              </button>
            </li>
            <li>
              <button className="block py-2 px-4 hover:bg-blue-800 w-full text-left"
                onClick={() => navigate("/quality-analysis")}
              >
                Quality Analysis
              </button>
            </li>
            <li>
              <button
                className="block py-2 px-4 hover:bg-blue-800 w-full text-left"
                onClick={toggleAdminMenu}
              >
                Admin
              </button>
              {isAdminMenuOpen && (
                <ul className="space-y-[-4px] pl-4">
                  <li>
                    <button className="block py-2 px-4 hover:bg-blue-800 w-full text-left"
                    onClick={() => navigate("/list-users")}
                    >
                      Manage Users
                    </button>
                  </li>
                  <li>
                    <button className="block py-2 px-4 hover:bg-blue-800 w-full text-left"
                    onClick={() => navigate("/team-list")}
                    >
                      Manage Teams
                    </button>
                  </li>
                  <li>
                    <button className="block py-2 px-4 hover:bg-blue-800 w-full text-left"
                    onClick={() => navigate("/manage-lead-sources")}
                    >
                      Manage Source
                    </button>
                  </li>
                  <li>
                    <button className="block py-2 px-4 hover:bg-blue-800 w-full text-left"
                    onClick={() => navigate("/manage-marketing-agencies")}
                    >
                      Manage Agency
                    </button>
                  </li>
                  <li>
                    <button className="block py-2 px-4 hover:bg-blue-800 w-full text-left"
                    onClick={() => navigate("/upload-leads")}
                    >
                      Upload Leads
                    </button>
                  </li>
                </ul>
              )}
            </li>
            <li>
              <button className="block py-2 px-4 hover:bg-blue-800 w-full text-left">
                Management
              </button>
            </li>
            <li>
              <button className="block py-2 px-4 hover:bg-blue-800 w-full text-left">
                Company
              </button>
            </li>
            <li>
              <button className="block py-2 px-4 hover:bg-blue-800 w-full text-left">
                Reports
              </button>
            </li>
          </ul>
          <div className="absolute bottom-4 left-0 w-full px-3">
            <div className="bg-[#004f83] rounded-md p-2 flex items-center">
              <div className="w-8 h-8 rounded-full bg-gray-400 mr-2 flex items-center justify-center">
                {/* You can add an icon or initials here */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 text-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.125h15.002M4.501 20.125V5.5m15.002 14.625V5.5"
                  />
                </svg>
              </div>
              <div>
                <div className="text-sm font-semibold">Super Admin</div>
                <div className="text-xs">Root</div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          {/* Navigation Tabs */}
          <div className="bg-white shadow rounded-md mb-6">
            <div className="flex border-b border-gray-200">
              <button className="py-3 px-4 bg-[#004f83]-500 text-white font-semibold text-sm focus:outline-none rounded-tl-md rounded-tr-md">
                Dashboard
              </button>
              <button
                className="py-3 px-4 text-gray-700 font-semibold text-sm focus:outline-none hover:bg-gray-100"
                onClick={() => navigate("/agent-performance")}
              >
                Agent Performance
              </button>
              <button className="py-3 px-4 text-gray-700 font-semibold text-sm focus:outline-none hover:bg-gray-100"
                onClick={() => navigate("/team-performance")}
              >
                Team Performance
              </button>
              <button className="py-3 px-4 text-gray-700 font-semibold text-sm focus:outline-none hover:bg-gray-100"
                onClick={() => navigate("/fresh-lead-stats")}
              >
                Fresh Lead Stats
              </button>
              <button className="py-3 px-4 text-gray-700 font-semibold text-sm focus:outline-none hover:bg-gray-100 rounded-tr-md">
                Employee Working Status
              </button>
            </div>
          </div>

          {/* Dashboard Content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {/* Branch Sales Report */}
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-4 bg-blue-500 text-white p-2 rounded">
                Branch Sales Report
              </h3>
              <div className="space-y-2">
                {stats.map((stat, index) => (
                  <div
                    key={index}
                    className="flex justify-between border-b py-2"
                  >
                    <span className="text-gray-600">{stat.label}</span>
                    <span className="font-semibold">{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Branch Sales Current Month */}
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-4 bg-blue-500 text-white p-2 rounded">
                Branch Sales Current Month
              </h3>
              <div className="flex items-center justify-center h-24 text-gray-500">
                No data available.
              </div>
            </div>

            {/* Branch Sales Last Month */}
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-4 bg-blue-500 text-white p-2 rounded">
                Branch Sales Last Month
              </h3>
              <div className="flex items-center justify-center h-24 text-gray-500">
                No data available.
              </div>
            </div>
          </div>

          {/* Team Leader Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-4 bg-blue-500 text-white p-2 rounded">
                Team Leader Sales Current Month
              </h3>
              <div className="flex items-center justify-center h-24 text-gray-500">
                No data available.
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-4 bg-blue-500 text-white p-2 rounded">
                Team Leader Sales Last Month
              </h3>
              <div className="flex items-center justify-center h-24 text-gray-500">
                No data available.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 