// components/Header.js
import React from "react";
import {
  Home,
  Users,
  Calendar,
  MessageSquare,
  CreditCard,
  Settings,
  MoreVertical
} from "lucide-react";
import Logo from '../assets/TestLogo.png';

const Header = () => {
  return (
    <header className="bg-white rounded-[30px] shadow-lg border border-gray-100 w-full">
      <div className="flex items-center justify-between px-4 py-3 lg:px-6 lg:py-3">

        {/* --- LEFT: Logo --- */}
        {/* shrink-0 prevents the logo from getting squashed */}
        <div className="flex items-center shrink-0">
          <img 
            src={Logo} 
            alt="Tech.Care" 
            // Adjusted width: smaller on mobile (w-32), larger on desktop
            className="w-32 md:w-40 lg:w-48 h-auto object-contain" 
          />
        </div>

        {/* --- CENTER: Navigation --- */}
        {/* hidden xl:flex -> Hidden on Mobile/Tablet/Laptop, Visible only on Extra Large screens 
            This prevents the header from breaking when the sidebar is open. */}
        <nav className="hidden xl:flex items-center space-x-1 2xl:space-x-2">
          
          <a href="#" className="flex items-center gap-2 px-3 py-2 rounded-full text-gray-600 hover:text-[#01F0D0] transition-all text-sm font-bold whitespace-nowrap">
            <Home size={18} />
            <span>Overview</span>
          </a>

          {/* Active State */}
          <a href="#" className="flex items-center gap-2 px-3 py-2 rounded-full bg-[#01F0D0] text-[#072635] text-sm font-bold shadow-sm whitespace-nowrap">
            <Users size={18} />
            <span>Patients</span>
          </a>

          <a href="#" className="flex items-center gap-2 px-3 py-2 rounded-full text-gray-600 hover:text-[#01F0D0] transition-all text-sm font-bold whitespace-nowrap">
            <Calendar size={18} />
            <span>Schedule</span>
          </a>

          <a href="#" className="flex items-center gap-2 px-3 py-2 rounded-full text-gray-600 hover:text-[#01F0D0] transition-all text-sm font-bold whitespace-nowrap">
            <MessageSquare size={18} />
            <span>Message</span>
          </a>

          <a href="#" className="flex items-center gap-2 px-3 py-2 rounded-full text-gray-600 hover:text-[#01F0D0] transition-all text-sm font-bold whitespace-nowrap">
            <CreditCard size={18} />
            <span>Transactions</span>
          </a>
        </nav>

        {/* --- RIGHT: Doctor Profile & Settings --- */}
        <div className="flex items-center gap-2 md:gap-4 shrink-0">
          
          {/* Doctor Profile */}
          <div className="flex items-center gap-3 border-r border-gray-200 pr-2 md:pr-4">
            {/* Avatar */}
            <div className="w-8 h-8 md:w-10 md:h-10 lg:w-11 lg:h-11 rounded-full overflow-hidden bg-gray-100 shrink-0">
              <img
                src="https://randomuser.me/api/portraits/women/44.jpg" 
                alt="Dr. Jose Simmons"
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Text Info - Hidden on Mobile/Tablet, Visible on Large screens */}
            <div className="hidden lg:block whitespace-nowrap">
              <p className="text-sm font-bold text-[#072635] mb-0.5">Dr. Jose Simmons</p>
              <p className="text-xs text-gray-500">General Practitioner</p>
            </div>
          </div>
          
          {/* Icons */}
          <div className="flex gap-1 md:gap-2">
            <button className="text-[#072635] hover:bg-gray-100 p-1.5 md:p-2 rounded-full transition-colors">
              <Settings size={18} className="md:w-[19px] md:h-[19px]" />
            </button>
            <button className="text-[#072635] hover:bg-gray-100 p-1.5 md:p-2 rounded-full transition-colors">
              <MoreVertical size={18} className="md:w-[19px] md:h-[19px]" />
            </button>
          </div>
        </div>
        
      </div>
    </header>
  );
};

export default Header;