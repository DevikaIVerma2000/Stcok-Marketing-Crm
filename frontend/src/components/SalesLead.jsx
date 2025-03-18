import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SalesLead = () => {
  const navigate = useNavigate(); // Initialize navigation function

  const [leads, setLeads] = useState([
    {
      followUpDate: "2024-09-07 12:34:43",
      fullName: "Saini Monu",
      phoneNumber: "9812456401",
      email: "NA",
      username: "Unassigned",
      leadStatus: "Sale",
      comments: "Sold",
      state: "NA",
      tradingBudget: "NA",
      lastUpdated: "2024-09-07 12:34:43",
    },
  ]);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold">Fresh Leads</h2>
      
      {/* Back Button with Navigation */}
      <button 
        className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
        onClick={() => navigate(-1)} 
      >
        Back
      </button>

      <div className="mt-4">
        <div className="flex space-x-2">
          <button className="bg-blue-600 text-white px-3 py-2 rounded">Follow-Up Leads</button>
          <button className="bg-blue-600 text-white px-3 py-2 rounded">Fresh Leads</button>
          <button className="bg-blue-600 text-white px-3 py-2 rounded">Search Lead</button>
          <button className="bg-blue-600 text-white px-3 py-2 rounded">+ Add New Lead</button>
        </div>

        <div className="mt-4 border rounded p-4">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border px-4 py-2">Follow-up Date</th>
                <th className="border px-4 py-2">Full Name</th>
                <th className="border px-4 py-2">Phone Number</th>
                <th className="border px-4 py-2">Email</th>
                <th className="border px-4 py-2">Username</th>
                <th className="border px-4 py-2">Lead Status</th>
                <th className="border px-4 py-2">Comments</th>
                <th className="border px-4 py-2">State</th>
                <th className="border px-4 py-2">Trading Budget</th>
                <th className="border px-4 py-2">Last Updated</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead, index) => (
                <tr key={index} className="text-center">
                  <td className="border px-4 py-2">{lead.followUpDate}</td>
                  <td className="border px-4 py-2 text-blue-600 cursor-pointer">{lead.fullName}</td>
                  <td className="border px-4 py-2 text-blue-600 cursor-pointer">{lead.phoneNumber}</td>
                  <td className="border px-4 py-2">{lead.email}</td>
                  <td className="border px-4 py-2">{lead.username}</td>
                  <td className="border px-4 py-2">{lead.leadStatus}</td>
                  <td className="border px-4 py-2">{lead.comments}</td>
                  <td className="border px-4 py-2">{lead.state}</td>
                  <td className="border px-4 py-2">{lead.tradingBudget}</td>
                  <td className="border px-4 py-2">{lead.lastUpdated}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-2 flex justify-between">
            <p>Showing 1 to {leads.length} of {leads.length} entries</p>
            <div>
              <button className="bg-gray-300 px-2 py-1 rounded mr-2" disabled>Previous</button>
              <button className="bg-blue-500 text-white px-2 py-1 rounded">1</button>
              <button className="bg-gray-300 px-2 py-1 rounded ml-2" disabled>Next</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesLead;
