// components/Header.js
import React from "react";
import {
  Home,
  Users,
  Calendar,
  MessageSquare,
  CreditCard,
  Settings,
    MoreVertical // <--- Added this import

} from "lucide-react";
import Logo from'../assets/TestLogo.png'
const Header = ({ patientName }) => {
  return (
    <header className="bg-white rounded-4xl shadow-lg border border-gray-100">
      <div className="flex items-center justify-between px-6 py-3">

        {/* LEFT — Logo + Brand */}
        <div className="flex items-center space-x-3">
          <img src={Logo} alt="Tech.Care" className="w-50 h-10" />
        </div>

        {/* CENTER — Navigation */}
        <nav className="flex items-center space-x-2 ">
          
           <a href="#" className="flex items-center gap-2 px-3 py-1.5 rounded-full text-gray-600 hover:text-[#01F0D0] transition-all text-sm font-bold">
          <Home size={18} />
          <span>Overview</span>
        </a>

        {/* Active State (Patients) - Using the teal color from the design */}
        <a href="#" className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#01F0D0] text-[#072635] text-sm font-bold shadow-sm">
          <Users size={18} />
          <span>Patients</span>
        </a>

        <a href="#" className="flex items-center gap-2 px-3 py-1.5 rounded-full text-gray-600 hover:text-[#01F0D0] transition-all text-sm font-bold">
          <Calendar size={18} />
          <span>Schedule</span>
        </a>

        <a href="#" className="flex items-center gap-2 px-3 py-1.5 rounded-full text-gray-600 hover:text-[#01F0D0] transition-all text-sm font-bold">
          <MessageSquare size={18} />
          <span>Message</span>
        </a>

        <a href="#" className="flex items-center gap-2 px-3 py-1.5 rounded-full text-gray-600 hover:text-[#01F0D0] transition-all text-sm font-bold">
          <CreditCard size={18} />
          <span>Transactions</span>
        </a>
        </nav>

          {/* --- RIGHT: Doctor Profile & Settings --- */}
      <div className="flex items-center gap-4">
        
        {/* Doctor Profile Section with Right Border for the Line */}
        <div className="flex items-center gap-3 border-r border-gray-200 pr-4">
          <div className="w-11 h-11 rounded-full overflow-hidden bg-gray-100">
            <img
              src="https://randomuser.me/api/portraits/women/44.jpg" 
              alt="Dr. Jose Simmons"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="hidden lg:block">
            <p className="text-sm font-bold text-[#072635] mb-0.5">Dr. Jose Simmons</p>
            <p className="text-sm text-gray-500">General Practitioner</p>
          </div>
        </div>
        
        {/* Icons */}
        <div className="flex gap-3">
            <button className="text-[#072635] hover:bg-gray-100 p-2 rounded-full transition-colors">
                <Settings size={19} />
            </button>
             <button className="text-[#072635] hover:bg-gray-100 p-2 rounded-full transition-colors">
                 <MoreVertical size={19} />
            </button>
        </div>
      </div>
      </div>

    </header>
  );
};

export default Header;
