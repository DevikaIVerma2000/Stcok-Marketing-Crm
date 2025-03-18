import React, { useState } from 'react';

function TeamList() {
  const [teams, setTeams] = useState([
    { id: 1, name: 'Mumbai Indians', leader: 'Team Leader 1', manager: 'No Team Manager Assigned', members: 1 },
    { id: 2, name: 'Chennai Super Kings', leader: 'Team Leader 2', manager: 'Team Manager 1', members: 2 },
    { id: 3, name: 'Royal Challengers Bangalore', leader: 'Team Leader 3', manager: 'No Team Manager Assigned', members: 1 },
    { id: 4, name: 'Kolkata Knight Riders', leader: 'No Team Leader Assigned', manager: 'No Team Manager Assigned', members: 0 },
    { id: 5, name: 'kolkata', leader: 'No Team Leader Assigned', manager: 'No Team Manager Assigned', members: 0 },
  ]);
  const [showAddTeamModal, setShowAddTeamModal] = useState(false);
  const [newTeamName, setNewTeamName] = useState('');

  const handleAddNewTeamClick = () => {
    setShowAddTeamModal(true);
    setNewTeamName(''); // Reset the input field
  };

  const handleCloseModal = () => {
    setShowAddTeamModal(false);
  };

  const handleInputChange = (event) => {
    setNewTeamName(event.target.value);
  };

  const handleAddTeamSubmit = () => {
    if (newTeamName.trim()) {
      const newTeam = {
        id: Date.now(), // Simple way to generate a unique ID
        name: newTeamName,
        leader: 'No Team Leader Assigned', // Default values
        manager: 'No Team Manager Assigned', // Default values
        members: 0, // Default value
      };
      setTeams([...teams, newTeam]);
      setShowAddTeamModal(false);
      setNewTeamName('');
    } else {
      alert('Please enter a team name.');
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex">
      {/* Sidebar */}
      <aside className="bg-blue-900 text-white w-64 py-6 px-3 flex flex-col">
        <div className="mb-8">
          <h1 className="text-xl font-bold">TRUPOINT</h1>
        </div>
        <nav className="flex-1">
          <ul className="space-y-2">
            <li>
              <a href="#" className="block py-2 px-4 hover:bg-blue-800 rounded">
                Dashboard
              </a>
            </li>
            <li>
              <a href="#" className="block py-2 px-4 hover:bg-blue-800 rounded">
                Leads
              </a>
            </li>
            <li>
              <a href="#" className="block py-2 px-4 hover:bg-blue-800 rounded">
                Sales Lead
              </a>
            </li>
            <li>
              <a href="#" className="block py-2 px-4 hover:bg-blue-800 rounded">
                Customers
              </a>
            </li>
            <li>
              <a href="#" className="block py-2 px-4 hover:bg-blue-800 rounded">
                List Packages
              </a>
            </li>
            <li>
              <a href="#" className="block py-2 px-4 hover:bg-blue-800 rounded">
                List Payments
              </a>
            </li>
            <li>
              <a href="#" className="block py-2 px-4 hover:bg-blue-800 rounded">
                List Invoices
              </a>
            </li>
            <li>
              <a href="#" className="block py-2 px-4 hover:bg-blue-800 rounded">
                #Stock Tips
              </a>
            </li>
            <li>
              <a href="#" className="block py-2 px-4 hover:bg-blue-800 rounded">
                Quality Analysis
              </a>
            </li>
            <li>
              <a href="#" className="block py-2 px-4 hover:bg-blue-800 rounded">
                Admin
              </a>
            </li>
            <li>
              <a href="#" className="block py-2 px-4 hover:bg-blue-800 rounded">
                Management
              </a>
            </li>
            <li>
              <a href="#" className="block py-2 px-4 hover:bg-blue-800 rounded">
                Company
              </a>
            </li>
            <li>
              <a href="#" className="block py-2 px-4 hover:bg-blue-800 rounded">
                Reports
              </a>
            </li>
          </ul>
        </nav>
        <div className="mt-auto border-t border-blue-800 pt-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center">
              {/* Placeholder for user icon */}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-semibold">Super Admin</p>
              <p className="text-xs text-gray-400">Root</p>
            </div>
            <button className="text-gray-400 hover:text-white focus:outline-none">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v-3m6 0h-6m-6-4v-3m6 0h-6" />
              </svg>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 bg-gray-100 p-6">
        {/* Header */}
        <header className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <button className="mr-4 text-gray-600 focus:outline-none">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
              </svg>
            </button>
            <h2 className="text-xl font-semibold text-gray-800">List Teams</h2>
          </div>
          <div className="text-sm text-gray-600">
            Time: {/* Placeholder for Time */}
            Date: {/* Placeholder for Date */}
          </div>
        </header>

        {/* Content Area */}
        <main className="bg-white rounded-md shadow-md p-6">
          {/* Toolbar */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                List Teams
              </button>
              <button
                onClick={handleAddNewTeamClick}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Add New Team
              </button>
            </div>
            <div className="flex items-center space-x-2">
              <label htmlFor="show-entries" className="text-sm text-gray-700">Show</label>
              <select id="show-entries" className="border border-gray-300 rounded-md py-1 px-2 text-sm focus:outline-none">
                <option>10</option>
                {/* Add more options if needed */}
              </select>
              <span className="text-sm text-gray-700">entries</span>
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder="Search"
                className="border border-gray-300 rounded-md py-1 px-2 text-sm focus:outline-none"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Team Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Team Leader
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Team Manager
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Team Members
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {teams.map((team) => (
                  <tr key={team.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{team.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{team.leader}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{team.manager}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{team.members}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline">
                        Disable
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="mt-4 flex items-center justify-between">
            <p className="text-sm text-gray-700">
              Showing 1 to {teams.length > 0 ? teams.length : 0} of {teams.length} entries
            </p>
            <div className="space-x-2">
              <button
                className="bg-white border border-gray-300 hover:bg-gray-100 text-gray-700 font-semibold py-1 px-3 rounded focus:outline-none focus:shadow-outline disabled:opacity-50 disabled:cursor-not-allowed"
                disabled
              >
                Previous
              </button>
              <button
                className="bg-white border border-gray-300 hover:bg-gray-100 text-gray-700 font-semibold py-1 px-3 rounded focus:outline-none focus:shadow-outline"
                disabled
              >
                Next
              </button>
            </div>
          </div>
        </main>

        {/* Add New Team Modal */}
        {showAddTeamModal && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
            <div className="relative bg-white rounded-lg shadow-xl w-96">
              <div className="flex items-center justify-between p-4 border-b">
                <h2 className="text-lg font-semibold">Add New Team</h2>
                <button onClick={handleCloseModal} className="text-gray-500 hover:text-gray-700 focus:outline-none">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="p-4">
                <div className="mb-4">
                  <label htmlFor="teamName" className="block text-gray-700 text-sm font-bold mb-2">
                    Team Name
                  </label>
                  <input
                    type="text"
                    id="teamName"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Enter team name"
                    value={newTeamName}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="flex items-center justify-end p-4 border-t">
                <button
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
                  onClick={handleCloseModal}
                >
                  Close
                </button>
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  onClick={handleAddTeamSubmit}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default TeamList;