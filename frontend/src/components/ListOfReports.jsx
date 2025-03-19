import React from 'react';

function ListOfReports() {
  const reportsData = [
    {
      report: 'Agent Sales Day Wise Reports',
      description: 'Break Up of Agents Sales on Daily Basis',
    },
    {
      report: 'Agent Calling Day Wise Reports',
      description: 'Break Up of Agents Call Report on Daily Basis for Leads',
    },
    {
      report: 'Team Leader Monthly Report',
      description: 'Break Up of Team Leader Monthly Performance',
    },
    {
      report: 'Sales Report with Customer Info',
      description: 'Individual Sales Report with Customer Info',
    },
    {
      report: 'Employee Details',
      description: 'List of All Employees Active and Non-Active',
    },
    {
      report: 'Lead Analytics Reports',
      description: 'Lead Reports Source and Agency Wise',
    },
  ];

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">List of Reports</h2>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  List of Reports
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Descriptions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {reportsData.map((reportItem, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button className="bg-blue-500 text-white py-2 px-4 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-400">
                      {reportItem.report}
                    </button>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {reportItem.description}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ListOfReports;