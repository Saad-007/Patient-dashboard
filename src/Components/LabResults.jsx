import React from 'react';

const AppointmentHistory = ({ patientData }) => {
  const labResults = patientData?.lab_results || [];

  return (
    <div className="bg-white p-4 sm:p-6 rounded-[30px] shadow-sm h-full flex flex-col">
       <h2 className="text-xl sm:text-2xl font-bold text-[#072635] mb-4 sm:mb-6">Lab Results</h2>
       
       {/* Flex-1 ensures this takes up remaining space, preventing overflow issues */}
       <div className="flex-1 overflow-y-auto pr-1 sm:pr-2 custom-scrollbar max-h-[300px] lg:max-h-none">
         <ul className="space-y-2">
            {labResults.length > 0 ? (
              labResults.map((result, index) => (
                  <li 
                    key={index} 
                    className="flex justify-between items-center p-3 hover:bg-[#F6F7F8] transition-colors rounded-lg cursor-pointer group"
                  >
                      {/* Text Section: Added 'truncate' and 'flex-1' to handle long file names gracefully on mobile */}
                      <span className="text-[#072635] text-sm font-medium flex-1 truncate pr-4">
                        {result}
                      </span>
                      
                      {/* Icon Button: shrink-0 prevents button from being squashed */}
                      <button 
                        className="shrink-0 text-[#072635] p-2 rounded-full hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-[#072635]/20"
                        title="Download Result"
                      >
                          {/* Download Icon SVG */}
                          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M10 1.66663V15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M5 10L10 15L15 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M2.5 18.3333H17.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                      </button>
                  </li>
              ))
            ) : (
               <div className="flex flex-col items-center justify-center h-32 text-gray-400 text-sm">
                  <svg className="w-8 h-8 mb-2 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <p>No lab results available.</p>
               </div>
            )}
         </ul>
       </div>
    </div>
  );
};

export default AppointmentHistory;