import React from 'react';
import { Link } from 'react-router-dom';

const GroupCard = ({ community }) => {
  // Generate a random pastel background color for each card
  const generatePastelColor = () => {
    const hue = Math.floor(Math.random() * 360);
    return `hsl(${hue}, 70%, 95%)`;
  };

  return (
    <Link to={`/community/${community.id}`}>
      <div 
        className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1"
      >
        {/* Card Header with random pastel background */}
        <div 
          className="h-24 p-4"
          style={{ backgroundColor: generatePastelColor() }}
        >
          <div className="text-4xl font-bold opacity-30">#</div>
        </div>
        
        {/* Card Content */}
        <div className="p-5">
          <h3 className="text-xl font-bold text-gray-800 mb-2">
            {community.name}
          </h3>
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {community.description}
          </p>
          
          {/* Card Footer */}
          <div className="flex items-center justify-between text-sm text-gray-500 border-t pt-4">
            <div className="flex items-center">
              <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center">
                👤
              </div>
              <span className="ml-2">{community.users?.name}</span>
            </div>
            <div className="flex items-center">
              <span className="bg-gray-100 px-2 py-1 rounded-full text-xs">
                {community.memberships?.count || 0} members
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default GroupCard;
