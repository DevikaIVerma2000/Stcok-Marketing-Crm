import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const AddUser = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    primaryContact: '',
    username: '',
    password: '',
    userLoginStatus: 'Active',
    role: 'Owner',
    department: 'Management',
    designation: 'Owner',
    monthlyCtc: '',
    dateOfJoining: '2025-03-24',
    workingShift: '10AM to 7PM',
    userBranch: 'Head Office',
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic validation
    if (!formData.fullName || !formData.email || !formData.username) {
      alert('Please fill all required fields');
      return;
    }
    // Add your form submission logic here (e.g., API call)
    console.log('Form submitted:', formData);
    navigate('/list-users');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className="bg-[#0f172a] text-white w-64 py-6 px-3 space-y-6 flex-shrink-0 fixed h-full">
        <div className="flex items-center px-2 mb-6">
          <span className="text-xl font-bold">TRUPOINT</span>
        </div>
        <nav>
          {[
            ['Dashboard', '/dashboard'],
            ['Leads', '/leads'],
            ['Sales Lead', '/sales-lead'],
            ['Customers', '/customers'],
            ['List Packages', '/list-packages'],
            ['List Payments', '/list-payments'],
            ['List Invoices', '/list-invoices'],
            ['Stock Tips', '/stock-tips'],
            ['Quality Analysis', '/quality-analysis'],
            ['Admin', '/admin'],
            ['Management', '/management'],
            ['Company', '/company'],
            ['Reports', '/reports'],
          ].map(([name, path]) => (
            <button
              key={path}
              className="block w-full text-left px-4 py-2 rounded hover:bg-[#1e293b] transition-colors"
              onClick={() => navigate(path)}
            >
              {name}
            </button>
          ))}
        </nav>
        <div className="absolute bottom-4 left-0 w-64 px-3">
          <div className="bg-[#1e293b] rounded-lg p-3 flex items-center">
            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">
              <span className="text-lg font-semibold">SA</span>
            </div>
            <div className="ml-3">
              <div className="font-medium">Super Admin</div>
              <div className="text-sm text-gray-300">Root</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 ml-64">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center mb-6">
            <button
              onClick={() => navigate('/list-users')}
              className="inline-flex items-center px-3 py-2 text-sm text-gray-600 rounded-md hover:bg-gray-100 mr-4 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" /> Back
            </button>
            <h1 className="text-2xl font-bold text-gray-900">Add New User</h1>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Basic Information */}
            <Section title="Basic Information">
              <div className="grid grid-cols-2 gap-6">
                <InputField
                  id="fullName"
                  label="Full Name"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
                <InputField
                  id="email"
                  label="Email"
                  type="email"
                  placeholder="Enter valid email address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <InputField
                  id="primaryContact"
                  label="Primary Contact"
                  type="tel"
                  placeholder="Enter 10-digit mobile number"
                  value={formData.primaryContact}
                  onChange={handleChange}
                  pattern="[0-9]{10}"
                />
              </div>
            </Section>

            {/* Login Information */}
            <Section title="Login Information">
              <div className="grid grid-cols-2 gap-6">
                <InputField
                  id="username"
                  label="Username"
                  placeholder="root"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  note="No special characters allowed"
                />
                <InputField
                  id="password"
                  label="Password"
                  type="password"
                  placeholder="••••"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  note="No spaces allowed"
                />
                <SelectField
                  id="userLoginStatus"
                  label="User Login Status"
                  value={formData.userLoginStatus}
                  onChange={handleChange}
                  options={['Active', 'Inactive']}
                />
              </div>
            </Section>

            {/* Employment Details */}
            <Section title="Employment Details">
              <div className="grid grid-cols-4 gap-6">
                <SelectField
                  id="role"
                  label="Role"
                  value={formData.role}
                  onChange={handleChange}
                  options={[
                    'Owner', 'Branch Owner', 'Branch Manager', 'HR Manager',
                    'Team Manager', 'Team Leader', 'Agent', 'Accountant',
                    'Admin Assit', 'Compliance Manager'
                  ]}
                />
                <SelectField
                  id="department"
                  label="Department"
                  value={formData.department}
                  onChange={handleChange}
                  options={['Management', 'HR', 'Operations', 'Support', 'Sales']}
                />
                <SelectField
                  id="designation"
                  label="Designation"
                  value={formData.designation}
                  onChange={handleChange}
                  options={[
                    'Owner', 'Branch Owner', 'Branch Manager', 'Team Manager',
                    'Team Leader', 'Sr Sales Advisor', 'Jr Sales Advisor', 'HR',
                    'Accountant', 'Admin Assit', 'Compliance Manager'
                  ]}
                />
                <InputField
                  id="monthlyCtc"
                  label="Monthly CTC"
                  type="number"
                  placeholder="Salary"
                  value={formData.monthlyCtc}
                  onChange={handleChange}
                  note="Enter numbers only"
                />
                <InputField
                  id="dateOfJoining"
                  label="Date of Joining"
                  type="date"
                  value={formData.dateOfJoining}
                  onChange={handleChange}
                />
                <SelectField
                  id="workingShift"
                  label="Working Shift"
                  value={formData.workingShift}
                  onChange={handleChange}
                  options={['10AM to 7PM', '9AM to 6PM']}
                />
                <SelectField
                  id="userBranch"
                  label="User Branch"
                  value={formData.userBranch}
                  onChange={handleChange}
                  options={['Head Office', 'VASHI', 'SANPADA']}
                />
              </div>
            </Section>

            <div className="mt-8 flex justify-end">
              <button
                type="submit"
                className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// Reusable Components
const Section = ({ title, children }) => (
  <div className="mb-8">
    <h2 className="text-lg font-semibold text-gray-700 mb-4">{title}</h2>
    {children}
  </div>
);

const InputField = ({ id, label, type = 'text', value, onChange, placeholder, required, note, pattern }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      type={type}
      id={id}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      pattern={pattern}
      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
    />
    {note && <p className="mt-1 text-xs text-gray-500">{note}</p>}
  </div>
);

const SelectField = ({ id, label, value, onChange, options }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <select
      id={id}
      value={value}
      onChange={onChange}
      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
    >
      {options.map((option) => (
        <option key={option} value={option}>{option}</option>
      ))}
    </select>
  </div>
);

export default AddUser;