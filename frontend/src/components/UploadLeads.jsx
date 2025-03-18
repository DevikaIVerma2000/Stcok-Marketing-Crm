import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function UploadLeads() {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = () => {
    if (selectedFile) {
      console.log('Uploading file:', selectedFile);
      // Implement your upload logic here (e.g., using fetch or axios)
    } else {
      alert('Please choose a file to upload.');
    }
  };

  const handleBackClick = () => {
    navigate(-1);
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
                  <a href="#" className="block py-1 px-2 hover:bg-blue-700 rounded text-sm">
                    Manage Agency
                  </a>
                </li>
                <li>
                  <a href="#" className="block py-1 px-2 hover:bg-blue-700 rounded text-sm font-semibold">
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
            <h2 className="text-xl font-semibold text-gray-800">Upload Leads</h2>
          </div>
          <div className="text-sm text-gray-600">
            Time: 17:32:02 IST Date: 18-03-2025
          </div>
        </header>

        {/* Content Area */}
        <main className="bg-white rounded-md shadow-md p-6">
          {/* Toolbar */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <button
                onClick={handleBackClick}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Back
              </button>
            </div>
            <div>
              <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Delete Unassigned Leads
              </button>
            </div>
          </div>

          {/* Upload Section */}
          <div className="mb-4">
            <label htmlFor="file-upload" className="block text-gray-700 text-sm font-bold mb-2">
              Choose File
            </label>
            <div className="flex items-center space-x-4">
              <input
                type="file"
                id="file-upload"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                onChange={handleFileChange}
              />
              <button
                onClick={handleUpload}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Upload
              </button>
            </div>
            {selectedFile && (
              <p className="mt-2 text-sm text-gray-500">Selected file: {selectedFile.name}</p>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default UploadLeads;