import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { ArrowLeft, Search, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const initialLeads = [
  {
    followUpDate: "2025-03-23 14:33:00",
    fullName: "Krishan Pal Yogi",
    phoneNumber: "9352535742",
    email: "playmate.services@gmail.com",
    username: "Super Admin",
    leadStatus: "Call Back",
    comments: "DNC removed by Super Admin",
    state: "NA",
    tradingBudget: "NA",
    lastUpdated: "2025-03-23",
  },
  {
    followUpDate: "2024-10-16 24:00",
    fullName: "Rajesh Kumar",
    phoneNumber: "9837289488",
    email: "rajesh83B169@gmail.com",
    username: "Unassigned",
    leadStatus: "DNC",
    comments: "DNC Revoked",
    state: "NA",
    tradingBudget: "NA",
    lastUpdated: "2025-03-23",
  },
  {
    followUpDate: "2024-09-08 12:33:00",
    fullName: "Shabin",
    phoneNumber: "8050782484",
    email: "shabinmohan@gmail.com",
    username: "Agent 1 Team 1",
    leadStatus: "Ringing",
    comments: "No Answer",
    state: "NA",
    tradingBudget: "NA",
    lastUpdated: "2024-09-08",
  },
  {
    followUpDate: "2024-06-25 14:31:00",
    fullName: "Test Lead",
    phoneNumber: "9282939399",
    email: "NA",
    username: "Branch Owner 1",
    leadStatus: "Demo",
    comments: "Test",
    state: "NA",
    tradingBudget: "NA",
    lastUpdated: "2024-06-25",
  },
];

const Leads = () => {
  const navigate = useNavigate();
  const [leads, setLeads] = useState(initialLeads);
  const [allLeads, setAllLeads] = useState(initialLeads);
  const [searchTerm, setSearchTerm] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState("10");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalEntries, setTotalEntries] = useState(initialLeads.length);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [searchNumber, setSearchNumber] = useState("");
  const [newLead, setNewLead] = useState({ fullName: "", primaryContact: "" });
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Pagination logic
  const totalPages = Math.ceil(totalEntries / Number(entriesPerPage));
  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };
  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  // Search lead by phone number
  const handleSearchLead = () => {
    if (searchNumber) {
      const filteredLeads = allLeads.filter((lead) =>
        lead.phoneNumber.includes(searchNumber)
      );
      setLeads(filteredLeads);
      setTotalEntries(filteredLeads.length);
      setCurrentPage(1);
      setIsSearchModalOpen(false);
      setSearchNumber("");
    } else {
      // If search number is empty, reset to all leads
      setLeads(allLeads);
      setTotalEntries(allLeads.length);
      setCurrentPage(1);
      setIsSearchModalOpen(false);
    }
  };

  // Add new lead
  const handleAddLead = () => {
    if (!newLead.fullName || !newLead.primaryContact) {
      alert("Please fill in all fields.");
      return;
    }

    const newLeadEntry = {
      followUpDate: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
      fullName: newLead.fullName,
      phoneNumber: newLead.primaryContact,
      email: "NA",
      username: "Unassigned",
      leadStatus: "Fresh",
      comments: "New Lead",
      state: "NA",
      tradingBudget: "NA",
      lastUpdated: format(new Date(), "yyyy-MM-dd"),
    };

    const updatedLeads = [newLeadEntry, ...allLeads];
    setAllLeads(updatedLeads);
    setLeads(updatedLeads);
    setTotalEntries(updatedLeads.length);
    setIsAddModalOpen(false);
    setNewLead({ fullName: "", primaryContact: "" });
  };

  // Filter leads based on search term (for the inline search input)
  useEffect(() => {
    if (searchTerm) {
      const filteredLeads = allLeads.filter(
        (lead) =>
          lead.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          lead.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setLeads(filteredLeads);
      setTotalEntries(filteredLeads.length);
      setCurrentPage(1);
    } else {
      setLeads(allLeads);
      setTotalEntries(allLeads.length);
      setCurrentPage(1);
    }
  }, [searchTerm, allLeads]);

  return (
    <>
      <header className="bg-blue-900 text-white shadow-sm">
        <div className="flex justify-between items-center px-6 py-4">
          <h2 className="text-xl font-semibold">
            TRUPOINT RESEARCH ANALYST CRM
          </h2>
          <div className="flex items-center space-x-4">
            <span>Time: {format(currentTime, "HH:mm:ss")}</span>
            <span>Date: {format(currentTime, "dd-MM-yyyy")}</span>
          </div>
        </div>
      </header>

      <main className="p-6">
        <div className="bg-white rounded-lg shadow">
          <div className="p-4 flex flex-wrap items-center justify-between gap-4">
            <button
              onClick={() => navigate("/dashboard")}
              className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </button>

            <div className="flex items-center space-x-4">
              <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700">
                Follow-Up Leads
                <span className="ml-2 px-2 py-0.5 bg-white text-blue-600 rounded-full">
                  4
                </span>
              </button>

              <button
                onClick={() => navigate("/fresh-leads")}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700"
              >
                Fresh Leads
                <span className="ml-2 px-2 py-0.5 bg-white text-blue-600 rounded-full">
                  18344
                </span>
              </button>

              <button
                onClick={() => setIsSearchModalOpen(true)}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700"
              >
                Search Lead
              </button>

              <button
                onClick={() => setIsAddModalOpen(true)}
                className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add New Lead
              </button>
            </div>
          </div>

          <div className="p-4">
            <div className="flex flex-wrap items-center justify-between mb-4">
              <div className="flex items-center">
                <span className="mr-2 text-gray-700">Show</span>
                <select
                  value={entriesPerPage}
                  onChange={(e) => {
                    setEntriesPerPage(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="10">10</option>
                  <option value="25">25</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                </select>
                <span className="ml-2 text-gray-700">entries</span>
              </div>

              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 bg-gray-100 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Follow Up Date
                    </th>
                    <th className="px-6 py-3 bg-gray-100 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Full Name
                    </th>
                    <th className="px-6 py-3 bg-gray-100 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Phone Number
                    </th>
                    <th className="px-6 py-3 bg-gray-100 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 bg-gray-100 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Username
                    </th>
                    <th className="px-6 py-3 bg-gray-100 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Lead Status
                    </th>
                    <th className="px-6 py-3 bg-gray-100 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Comments
                    </th>
                    <th className="px-6 py-3 bg-gray-100 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      State
                    </th>
                    <th className="px-6 py-3 bg-gray-100 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Trading Budget
                    </th>
                    <th className="px-6 py-3 bg-gray-100 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Last Updated
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {leads.length > 0 ? (
                    leads.map((lead, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {lead.followUpDate}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          <button
                            onClick={() =>
                              navigate(`/lead-details/${index}`, {
                                state: { lead },
                              })
                            }
                            className="text-blue-600 hover:underline"
                          >
                            {lead.fullName}
                          </button>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {lead.phoneNumber}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {lead.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {lead.username}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {lead.leadStatus}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          <button className="text-white bg-blue-600 px-3 py-1 rounded hover:bg-blue-700 mr-2">
                            Update
                          </button>
                          {lead.comments}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {lead.state}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {lead.tradingBudget}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {lead.lastUpdated}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="10"
                        className="px-6 py-4 text-center text-sm text-gray-500"
                      >
                        No data available.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="flex items-center justify-between mt-4">
              <div className="text-sm text-gray-700">
                Showing {(currentPage - 1) * Number(entriesPerPage) + 1} to{" "}
                {Math.min(currentPage * Number(entriesPerPage), totalEntries)}{" "}
                of {totalEntries} entries
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                  className="px-3 py-1 border rounded text-sm disabled:opacity-50"
                >
                  Previous
                </button>
                <button className="px-3 py-1 bg-blue-600 text-white rounded">
                  {currentPage}
                </button>
                <button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 border rounded text-sm disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Search Lead Modal */}
      {isSearchModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Search Lead</h3>
              <button
                onClick={() => setIsSearchModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Phone Number</label>
              <input
                type="text"
                value={searchNumber}
                onChange={(e) => setSearchNumber(e.target.value)}
                className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter phone number"
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsSearchModalOpen(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Close
              </button>
              <button
                onClick={handleSearchLead}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Search
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add New Lead Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Add New Lead</h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Full Name</label>
              <input
                type="text"
                value={newLead.fullName}
                onChange={(e) =>
                  setNewLead({ ...newLead, fullName: e.target.value })
                }
                className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder=""
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">
                Primary Contact
              </label>
              <input
                type="text"
                value={newLead.primaryContact}
                onChange={(e) =>
                  setNewLead({ ...newLead, primaryContact: e.target.value })
                }
                className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder=""
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Close
              </button>
              <button
                onClick={handleAddLead}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Add Lead
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Leads;
