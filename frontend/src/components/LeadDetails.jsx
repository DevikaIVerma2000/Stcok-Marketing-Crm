import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { format } from "date-fns";
import { ArrowLeft } from "lucide-react";

// Initial leads array (for fallback or testing purposes)
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

const LeadDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Get the id from the URL
  const location = useLocation();
  const { lead: leadFromState } = location.state || {}; // Get the lead data passed via navigation

  // Use the lead from state if available; otherwise, fall back to initialLeads
  const lead = leadFromState || initialLeads[parseInt(id)];

  // State for current time and date
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // State for form fields
  const [formData, setFormData] = useState({
    fullName: lead?.fullName || "",
    phoneNumber: lead?.phoneNumber || "",
    secondaryContact: "",
    email: lead?.email || "",
    dateOfBirth: "",
    callStatus: lead?.leadStatus || "",
    notes: lead?.comments || "",
    address: "",
    city: "",
    state: lead?.state || "",
    zipcode: "",
    country: "",
    segment: "",
    tradingBudget: lead?.tradingBudget || "",
    priority: "",
    branch: "",
    user: lead?.username || "",
    leadSource: "Agent",
    agency: "Internal",
    callCount: "1",
  });

  // State for DNC status
  const [dncStatus, setDncStatus] = useState(false); // false means "DNC Not Active"

  // State for call history
  const [callHistory, setCallHistory] = useState([
    {
      user: "Super Admin",
      callStatus: "Call Back",
      notes: "busy",
      dispositionTime: "2025-03-24 12:03:45",
      followUpTime: "2025-03-25 12:03:00",
    },
  ]);

  // Redirect to /leads if lead data is missing
  if (!lead) {
    console.log("Lead data missing, redirecting to /leads");
    navigate("/leads");
    return null;
  }

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle adding a new comment to call history
  const handleAddComment = () => {
    if (!formData.notes.trim()) {
      alert("Please enter a comment.");
      return;
    }

    const newEntry = {
      user: formData.user,
      callStatus: formData.callStatus,
      notes: formData.notes,
      dispositionTime: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
      followUpTime: lead.followUpDate || "N/A",
    };

    setCallHistory([newEntry, ...callHistory]);
    setFormData({ ...formData, notes: "" }); // Clear the notes field after adding
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated Lead Data:", formData);
    alert("Lead updated successfully!");
    // Add logic to save the updated lead data (e.g., API call)
  };

  // Handle reset lead
  const handleReset = () => {
    setFormData({
      fullName: lead.fullName || "",
      phoneNumber: lead.phoneNumber || "",
      secondaryContact: "",
      email: lead.email || "",
      dateOfBirth: "",
      callStatus: lead.leadStatus || "",
      notes: lead.comments || "",
      address: "",
      city: "",
      state: lead.state || "",
      zipcode: "",
      country: "",
      segment: "",
      tradingBudget: lead.tradingBudget || "",
      priority: "",
      branch: "",
      user: lead.username || "",
      leadSource: "Agent",
      agency: "Internal",
      callCount: "1",
    });
    setDncStatus(false); // Reset DNC status
  };

  // Toggle DNC status
  const toggleDncStatus = () => {
    setDncStatus(!dncStatus);
    const newEntry = {
      user: formData.user,
      callStatus: dncStatus ? "DNC Revoked" : "Do Not Call",
      notes: dncStatus
        ? `DNC removed by ${formData.user}`
        : `DNC added by ${formData.user}`,
      dispositionTime: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
      followUpTime: "N/A",
    };
    setCallHistory([newEntry, ...callHistory]);
  };

  return (
    <>
      {/* Header with Time and Date */}
      <header className="bg-blue-900 text-white shadow-sm">
        <div className="flex justify-between items-center px-6 py-4">
          <h2 className="text-xl font-semibold">TRUPOINT RESEARCH ANALYST CRM</h2>
          <div className="flex items-center space-x-4">
            <span>Time: {format(currentTime, "HH:mm:ss")}</span>
            <span>Date: {format(currentTime, "dd-MM-yyyy")}</span>
          </div>
        </div>
      </header>

      <div className="p-6">
        <div className="flex items-center mb-6">
          <button
            onClick={() => navigate("/leads")}
            className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </button>
          <h2 className="text-2xl font-semibold ml-4">Lead Detail</h2>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Full Name */}
            <div>
              <label className="block text-gray-700 mb-2">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                readOnly
                className="w-full border p-2 rounded bg-gray-100"
              />
            </div>

            {/* Primary Contact */}
            <div>
              <label className="block text-gray-700 mb-2">Primary Contact</label>
              <input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                readOnly
                className="w-full border p-2 rounded bg-gray-100"
              />
            </div>

            {/* Secondary Contact */}
            <div>
              <label className="block text-gray-700 mb-2">Secondary Contact</label>
              <input
                type="text"
                name="secondaryContact"
                value={formData.secondaryContact}
                onChange={handleChange}
                className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Email ID */}
            <div>
              <label className="block text-gray-700 mb-2">Email ID</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                readOnly
                className="w-full border p-2 rounded bg-gray-100"
              />
            </div>

            {/* Date of Birth */}
            <div>
              <label className="block text-gray-700 mb-2">Date of Birth</label>
              <input
                type="text"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                placeholder="dd-mm-yyyy"
                className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Call Status */}
            <div>
              <label className="block text-gray-700 mb-2">Call Status</label>
              <div className="flex items-center space-x-2">
                <select
                  name="callStatus"
                  value={formData.callStatus}
                  onChange={handleChange}
                  className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Call Back">Call Back</option>
                  <option value="DNC">DNC</option>
                  <option value="Ringing">Ringing</option>
                  <option value="Demo">Demo</option>
                  <option value="Fresh">Fresh</option>
                </select>
                <button
                  type="button"
                  onClick={handleAddComment}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700"
                >
                  Update
                </button>
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="block text-gray-700 mb-2">Notes</label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your comment here..."
              />
              <button
                type="button"
                onClick={toggleDncStatus}
                className={`mt-2 px-4 py-2 text-sm font-medium text-white rounded ${
                  dncStatus ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"
                }`}
              >
                {dncStatus ? "DNC ACTIVE" : "DNC NOT ACTIVE"}
              </button>
            </div>

            {/* Address */}
            <div>
              <label className="block text-gray-700 mb-2">Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* City */}
            <div>
              <label className="block text-gray-700 mb-2">City</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* State */}
            <div>
              <label className="block text-gray-700 mb-2">State</label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Zipcode */}
            <div>
              <label className="block text-gray-700 mb-2">Zipcode</label>
              <input
                type="text"
                name="zipcode"
                value={formData.zipcode}
                onChange={handleChange}
                className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Country */}
            <div>
              <label className="block text-gray-700 mb-2">Country</label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Segment */}
            <div>
              <label className="block text-gray-700 mb-2">Segment</label>
              <input
                type="text"
                name="segment"
                value={formData.segment}
                onChange={handleChange}
                className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Trading Budget */}
            <div>
              <label className="block text-gray-700 mb-2">Trading Budget</label>
              <input
                type="text"
                name="tradingBudget"
                value={formData.tradingBudget}
                onChange={handleChange}
                className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Priority */}
            <div>
              <label className="block text-gray-700 mb-2">Priority</label>
              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Priority</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>

            {/* Branch */}
            <div>
              <label className="block text-gray-700 mb-2">Branch</label>
              <select
                name="branch"
                value={formData.branch}
                onChange={handleChange}
                className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Branch</option>
                <option value="Head Office">Head Office</option>
                <option value="Branch 1">Branch 1</option>
                <option value="Branch 2">Branch 2</option>
              </select>
            </div>

            {/* Head Office (not in the form, but keeping for consistency) */}
            <div className="hidden">
              <label className="block text-gray-700 mb-2">Head Office</label>
              <input
                type="text"
                name="headOffice"
                value={formData.branch}
                onChange={handleChange}
                className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* User */}
            <div>
              <label className="block text-gray-700 mb-2">User</label>
              <select
                name="user"
                value={formData.user}
                onChange={handleChange}
                className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Super Admin">Super Admin</option>
                <option value="Agent 1 Team 1">Agent 1 Team 1</option>
                <option value="Branch Owner 1">Branch Owner 1</option>
                <option value="Unassigned">Unassigned</option>
              </select>
            </div>

            {/* Lead Source */}
            <div>
              <label className="block text-gray-700 mb-2">Lead Source</label>
              <select
                name="leadSource"
                value={formData.leadSource}
                onChange={handleChange}
                className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Agent">Agent</option>
                <option value="Internal">Internal</option>
                <option value="External">External</option>
              </select>
            </div>

            {/* Agency */}
            <div>
              <label className="block text-gray-700 mb-2">Agency</label>
              <select
                name="agency"
                value={formData.agency}
                onChange={handleChange}
                className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Internal">Internal</option>
                <option value="External">External</option>
              </select>
            </div>

            {/* Call Count */}
            <div>
              <label className="block text-gray-700 mb-2">Call Count</label>
              <input
                type="text"
                name="callCount"
                value={formData.callCount}
                readOnly
                className="w-full border p-2 rounded bg-gray-100"
              />
            </div>
          </div>

          <div className="flex justify-start gap-2 mt-4">
            <button
              type="button"
              onClick={handleReset}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700"
            >
              Reset Lead
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700"
            >
              Submit
            </button>
          </div>
        </form>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-xl font-semibold mb-4">Lead Call History</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 bg-gray-100 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 bg-gray-100 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Call Status
                  </th>
                  <th className="px-6 py-3 bg-gray-100 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Notes
                  </th>
                  <th className="px-6 py-3 bg-gray-100 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Disposition Time
                  </th>
                  <th className="px-6 py-3 bg-gray-100 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Follow Up Time
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {callHistory.length > 0 ? (
                  callHistory.map((entry, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {entry.user}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {entry.callStatus}
                      </td>
                      <td className="px-6 py-4 whitespace-normal text-sm text-gray-900">
                        {entry.notes}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {entry.dispositionTime}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {entry.followUpTime}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500">
                      No call history available.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default LeadDetails;