import React, { useState } from 'react';

function ManageAttendanceRequest() {
  const [year, setYear] = useState('2025');
  const [month, setMonth] = useState('March');
  const [showEntries, setShowEntries] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');

  const handleYearChange = (event) => {
    setYear(event.target.value);
  };

  const handleMonthChange = (event) => {
    setMonth(event.target.value);
  };

  const handleShowEntriesChange = (event) => {
    setShowEntries(parseInt(event.target.value, 10));
  };

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle the "Show" button logic here
    console.log(`Showing attendance for ${month} ${year}`);
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Manage Attendance Request</h2>

        <div className="mb-4 flex space-x-2">
          <button className="bg-blue-500 text-white py-2 px-4 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-400">
            Show All User Attendance
          </button>
          <button className="bg-blue-500 text-white py-2 px-4 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 relative">
            Regularisation Request
            <span className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 bg-green-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
              1
            </span>
          </button>
          <button className="bg-blue-500 text-white py-2 px-4 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-400">
            Add Holiday
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mb-4 flex items-center space-x-2">
          <select
            className="border border-gray-300 rounded-md py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={year}
            onChange={handleYearChange}
          >
            <option>2023</option>
            <option>2024</option>
            <option>2025</option>
            <option>2026</option>
          </select>
          <select
            className="border border-gray-300 rounded-md py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={month}
            onChange={handleMonthChange}
          >
            <option>January</option>
            <option>February</option>
            <option>March</option>
            <option>April</option>
            <option>May</option>
            <option>June</option>
            <option>July</option>
            <option>August</option>
            <option>September</option>
            <option>October</option>
            <option>November</option>
            <option>December</option>
          </select>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Show
          </button>
        </form>

        <div className="mb-4 flex justify-between items-center">
          <div className="flex items-center">
            <label htmlFor="showEntries" className="mr-2 text-sm text-gray-700">
              Show
            </label>
            <select
              id="showEntries"
              className="border border-gray-300 rounded-md py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={showEntries}
              onChange={handleShowEntriesChange}
            >
              <option>10</option>
              <option>25</option>
              <option>50</option>
              <option>100</option>
            </select>
            <span className="ml-2 text-sm text-gray-700">entries</span>
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="Search:"
              className="border border-gray-300 rounded-md py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={searchTerm}
              onChange={handleSearchTermChange}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Username
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Current Attendance
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Regularisation Request
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Processed By
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Request Date
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500" colSpan="7" align="center">
                  No data available in table
                </td>
              </tr>
              {/* Add your table rows here */}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex justify-between items-center">
          <p className="text-sm text-gray-700">Showing 0 to 0 of 0 entries</p>
          <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
            <button
              className="bg-white border border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-2 py-2 rounded-l-md border-r-0 text-sm font-medium cursor-not-allowed"
              disabled
            >
              <span className="sr-only">Previous</span>
              <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <button
              className="bg-white border border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-2 py-2 rounded-r-md border-l-0 text-sm font-medium cursor-not-allowed"
              disabled
            >
              <span className="sr-only">Next</span>
              <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default ManageAttendanceRequest;