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

// Make sure these paths match your project structure
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
  // 1. Safety Check: If no patient is selected yet, show nothing or a loading state
  if (!patientData || !patientData.diagnosis_history) {
    return <div className="p-6 bg-white rounded-[30px] shadow-sm">Select a patient to view history.</div>;
  }

  // 2. Prepare Data
  // The API usually returns history with the most recent first. 
  // We take the first 6 items, then reverse them so the chart goes from Oldest -> Newest (Left -> Right)
  const history = patientData.diagnosis_history;
  const recentHistory = history.slice(0, 6).reverse(); 
  const latest = history[0]; // The most recent month for the stats cards

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
        ticks: { color: '#072635', font: { size: 12 } }
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
      icon: <img src={respiratoryIcon} alt="respiratory" className="w-10 h-10" />,
    },
    {
      title: "Temperature",
      value: `${latest.temperature.value}°F`,
      status: latest.temperature.levels,
      bgColor: "bg-[#FFE6E9]",
      icon: <img src={temperatureIcon} alt="temperature" className="w-10 h-10" />,
    },
    {
      title: "Heart Rate",
      value: `${latest.heart_rate.value} bpm`,
      status: latest.heart_rate.levels,
      isWarning: latest.heart_rate.levels.toLowerCase() !== 'normal', // Simple logic to show warning icon
      bgColor: "bg-[#FFE6F1]",
      icon: <img src={heartRateIcon} alt="heart rate" className="w-10 h-10" />,
    }
  ];

  return (
    <div className="bg-white p-6 rounded-[30px] w-full shadow-sm h-full">
      <h2 className="text-2xl font-bold text-[#072635] mb-8">Diagnosis History</h2>
      
      {/* --- Top Section: Blood Pressure Chart --- */}
      <div className="bg-[#F4F0FE] p-6 rounded-2xl mb-6">
        
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold text-[#072635]">Blood Pressure</h2>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Chart Graphic */}
          <div className="flex-1 h-64 lg:h-auto">
            <Line data={chartData} options={chartOptions} />
          </div>

          {/* Chart Legend/Stats (Current Latest Data) */}
          <div className="w-full lg:w-1/3 flex flex-col gap-4">
            
            {/* Systolic */}
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-3 h-3 rounded-full bg-[#E66FD2]"></span>
                <span className="text-sm font-bold text-[#072635]">Systolic</span>
              </div>
              <div className="text-2xl font-bold text-[#072635] mb-1">
                {latest.blood_pressure.systolic.value}
              </div>
              <div className="flex items-center text-sm text-[#072635]">
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

            {/* Divider */}
            <div className="border-t border-gray-300 my-2"></div>

            {/* Diastolic */}
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-3 h-3 rounded-full bg-[#8C6FE6]"></span>
                <span className="text-sm font-bold text-[#072635]">Diastolic</span>
              </div>
              <div className="text-2xl font-bold text-[#072635] mb-1">
                {latest.blood_pressure.diastolic.value}
              </div>
              <div className="flex items-center text-sm text-[#072635]">
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
      </div>

      {/* --- Bottom Section: 3 Stat Cards --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {statsData.map((stat, index) => (
          <div 
            key={index} 
            className={`${stat.bgColor} rounded-2xl p-4 flex flex-col`}
          >
            <div className="bg-white w-24 h-24 rounded-full flex items-center justify-center mb-4 shadow-sm">
              {stat.icon}
            </div>
            <h3 className="text-gray-600 font-medium text-base mb-1">{stat.title}</h3>
            <p className="text-[#072635] text-3xl font-extrabold mb-4">{stat.value}</p>
            <div className="flex items-center text-sm text-[#072635] mt-auto">
              {stat.isWarning && (
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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