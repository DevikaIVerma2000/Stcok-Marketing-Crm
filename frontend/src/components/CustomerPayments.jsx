import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CustomerPayments = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [payments, setPayments] = useState([]);

  const fetchPayments = () => {
    setPayments([]); // Simulate fetching data
  };

  const exportToExcel = () => {
    alert("Exporting payments to Excel...");
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-blue-900 text-white p-6 flex flex-col">
        <h2 className="text-xl font-bold mb-6">TRUPOINT</h2>
        <ul className="space-y-2 flex-1">
          {["Dashboard", "Leads", "Sales Lead", "Customers", "List Packages", "List Payments", "List Invoices", "Stock Tips", "Quality Analysis", "Admin", "Management", "Company", "Reports"].map((item) => (
            <li key={item} className="hover:bg-blue-700 px-3 py-2 rounded cursor-pointer">
              {item}
            </li>
          ))}
        </ul>
        <div className="mt-auto text-sm">
          <p>Super Admin</p>
          <p className="text-gray-300">Root</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-6">All Customer Payments</h1>

        {/* Filter Section */}
        <div className="bg-gray-100 p-4 rounded-lg flex items-center gap-4">
          <label className="text-gray-600 font-medium">Select Payment Filter:</label>
          <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} className="border p-2 rounded w-40" />
          <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} className="border p-2 rounded w-40" />
          <button onClick={fetchPayments} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Fetch Payments
          </button>
          <button onClick={exportToExcel} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
            Export to Excel
          </button>
        </div>

        {/* Payments Table */}
        <div className="mt-6 p-4 bg-white rounded-lg shadow">
          {payments.length === 0 ? (
            <p className="text-gray-500">No Payments Yet</p>
          ) : (
            <p>Payments Data</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerPayments;
