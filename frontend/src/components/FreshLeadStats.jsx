import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';

const FreshLeadStats = () => {
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState(format(new Date(new Date().setDate(new Date().getDate() - 6)), 'yyyy-MM-dd')); 
  const [endDate, setEndDate] = useState(format(new Date(), 'yyyy-MM-dd')); 
  const [agentReportType, setAgentReportType] = useState('Agent Report');
  const [freshLeadStatsData, setFreshLeadStatsData] = useState([]);

  // Mock API data (replace with your actual API endpoint)
  const fetchFreshLeadStatsData = async () => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    setFreshLeadStatsData([
      { agentName: 'Agent 1 Team 1', assignedLeads: 0, unusedLeads: 0 },
      { agentName: 'Agent 1 Team 2', assignedLeads: 0, unusedLeads: 0 },
      { agentName: 'Agent 1 Team 3', assignedLeads: 0, unusedLeads: 0 },
      { agentName: 'Agent 2 Team 2', assignedLeads: 0, unusedLeads: 0 },
    ]);
  };

  useEffect(() => {
    fetchFreshLeadStatsData();
  }, []); // Fetch data on component mount

  const handleFetchReport = () => {
    console.log('Fetching fresh lead stats for:', startDate, endDate, agentReportType);
    // In a real application, you would call your API here with the selected date range and report type
    fetchFreshLeadStatsData(); // Re-fetch data for demonstration
  };

  return (
    <div className="p-6">
      <div className="bg-blue-800 text-white py-2 px-6 mb-4">
        <h2 className="text-xl font-semibold">Fresh Lead Stats</h2>
      </div>
      <div className="bg-white shadow rounded-md mb-6">
        <div className="flex border-b border-gray-200">
          <button
            className="py-3 px-4 text-gray-700 font-semibold text-sm focus:outline-none hover:bg-gray-100"
            onClick={() => navigate('/dashboard')}
          >
            Dashboard
          </button>
          <button
            className="py-3 px-4 text-gray-700 font-semibold text-sm focus:outline-none hover:bg-gray-100"
            onClick={() => navigate('/agent-performance')}
          >
            Agent Performance
          </button>
          <button
            className="py-3 px-4 text-gray-700 font-semibold text-sm focus:outline-none hover:bg-gray-100"
            onClick={() => navigate('/team-performance')}
          >
            Team Performance
          </button>
          <button className="py-3 px-4 bg-blue-500 text-white font-semibold text-sm focus:outline-none rounded-tl-md rounded-tr-md">
            Fresh Lead Stats
          </button>
          <button className="py-3 px-4 text-gray-700 font-semibold text-sm focus:outline-none hover:bg-gray-100 rounded-tr-md">
            Employee Working Status
          </button>
        </div>
      </div>

      <div className="bg-white shadow rounded-md p-4">
        <div className="flex flex-wrap items-center gap-4 mb-4">
          <div className="flex items-center">
            <label htmlFor="startDate" className="mr-2 text-sm font-semibold text-gray-700">
              Start Date:
            </label>
            <input
              type="date"
              id="startDate"
              className="border rounded p-2 text-sm text-gray-700"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div className="flex items-center">
            <label htmlFor="endDate" className="mr-2 text-sm font-semibold text-gray-700">
              End Date:
            </label>
            <input
              type="date"
              id="endDate"
              className="border rounded p-2 text-sm text-gray-700"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
          <div className="flex items-center">
            <label htmlFor="team" className="mr-2 text-sm font-semibold text-gray-700">
              Team:
            </label>
            <select
              id="team"
              className="border rounded p-2 text-sm text-gray-700"
              value={agentReportType}
              onChange={(e) => setAgentReportType(e.target.value)}
            >
              <option>Agent Report</option>
              {/* Add other team options if needed */}
            </select>
          </div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm focus:outline-none focus:shadow-outline"
            onClick={handleFetchReport}
          >
            Fetch Report
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Agent Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Assigned Leads
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Unused Leads
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {freshLeadStatsData.map((agent, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {agent.agentName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {agent.assignedLeads}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {agent.unusedLeads}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    No Leads to Revert
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FreshLeadStats;