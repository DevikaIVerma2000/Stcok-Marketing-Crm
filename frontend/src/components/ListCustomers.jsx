import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const customersData = [
  { id: 1, followUpDate: "2024-06-25 17:28:00", date: "2024-01-13", name: "Sagar Ambole", contact: "9820882699", followUp: "Busy", package: "INDEX OPTION – REGULAR", expires: "2024-10-06", status: "Suspended" },
  { id: 2, followUpDate: "2024-06-25 17:46:00", date: "2024-01-16", name: "Test Customer", contact: "9763636362", followUp: "No Answer", package: "INDEX OPTION – REGULAR", expires: "2024-03-30", status: "Suspended" },
  { id: 3, followUpDate: "2024-06-25 16:47:00", date: "2024-04-29", name: "Sohan Raidash", contact: "9876543211", followUp: "Busy", package: "INDEX OPTION – PREMIUM", expires: "2024-05-29", status: "Suspended" },
  { id: 4, followUpDate: "2024-06-25 17:46:00", date: "2024-05-02", name: "Bharat Yadav", contact: "9876543210", followUp: "Non Trader", package: "INDEX OPTION – REGULAR", expires: "2024-06-06", status: "Suspended" },
];

const ListCustomers = () => {
    const navigate = useNavigate(); // 👈 Initialize navigate
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 10;
  // Filter customers based on search input
  const filteredCustomers = customersData.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.contact.includes(searchTerm)
  );

  // Pagination logic
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredCustomers.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(filteredCustomers.length / recordsPerPage);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">List Customers</h2>

      <div className="flex justify-between items-center mb-4">
        <button 
          className="bg-blue-600 text-white px-4 py-2 rounded-md"
          onClick={() => navigate(-1)} 
        >
          Back
        </button>
        <input
          type="text"
          placeholder="Search..."
          className="border border-gray-300 px-3 py-2 rounded-md w-60"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2">Follow Up Date</th>
              <th className="border border-gray-300 px-4 py-2">Date</th>
              <th className="border border-gray-300 px-4 py-2">Full Name</th>
              <th className="border border-gray-300 px-4 py-2">Contact No</th>
              <th className="border border-gray-300 px-4 py-2">Follow Up</th>
              <th className="border border-gray-300 px-4 py-2">Package Name</th>
              <th className="border border-gray-300 px-4 py-2">Package Expires</th>
              <th className="border border-gray-300 px-4 py-2">Status</th>
              <th className="border border-gray-300 px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentRecords.map((customer) => (
              <tr key={customer.id} className="text-center">
                <td className="border border-gray-300 px-4 py-2">{customer.followUpDate}</td>
                <td className="border border-gray-300 px-4 py-2">{customer.date}</td>
                <td className="border border-gray-300 px-4 py-2 text-blue-600 cursor-pointer">{customer.name}</td>
                <td className="border border-gray-300 px-4 py-2">{customer.contact}</td>
                <td className="border border-gray-300 px-4 py-2">{customer.followUp}</td>
                <td className="border border-gray-300 px-4 py-2">{customer.package}</td>
                <td className="border border-gray-300 px-4 py-2 text-red-500">{customer.expires}</td>
                <td className="border border-gray-300 px-4 py-2 text-gray-500">{customer.status}</td>
                <td className="border border-gray-300 px-4 py-2">
                  <button className="bg-blue-500 text-white px-3 py-1 rounded-md mr-2">Update</button>
                  <button className="bg-yellow-500 text-white px-3 py-1 rounded-md">View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <button
          className={`px-3 py-1 border rounded-md ${currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-gray-200"}`}
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Previous
        </button>
        <span className="text-gray-600">Page {currentPage} of {totalPages}</span>
        <button
          className={`px-3 py-1 border rounded-md ${currentPage === totalPages ? "bg-gray-300 cursor-not-allowed" : "bg-gray-200"}`}
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ListCustomers;
