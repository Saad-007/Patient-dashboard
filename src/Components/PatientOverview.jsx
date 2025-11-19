// components/PatientOverview.js
import React from 'react';

const PatientOverview = ({ patientData }) => {
  // Safety check
  if (!patientData) return null;

  return (
    <div className="bg-white rounded-[30px] shadow-sm p-6 lg:p-8 h-full flex flex-col">
      
      {/* --- Profile Picture & Name Section --- */}
      <div className="flex flex-col items-center mb-6 lg:mb-8">
        
        {/* Responsive Image Size: 
            w-32 (128px) on Mobile 
            lg:w-48 (192px) on Desktop 
        */}
        <div className="w-32 h-32 lg:w-48 lg:h-48 rounded-full overflow-hidden mb-4 lg:mb-6 border-4 border-white shadow-md shrink-0">
          {patientData.profile_picture ? (
            <img 
              src={patientData.profile_picture} 
              alt={patientData.name} 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-blue-100 flex items-center justify-center">
              <span className="text-4xl text-blue-600">👤</span>
            </div>
          )}
        </div>
        
        <h3 className="text-xl lg:text-2xl font-bold text-[#072635] text-center">
          {patientData.name}
        </h3>
      </div>

      {/* --- Details Grid --- */}
      {/* flex-1 ensures this section takes available space */}
      <div className="space-y-4 lg:space-y-6 flex-1">
        
        {/* Row 1: DOB */}
        <div className="flex items-center gap-4">
           <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
             <svg className="w-5 h-5 text-[#072635]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
           </div>
           <div className="overflow-hidden">
             <p className="text-xs text-[#072635] capitalize">Date Of Birth</p>
             <p className="text-sm font-bold text-[#072635] truncate">{patientData.date_of_birth}</p>
           </div>
        </div>

        {/* Row 2: Gender */}
        <div className="flex items-center gap-4">
           <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
             <svg className="w-5 h-5 text-[#072635]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg> 
           </div>
           <div>
             <p className="text-xs text-[#072635] capitalize">Gender</p>
             <p className="text-sm font-bold text-[#072635]">{patientData.gender}</p>
           </div>
        </div>

        {/* Row 3: Contact */}
        <div className="flex items-center gap-4">
           <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
             <svg className="w-5 h-5 text-[#072635]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
           </div>
           <div>
             <p className="text-xs text-[#072635] capitalize">Contact Info.</p>
             <p className="text-sm font-bold text-[#072635]">{patientData.phone_number}</p>
           </div>
        </div>

        {/* Row 4: Emergency Contact */}
        <div className="flex items-center gap-4">
           <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
             <svg className="w-5 h-5 text-[#072635]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
           </div>
           <div>
             <p className="text-xs text-[#072635] capitalize">Emergency Contacts</p>
             <p className="text-sm font-bold text-[#072635]">{patientData.emergency_contact}</p>
           </div>
        </div>

        {/* Row 5: Insurance */}
        <div className="flex items-center gap-4">
           <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
             <svg className="w-5 h-5 text-[#072635]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
           </div>
           <div>
             <p className="text-xs text-[#072635] capitalize">Insurance Provider</p>
             <p className="text-sm font-bold text-[#072635]">{patientData.insurance_type}</p>
           </div>
        </div>

      </div>
      
      {/* Show All Information Button */}
      {/* mt-8 mobile, mt-auto desktop pushes it to bottom */}
      <button className="w-full mt-8 lg:mt-auto py-3 bg-[#01F0D0] hover:bg-[#01d0b5] text-[#072635] font-bold rounded-[40px] transition-colors text-sm lg:text-base">
        Show All Information
      </button>

    </div>
  );
};

export default PatientOverview;