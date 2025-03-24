// import React, { useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";

// const EditUser = () => {
//   const { state } = useLocation();
//   const navigate = useNavigate();
//   const { user } = state || {};

//   // State to manage form data
//   const [formData, setFormData] = useState({
//     empId: user?.empId || "",
//     firstName: user?.fullName?.split(" ")[0] || "",
//     middleName: "",
//     lastName: user?.fullName?.split(" ").slice(1).join(" ") || "",
//     fullName: user?.fullName || "",
//     email: user?.email || "",
//     primaryContact: user?.primaryContact || "",
//     username: user?.username || "",
//     dateOfBirth: user?.dateOfBirth || "",
//     gender: user?.gender || "",
//     maritalStatus: user?.maritalStatus || "",
//     bloodGroup: user?.bloodGroup || "",
//     headOfficeBranch: user?.headOfficeBranch || "",
//     address: user?.address || "",
//     city: user?.city || "",
//     state: user?.state || "",
//     pincode: user?.pincode || "",
//     country: user?.country || "INDIA",
//     emergencyContactName: user?.emergencyContactName || "",
//     emergencyContactRelation: user?.emergencyContactRelation || "",
//     emergencyContactNumber: user?.emergencyContactNumber || "",
//     bankName: user?.bankName || "",
//     bankIfscCode: user?.bankIfscCode || "",
//     bankAccountNumber: user?.bankAccountNumber || "",
//     panCard: user?.panCard || "",
//     aadhaarCard: user?.aadhaarCard || "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Handle form submission (e.g., API call to update user)
//     console.log("Updated user data:", formData);
//     // Navigate back to the ListUsers page after submission
//     navigate("/list-users");
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-8">
//       <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm p-6">
//         <h1 className="text-2xl font-bold text-gray-900 mb-6">
//           Edit User - {formData.fullName}
//         </h1>

//         <div className="flex space-x-4 mb-6">
//           <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
//             User Basic Info
//           </button>
//           <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
//             Employment Details
//           </button>
//           <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
//             Reset Password
//           </button>
//         </div>

//         <form onSubmit={handleSubmit}>
//           {/* Basic Info */}
//           <div className="mb-6">
//             <h2 className="text-lg font-semibold text-gray-700 mb-4">
//               Basic Info
//             </h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//               <div>
//                 <label className="block text-sm text-gray-600">Employee ID</label>
//                 <input
//                   type="text"
//                   name="empId"
//                   value={formData.empId}
//                   onChange={handleChange}
//                   className="w-full border rounded px-3 py-2"
//                   readOnly
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm text-gray-600">First Name</label>
//                 <input
//                   type="text"
//                   name="firstName"
//                   value={formData.firstName}
//                   onChange={handleChange}
//                   placeholder="Enter First Name"
//                   className="w-full border rounded px-3 py-2"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm text-gray-600">Middle Name</label>
//                 <input
//                   type="text"
//                   name="middleName"
//                   value={formData.middleName}
//                   onChange={handleChange}
//                   placeholder="Middle Name"
//                   className="w-full border rounded px-3 py-2"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm text-gray-600">Last Name</label>
//                 <input
//                   type="text"
//                   name="lastName"
//                   value={formData.lastName}
//                   onChange={handleChange}
//                   placeholder="Last Name"
//                   className="w-full border rounded px-3 py-2"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm text-gray-600">Full Name</label>
//                 <input
//                   type="text"
//                   name="fullName"
//                   value={formData.fullName}
//                   onChange={handleChange}
//                   placeholder="Enter Valid Full Name"
//                   className="w-full border rounded px-3 py-2"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm text-gray-600">Email</label>
//                 <input
//                   type="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   placeholder="Enter Valid Email Address"
//                   className="w-full border rounded px-3 py-2"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm text-gray-600">Primary Contact</label>
//                 <input
//                   type="text"
//                   name="primaryContact"
//                   value={formData.primaryContact}
//                   onChange={handleChange}
//                   placeholder="Enter Valid Number"
//                   className="w-full border rounded px-3 py-2"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm text-gray-600">Username</label>
//                 <input
//                   type="text"
//                   name="username"
//                   value={formData.username}
//                   onChange={handleChange}
//                   placeholder="Enter Username"
//                   className="w-full border rounded px-3 py-2"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm text-gray-600">Date of Birth</label>
//                 <input
//                   type="text"
//                   name="dateOfBirth"
//                   value={formData.dateOfBirth}
//                   onChange={handleChange}
//                   placeholder="DD-MM-YYYY"
//                   className="w-full border rounded px-3 py-2"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm text-gray-600">Gender</label>
//                 <select
//                   name="gender"
//                   value={formData.gender}
//                   onChange={handleChange}
//                   className="w-full border rounded px-3 py-2"
//                 >
//                   <option value="">Select Gender</option>
//                   <option value="Male">Male</option>
//                   <option value="Female">Female</option>
//                   <option value="Other">Other</option>
//                 </select>
//               </div>
//               <div>
//                 <label className="block text-sm text-gray-600">Marital Status</label>
//                 <select
//                   name="maritalStatus"
//                   value={formData.maritalStatus}
//                   onChange={handleChange}
//                   className="w-full border rounded px-3 py-2"
//                 >
//                   <option value="">Select Marital Status</option>
//                   <option value="Single">Single</option>
//                   <option value="Married">Married</option>
//                   <option value="Divorced">Divorced</option>
//                   <option value="Widowed">Widowed</option>
//                 </select>
//               </div>
//               <div>
//                 <label className="block text-sm text-gray-600">Blood Group</label>
//                 <select
//                   name="bloodGroup"
//                   value={formData.bloodGroup}
//                   onChange={handleChange}
//                   className="w-full border rounded px-3 py-2"
//                 >
//                   <option value="">Blood Group</option>
//                   <option value="A+">A+</option>
//                   <option value="A-">A-</option>
//                   <option value="B+">B+</option>
//                   <option value="B-">B-</option>
//                   <option value="AB+">AB+</option>
//                   <option value="AB-">AB-</option>
//                   <option value="O+">O+</option>
//                   <option value="O-">O-</option>
//                 </select>
//               </div>
//               <div>
//                 <label className="block text-sm text-gray-600">Head Office Branch</label>
//                 <select
//                   name="headOfficeBranch"
//                   value={formData.headOfficeBranch}
//                   onChange={handleChange}
//                   className="w-full border rounded px-3 py-2"
//                 >
//                   <option value="">Select Head Office Branch</option>
//                   <option value="Branch 1">Branch 1</option>
//                   <option value="Branch 2">Branch 2</option>
//                 </select>
//               </div>
//             </div>
//           </div>

//           {/* Address */}
//           <div className="mb-6">
//             <h2 className="text-lg font-semibold text-gray-700 mb-4">Address</h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//               <div className="col-span-2">
//                 <label className="block text-sm text-gray-600">Address</label>
//                 <textarea
//                   name="address"
//                   value={formData.address}
//                   onChange={handleChange}
//                   placeholder="Address"
//                   className="w-full border rounded px-3 py-2"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm text-gray-600">City</label>
//                 <input
//                   type="text"
//                   name="city"
//                   value={formData.city}
//                   onChange={handleChange}
//                   placeholder="City"
//                   className="w-full border rounded px-3 py-2"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm text-gray-600">State</label>
//                 <select
//                   name="state"
//                   value={formData.state}
//                   onChange={handleChange}
//                   className="w-full border rounded px-3 py-2"
//                 >
//                   <option value="">Select State</option>
//                   <option value="State 1">State 1</option>
//                   <option value="State 2">State 2</option>
//                 </select>
//               </div>
//               <div>
//                 <label className="block text-sm text-gray-600">Pincode</label>
//                 <input
//                   type="text"
//                   name="pincode"
//                   value={formData.pincode}
//                   onChange={handleChange}
//                   placeholder="Pincode"
//                   className="w-full border rounded px-3 py-2"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm text-gray-600">Country</label>
//                 <input
//                   type="text"
//                   name="country"
//                   value={formData.country}
//                   onChange={handleChange}
//                   className="w-full border rounded px-3 py-2"
//                   readOnly
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Emergency Contact Information */}
//           <div className="mb-6">
//             <h2 className="text-lg font-semibold text-gray-700 mb-4">
//               Emergency Contact Information
//             </h2>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//               <div>
//                 <label className="block text-sm text-gray-600">Emergency Contact Name</label>
//                 <input
//                   type="text"
//                   name="emergencyContactName"
//                   value={formData.emergencyContactName}
//                   onChange={handleChange}
//                   placeholder="Emergency Contact Name"
//                   className="w-full border rounded px-3 py-2"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm text-gray-600">Emergency Contact Relation</label>
//                 <input
//                   type="text"
//                   name="emergencyContactRelation"
//                   value={formData.emergencyContactRelation}
//                   onChange={handleChange}
//                   placeholder="Emergency Contact Relation"
//                   className="w-full border rounded px-3 py-2"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm text-gray-600">Emergency Contact Number</label>
//                 <input
//                   type="text"
//                   name="emergencyContactNumber"
//                   value={formData.emergencyContactNumber}
//                   onChange={handleChange}
//                   placeholder="Enter 10 Digit Mobile Number"
//                   className="w-full border rounded px-3 py-2"
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Bank Details */}
//           <div className="mb-6">
//             <h2 className="text-lg font-semibold text-gray-700 mb-4">Bank Details</h2>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//               <div>
//                 <label className="block text-sm text-gray-600">Bank Name</label>
//                 <input
//                   type="text"
//                   name="bankName"
//                   value={formData.bankName}
//                   onChange={handleChange}
//                   placeholder="Enter Bank Name"
//                   className="w-full border rounded px-3 py-2"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm text-gray-600">Bank IFSC Code</label>
//                 <input
//                   type="text"
//                   name="bankIfscCode"
//                   value={formData.bankIfscCode}
//                   onChange={handleChange}
//                   placeholder="Enter Bank IFSC Code"
//                   className="w-full border rounded px-3 py-2"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm text-gray-600">Account Number</label>
//                 <input
//                   type="text"
//                   name="bankAccountNumber"
//                   value={formData.bankAccountNumber}
//                   onChange={handleChange}
//                   placeholder="Enter Account Number"
//                   className="w-full border rounded px-3 py-2"
//                 />
//               </div>
//               <div className="col-span-3">
//                 <label className="block text-sm text-gray-600">Upload Bank Proof</label>
//                 <input
//                   type="file"
//                   accept=".jpg,.jpeg,.pdf"
//                   className="w-full border rounded px-3 py-2"
//                 />
//                 <p className="text-sm text-gray-500">
//                   Only jpg, jpeg, pdf files. Max size of 1MB.
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* KYC Details */}
//           <div className="mb-6">
//             <h2 className="text-lg font-semibold text-gray-700 mb-4">KYC Details</h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm text-gray-600">PAN Card</label>
//                 <input
//                   type="text"
//                   name="panCard"
//                   value={formData.panCard}
//                   onChange={handleChange}
//                   placeholder="Enter PAN Card Details"
//                   className="w-full border rounded px-3 py-2"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm text-gray-600">Upload PAN Card Image</label>
//                 <input
//                   type="file"
//                   accept=".jpg,.jpeg,.pdf"
//                   className="w-full border rounded px-3 py-2"
//                 />
//                 <p className="text-sm text-gray-500">
//                   Only jpg, jpeg, pdf files. Max size of 1MB.
//                 </p>
//               </div>
//               <div>
//                 <label className="block text-sm text-gray-600">Aadhaar Card</label>
//                 <input
//                   type="text"
//                   name="aadhaarCard"
//                   value={formData.aadhaarCard}
//                   onChange={handleChange}
//                   placeholder="Enter Aadhaar Card Details"
//                   className="w-full border rounded px-3 py-2"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm text-gray-600">Upload Aadhaar Card Image</label>
//                 <input
//                   type="file"
//                   accept=".jpg,.jpeg,.pdf"
//                   className="w-full border rounded px-3 py-2"
//                 />
//                 <p className="text-sm text-gray-500">
//                   Only jpg, jpeg, pdf files. Max size of 1MB.
//                 </p>
//               </div>
//             </div>
//           </div>

//           <button
//             type="submit"
//             className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
//           >
//             Submit
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default EditUser;

import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const EditUser = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { user } = state || {};

  // State to manage the active tab
  const [activeTab, setActiveTab] = useState("userBasicInfo");

  // State to manage form data for User Basic Info
  const [basicInfoFormData, setBasicInfoFormData] = useState({
    empId: user?.empId || "",
    firstName: user?.fullName?.split(" ")[0] || "",
    middleName: "",
    lastName: user?.fullName?.split(" ").slice(1).join(" ") || "",
    fullName: user?.fullName || "",
    email: user?.email || "",
    primaryContact: user?.primaryContact || "",
    username: user?.username || "",
    dateOfBirth: user?.dateOfBirth || "",
    gender: user?.gender || "",
    maritalStatus: user?.maritalStatus || "",
    bloodGroup: user?.bloodGroup || "",
    headOfficeBranch: user?.headOfficeBranch || "",
    address: user?.address || "",
    city: user?.city || "",
    state: user?.state || "",
    pincode: user?.pincode || "",
    country: user?.country || "INDIA",
    emergencyContactName: user?.emergencyContactName || "",
    emergencyContactRelation: user?.emergencyContactRelation || "",
    emergencyContactNumber: user?.emergencyContactNumber || "",
    bankName: user?.bankName || "",
    bankIfscCode: user?.bankIfscCode || "",
    bankAccountNumber: user?.bankAccountNumber || "",
    panCard: user?.panCard || "",
    aadhaarCard: user?.aadhaarCard || "",
  });

  // State to manage form data for Employment Details
  const [employmentFormData, setEmploymentFormData] = useState({
    userRole: "Owner",
    department: "Management",
    designation: "Owner",
    monthlyCTC: 0,
    employmentStatus: "Active",
    crmLoginStatus: "Active",
    reasonForChange: "",
    description: "",
    startDate: "2025-03-24",
  });

  // State to manage employment history
  const [employmentHistory] = useState([
    {
      startDate: "13-01-2024",
      designation: "Owner",
      salary: 0,
      updatedBy: "Super Admin",
      reason: "",
    },
  ]);

  // Handle tab change
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  // Handle change for Basic Info form
  const handleBasicInfoChange = (e) => {
    const { name, value } = e.target;
    setBasicInfoFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle change for Employment Details form
  const handleEmploymentChange = (e) => {
    const { name, value } = e.target;
    setEmploymentFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission for Basic Info
  const handleBasicInfoSubmit = (e) => {
    e.preventDefault();
    console.log("Updated user basic info:", basicInfoFormData);
    navigate("/list-users");
  };

  // Handle form submission for Employment Details
  const handleEmploymentSubmit = (e) => {
    e.preventDefault();
    console.log("Updated employment details:", employmentFormData);
    navigate("/list-users");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          Edit User - {basicInfoFormData.fullName}
        </h1>

        {/* Tabs */}
        <div className="flex space-x-4 mb-6">
          <button
            className={`px-4 py-2 rounded-md text-white ${
              activeTab === "userBasicInfo" ? "bg-blue-600" : "bg-blue-600 opacity-70"
            } hover:bg-blue-700`}
            onClick={() => handleTabChange("userBasicInfo")}
          >
            User Basic Info
          </button>
          <button
            className={`px-4 py-2 rounded-md text-white ${
              activeTab === "employmentDetails" ? "bg-green-600" : "bg-blue-600"
            } hover:bg-green-700`}
            onClick={() => handleTabChange("employmentDetails")}
          >
            Employment Details
          </button>
          <button
            className={`px-4 py-2 rounded-md text-white ${
              activeTab === "resetPassword" ? "bg-blue-600" : "bg-blue-600 opacity-70"
            } hover:bg-blue-700`}
            onClick={() => handleTabChange("resetPassword")}
          >
            Reset Password
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === "userBasicInfo" && (
          <form onSubmit={handleBasicInfoSubmit}>
            {/* Basic Info */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-700 mb-4">
                Basic Info
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm text-gray-600">Employee ID</label>
                  <input
                    type="text"
                    name="empId"
                    value={basicInfoFormData.empId}
                    onChange={handleBasicInfoChange}
                    className="w-full border rounded px-3 py-2"
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={basicInfoFormData.firstName}
                    onChange={handleBasicInfoChange}
                    placeholder="Enter First Name"
                    className="w-full border rounded px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600">Middle Name</label>
                  <input
                    type="text"
                    name="middleName"
                    value={basicInfoFormData.middleName}
                    onChange={handleBasicInfoChange}
                    placeholder="Middle Name"
                    className="w-full border rounded px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={basicInfoFormData.lastName}
                    onChange={handleBasicInfoChange}
                    placeholder="Last Name"
                    className="w-full border rounded px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600">Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    value={basicInfoFormData.fullName}
                    onChange={handleBasicInfoChange}
                    placeholder="Enter Valid Full Name"
                    className="w-full border rounded px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={basicInfoFormData.email}
                    onChange={handleBasicInfoChange}
                    placeholder="Enter Valid Email Address"
                    className="w-full border rounded px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600">Primary Contact</label>
                  <input
                    type="text"
                    name="primaryContact"
                    value={basicInfoFormData.primaryContact}
                    onChange={handleBasicInfoChange}
                    placeholder="Enter Valid Number"
                    className="w-full border rounded px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600">Username</label>
                  <input
                    type="text"
                    name="username"
                    value={basicInfoFormData.username}
                    onChange={handleBasicInfoChange}
                    placeholder="Enter Username"
                    className="w-full border rounded px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600">Date of Birth</label>
                  <input
                    type="text"
                    name="dateOfBirth"
                    value={basicInfoFormData.dateOfBirth}
                    onChange={handleBasicInfoChange}
                    placeholder="DD-MM-YYYY"
                    className="w-full border rounded px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600">Gender</label>
                  <select
                    name="gender"
                    value={basicInfoFormData.gender}
                    onChange={handleBasicInfoChange}
                    className="w-full border rounded px-3 py-2"
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-600">Marital Status</label>
                  <select
                    name="maritalStatus"
                    value={basicInfoFormData.maritalStatus}
                    onChange={handleBasicInfoChange}
                    className="w-full border rounded px-3 py-2"
                  >
                    <option value="">Select Marital Status</option>
                    <option value="Single">Single</option>
                    <option value="Married">Married</option>
                    <option value="Divorced">Divorced</option>
                    <option value="Widowed">Widowed</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-600">Blood Group</label>
                  <select
                    name="bloodGroup"
                    value={basicInfoFormData.bloodGroup}
                    onChange={handleBasicInfoChange}
                    className="w-full border rounded px-3 py-2"
                  >
                    <option value="">Blood Group</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-600">Head Office Branch</label>
                  <select
                    name="headOfficeBranch"
                    value={basicInfoFormData.headOfficeBranch}
                    onChange={handleBasicInfoChange}
                    className="w-full border rounded px-3 py-2"
                  >
                    <option value="">Select Head Office Branch</option>
                    <option value="Branch 1">Branch 1</option>
                    <option value="Branch 2">Branch 2</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Address */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-700 mb-4">Address</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="col-span-2">
                  <label className="block text-sm text-gray-600">Address</label>
                  <textarea
                    name="address"
                    value={basicInfoFormData.address}
                    onChange={handleBasicInfoChange}
                    placeholder="Address"
                    className="w-full border rounded px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600">City</label>
                  <input
                    type="text"
                    name="city"
                    value={basicInfoFormData.city}
                    onChange={handleBasicInfoChange}
                    placeholder="City"
                    className="w-full border rounded px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600">State</label>
                  <select
                    name="state"
                    value={basicInfoFormData.state}
                    onChange={handleBasicInfoChange}
                    className="w-full border rounded px-3 py-2"
                  >
                    <option value="">Select State</option>
                    <option value="State 1">State 1</option>
                    <option value="State 2">State 2</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-600">Pincode</label>
                  <input
                    type="text"
                    name="pincode"
                    value={basicInfoFormData.pincode}
                    onChange={handleBasicInfoChange}
                    placeholder="Pincode"
                    className="w-full border rounded px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600">Country</label>
                  <input
                    type="text"
                    name="country"
                    value={basicInfoFormData.country}
                    onChange={handleBasicInfoChange}
                    className="w-full border rounded px-3 py-2"
                    readOnly
                  />
                </div>
              </div>
            </div>

            {/* Emergency Contact Information */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-700 mb-4">
                Emergency Contact Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm text-gray-600">Emergency Contact Name</label>
                  <input
                    type="text"
                    name="emergencyContactName"
                    value={basicInfoFormData.emergencyContactName}
                    onChange={handleBasicInfoChange}
                    placeholder="Emergency Contact Name"
                    className="w-full border rounded px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600">Emergency Contact Relation</label>
                  <input
                    type="text"
                    name="emergencyContactRelation"
                    value={basicInfoFormData.emergencyContactRelation}
                    onChange={handleBasicInfoChange}
                    placeholder="Emergency Contact Relation"
                    className="w-full border rounded px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600">Emergency Contact Number</label>
                  <input
                    type="text"
                    name="emergencyContactNumber"
                    value={basicInfoFormData.emergencyContactNumber}
                    onChange={handleBasicInfoChange}
                    placeholder="Enter 10 Digit Mobile Number"
                    className="w-full border rounded px-3 py-2"
                  />
                </div>
              </div>
            </div>

            {/* Bank Details */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-700 mb-4">Bank Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm text-gray-600">Bank Name</label>
                  <input
                    type="text"
                    name="bankName"
                    value={basicInfoFormData.bankName}
                    onChange={handleBasicInfoChange}
                    placeholder="Enter Bank Name"
                    className="w-full border rounded px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600">Bank IFSC Code</label>
                  <input
                    type="text"
                    name="bankIfscCode"
                    value={basicInfoFormData.bankIfscCode}
                    onChange={handleBasicInfoChange}
                    placeholder="Enter Bank IFSC Code"
                    className="w-full border rounded px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600">Account Number</label>
                  <input
                    type="text"
                    name="bankAccountNumber"
                    value={basicInfoFormData.bankAccountNumber}
                    onChange={handleBasicInfoChange}
                    placeholder="Enter Account Number"
                    className="w-full border rounded px-3 py-2"
                  />
                </div>
                <div className="col-span-3">
                  <label className="block text-sm text-gray-600">Upload Bank Proof</label>
                  <input
                    type="file"
                    accept=".jpg,.jpeg,.pdf"
                    className="w-full border rounded px-3 py-2"
                  />
                  <p className="text-sm text-gray-500">
                    Only jpg, jpeg, pdf files. Max size of 1MB.
                  </p>
                </div>
              </div>
            </div>

            {/* KYC Details */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-700 mb-4">KYC Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-600">PAN Card</label>
                  <input
                    type="text"
                    name="panCard"
                    value={basicInfoFormData.panCard}
                    onChange={handleBasicInfoChange}
                    placeholder="Enter PAN Card Details"
                    className="w-full border rounded px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600">Upload PAN Card Image</label>
                  <input
                    type="file"
                    accept=".jpg,.jpeg,.pdf"
                    className="w-full border rounded px-3 py-2"
                  />
                  <p className="text-sm text-gray-500">
                    Only jpg, jpeg, pdf files. Max size of 1MB.
                  </p>
                </div>
                <div>
                  <label className="block text-sm text-gray-600">Aadhaar Card</label>
                  <input
                    type="text"
                    name="aadhaarCard"
                    value={basicInfoFormData.aadhaarCard}
                    onChange={handleBasicInfoChange}
                    placeholder="Enter Aadhaar Card Details"
                    className="w-full border rounded px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600">Upload Aadhaar Card Image</label>
                  <input
                    type="file"
                    accept=".jpg,.jpeg,.pdf"
                    className="w-full border rounded px-3 py-2"
                  />
                  <p className="text-sm text-gray-500">
                    Only jpg, jpeg, pdf files. Max size of 1MB.
                  </p>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Submit
            </button>
          </form>
        )}

        {activeTab === "employmentDetails" && (
          <div>
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              Employment Details
            </h2>
            <form onSubmit={handleEmploymentSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                <div>
                  <label className="block text-sm text-gray-600">User Role</label>
                  <select
                    name="userRole"
                    value={employmentFormData.userRole}
                    onChange={handleEmploymentChange}
                    className="w-full border rounded px-3 py-2"
                  >
                    <option value="Owner">Owner</option>
                    <option value="Admin">Admin</option>
                    <option value="Employee">Employee</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-600">Department</label>
                  <select
                    name="department"
                    value={employmentFormData.department}
                    onChange={handleEmploymentChange}
                    className="w-full border rounded px-3 py-2"
                  >
                    <option value="Management">Management</option>
                    <option value="HR">HR</option>
                    <option value="Engineering">Engineering</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-600">Designation</label>
                  <select
                    name="designation"
                    value={employmentFormData.designation}
                    onChange={handleEmploymentChange}
                    className="w-full border rounded px-3 py-2"
                  >
                    <option value="Owner">Owner</option>
                    <option value="Manager">Manager</option>
                    <option value="Developer">Developer</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-600">User Permission</label>
                  <input
                    type="text"
                    value="Monthly CTC"
                    className="w-full border rounded px-3 py-2"
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600">Monthly CTC</label>
                  <input
                    type="number"
                    name="monthlyCTC"
                    value={employmentFormData.monthlyCTC}
                    onChange={handleEmploymentChange}
                    className="w-full border rounded px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600">Employment Status</label>
                  <select
                    name="employmentStatus"
                    value={employmentFormData.employmentStatus}
                    onChange={handleEmploymentChange}
                    className="w-full border rounded px-3 py-2"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-600">CRM Login Status</label>
                  <select
                    name="crmLoginStatus"
                    value={employmentFormData.crmLoginStatus}
                    onChange={handleEmploymentChange}
                    className="w-full border rounded px-3 py-2"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-600">Monthly Salary - CTC</label>
                  <select
                    name="reasonForChange"
                    value={employmentFormData.reasonForChange}
                    onChange={handleEmploymentChange}
                    className="w-full border rounded px-3 py-2"
                  >
                    <option value="">Reason for Change</option>
                    <option value="Promotion">Promotion</option>
                    <option value="Resignation">Resignation</option>
                    <option value="Termination">Termination</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-600">Start Date</label>
                  <input
                    type="date"
                    name="startDate"
                    value={employmentFormData.startDate}
                    onChange={handleEmploymentChange}
                    className="w-full border rounded px-3 py-2"
                  />
                </div>
                <div className="col-span-3">
                  <label className="block text-sm text-gray-600">Description</label>
                  <textarea
                    name="description"
                    value={employmentFormData.description}
                    onChange={handleEmploymentChange}
                    placeholder="Notes for Change in Employment Status"
                    className="w-full border rounded px-3 py-2"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 mb-6"
              >
                Update
              </button>
            </form>

            {/* Employment History */}
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              Employment History
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse border border-gray-300">
                <thead>
                  <tr>
                    <th className="border border-gray-300 px-4 py-2 text-left">Start Date</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Designation</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Salary</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Updated by</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Reason</th>
                  </tr>
                </thead>
                <tbody>
                  {employmentHistory.map((history, index) => (
                    <tr key={index}>
                      <td className="border border-gray-300 px-4 py-2">{history.startDate}</td>
                      <td className="border border-gray-300 px-4 py-2">{history.designation}</td>
                      <td className="border border-gray-300 px-4 py-2">{history.salary}</td>
                      <td className="border border-gray-300 px-4 py-2">{history.updatedBy}</td>
                      <td className="border border-gray-300 px-4 py-2">{history.reason}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "resetPassword" && (
          <div>
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              Reset Password
            </h2>
            <form>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm text-gray-600">New Password</label>
                  <input
                    type="password"
                    name="newPassword"
                    placeholder="Enter New Password"
                    className="w-full border rounded px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600">Confirm Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    className="w-full border rounded px-3 py-2"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Reset Password
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditUser;