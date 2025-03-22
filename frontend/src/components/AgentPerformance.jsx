import React, { useEffect, useState } from "react";

const AgentPerformance = () => {
  const [agents, setAgents] = useState([]);
  const [startDate, setStartDate] = useState("2025-03-01");
  const [endDate, setEndDate] = useState("2025-03-22");
  const [team, setTeam] = useState("All Teams");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalEntries, setTotalEntries] = useState(0);
  const entriesPerPage = 7;

  // Fetch agent performance data dynamically based on filters
  const fetchAgentData = () => {
    // Simulate API call with query parameters
    const query = `?startDate=${startDate}&endDate=${endDate}&team=${team}&page=${currentPage}&limit=${entriesPerPage}`;
    fetch(`/api/agent-performance${query}`)
      .then((response) => response.json())
      .then((data) => {
        setAgents(data.agents);
        setTotalEntries(data.total); // Assuming API returns total entries
      })
      .catch((error) => console.error("Error fetching data:", error));
  };

  // Fetch data when filters or page changes
  useEffect(() => {
    fetchAgentData();
  }, [startDate, endDate, team, currentPage]);

  // Handle pagination
  const totalPages = Math.ceil(totalEntries / entriesPerPage);
  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };
  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      {/* Header Section */}
      <div className="bg-blue-900 text-white p-4 rounded-t-lg">
        <h2 className="text-xl font-bold">TRUPOINT RESEARCH ANALYST CRM</h2>
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

      {/* Date & Team Filters */}
      <div className="flex flex-wrap gap-4 items-center mb-4">
        <div className="flex items-center gap-2">
          <label className="font-semibold text-gray-700">Start Date:</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center gap-2">
          <label className="font-semibold text-gray-700">End Date:</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center gap-2">
          <label className="font-semibold text-gray-700">Team:</label>
          <select
            value={team}
            onChange={(e) => setTeam(e.target.value)}
            className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option>All Teams</option>
            <option>Team 1</option>
            <option>Team 2</option>
            <option>Team 3</option>
          </select>
        </div>

        <button
          onClick={fetchAgentData}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Fetch Report
        </button>
      </div>

      {/* Data Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="border p-2 text-left">Agent Name</th>
              <th className="border p-2 text-left">Team Leader</th>
              <th className="border p-2 text-center">Fresh Leads</th>
              <th className="border p-2 text-center">Follow Up Leads</th>
              <th className="border p-2 text-center">Calls Done</th>
              <th className="border p-2 text-center">Conversion</th>
              <th className="border p-2 text-center">UCA</th>
              <th className="border p-2 text-center">Sales</th>
              <th className="border p-2 text-center">Target</th>
            </tr>
          </thead>
          <tbody>
            {agents.length > 0 ? (
              <>
                {/* Total Row */}
                <tr className="bg-gray-50 font-semibold">
                  <td className="border p-2">TOTAL</td>
                  <td className="border p-2"></td>
                  <td className="border p-2 text-center">
                    {agents.reduce((sum, agent) => sum + (agent.freshLeads || 0), 0)}
                  </td>
                  <td className="border p-2 text-center">
                    {agents.reduce((sum, agent) => sum + (agent.followUpLeads || 0), 0)}
                  </td>
                  <td className="border p-2 text-center">
                    {agents.reduce((sum, agent) => sum + (agent.callsDone || 0), 0)}
                  </td>
                  <td className="border p-2 text-center">
                    {agents.reduce((sum, agent) => sum + (agent.conversion || 0), 0)}
                  </td>
                  <td className="border p-2 text-center">
                    {agents.reduce((sum, agent) => sum + (agent.uca || 0), 0)}
                  </td>
                  <td className="border p-2 text-center">
                    {agents.reduce((sum, agent) => sum + (agent.sales || 0), 0)}
                  </td>
                  <td className="border p-2 text-center bg-red-500 text-white">
                    {agents.reduce((sum, agent) => sum + (agent.target || 0), 0)}
                  </td>
                </tr>
                {/* Agent Rows */}
                {agents.map((agent, index) => (
                  <tr key={index} className="text-center hover:bg-gray-50">
                    <td className="border p-2 text-left">{agent.name}</td>
                    <td className="border p-2 text-left">{agent.teamLeader}</td>
                    <td className="border p-2">{agent.freshLeads || 0}</td>
                    <td className="border p-2">{agent.followUpLeads || 0}</td>
                    <td className="border p-2">{agent.callsDone || 0}</td>
                    <td className="border p-2">{agent.conversion || 0}</td>
                    <td className="border p-2">{agent.uca || 0}</td>
                    <td className="border p-2">{agent.sales || 0}</td>
                    <td className="border p-2 bg-red-500 text-white">{agent.target || 0}</td>
                  </tr>
                ))}
              </>
            ) : (
              <tr>
                <td colSpan="9" className="border p-4 text-center text-gray-500">
                  No data available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <p className="text-gray-600">
          Showing {(currentPage - 1) * entriesPerPage + 1} to{" "}
          {Math.min(currentPage * entriesPerPage, totalEntries)} of {totalEntries} entries
        </p>
        <div className="flex gap-2">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="bg-gray-300 text-gray-700 px-3 py-1 rounded disabled:opacity-50"
          >
            ←
          </button>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="bg-gray-300 text-gray-700 px-3 py-1 rounded disabled:opacity-50"
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
};

export default AgentPerformance;