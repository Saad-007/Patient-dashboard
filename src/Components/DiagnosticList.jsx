import React from 'react';

const HealthMetrics = ({ patientData }) => {
  // Fallback if data is missing
  const diagnosisList = patientData?.diagnostic_list || [];

  return (
    <div className="bg-white p-6 rounded-[30px] shadow-sm h-full flex flex-col">
      <h2 className="text-2xl font-bold text-[#072635] mb-8">Diagnostic List</h2>
      
      <div className="flex-1 flex flex-col overflow-hidden">
        
        {/* Table Header */}
        <div className="grid grid-cols-[1.5fr_2.5fr_1fr] gap-4 bg-[#F6F7F8] p-4 rounded-[24px] mb-3 sticky top-0">
          <h3 className="font-bold text-sm text-[#072635]">Problem/Diagnosis</h3>
          <h3 className="font-bold text-sm text-[#072635]">Description</h3>
          <h3 className="font-bold text-sm text-[#072635]">Status</h3>
        </div>

        {/* Scrollable List Body */}
        <div className="overflow-y-auto pr-2 max-h-[200px] custom-scrollbar">
            {diagnosisList.length > 0 ? (
              diagnosisList.map((item, index) => (
                <div 
                  key={index} 
                  className="grid grid-cols-[1.5fr_2.5fr_1fr] gap-4 p-4 border-b border-gray-100 last:border-0 text-sm text-[#072635] hover:bg-[#F6F7F8] transition-colors rounded-lg"
                >
                    <div className="font-medium">{item.name}</div>
                    <div className="text-gray-600 truncate" title={item.description}>{item.description}</div>
                    <div>{item.status}</div>
                </div>
              ))
            ) : (
              <div className="p-4 text-center text-gray-500 text-sm">No diagnostic records found.</div>
            )}
        </div>

      </div>
    </div>
  );
};

export default HealthMetrics;