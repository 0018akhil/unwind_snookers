function TableStatus({ tables, setIsAdmin }) {
  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-semibold text-center">Table Availability</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {tables.map(table => (
          <div key={table.id} className={`p-6 rounded-lg shadow-md ${table.available ? 'bg-green-100' : 'bg-red-100'}`}>
            <h3 className="text-xl font-semibold mb-2">Table {table.id}</h3>
            <p className={`text-lg ${table.available ? 'text-green-600' : 'text-red-600'}`}>
              {table.available ? 'Available' : 'Occupied'}
            </p>
          </div>
        ))}
      </div>
      <button
        onClick={() => setIsAdmin(true)}
        className="mt-8 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Admin Login
      </button>
    </div>
  );
}

export default TableStatus;