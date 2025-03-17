import React, { useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

const SearchLeadModal = ({ isOpen, onClose, onSearch }) => {
  const [contactNumber, setContactNumber] = useState('');

  const handleSearch = () => {
    onSearch(contactNumber);
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg w-96">
        <div className="flex justify-between items-center bg-blue-500 text-white py-3 px-4 rounded-t-lg">
          <h2 className="text-lg font-semibold">Search Lead</h2>
          <button onClick={onClose} className="focus:outline-none">
            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="p-4">
          <div className="mb-4">
            <label htmlFor="contactNumber" className="block text-gray-700 text-sm font-bold mb-2">
              Contact Number
            </label>
            <input
              type="text"
              id="contactNumber"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
            />
          </div>
          <div className="flex justify-end">
            <button
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
              onClick={onClose}
            >
              Close
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchLeadModal;