import React, { useState, useEffect } from 'react';
import { TableMemorized } from './Table';
import { ParseCSV } from './ParseCSV';
import { Chart } from './Chart';


import './App.css';

function App(): JSX.Element {
  const [jsonData, setJsonData] = useState<any>(null);
  const [jsonFiltered, setJsonFiltered] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (jsonData) {
      // Update jsonFiltered state after jsonData is set
      console.log(jsonData);
      setJsonFiltered(jsonData);
      setLoading(false); // Set loading to false once data is loaded
    }
  }, [jsonData]);

  const handleDataLoad = (data: any) => {
    setJsonData(data);
    // Do not setLoading(false) here, it will be done in the useEffect
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
        <>
          <TableMemorized jsonData={jsonData} filteredJSON={setJsonFiltered} />
          <Chart data={jsonFiltered} />
        </>
      ) : (
        <h2 style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
          Pas de données disponible.
        </h2>
      )}
    </>
  );
}

export default App;
