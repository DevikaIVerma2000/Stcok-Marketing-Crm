import React, { useEffect, useState } from "react";

const AgentPerformance = () => {
  const [agents, setAgents] = useState([]);
  const [startDate, setStartDate] = useState("2025-03-01");
  const [endDate, setEndDate] = useState("2025-03-17");
  const [team, setTeam] = useState("All Teams");

  // Fetch agent performance data (Replace with actual API endpoint)
  useEffect(() => {
    fetch("/api/agent-performance")
      .then((response) => response.json())
      .then((data) => setAgents(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      {/* Header Section */}
      <h2 className="text-2xl font-bold text-blue-900 mb-4">Agent Performance</h2>

      {/* Filter Section */}
      <div className="flex flex-wrap gap-2 mb-4">
        <button className="bg-blue-500 text-white px-4 py-2 rounded">Dashboard</button>
        <button className="bg-blue-500 text-white px-4 py-2 rounded">Agent Performance</button>
        <button className="bg-blue-500 text-white px-4 py-2 rounded">Team Performance</button>
        <button className="bg-blue-500 text-white px-4 py-2 rounded">Fresh Lead Stats</button>
        <button className="bg-blue-500 text-white px-4 py-2 rounded">Employee Working Status</button>
      </div>

      {/* Date & Team Filters */}
      <div className="flex flex-wrap gap-2 items-center mb-4">
        <label className="font-semibold">Start Date:</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="border p-2 rounded"
        />

        <label className="font-semibold ml-4">End Date:</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="border p-2 rounded"
        />

        <label className="font-semibold ml-4">Team:</label>
        <select
          value={team}
          onChange={(e) => setTeam(e.target.value)}
          className="border p-2 rounded"
        >
          <option>All Teams</option>
          <option>Team 1</option>
          <option>Team 2</option>
          <option>Team 3</option>
        </select>

        <button className="bg-blue-600 text-white px-4 py-2 rounded ml-4">
          Fetch Report
        </button>
      </div>

      {/* Data Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Agent Name</th>
              <th className="border p-2">Team Leader</th>
              <th className="border p-2">Fresh Leads</th>
              <th className="border p-2">Follow Up Leads</th>
              <th className="border p-2">Calls Done</th>
              <th className="border p-2">Conversion</th>
              <th className="border p-2">UCA</th>
              <th className="border p-2">Sales</th>
              <th className="border p-2">Target</th>
            </tr>
          </thead>
          <tbody>
            {agents.length > 0 ? (
              agents.map((agent, index) => (
                <tr key={index} className="text-center">
                  <td className="border p-2">{agent.name}</td>
                  <td className="border p-2">{agent.teamLeader}</td>
                  <td className="border p-2">{agent.freshLeads}</td>
                  <td className="border p-2">{agent.followUpLeads}</td>
                  <td className="border p-2">{agent.callsDone}</td>
                  <td className="border p-2">{agent.conversion}</td>
                  <td className="border p-2">{agent.uca}</td>
                  <td className="border p-2">{agent.sales}</td>
                  <td className="border p-2 bg-red-500 text-white">{agent.target}</td>
                </tr>
              ))
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
    </div>
  );
};

export default AgentPerformance;
