import React from 'react';

const AppointmentHistory = ({ patientData }) => {
  const labResults = patientData?.lab_results || [];

  return (
    <div className="bg-white p-6 rounded-[30px] shadow-sm h-full flex flex-col">
       <h2 className="text-2xl font-bold text-[#072635] mb-6">Lab Results</h2>
       
       <div className="flex-1 overflow-y-auto pr-2 max-h-[200px] custom-scrollbar">
         <ul className="space-y-2">
            {labResults.length > 0 ? (
              labResults.map((result, index) => (
                  <li 
                    key={index} 
                    className="flex justify-between items-center p-3 hover:bg-[#F6F7F8] transition-colors rounded-lg cursor-pointer group"
                  >
                      <span className="text-[#072635] text-sm font-medium">{result}</span>
                      
                      <button className="text-[#072635] p-2 rounded-full hover:bg-gray-200 transition-colors">
                          {/* Download Icon SVG */}
                          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M10 1.66663V15" stroke="#072635" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M5 10L10 15L15 10" stroke="#072635" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M2.5 18.3333H17.5" stroke="#072635" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                      </button>
                  </li>
              ))
            ) : (
               <div className="p-4 text-center text-gray-500 text-sm">No lab results available.</div>
            )}
         </ul>
       </div>
    </div>
  );
};

export default AppointmentHistory;