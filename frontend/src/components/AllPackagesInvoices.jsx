import React, { useState } from "react";

const AllPackagesInvoices = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const invoices = [
    {
      saleDate: "07-09-2024",
      userName: "Agent 1 Team 1",
      customerName: "Sagar Ambole",
      packageName: "INDEX OPTION – REGULAR",
      packageAmount: 120000,
      discount: 25000,
      paid: 50000,
      balance: 45000,
      activationDate: "07-09-2024",
      expiryDate: "06-10-2024",
    },
    {
      saleDate: "02-05-2024",
      userName: "Agent 1 Team 1",
      customerName: "Bharat Yadav",
      packageName: "INDEX OPTION – REGULAR",
      packageAmount: 120000,
      discount: 0,
      paid: 250000,
      balance: -130000,
      activationDate: "01-05-2024",
      expiryDate: "06-06-2024",
    },
    {
      saleDate: "29-04-2024",
      userName: "Agent 2 Team 1",
      customerName: "Sohan Raidash",
      packageName: "INDEX OPTION – PREMIUM",
      packageAmount: 50000,
      discount: 10000,
      paid: 10000,
      balance: 30000,
      activationDate: "29-04-2024",
      expiryDate: "29-05-2024",
    },
  ];

  const filteredInvoices = invoices.filter(
    (invoice) =>
      invoice.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.packageName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedInvoices = filteredInvoices.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="container mx-auto p-4">
      <h3 className="text-lg font-semibold mb-4">All Packages Invoices</h3>

      {/* Search Box */}
      <input
        type="text"
        placeholder="Search..."
        className="w-full p-2 border rounded mb-4"
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Sale Date</th>
              <th className="p-2 border">Action</th>
              <th className="p-2 border">User Name</th>
              <th className="p-2 border">Customer Name</th>
              <th className="p-2 border">Package Name</th>
              <th className="p-2 border">Package</th>
              <th className="p-2 border">Discount</th>
              <th className="p-2 border">Paid</th>
              <th className="p-2 border">Balance</th>
              <th className="p-2 border">Activation Date</th>
              <th className="p-2 border">Expiry Date</th>
            </tr>
          </thead>
          <tbody>
            {paginatedInvoices.map((invoice, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="p-2 border">{invoice.saleDate}</td>
                <td className="p-2 border">
                  <button className="px-3 py-1 bg-yellow-500 text-white rounded text-sm">Update</button>
                </td>
                <td className="p-2 border">{invoice.userName}</td>
                <td className="p-2 border">
                  <a href="#" className="text-blue-500 hover:underline">{invoice.customerName}</a>
                </td>
                <td className="p-2 border">{invoice.packageName}</td>
                <td className="p-2 border">{invoice.packageAmount.toFixed(2)}</td>
                <td className="p-2 border">{invoice.discount.toFixed(2)}</td>
                <td className="p-2 border">{invoice.paid.toFixed(2)}</td>
                <td className="p-2 border">{invoice.balance.toFixed(2)}</td>
                <td className="p-2 border">{invoice.activationDate}</td>
                <td className="p-2 border">
                  <span className="bg-red-500 text-white px-2 py-1 rounded text-sm">Expired Plan</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between mt-4">
        <button
          className="px-3 py-1 bg-gray-400 text-white rounded disabled:opacity-50"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Previous
        </button>
        <span>Page {currentPage}</span>
        <button
          className="px-3 py-1 bg-gray-400 text-white rounded disabled:opacity-50"
          disabled={currentPage * itemsPerPage >= filteredInvoices.length}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AllPackagesInvoices;
