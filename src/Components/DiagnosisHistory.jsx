// Components/DiagnosisHistory.js
import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

// Ensure these paths are correct
import respiratoryIcon from "../assets/respiratory.png";
import temperatureIcon from '../assets/temperature.png';
import heartRateIcon from '../assets/HeartBP.png';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const DiagnosisHistory = ({ patientData }) => {
  // 1. Safety Check
  if (!patientData || !patientData.diagnosis_history) {
    return (
      <div className="p-6 bg-white rounded-[30px] shadow-sm flex items-center justify-center h-full text-gray-400">
        Select a patient to view history.
      </div>
    );
  }

  // 2. Prepare Data
  const history = patientData.diagnosis_history;
  const recentHistory = history.slice(0, 6).reverse(); 
  const latest = history[0]; 

  // --- Chart Data Configuration ---
  const chartData = {
    labels: recentHistory.map(entry => `${entry.month.slice(0, 3)}, ${entry.year}`),
    datasets: [
      {
        label: 'Systolic',
        data: recentHistory.map(entry => entry.blood_pressure.systolic.value),
        borderColor: '#E66FD2',
        backgroundColor: '#E66FD2',
        tension: 0.4,
        pointRadius: 6,
        pointBackgroundColor: '#E66FD2',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
      },
      {
        label: 'Diastolic',
        data: recentHistory.map(entry => entry.blood_pressure.diastolic.value),
        borderColor: '#8C6FE6',
        backgroundColor: '#8C6FE6',
        tension: 0.4,
        pointRadius: 6,
        pointBackgroundColor: '#8C6FE6',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: { display: false }
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: '#072635', font: { size: 11 } } // Slightly smaller font for mobile x-axis
      },
      y: {
        beginAtZero: false,
        min: 60,
        max: 180,
        grid: { color: '#CBC8D4' },
        ticks: { stepSize: 20, color: '#072635' }
      }
    }
  };

  // --- Bottom Cards Data Configuration ---
  const statsData = [
    {
      title: "Respiratory Rate",
      value: `${latest.respiratory_rate.value} bpm`,
      status: latest.respiratory_rate.levels,
      bgColor: "bg-[#E0F3FA]",
      icon: respiratoryIcon,
    },
    {
      title: "Temperature",
      value: `${latest.temperature.value}°F`,
      status: latest.temperature.levels,
      bgColor: "bg-[#FFE6E9]",
      icon: temperatureIcon,
    },
    {
      title: "Heart Rate",
      value: `${latest.heart_rate.value} bpm`,
      status: latest.heart_rate.levels,
      isWarning: latest.heart_rate.levels.toLowerCase() !== 'normal',
      bgColor: "bg-[#FFE6F1]",
      icon: heartRateIcon,
    }
  ];

  return (
    <div className="bg-white p-4 sm:p-6 rounded-[20px] sm:rounded-[30px] w-full shadow-sm h-full flex flex-col">
      <h2 className="text-lg sm:text-2xl font-bold text-[#072635] mb-4 sm:mb-8">Diagnosis History</h2>
      
      {/* --- Top Section: Blood Pressure Chart --- */}
      <div className="bg-[#F4F0FE] p-4 sm:p-6 rounded-2xl mb-6 flex flex-col lg:flex-row gap-6 lg:gap-8">
        
        {/* Left Side: Chart */}
        <div className="flex-1 flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-base sm:text-lg font-bold text-[#072635]">Blood Pressure</h2>
            <div className="flex gap-4 sm:hidden">
               {/* Mobile Legend (Simplified) */}
               <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-[#E66FD2]"></div><span className="text-xs">Sys</span></div>
               <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-[#8C6FE6]"></div><span className="text-xs">Dia</span></div>
            </div>
          </div>
          
          {/* Chart Container - Min height ensures it doesn't squash on mobile */}
          <div className="relative w-full min-h-[200px] sm:min-h-[250px] lg:h-auto flex-1">
            <Line data={chartData} options={chartOptions} />
          </div>
        </div>

        {/* Right Side: Stats (Desktop Legend) */}
        <div className="w-full lg:w-auto lg:min-w-[200px] flex flex-row lg:flex-col gap-4 justify-between lg:justify-start">
          
          {/* Systolic */}
          <div className="flex-1 lg:flex-none">
            <div className="flex items-center gap-2 mb-1">
              <span className="w-3 h-3 rounded-full bg-[#E66FD2]"></span>
              <span className="text-sm font-bold text-[#072635]">Systolic</span>
            </div>
            <div className="text-xl sm:text-2xl font-bold text-[#072635] mb-1">
              {latest.blood_pressure.systolic.value}
            </div>
            <div className="flex items-center text-xs sm:text-sm text-[#072635]">
              {latest.blood_pressure.systolic.levels === 'Higher than Average' ? (
                  <span className="mr-2">▲</span>
              ) : latest.blood_pressure.systolic.levels === 'Lower than Average' ? (
                  <span className="mr-2">▼</span>
              ) : (
                  <span className="mr-2">-</span>
              )}
              <span>{latest.blood_pressure.systolic.levels}</span>
            </div>
          </div>

          {/* Divider - Hidden on mobile row view, visible on desktop column view */}
          <div className="hidden lg:block border-t border-gray-300 my-2"></div>
          {/* Mobile Vertical Divider */}
          <div className="block lg:hidden border-r border-gray-300 mx-2"></div>

          {/* Diastolic */}
          <div className="flex-1 lg:flex-none">
            <div className="flex items-center gap-2 mb-1">
              <span className="w-3 h-3 rounded-full bg-[#8C6FE6]"></span>
              <span className="text-sm font-bold text-[#072635]">Diastolic</span>
            </div>
            <div className="text-xl sm:text-2xl font-bold text-[#072635] mb-1">
              {latest.blood_pressure.diastolic.value}
            </div>
            <div className="flex items-center text-xs sm:text-sm text-[#072635]">
               {latest.blood_pressure.diastolic.levels === 'Higher than Average' ? (
                  <span className="mr-2">▲</span>
              ) : latest.blood_pressure.diastolic.levels === 'Lower than Average' ? (
                  <span className="mr-2">▼</span>
              ) : (
                  <span className="mr-2">-</span>
              )}
              <span>{latest.blood_pressure.diastolic.levels}</span>
            </div>
          </div>
        </div>
      </div>

      {/* --- Bottom Section: 3 Stat Cards --- */}
      {/* Grid adapts from 1 column (mobile) to 2 (tablet) to 3 (desktop) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-auto">
        {statsData.map((stat, index) => (
          <div 
            key={index} 
            className={`${stat.bgColor} rounded-2xl p-4 flex flex-col justify-between`}
          >
            {/* Icon container scales from w-16 to w-24 */}
            <div className="bg-white w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-full flex items-center justify-center mb-3 sm:mb-4 shadow-sm">
              <img 
                src={stat.icon} 
                alt={stat.title} 
                className="w-8 h-8 sm:w-10 sm:h-10 object-contain" 
              />
            </div>
            
            <div>
              <h3 className="text-gray-600 font-medium text-sm sm:text-base mb-1">{stat.title}</h3>
              {/* Text size adapts */}
              <p className="text-[#072635] text-2xl sm:text-3xl font-extrabold mb-2 sm:mb-4">{stat.value}</p>
            </div>
            
            <div className="flex items-center text-xs sm:text-sm text-[#072635] mt-auto">
              {stat.isWarning && (
                <svg className="w-4 h-4 mr-2 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              )}
              <span>{stat.status}</span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default DiagnosisHistory;