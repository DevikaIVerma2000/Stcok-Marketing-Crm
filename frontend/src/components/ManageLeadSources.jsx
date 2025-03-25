import React, { useState, useEffect } from 'react';

function ManageLeadSources() {
  // State to store lead sources fetched from the API
  const [leadSources, setLeadSources] = useState([]);
  // State to manage the modal visibility and form data
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    source_name: '',
    source_description: '',
    created_by: '67b55e822004b28913487ec6', // Hardcoded for now
    branch_id: '67b5a934bdb46616065f9605', // Hardcoded for now
  });
  // State for error messages
  const [error, setError] = useState(null);

  // Fetch lead sources from the API when the component mounts
  useEffect(() => {
    fetchLeadSources();
  }, []);

  // Function to fetch lead sources from the API
  const fetchLeadSources = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/leadSources');
      if (!response.ok) {
        throw new Error('Failed to fetch lead sources');
      }
      const data = await response.json();
      
      // Log the raw API response to debug
      console.log('API Response:', data);

      // Check if data is an array; if not, handle accordingly
      let leadSourcesArray = [];
      if (Array.isArray(data)) {
        leadSourcesArray = data;
      } else if (data && Array.isArray(data.data)) {
        // If the API returns an object with a "data" property that is an array
        leadSourcesArray = data.data;
      } else {
        throw new Error('API response is not an array');
      }

      // Map the API response to match the expected frontend structure
      const mappedData = leadSourcesArray.map((source) => ({
        id: source._id,
        sourceName: source.source_name,
        sourceDescription: source.source_description,
        created: source.created_by, // Adjust based on your API; you might need to fetch the user's name
        createdOn: new Date(source.createdAt).toLocaleString(), // Format the date
      }));

      setLeadSources(mappedData);
      setError(null); // Clear any previous errors
    } catch (error) {
      console.error('Error fetching lead sources:', error);
      setError('Failed to load lead sources. Please try again later.');
      setLeadSources([]); // Reset lead sources to an empty array on error
    }
  };

  // Function to handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Function to handle adding a new lead source
  const handleAddLeadSource = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/leadSources', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        // Refresh the lead sources list after adding
        fetchLeadSources();
        // Reset the form and close the modal
        setFormData({
          source_name: '',
          source_description: '',
          created_by: '67b55e822004b28913487ec6',
          branch_id: '67b5a934bdb46616065f9605',
        });
        setIsModalOpen(false);
        setError(null);
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Error adding lead source');
      }
    } catch (error) {
      console.error('Error adding lead source:', error);
      setError('Error adding lead source. Please try again.');
    }
  };

  // Function to handle deleting a lead source
  const handleDeleteLeadSource = async (id) => {
    if (window.confirm('Are you sure you want to delete this lead source?')) {
      try {
        const response = await fetch(`http://localhost:3000/api/leadSources/${id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          // Refresh the lead sources list after deleting
          fetchLeadSources();
          setError(null);
        } else {
          const errorData = await response.json();
          setError(errorData.message || 'Error deleting lead source');
        }
      } catch (error) {
        console.error('Error deleting lead source:', error);
        setError('Error deleting lead source. Please try again.');
      }
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
                  <a href="#" className="block py-1 px-2 hover:bg-blue-700 rounded text-sm font-semibold">
                    Manage Source
                  </a>
                </li>
                <li>
                  <a href="#" className="block py-1 px-2 hover:bg-blue-700 rounded text-sm">
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
            <h2 className="text-xl font-semibold text-gray-800">Manage Lead Sources</h2>
          </div>
          <div className="text-sm text-gray-600">
            Time: 16:39:51 IST Date: 18-03-2025
          </div>
        </header>

        {/* Content Area */}
        <main className="bg-white rounded-md shadow-md p-6">
          {/* Error Message */}
          {error && (
            <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">
              {error}
            </div>
          )}

          {/* Toolbar */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Back
              </button>
            </div>
            <div>
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                + Add Lead Source
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
                    Source Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Source Description
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
                {leadSources.length > 0 ? (
                  leadSources.map((source) => (
                    <tr key={source.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{source.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{source.sourceName}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{source.sourceDescription}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{source.created}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{source.createdOn}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline mr-2">
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteLeadSource(source.id)}
                          className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="px-6 py-4 text-center text-sm text-gray-500">
                      No lead sources found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </main>

        {/* Modal for Adding Lead Source */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 w-96">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Add Lead Source</h3>
                <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <form onSubmit={handleAddLeadSource}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Source Name</label>
                  <input
                    type="text"
                    name="source_name"
                    value={formData.source_name}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Source Description</label>
                  <input
                    type="text"
                    name="source_description"
                    value={formData.source_description}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    required
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Close
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ManageLeadSources;