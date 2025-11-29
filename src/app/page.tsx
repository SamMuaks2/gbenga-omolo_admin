'use client'

import React, { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi"; // Hamburger & close icons
import DashboardTab from "./tabs/DashboardTab";
import BooksTab from "./tabs/BooksTab";
import DevotionalsTab from "./tabs/DevotionalsTab";
import BlogsTab from "./tabs/BlogsTab";
import AnalyticsTab from "./tabs/AnalyticsTab";

export default function AdminPanel() {
  const [selectedTab, setSelectedTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderTab = () => {
    switch (selectedTab) {
      case "dashboard": return <DashboardTab />;
      case "books": return <BooksTab />;
      case "devotionals": return <DevotionalsTab />;
      case "blogs": return <BlogsTab />;
      case "analytics": return <AnalyticsTab />;
      default: return <DashboardTab />;
    }
  }

  return (
    <div className="min-h-screen bg-[#6b7280] p-6">
      {/* Header */}
      <header className="max-w-7xl mx-auto flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-50">Author Admin Panel</h1>
        <div className="flex items-center gap-3">
          {/* Mobile Hamburger */}
          <button
            className="md:hidden p-2 rounded-lg bg-gray-80 hover:bg-gray-200 transition"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>

          <button className="hidden md:inline px-4 py-2 bg-white text-gray-700 rounded-lg shadow hover:bg-gray-100 transition">
            Settings
          </button>
          <button className="hidden md:inline px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition">
            Logout
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto grid grid-cols-12 gap-6">
        {/* Sidebar */}
        <aside
          className={`
            col-span-3 bg-[#6366f1] rounded-2xl p-4 shadow h-fit
            md:sticky md:top-6
            fixed top-0 left-0 h-full z-50 transform
            md:transform-none md:relative md:col-span-3
            transition-transform duration-300
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          `}
        >
          <nav className="flex flex-col gap-2 mt-16 md:mt-0">
            {["dashboard", "books", "devotionals", "blogs", "analytics"].map(tab => (
              <button
                key={tab}
                onClick={() => {
                  setSelectedTab(tab);
                  setSidebarOpen(false);
                }}
                className={`
                  text-left p-3 rounded-lg font-medium 
                  transition 
                  ${selectedTab === tab
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-[#111827] hover:bg-gray-100'}
                `}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </nav>
        </aside>

        {/* Overlay for mobile when sidebar is open */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black opacity-30 z-40 md:hidden"
            onClick={() => setSidebarOpen(false)}
          ></div>
        )}

        {/* Main Content */}
        <main className="col-span-12 md:col-span-9 bg-[#6366f1] rounded-2xl p-6 shadow min-h-[500px]">
          {renderTab()}
        </main>
      </div>
    </div>
  )
}
