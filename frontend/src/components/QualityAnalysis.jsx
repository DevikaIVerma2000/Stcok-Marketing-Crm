import React from "react";
import { useState } from "react";

const QualityAnalysis = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [agent, setAgent] = useState("All Agent");

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-blue-900 text-white p-5">
        <h2 className="text-lg font-bold mb-6">TRUPOINT</h2>
        <ul className="space-y-4">
          <li className="hover:bg-blue-700 p-2 rounded cursor-pointer">Dashboard</li>
          <li className="hover:bg-blue-700 p-2 rounded cursor-pointer">Leads</li>
          <li className="hover:bg-blue-700 p-2 rounded cursor-pointer">Sales Lead</li>
          <li className="hover:bg-blue-700 p-2 rounded cursor-pointer">Customers</li>
          <li className="hover:bg-blue-700 p-2 rounded cursor-pointer">List Packages</li>
          <li className="hover:bg-blue-700 p-2 rounded cursor-pointer">List Payments</li>
          <li className="hover:bg-blue-700 p-2 rounded cursor-pointer">List Invoices</li>
          <li className="hover:bg-blue-700 p-2 rounded cursor-pointer">Stock Tips</li>
          <li className="hover:bg-blue-700 p-2 rounded cursor-pointer">Quality Analysis</li>
          <li className="hover:bg-blue-700 p-2 rounded cursor-pointer">Admin</li>
          <li className="hover:bg-blue-700 p-2 rounded cursor-pointer">Management</li>
          <li className="hover:bg-blue-700 p-2 rounded cursor-pointer">Company</li>
          <li className="hover:bg-blue-700 p-2 rounded cursor-pointer">Reports</li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-gray-100 p-6">
        <div className="bg-blue-900 text-white p-4 rounded-lg">
          <h1 className="text-2xl font-semibold">Quality Analysis</h1>
        </div>
        
        <div className="bg-white shadow-lg rounded-lg p-6 mt-4">
          <div className="flex space-x-4 items-center">
            {/* Start Date */}
            <div>
              <label className="text-gray-600 block">Start Date:</label>
              <input 
                type="date" 
                className="border p-2 rounded w-40" 
                value={startDate} 
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>

            {/* End Date */}
            <div>
              <label className="text-gray-600 block">End Date:</label>
              <input 
                type="date" 
                className="border p-2 rounded w-40" 
                value={endDate} 
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>

            {/* Agents Dropdown */}
            <div>
              <label className="text-gray-600 block">Agents:</label>
              <select 
                className="border p-2 rounded w-40"
                value={agent}
                onChange={(e) => setAgent(e.target.value)}
              >
                <option>All Agent</option>
                <option>Agent 1</option>
                <option>Agent 2</option>
                <option>Agent 3</option>
              </select>
            </div>

            {/* Fetch Report Button */}
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Fetch Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QualityAnalysis;
