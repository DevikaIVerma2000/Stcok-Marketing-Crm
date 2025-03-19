import React from 'react';

function LeadsTable() {
  const leadsData = [
    {
      username: 'Select User',
      date: '18-02-2024',
      fullName: 'Baapu',
      phone: '8899788987',
      state: '',
      status: 'Fresh',
      user: 'Not Assigned',
      investment: '',
      segment: '',
      source: 'External',
      agency: 'Lets Talk',
    },
    {
      username: 'Select User',
      date: '18-02-2024',
      fullName: 'Anil Prajapati',
      phone: '8460301718',
      state: '',
      status: 'Fresh',
      user: 'Not Assigned',
      investment: '',
      segment: '',
      source: 'External',
      agency: 'Lets Talk',
    },
    {
      username: 'Select User',
      date: '18-02-2024',
      fullName: 'Yogendra singh',
      phone: '9258026943',
      state: '',
      status: 'Fresh',
      user: 'Not Assigned',
      investment: '',
      segment: '',
      source: 'External',
      agency: 'Lets Talk',
    },
    {
      username: 'Select User',
      date: '18-02-2024',
      fullName: 'Vikas Dutt',
      phone: '9560535595',
      state: '',
      status: 'Fresh',
      user: 'Not Assigned',
      investment: '',
      segment: '',
      source: 'External',
      agency: 'Lets Talk',
    },
    {
      username: 'Select User',
      date: '18-02-2024',
      fullName: '?????? ??????',
      phone: '8076896883',
      state: '',
      status: 'Fresh',
      user: 'Not Assigned',
      investment: '',
      segment: '',
      source: 'External',
      agency: 'Lets Talk',
    },
    {
      username: 'Select User',
      date: '18-02-2024',
      fullName: 'Nitin Ghodeswar',
      phone: '8055345876',
      state: '',
      status: 'Fresh',
      user: 'Not Assigned',
      investment: '',
      segment: '',
      source: 'External',
      agency: 'Lets Talk',
    },
    {
      username: 'Select User',
      date: '18-02-2024',
      fullName: 'Kamlesh Suren',
      phone: '7772935962',
      state: '',
      status: 'Fresh',
      user: 'Not Assigned',
      investment: '',
      segment: '',
      source: 'External',
      agency: 'Lets Talk',
    },
    {
      username: 'Select User',
      date: '18-02-2024',
      fullName: 'Divya',
      phone: '9988787960',
      state: '',
      status: 'Fresh',
      user: 'Not Assigned',
      investment: '',
      segment: '',
      source: 'External',
      agency: 'Lets Talk',
    },
    {
      username: 'Select User',
      date: '18-02-2024',
      fullName: 'Ahtasham Ansari',
      phone: '6399028869',
      state: '',
      status: 'Fresh',
      user: 'Not Assigned',
      investment: '',
      segment: '',
      source: 'External',
      agency: 'Lets Talk',
    },
    {
      username: 'Select User',
      date: '18-02-2024',
      fullName: 'Sawan Mahawer',
      phone: '7339993957',
      state: '',
      status: 'Fresh',
      user: 'Not Assigned',
      investment: '',
      segment: '',
      source: 'External',
      agency: 'Lets Talk',
    },
  ];

  const [showEntries, setShowEntries] = React.useState(10);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [currentPage, setCurrentPage] = React.useState(1);
  const totalEntries = 500;

  return (
    <div className="container mx-auto p-4">
      {/* Assignment Buttons */}
      <div className="flex gap-4 mb-6">
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center">
          Single Assignment
          <span className="ml-2 bg-white text-blue-500 px-2 py-0.5 rounded-full text-sm">16774</span>
        </button>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center">
          Multiple Assignment
          <span className="ml-2 bg-white text-blue-500 px-2 py-0.5 rounded-full text-sm">16774</span>
        </button>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
          Search & Assign
        </button>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
          Reassign Leads
        </button>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
          Reset Leads
        </button>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
          Delete Leads
        </button>
      </div>

      {/* Entries and Search */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <span className="mr-2">Show</span>
          <select
            className="border rounded px-2 py-1"
            value={showEntries}
            onChange={(e) => setShowEntries(Number(e.target.value))}
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
          <span className="ml-2">entries</span>
        </div>
        <div className="flex items-center">
          <span className="mr-2">Search:</span>
          <input
            type="text"
            className="border rounded px-2 py-1"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border">
          <thead>
            <tr className="bg-gray-50">
              <th className="border p-2 text-left">Username</th>
              <th className="border p-2 text-left">Date</th>
              <th className="border p-2 text-left">Full Name</th>
              <th className="border p-2 text-left">Phone</th>
              <th className="border p-2 text-left">State</th>
              <th className="border p-2 text-left">Status</th>
              <th className="border p-2 text-left">User</th>
              <th className="border p-2 text-left">Investment</th>
              <th className="border p-2 text-left">Segment</th>
              <th className="border p-2 text-left">Source</th>
              <th className="border p-2 text-left">Agency</th>
            </tr>
          </thead>
          <tbody>
            {leadsData.map((lead, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className="border p-2">
                  <select className="w-full border rounded px-2 py-1">
                    <option>Select User</option>
                  </select>
                </td>
                <td className="border p-2">{lead.date}</td>
                <td className="border p-2">{lead.fullName}</td>
                <td className="border p-2">{lead.phone}</td>
                <td className="border p-2">{lead.state}</td>
                <td className="border p-2">{lead.status}</td>
                <td className="border p-2">{lead.user}</td>
                <td className="border p-2">{lead.investment}</td>
                <td className="border p-2">{lead.segment}</td>
                <td className="border p-2">{lead.source}</td>
                <td className="border p-2">{lead.agency}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <div>
          Showing 1 to 10 of {totalEntries} entries
        </div>
        <div className="flex gap-1">
          <button className="px-3 py-1 border rounded">Previous</button>
          <button className="px-3 py-1 bg-blue-500 text-white rounded">1</button>
          <button className="px-3 py-1 border rounded">2</button>
          <button className="px-3 py-1 border rounded">3</button>
          <button className="px-3 py-1 border rounded">4</button>
          <button className="px-3 py-1 border rounded">5</button>
          <span className="px-2">...</span>
          <button className="px-3 py-1 border rounded">50</button>
          <button className="px-3 py-1 border rounded">Next</button>
        </div>
      </div>
    </div>
  );
}

export default LeadsTable;