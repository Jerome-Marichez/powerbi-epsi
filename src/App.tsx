import React from 'react';
import Table from './Table';
import { ParseCSV } from './ParseCSV';
import { useState } from 'react';


function App() {
 
  const [jsonData, setJsonData] = useState<any>(null); 
  const [jsonFiltered, setJsonFiltered] = useState<any[]>([]);

  console.log(jsonData);
  
  return (
    <>
      <ParseCSV onDataLoad={setJsonData}/>
      {jsonData ? 
        <Table jsonData={jsonData} />
      : 
      <p>En attente de données :(</p>
      }
      </>
  );
}

export default App;
