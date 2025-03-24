import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const AddUser = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar (you can reuse or create a consistent one) */}
      <div className="bg-[#0f172a] text-white w-64 py-6 px-3 space-y-6 flex-shrink-0">
        <div className="flex items-center px-2 mb-6">
          {/* You might want to use your Users icon here or a different one */}
          {/* <Users className="h-6 w-6 mr-2" /> */}
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
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center mb-4">
            <button
              onClick={() => navigate('/list-users')}
              className="inline-flex items-center px-3 py-1 text-sm text-gray-600 rounded-md hover:bg-gray-200 mr-2"
            >
              <ArrowLeft className="w-4 h-4 mr-1" /> Back
            </button>
            <h1 className="text-xl font-bold text-gray-900">Add User</h1>
          </div>

          {/* Basic Information */}
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">Basic Information</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="full-name" className="block text-gray-700 text-sm font-bold mb-2">Full Name</label>
                <input type="text" id="full-name" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
              </div>
              <div>
                <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                <input type="email" id="email" placeholder="Enter Valid Email Address" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
              </div>
              <div>
                <label htmlFor="primary-contact" className="block text-gray-700 text-sm font-bold mb-2">Primary Contact</label>
                <input type="tel" id="primary-contact" placeholder="Enter 10 Digit Mobile Number" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
              </div>
              {/* Add an empty div for consistent grid layout */}
              <div></div>
            </div>
          </div>

          {/* Login Information */}
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">Login Information</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">Username</label>
                <input type="text" id="username" placeholder="root" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                <p className="text-xs text-gray-500 mt-1">No Special Characters Allowed</p>
              </div>
              <div>
                <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                <input type="password" id="password" placeholder="****" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                <p className="text-xs text-gray-500 mt-1">No Spaces allowed in Password</p>
              </div>
              <div>
                <label htmlFor="user-login-status" className="block text-gray-700 text-sm font-bold mb-2">User Login Status</label>
                <select id="user-login-status" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                  <option>Active</option>
                  <option>Inactive</option>
                </select>
                <p className="text-xs text-gray-500 mt-1">User Login Status</p>
              </div>
              {/* Add an empty div for consistent grid layout */}
              <div></div>
            </div>
          </div>

          {/* Employment Details */}
          <div>
            <h2 className="text-lg font-semibold text-gray-700 mb-2">Employment Details</h2>
            <div className="grid grid-cols-4 gap-4">
              <div>
                <label htmlFor="role" className="block text-gray-700 text-sm font-bold mb-2">Role</label>
                <select id="role" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                  <option>Owner</option>
                  {/* Add other roles */}
                </select>
              </div>
              <div>
                <label htmlFor="department" className="block text-gray-700 text-sm font-bold mb-2">Department</label>
                <select id="department" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                  <option>Management</option>
                  {/* Add other departments */}
                </select>
                <p className="text-xs text-gray-500 mt-1">Select Department</p>
              </div>
              <div>
                <label htmlFor="designation" className="block text-gray-700 text-sm font-bold mb-2">Designation</label>
                <select id="designation" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                  <option>Owner</option>
                  {/* Add other designations */}
                </select>
                <p className="text-xs text-gray-500 mt-1">Select Designation</p>
              </div>
              <div>
                <label htmlFor="monthly-ctc" className="block text-gray-700 text-sm font-bold mb-2">Monthly CTC</label>
                <input type="number" id="monthly-ctc" placeholder="Salary" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                <p className="text-xs text-gray-500 mt-1">Enter Numbers Only</p>
              </div>
              <div>
                <label htmlFor="date-of-joining" className="block text-gray-700 text-sm font-bold mb-2">Date of Joining</label>
                <input type="date" id="date-of-joining" defaultValue="2025-03-24" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                <p className="text-xs text-gray-500 mt-1">Date of Joining</p>
              </div>
              <div>
                <label htmlFor="working-shift" className="block text-gray-700 text-sm font-bold mb-2">Working Shift</label>
                <select id="working-shift" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                  <option>10AM to 7PM</option>
                  {/* Add other working shifts */}
                </select>
                <p className="text-xs text-gray-500 mt-1">Select Working Shift</p>
              </div>
              <div>
                <label htmlFor="user-branch" className="block text-gray-700 text-sm font-bold mb-2">User Branch</label>
                <select id="user-branch" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                  <option>Head Office</option>
                  {/* Add other branches */}
                </select>
                <p className="text-xs text-gray-500 mt-1">Select User Branch</p>
              </div>
              {/* Add an empty div for consistent grid layout */}
              <div></div>
            </div>
          </div>

          <button type="submit" className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 mt-6 focus:outline-none focus:shadow-outline">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddUser;