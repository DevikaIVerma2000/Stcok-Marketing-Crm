import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';

const TeamPerformance = () => {
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState(format(new Date(new Date().setDate(new Date().getDate() - 16)), 'yyyy-MM-dd')); // Default start date 16 days ago
  const [endDate, setEndDate] = useState(format(new Date(), 'yyyy-MM-dd')); // Default end date to today
  const [teamPerformanceData, setTeamPerformanceData] = useState([]);

  // Mock API data (replace with your actual API endpoint)
  const fetchTeamPerformanceData = async () => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    setTeamPerformanceData([
      { teamName: 'Mumbai Indians', teamLeader: 'Team Leader 1', teamManager: 'NA', freshLeads: 0, followUpLeads: 0, conversion: 0, uca: 0, sales: 0 },
      { teamName: 'Chennai Super Kings', teamLeader: 'Team Leader 2', teamManager: 'Team Manager 1', freshLeads: 0, followUpLeads: 0, conversion: 0, uca: 0, sales: 0 },
      { teamName: 'Royal Challengers Bangalore', teamLeader: 'Team Leader 3', teamManager: 'NA', freshLeads: 0, followUpLeads: 0, conversion: 0, uca: 0, sales: 0 },
      { teamName: 'Kolkata Knight Riders', teamLeader: 'NA', teamManager: 'NA', freshLeads: 0, followUpLeads: 0, conversion: 0, uca: 0, sales: 0 },
    ]);
  };

  useEffect(() => {
    fetchTeamPerformanceData();
  }, []); // Fetch data on component mount

  const handleFetchReport = () => {
    console.log('Fetching report for:', startDate, endDate);
    // In a real application, you would call your API here with the selected date range
    fetchTeamPerformanceData(); // Re-fetch data for demonstration
  };

  return (
    <div className="p-6">
      <div className="bg-blue-800 text-white py-2 px-6 mb-4">
        <h2 className="text-xl font-semibold">Team Performance</h2>
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
          <button className="py-3 px-4 bg-blue-500 text-white font-semibold text-sm focus:outline-none rounded-tl-md rounded-tr-md">
            Team Performance
          </button>
          <button className="py-3 px-4 text-gray-700 font-semibold text-sm focus:outline-none hover:bg-gray-100">
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
                  Team Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Team Leader
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Team Manager
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fresh Leads
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Follow Up Leads
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Conversion
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  UCA
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sales
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {teamPerformanceData.map((team, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {team.teamName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {team.teamLeader}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {team.teamManager}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {team.freshLeads}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {team.followUpLeads}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {team.conversion}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {team.uca}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {team.sales}
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

export default TeamPerformance;