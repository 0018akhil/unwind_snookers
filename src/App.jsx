import { useEffect, useState } from 'react';
import Header from './components/Header';
import TableStatus from './components/TableStatus';
import AdminPanel from './components/AdminPanel';
import Footer from './components/Footer';
import db from './lib/firebase';
import { collection, onSnapshot, doc, updateDoc, getDoc } from 'firebase/firestore';

function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [tables, setTables] = useState([]);

  useEffect(() => {
    const tablesCollection = collection(db, 'table_availability');

    const unsubscribe = onSnapshot(tablesCollection, (snapshot) => {
      const tablesData = snapshot.docs.map(doc => ({...doc.data(), doc_id: doc.id}));
      setTables(tablesData);
    });

    return () => unsubscribe();
  }, []);

  const toggleTableStatus = async (id) => {
    try {
      const tableRef = doc(db, 'table_availability', id);
      const tableSnapshot = await getDoc(tableRef);

      if (tableSnapshot.exists()) {
        const currentStatus = tableSnapshot.data().available;
        const newStatus = !currentStatus;

        await updateDoc(tableRef, {
          available: newStatus
        });
      } else {
        console.log('Table does not exist');
      }
    } catch (error) {
      console.error('Error updating table status:', error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        {isAdmin ? (
          <AdminPanel tables={tables} toggleTableStatus={toggleTableStatus} setIsAdmin={setIsAdmin} />
        ) : (
          <TableStatus tables={tables} setIsAdmin={setIsAdmin} />
        )}
      </main>
      <Footer />
    </div>
  );
}

export default App;