import React from 'react';

function CompanyConfig() {
  const configData = [
    { manage: 'Branches', description: 'Manage Branches' },
    { manage: 'Departments', description: 'Manage Departments' },
    { manage: 'Designations', description: 'Manage Designations' },
    { manage: 'Lead Sources', description: 'Manage Lead Sources' },
    { manage: 'Marketing Agencies', description: 'Manage Marketing Agencies' },
    { manage: 'Packages', description: 'Manage Packages' },
    { manage: 'Payment Modes', description: 'Manage Payment Modes' },
    { manage: 'Teams', description: 'Manage Teams' },
    { manage: 'Holidays', description: 'Manage Holidays' },
  ];

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Company Config</h2>

        <div className="grid grid-cols-2 gap-4">
          <div className="font-semibold text-gray-700">Manage Resources</div>
          <div className="font-semibold text-gray-700">Descriptions</div>

          {configData.map((item, index) => (
            <React.Fragment key={index}>
              <div>
                <button className="bg-blue-500 text-white py-2 px-4 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-400">
                  {item.manage}
                </button>
              </div>
              <div className="text-sm text-gray-600">{item.description}</div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CompanyConfig;