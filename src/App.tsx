import React, { useState, useRef} from 'react';
import { TableMemorized } from './Table';
import { ParseCSV } from './ParseCSV';
import './App.css'; // Import the loader CSS


function App() {
  const [jsonData, setJsonData] = useState<any>(null);
  const [jsonFiltered, setJsonFiltered] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const ref = useRef(); 

  console.log(jsonData);

  const handleDataLoad = (data: any) => {
    setJsonData(data);
    setLoading(false); // Set loading to false once data is loaded
  };

  return (
    <>
      <ParseCSV onDataLoad={handleDataLoad} />
      {loading ? (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: "20px", margin: "20px" }}>
          <h3>En attente de données</h3>
          <div className="loader"></div>
        </div>
      ) : jsonData ? (
          <TableMemorized jsonData={jsonData}/>
      ) : (
        <h2 style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
          Pas de données disponible.
        </h2>
      )}
    </>
  );
}

export default App;
