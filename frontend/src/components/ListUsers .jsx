import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Plus, ArrowLeft, UserPlus } from 'lucide-react';

const ListUsers = () => {
  const navigate = useNavigate();

  const usersData = [
    { empId: "TRU-0000", fullName: "Super Admin", username: "root", role: "Owner", designation: "Owner", department: "Management" },
    { empId: "TRU-0001", fullName: "Business Owner", username: "owner", role: "Owner", designation: "Owner", department: "Management" },
    { empId: "TRU-0003", fullName: "Team Manager 1", username: "teammanager1", role: "Team Manager", designation: "Team Manager", department: "Sales" },
    { empId: "TRU-0004", fullName: "Team Leader 1", username: "teamleader1", role: "Team Leader", designation: "Team Leader", department: "Sales" },
    { empId: "TRU-0005", fullName: "Agent 1 Team 1", username: "agent1t1", role: "Agent", designation: "Sr Sales Advisor", department: "Sales" },
    { empId: "TRU-0006", fullName: "Agent 1 Team 2", username: "agent1t2", role: "Agent", designation: "Jr Sales Advisor", department: "Sales" },
    { empId: "TRU-0007", fullName: "Team Leader 2", username: "teamleader2", role: "Team Leader", designation: "Team Leader", department: "Sales" },
    { empId: "TRU-0008", fullName: "Team Leader 3", username: "teamleader3", role: "Team Leader", designation: "Team Leader", department: "Sales" },
    { empId: "TRU-0009", fullName: "Branch Owner 1", username: "branch.owner1", role: "Branch Owner", designation: "Branch Owner", department: "Management" },
    { empId: "TRU-0010", fullName: "Agent 1 Team 3", username: "agent1t3", role: "Agent", designation: "Sr Sales Advisor", department: "Sales" },
  ];

  const [showEntries, setShowEntries] = React.useState(10);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [currentPage, setCurrentPage] = React.useState(1);

  const filteredUsers = usersData.filter(user =>
    Object.values(user).some(value =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const totalPages = Math.ceil(filteredUsers.length / showEntries);
  const startIndex = (currentPage - 1) * showEntries;
  const displayedUsers = filteredUsers.slice(startIndex, startIndex + showEntries);

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className="bg-[#0f172a] text-white w-64 py-6 px-3 space-y-6 flex-shrink-0">
        <div className="flex items-center px-2 mb-6">
          <Users className="h-6 w-6 mr-2" />
          <span className="text-xl font-bold">TRUPOINT</span>
        </div>
        
        <nav>
          {[
            ['Dashboard', '/dashboard'],
            ['Leads', '/leads'],
            ['Sales Lead', '/sales-lead'],
            ['Customers', '/customers'],
            ['List Packages', '/list-packages'],
            ['List Payments', '/list-payments'],
            ['List Invoices', '/list-invoices'],
            ['Stock Tips', '/stock-tips'],
            ['Quality Analysis', '/quality-analysis'],
            ['Admin', '/admin'],
            ['Management', '/management'],
            ['Company', '/company'],
            ['Reports', '/reports'],
          ].map(([name, path]) => (
            <button
              key={path}
              className="block w-full text-left px-4 py-2 rounded hover:bg-[#1e293b] transition-colors"
              onClick={() => navigate(path)}
            >
              {name}
            </button>
          ))}
        </nav>

        <div className="absolute bottom-4 left-0 w-64 px-3">
          <div className="bg-[#1e293b] rounded-lg p-3 flex items-center">
            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">
              <span className="text-lg font-semibold">SA</span>
            </div>
            <div className="ml-3">
              <div className="font-medium">Super Admin</div>
              <div className="text-sm text-gray-300">Root</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-900">List Users</h1>
            <div className="flex gap-3">
              <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                <Users className="w-5 h-5 mr-2" />
                Active Employees
              </button>
              <button className="inline-flex items-center px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300">
                <ArrowLeft className="w-5 h-5 mr-2" />
                Former Employees
              </button>
              <button className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
                <UserPlus className="w-5 h-5 mr-2" />
                Add User
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <label className="text-sm text-gray-600">Show</label>
                <select
                  className="border rounded px-2 py-1"
                  value={showEntries}
                  onChange={(e) => setShowEntries(Number(e.target.value))}
                >
                  {[10, 25, 50, 100].map(value => (
                    <option key={value} value={value}>{value}</option>
                  ))}
                </select>
                <span className="text-sm text-gray-600">entries</span>
              </div>
              <div className="flex items-center space-x-2">
                <label className="text-sm text-gray-600">Search:</label>
                <input
                  type="text"
                  className="border rounded px-3 py-1"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search..."
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    {['Emp ID', 'Full Name', 'Username', 'Role', 'Designation', 'Department'].map((header) => (
                      <th
                        key={header}
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {displayedUsers.map((user) => (
                    <tr key={user.empId} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">{user.empId}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.fullName}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.username}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.role}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.designation}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.department}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="px-6 py-4 flex items-center justify-between border-t border-gray-200">
              <div className="text-sm text-gray-700">
                Showing {startIndex + 1} to {Math.min(startIndex + showEntries, filteredUsers.length)} of {filteredUsers.length} entries
              </div>
              <div className="flex space-x-1">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1 rounded border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                >
                  Previous
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-1 rounded text-sm font-medium ${
                      currentPage === page
                        ? 'bg-blue-600 text-white'
                        : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 rounded border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListUsers;