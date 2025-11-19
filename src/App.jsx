// App.js
import React, { useState } from "react";
import Sidebar from "./Components/Sidebar";
import Header from "./Components/Header";
import PatientOverview from "./Components/PatientOverview";
import HealthMetrics from "./Components/DiagnosticList";
import AppointmentHistory from "./Components/LabResults";
import BloodPressureChart from "./Components/DiagnosisHistory";

function App() {
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [hasPatients, setHasPatients] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handlePatientSelect = (patient) => {
    console.log("Selected patient:", patient);
    setSelectedPatient(patient);
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 flex flex-col relative">
      
      {/* --- Mobile Menu Overlay --- */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/40 z-40 lg:hidden backdrop-blur-sm transition-opacity"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* --- Header --- */}
      <div className="px-4 py-3 lg:px-6 lg:py-4 flex items-center gap-4">
        <button 
          onClick={() => setIsMobileMenuOpen(true)}
          className="p-2 rounded-lg bg-white shadow border border-gray-200 text-gray-600 lg:hidden hover:bg-gray-50 active:bg-gray-100"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <div className="flex-1">
           <Header patient={selectedPatient} />
        </div>
      </div>

      {/* --- Body Layout --- */}
      <div className="flex flex-1 min-h-0 p-4 lg:p-6 gap-6 relative">
        
        {/* --- Sidebar --- */}
        <div className={`
            fixed inset-y-0 left-0 z-50 w-80 bg-white/95 backdrop-blur-sm shadow-2xl border-r border-gray-100
            transform transition-transform duration-300 ease-in-out
            lg:relative lg:translate-x-0 lg:shadow-xl lg:rounded-2xl lg:border lg:flex lg:flex-col lg:h-[calc(100vh-140px)] lg:overflow-hidden
            ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
        `}>
            <div className="flex justify-end p-4 lg:hidden">
              <button 
                onClick={() => setIsMobileMenuOpen(false)} 
                className="p-2 text-gray-500 hover:bg-gray-100 rounded-full"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="h-full overflow-y-auto">
               <Sidebar onPatientSelect={handlePatientSelect} />
            </div>
        </div>

        {/* --- Main Content --- */}
        <div className="flex-1 flex flex-col min-h-0 gap-6 w-full max-w-full">
          {selectedPatient ? (
            <>
              {/* Row 1 */}
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                
                {/* 1. BloodPressureChart 
                   Mobile: order-2 (Appears second)
                   Desktop (xl): order-1 (Appears first)
                */}
                <div className="order-2 xl:order-1 xl:col-span-2 rounded-2xl shadow-lg border border-gray-100/80 bg-white/95 backdrop-blur-sm overflow-hidden min-h-[300px]">
                  <BloodPressureChart patientData={selectedPatient} />
                </div>

                {/* 2. PatientOverview 
                   Mobile: order-1 (Appears first)
                   Desktop (xl): order-2 (Appears second)
                */}
                <div className="order-1 xl:order-2 rounded-2xl shadow-lg border border-gray-100/80 bg-white/95 backdrop-blur-sm overflow-hidden min-h-[300px]">
                  <PatientOverview patientData={selectedPatient} />
                </div>
              </div>

              {/* Row 2 */}
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                <div className="xl:col-span-2 rounded-2xl shadow-lg border border-gray-100/80 bg-white/95 backdrop-blur-sm overflow-hidden min-h-[300px]">
                  <HealthMetrics patientData={selectedPatient} />
                </div>
                <div className="rounded-2xl shadow-lg border border-gray-100/80 bg-white/95 backdrop-blur-sm overflow-hidden min-h-[300px]">
                  <AppointmentHistory patientData={selectedPatient} />
                </div>
              </div>
            </>
          ) : (
            /* No Patient Selected View */
            <div className="flex-1 flex items-center justify-center p-4 lg:p-8">
              <div className="text-center w-full max-w-lg mx-auto p-8 lg:p-10 bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl border border-gray-100/80">
                <div className="text-6xl mb-8">👨‍⚕️</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  {hasPatients
                    ? "Welcome to Patient Dashboard"
                    : "No Patients Available"}
                </h3>
                <p className="text-gray-600 leading-relaxed text-lg mb-6">
                  {hasPatients
                    ? "Select a patient from the sidebar to begin reviewing their medical records."
                    : "No patients found. Please try again later."}
                </p>
                <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto"></div>
                <p className="mt-6 text-sm text-blue-500 font-medium lg:hidden">
                   Tap the menu icon above to view patients
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;