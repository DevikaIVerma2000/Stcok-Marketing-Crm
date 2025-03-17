import React, { useState } from 'react';
import { format } from 'date-fns';
import { ArrowLeft, Search, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const mockLeads = [
  {
    followUpDate: '2025-03-13 16:50:59',
    fullName: 'manish verma',
    phoneNumber: '932193291',
    email: 'NA',
    username: 'Super Admin',
    leadStatus: 'Fresh',
    comments: 'Update',
    state: 'NA',
    tradingBudget: 'NA',
    lastUpdated: '2025-03-13 16:50:59'
  },
  {
    followUpDate: '2024-06-10 03:06:11',
    fullName: 'Test 14',
    phoneNumber: '9876543223',
    email: 'NA',
    username: 'Agent 2 Team 2',
    leadStatus: 'No Answer',
    comments: 'Update',
    state: 'NA',
    tradingBudget: 'NA',
    lastUpdated: '2024-06-10 03:06:11'
  },
  {
    followUpDate: '2024-04-29 12:40:29',
    fullName: 'Test 9',
    phoneNumber: '9876543218',
    email: 'NA',
    username: 'Unassigned',
    leadStatus: 'Revisit',
    comments: 'Update NA',
    state: 'NA',
    tradingBudget: 'NA',
    lastUpdated: '2024-04-29 12:40:29'
  },
  {
    followUpDate: '2024-04-29 17:40:29',
    fullName: 'Test 10',
    phoneNumber: '9876543719',
    email: 'NA',
    username: 'Unassigned',
    leadStatus: 'Revisit',
    comments: 'Update NA',
    state: 'NA',
    tradingBudget: 'NA',
    lastUpdated: '2024-04-29 17:40:29'
  },
  {
    followUpDate: '2024-04-29 12:40:29',
    fullName: 'Test 11',
    phoneNumber: '9876543220',
    email: 'NA',
    username: 'Unassigned',
    leadStatus: 'Revisit',
    comments: 'Update NA',
    state: 'NA',
    tradingBudget: 'NA',
    lastUpdated: '2024-04-29 12:40:29'
  },
  {
    followUpDate: '2024-04-29 12:40:29',
    fullName: 'Test 12',
    phoneNumber: '9876543271',
    email: 'NA',
    username: 'Unassigned',
    leadStatus: 'Revisit',
    comments: 'Update NA',
    state: 'NA',
    tradingBudget: 'NA',
    lastUpdated: '2024-04-29 12:40:29'
  },
  {
    followUpDate: '2024-04-29 12:40:29',
    fullName: 'Test 13',
    phoneNumber: '9876543222',
    email: 'NA',
    username: 'Unassigned',
    leadStatus: 'REVISIT',
    comments: 'Update NA',
    state: 'NA',
    tradingBudget: 'NA',
    lastUpdated: '2024-04-29 12:40:29'
  },
  {
    followUpDate: '2024-04-29 12:40:29',
    fullName: 'Test 15',
    phoneNumber: '9876543224',
    email: 'NA',
    username: 'Unassigned',
    leadStatus: 'Revisit',
    comments: 'Update NA',
    state: 'NA',
    tradingBudget: 'NA',
    lastUpdated: '2024-04-29 12:40:29'
  },
  {
    followUpDate: '2024-04-29 12:40:29',
    fullName: 'Test 16',
    phoneNumber: '9876543225',
    email: 'NA',
    username: 'Unassigned',
    leadStatus: 'Revisit',
    comments: 'Update',
    state: 'NA',
    tradingBudget: 'NA',
    lastUpdated: '2024-04-29 12:40:29'
  },
  {
    followUpDate: '2024-04-29 12:10:29',
    fullName: 'Test 17',
    phoneNumber: '9876543226',
    email: 'NA',
    username: 'Unassigned',
    leadStatus: 'Revisit',
    comments: 'Update NA',
    state: 'NA',
    tradingBudget: 'NA',
    lastUpdated: '2024-04-29 12:10:29'
  },
  // Add more mock data as needed to reach 500 entries for pagination testing
  ...Array.from({ length: 490 }, (_, i) => ({
    followUpDate: format(new Date(Date.now() - i * 86400000), 'yyyy-MM-dd HH:mm:ss'), // Generate different dates
    fullName: `Test Lead ${i + 18}`,
    phoneNumber: `9876543${227 + i}`,
    email: 'NA',
    username: 'Unassigned',
    leadStatus: 'Revisit',
    comments: 'Update NA',
    state: 'NA',
    tradingBudget: 'NA',
    lastUpdated: format(new Date(Date.now() - i * 86400000), 'yyyy-MM-dd HH:mm:ss'),
  })),
];

const FreshLeads = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [entriesPerPage, setEntriesPerPage] = useState('10');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredLeads = mockLeads.filter(lead =>
    Object.values(lead).some(value =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const indexOfLastEntry = currentPage * parseInt(entriesPerPage);
  const indexOfFirstEntry = indexOfLastEntry - parseInt(entriesPerPage);
  const currentEntries = filteredLeads.slice(indexOfFirstEntry, indexOfLastEntry);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(filteredLeads.length / parseInt(entriesPerPage));

  return (
    <main className="p-6">
      <div className="bg-white rounded-lg shadow">
        <div className="p-4 flex flex-wrap items-center justify-between gap-4">
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-600"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </button>

          <div className="flex items-center space-x-4">
            <button className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-600">
              Follow-Up Leads
              <span className="ml-2 px-2 py-0.5 bg-white text-blue-500 rounded-full">5</span> {/* Assuming 5 based on your other components */}
            </button>

            <button className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-600">
              Fresh Leads
              <span className="ml-2 px-2 py-0.5 bg-white text-blue-500 rounded-full">{mockLeads.filter(lead => lead.leadStatus === 'Fresh').length}</span>
            </button>

            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>

            <button className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-600">
              <Plus className="w-4 h-4 mr-2" />
              Add New Lead
            </button>
          </div>
        </div>

        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="mr-2 text-sm text-gray-700">Show</span>
              <select
                value={entriesPerPage}
                onChange={(e) => setEntriesPerPage(e.target.value)}
                className="border rounded px-2 py-1 text-sm text-gray-700"
                onBlur={() => setCurrentPage(1)} // Reset to first page on change
              >
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </select>
              <span className="ml-2 text-sm text-gray-700">entries</span>
            </div>
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
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentEntries.map((lead, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{lead.followUpDate}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{lead.fullName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{lead.phoneNumber}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{lead.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{lead.username}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{lead.leadStatus}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{lead.comments}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{lead.state}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{lead.tradingBudget}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{lead.lastUpdated}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="py-3 flex items-center justify-between">
            <div className="text-sm text-gray-700">
              Showing {indexOfFirstEntry + 1} to {indexOfLastEntry > filteredLeads.length ? filteredLeads.length : indexOfLastEntry} of {filteredLeads.length} entries
            </div>
            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
                <button
                  key={number}
                  onClick={() => paginate(number)}
                  aria-current="page"
                  className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                    currentPage === number ? 'bg-blue-500 text-white border-blue-500' : 'bg-white text-gray-500 border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {number}
                </button>
              ))}
              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                Next
              </button>
            </nav>
          </div>
        </div>
      </div>
    </main>
  );
};

export default FreshLeads;