import React from 'react';

const HealthMetrics = ({ patientData }) => {
  // Fallback if data is missing
  const diagnosisList = patientData?.diagnostic_list || [];

  return (
    <div className="bg-white p-4 sm:p-6 rounded-[30px] shadow-sm h-full flex flex-col min-h-[300px]">
      <h2 className="text-xl sm:text-2xl font-bold text-[#072635] mb-4 sm:mb-8">Diagnostic List</h2>
      
      <div className="flex-1 flex flex-col overflow-hidden">
        
        {/* --- Table Header (Desktop Only) --- */}
        {/* hidden sm:grid -> Hides on mobile, shows on tablets/desktop */}
        <div className="hidden sm:grid grid-cols-[1.5fr_2.5fr_1fr] gap-4 bg-[#F6F7F8] p-4 rounded-[24px] mb-3 sticky top-0 z-10">
          <h3 className="font-bold text-sm text-[#072635]">Problem/Diagnosis</h3>
          <h3 className="font-bold text-sm text-[#072635]">Description</h3>
          <h3 className="font-bold text-sm text-[#072635]">Status</h3>
        </div>

        {/* --- Scrollable List Body --- */}
        <div className="overflow-y-auto pr-1 sm:pr-2 max-h-[400px] custom-scrollbar">
            {diagnosisList.length > 0 ? (
              diagnosisList.map((item, index) => (
                <div 
                  key={index} 
                  // Mobile: Flex column (stack). Desktop: Grid row.
                  className="
                    flex flex-col gap-1 p-3 border-b border-gray-100 last:border-0 
                    sm:grid sm:grid-cols-[1.5fr_2.5fr_1fr] sm:gap-4 sm:p-4 sm:items-center
                    hover:bg-[#F6F7F8] transition-colors rounded-lg group
                  "
                >
                    {/* 1. Name & Mobile Status Wrapper */}
                    <div className="flex justify-between items-start sm:block">
                        <div className="font-medium text-[#072635] text-sm sm:text-base">{item.name}</div>
                        
                        {/* Mobile-Only Status Badge (floats right) */}
                        <span className="sm:hidden text-xs font-medium px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full">
                          {item.status}
                        </span>
                    </div>

                    {/* 2. Description */}
                    {/* Mobile: Allow 2 lines (line-clamp-2). Desktop: 1 line (truncate) */}
                    <div className="text-gray-600 text-xs sm:text-sm line-clamp-2 sm:truncate" title={item.description}>
                      {item.description}
                    </div>

                    {/* 3. Desktop-Only Status Column */}
                    <div className="hidden sm:block text-sm text-[#072635]">
                      {item.status}
                    </div>
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