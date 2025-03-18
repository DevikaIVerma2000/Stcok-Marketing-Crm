import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CustomerInvoices = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [invoices, setInvoices] = useState([]); // Mock state for invoices

  const fetchInvoices = () => {
    // Simulating invoice fetch
    setInvoices([]);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-blue-900 text-white p-4">
        <h1 className="text-xl font-bold">TRUPOINT</h1>
        <ul className="mt-4 space-y-3">
          <li className="hover:bg-blue-700 p-2 rounded">Dashboard</li>
          <li className="hover:bg-blue-700 p-2 rounded">Leads</li>
          <li className="hover:bg-blue-700 p-2 rounded">Customers</li>
          <li className="hover:bg-blue-700 p-2 rounded">List Invoices</li>
          <li className="hover:bg-blue-700 p-2 rounded">Stock Tips</li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <h2 className="text-2xl font-bold text-blue-900">All Customer Invoices</h2>

        {/* Date Picker Section */}
        <div className="mt-4 flex items-center space-x-3">
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            className="p-2 border rounded-md"
          />
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            className="p-2 border rounded-md"
          />
          <button
            onClick={fetchInvoices}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Fetch Invoices
          </button>
        </div>

        {/* Invoice List */}
        <div className="mt-6 border p-4 rounded bg-white shadow">
          {invoices.length === 0 ? (
            <p className="text-gray-600 text-lg">No Invoices Generated Yet</p>
          ) : (
            <ul>
              {invoices.map((invoice, index) => (
                <li key={index} className="border-b p-2">
                  {invoice}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Export Button */}
        <div className="mt-4">
          <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
            Export Invoices to Excel
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomerInvoices;
