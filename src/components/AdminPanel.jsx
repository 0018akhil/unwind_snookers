import { useState } from 'react';

function AdminPanel({ tables, toggleTableStatus, setIsAdmin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === 'sandy' && password === 'sandy') {
      setIsLoggedIn(true);
    } else {
      alert('Invalid credentials');
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="max-w-md mx-auto">
        <h2 className="text-2xl font-semibold text-center mb-6">Admin Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
          />
          <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
            Login
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-semibold text-center">Admin Panel</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {tables.map(table => (
          <div key={table.id} className={`p-6 rounded-lg shadow-md ${table.available ? 'bg-green-100' : 'bg-red-100'}`}>
            <h3 className="text-xl font-semibold mb-2">Table {table.id}</h3>
            <p className={`text-lg ${table.available ? 'text-green-600' : 'text-red-600'}`}>
              {table.available ? 'Available' : 'Occupied'}
            </p>
            <button
              onClick={() => toggleTableStatus(table.doc_id)}
              className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Toggle Status
            </button>
          </div>
        ))}
      </div>
      <button
        onClick={() => setIsAdmin(false)}
        className="mt-8 bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Back to Customer View
      </button>
    </div>
  );
}

export default AdminPanel;