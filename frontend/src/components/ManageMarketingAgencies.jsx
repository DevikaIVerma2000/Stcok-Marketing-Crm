import React from 'react';

function ManageMarketingAgencies() {
  const marketingAgencies = [
    {
      id: 1,
      agencyName: 'Internal',
      agencyDescription: 'Internal Team',
      created: 'Branch Owner 1',
      createdOn: '2024-01-14 01:29:25',
    },
    {
      id: 2,
      agencyName: 'Trupoint DM',
      agencyDescription: 'Digital Marketing Agency',
      created: 'Branch Owner 1',
      createdOn: '2024-01-14 01:29:40',
    },
    {
      id: 3,
      agencyName: 'Lets Talk',
      agencyDescription: 'Digital Marketing Agency',
      created: 'Branch Owner 1',
      createdOn: '2024-01-14 01:29:56',
    },
  ];

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
              <div className="block py-2 px-4 bg-blue-800 rounded">
                Admin
              </div>
              <ul className="ml-4 mt-2 space-y-1">
                <li>
                  <a href="#" className="block py-1 px-2 hover:bg-blue-700 rounded text-sm">
                    Manage Users
                  </a>
                </li>
                <li>
                  <a href="#" className="block py-1 px-2 hover:bg-blue-700 rounded text-sm">
                    Manage Teams
                  </a>
                </li>
                <li>
                  <a href="#" className="block py-1 px-2 hover:bg-blue-700 rounded text-sm">
                    Manage Source
                  </a>
                </li>
                <li>
                  <a href="#" className="block py-1 px-2 hover:bg-blue-700 rounded text-sm font-semibold">
                    Manage Agency
                  </a>
                </li>
                <li>
                  <a href="#" className="block py-1 px-2 hover:bg-blue-700 rounded text-sm">
                    Upload Leads
                  </a>
                </li>
              </ul>
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
            <h2 className="text-xl font-semibold text-gray-800">Manage Marketing</h2>
          </div>
          <div className="text-sm text-gray-600">
            Time: {/* Placeholder for Time */} Date: {/* Placeholder for Date */}
          </div>
        </header>

        {/* Content Area */}
        <main className="bg-white rounded-md shadow-md p-6">
          {/* Toolbar */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Back
              </button>
            </div>
            <div>
              <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                + Add Marketing Agency
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Agency Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Agency Description
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Created
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Created On
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {marketingAgencies.map((agency) => (
                  <tr key={agency.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{agency.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{agency.agencyName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{agency.agencyDescription}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{agency.created}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{agency.createdOn}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline mr-2">
                        Edit
                      </button>
                      <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}

export default ManageMarketingAgencies;