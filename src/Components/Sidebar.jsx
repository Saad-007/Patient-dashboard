import React, { useState, useEffect } from 'react';

// custom scrollbar imports
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import "overlayscrollbars/overlayscrollbars.css";

import moreIcon from '../assets/more_horiz.png';

const Sidebar = ({ onPatientSelect }) => {
  const [patients, setPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedPatientName, setSelectedPatientName] = useState('');

  useEffect(() => {
    const fetchAllPatients = async () => {
      try {
        const username = 'coalition';
        const password = 'skills-test';
        const basicAuth = btoa(`${username}:${password}`);

        const response = await fetch(
          'https://fedskillstest.coalitiontechnologies.workers.dev',
          {
            headers: {
              Authorization: `Basic ${basicAuth}`,
            },
          }
        );

        if (!response.ok) throw new Error(`HTTP ${response.status}`);

        const data = await response.json();

        setPatients(data);
        setFilteredPatients(data);

        setTimeout(() => {
          const jessica = data.find((p) => p.name?.toLowerCase().includes('jessica'));
          const firstPatient = jessica || data[0];
          onPatientSelect?.(firstPatient);
          setSelectedPatientName(firstPatient.name);
        }, 0);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAllPatients();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredPatients(patients);
    } else {
      const filtered = patients.filter((patient) =>
        patient.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.gender?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.age?.toString().includes(searchTerm)
      );
      setFilteredPatients(filtered);
    }
  }, [searchTerm, patients]);

  const handlePatientClick = (patient) => {
    setSelectedPatientName(patient.name);
    onPatientSelect?.(patient);
  };

  const getInitials = (name) =>
    name
      ?.split(' ')
      .map((w) => w[0])
      .join('')
      .slice(0, 2)
      .toUpperCase() || '??';

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (isSearchOpen) setSearchTerm('');
  };

  if (loading) {
    return (
      <div className="w-full bg-white flex flex-col h-full">
        <div className="p-6 flex items-center justify-between">
          <h3 className="text-2xl font-bold text-[#072635]">Patients</h3>
        </div>
        <div className="flex-1 p-6 flex items-center justify-center">
          <div className="text-center space-y-3">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#01F0D0] mx-auto"></div>
            <p className="text-sm font-medium text-gray-700">Loading patients</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-white">
      {/* header */}
      <div className="p-6 flex-shrink-0">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-2xl font-bold text-[#072635]">Patients</h3>
          <button
            onClick={toggleSearch}
            className="text-[#072635] hover:bg-gray-100 p-2 rounded-full"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>

        {isSearchOpen && (
          <div className="mb-4 animate-fade-in">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                autoFocus
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="w-4 h-4 text-gray-400" fill="none"
                  stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ⭐ CUSTOM SCROLLBAR AREA ⭐ */}
      <OverlayScrollbarsComponent
        options={{
          scrollbars: {
            theme: "os-theme-dark",
            autoHide: "scroll",
            clickScroll: true,
            visibility: "visible",
          }
        }}
        className="flex-1 min-h-0"
      >

        {/* ⭐ Wrap list for padding inside scroll area ⭐ */}
        <div className="pt-6 pb-6 space-y-1">
          {filteredPatients.map((patient, i) => {
            const isActive = patient.name === selectedPatientName;

            return (
              <div
                key={i}
                onClick={() => handlePatientClick(patient)}
                className={`flex items-center p-4 cursor-pointer transition
                  ${isActive ? "bg-[#D8FCF7]" : "hover:bg-gray-50"}
                `}
              >
                <div className="w-12 h-12 rounded-full bg-gray-100 overflow-hidden flex items-center justify-center mr-4">
                  {patient.profile_picture ? (
                    <img src={patient.profile_picture} className="w-full h-full" />
                  ) : (
                    <span className="text-sm font-bold text-gray-600">
                      {getInitials(patient.name)}
                    </span>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-[#072635] truncate">
                    {patient.name}
                  </p>
                  <p className="text-sm text-gray-500 truncate">
                    {patient.gender}, {patient.age}
                  </p>
                </div>

                <button className="p-2 hover:bg-gray-200 rounded-full">
                  <img src={moreIcon} className="w-5" />
                </button>
              </div>
            );
          })}
        </div>

      </OverlayScrollbarsComponent>
    </div>
  );
};

export default Sidebar;
