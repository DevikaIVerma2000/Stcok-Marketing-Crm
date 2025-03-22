import React, { useEffect, useState } from "react";

const EmployeeWorkingStatus = () => {
  const [employees, setEmployees] = useState([]);
  const [activeTab, setActiveTab] = useState("Agents");

  // Fetch employee working status data (Replace with actual API endpoint)
  const fetchEmployeeData = () => {
    const endpoint =
      activeTab === "Agents"
        ? "/api/employee-working-status/agents"
        : "/api/employee-working-status/managers";
    fetch(endpoint)
      .then((response) => response.json())
      .then((data) => setEmployees(data))
      .catch((error) => console.error("Error fetching data:", error));
  };

  // Fetch data when the tab changes
  useEffect(() => {
    fetchEmployeeData();
  }, [activeTab]);

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      {/* Header Section */}
      <div className="bg-blue-900 text-white p-4 rounded-t-lg flex justify-between items-center">
        <h2 className="text-xl font-bold">TRUPOINT RESEARCH ANALYST CRM</h2>
        <div className="text-sm">
          <span>Time: </span>
          <span>Date: </span>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex flex-wrap gap-2 my-4">
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Dashboard
        </button>
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Agent Performance
        </button>
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Team Performance
        </button>
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Fresh Lead Stats
        </button>
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Employee Working Status
        </button>
      </div>

      {/* Tabs for Agents and Managers */}
      <div className="flex gap-4 mb-4">
        <button
          onClick={() => setActiveTab("Agents")}
          className={`px-4 py-2 rounded ${
            activeTab === "Agents"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700"
          } hover:bg-blue-700 hover:text-white`}
        >
          Agents
        </button>
        <button
          onClick={() => setActiveTab("Managers")}
          className={`px-4 py-2 rounded ${
            activeTab === "Managers"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700"
          } hover:bg-blue-700 hover:text-white`}
        >
          Managers
        </button>
      </div>

      {/* Data Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="border p-2 text-left">User Full Name</th>
              <th className="border p-2 text-left">Login Status</th>
              <th className="border p-2 text-left">Attendance</th>
              <th className="border p-2 text-left">Login Time</th>
              <th className="border p-2 text-left">Logout Time</th>
              <th className="border p-2 text-left">IP Address</th>
            </tr>
          </thead>
          <tbody>
            {employees.length > 0 ? (
              employees.map((employee, index) => (
                <tr key={index} className="text-left hover:bg-gray-50">
                  <td className="border p-2">{employee.fullName}</td>
                  <td className="border p-2">{employee.loginStatus}</td>
                  <td className="border p-2">{employee.attendance}</td>
                  <td className="border p-2">{employee.loginTime}</td>
                  <td className="border p-2">{employee.logoutTime}</td>
                  <td className="border p-2">{employee.ipAddress}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="border p-4 text-center text-gray-500">
                  No data available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeWorkingStatus;