import React, { useState } from 'react';

const CommunitySidebar = ({ onCreateClick }) => {
  const [isHovered, setIsHovered] = useState(null);

  const menuItems = [
    { id: 'home', label: 'Home', icon: '🏠' },
    { id: 'my-communities', label: 'My Communities', icon: '👥' },
    { id: 'explore', label: 'Explore', icon: '🔍' },
    { id: 'create', label: 'Create Community', icon: '➕' },
  ];

  return (
    <div className="w-64 bg-gray-900 text-gray-100 flex flex-col h-screen">
      {/* Header */}
      <div className="p-4 border-b border-gray-800">
        <h2 className="text-xl font-bold">Communities</h2>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-3 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onMouseEnter={() => setIsHovered(item.id)}
            onMouseLeave={() => setIsHovered(null)}
            className={`w-full flex items-center px-3 py-2 rounded-lg transition-all duration-200 
              ${isHovered === item.id 
                ? 'bg-gray-700 text-white' 
                : 'text-gray-300 hover:bg-gray-800 hover:text-white'}`}
          >
            <span className="text-xl mr-3">{item.icon}</span>
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
        <button
          onClick={onCreateClick}
          className="w-full flex items-center px-3 py-2 rounded-lg transition-all duration-200 
            text-gray-300 hover:bg-gray-800 hover:text-white"
        >
{/* <span className="text-xl mr-3">➕</span>
          <span className="font-medium">Create Community</span>*/}            
        </button>
      </nav>

      {/* User Profile Section */}
      <div className="p-4 border-t border-gray-800 bg-gray-800">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center">
            👤
          </div>
          <div className="ml-3">
            <div className="text-sm font-medium">Username</div>
            <div className="text-xs text-gray-400">#user123</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunitySidebar; 