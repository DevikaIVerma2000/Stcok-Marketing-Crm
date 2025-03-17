import React, { useState } from 'react';
import { format } from 'date-fns';
import { ArrowLeft, Search, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const mockLeads = [
  {
    followUpDate: '2024-09-07 12:34:12',
    fullName: 'Krishan Pal Yogi',
    phoneNumber: '9352535742',
    email: 'playmate.services@gmail.com',
    username: 'Agent 1 Team 1',
    leadStatus: 'Call Back',
    comments: 'Customer Busy',
    state: 'NA',
    tradingBudget: 'NA',
    lastUpdated: '2024-09-07 12:34:12'
  },
  {
    followUpDate: '2024-09-07 12:33:52',
    fullName: 'Shabin',
    phoneNumber: '8050782484',
    email: 'shabinmohan@gmail.com',
    username: 'Agent 1 Team 1',
    leadStatus: 'Ringing',
    comments: 'No Answer',
    state: 'NA',
    tradingBudget: 'NA',
    lastUpdated: '2024-09-07 12:33:52'
  },
  // Add more mock data as needed
];

const Leads = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [entriesPerPage, setEntriesPerPage] = useState('10');

  return (
    <>
      <header className="bg-white shadow-sm">
        <div className="flex justify-between items-center px-6 py-4">
          <h2 className="text-2xl font-semibold text-gray-800">List Leads</h2>
          <div className="flex items-center space-x-4">
            <span>Time: {format(new Date(), 'HH:mm:ss z')}</span>
            <span>Date: {format(new Date(), 'dd-MM-yyyy')}</span>
          </div>
        </div>
      </header>

      <main className="p-6">
        <div className="bg-white rounded-lg shadow">
          <div className="p-4 flex flex-wrap items-center justify-between gap-4">
            <button
              onClick={() => navigate('/')}
              className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-600"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </button>

            <div className="flex items-center space-x-4">
              <button className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-600">
                Follow-Up Leads
                <span className="ml-2 px-2 py-0.5 bg-white text-blue-500 rounded-full">4</span>
              </button>
              
              <button className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-600"
              onClick={() => navigate("/fresh-leads")}
              >
                Fresh Leads
                <span className="ml-2 px-2 py-0.5 bg-white text-blue-500 rounded-full">16345</span>
              </button>

              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <button className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-600">
                <Plus className="w-4 h-4 mr-2" />
                Add New Lead
              </button>
            </div>
          </div>

          <div className="p-4">
            <div className="flex items-center mb-4">
              <span className="mr-2">Show</span>
              <select
                value={entriesPerPage}
                onChange={(e) => setEntriesPerPage(e.target.value)}
                className="border rounded px-2 py-1"
              >
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </select>
              <span className="ml-2">entries</span>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Follow up Date</th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Full Name</th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone Number</th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Username</th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lead Status</th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Comments</th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">State</th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trading Budget</th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Updated</th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {mockLeads.map((lead, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{lead.followUpDate}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 hover:text-blue-800">{lead.fullName}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 hover:text-blue-800">{lead.phoneNumber}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{lead.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{lead.username}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          {lead.leadStatus}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{lead.comments}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{lead.state}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{lead.tradingBudget}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{lead.lastUpdated}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <button className="text-white bg-blue-500 px-3 py-1 rounded hover:bg-blue-600">
                          Update
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex items-center justify-between mt-4">
              <div className="text-sm text-gray-700">
                Showing 1 to {entriesPerPage} of {mockLeads.length} entries
              </div>
              <div className="flex space-x-2">
                <button className="px-3 py-1 border rounded text-sm">Previous</button>
                <button className="px-3 py-1 bg-blue-500 text-white rounded">1</button>
                <button className="px-3 py-1 border rounded text-sm">Next</button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Leads;