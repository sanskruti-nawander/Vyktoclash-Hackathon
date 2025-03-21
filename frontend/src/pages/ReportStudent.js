import React from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

const ReportStudent = () => {
  const location = useLocation();
  const { recommendation, roadmap } = location.state;

  // Handle the roadmap parsing safely
  const parseRoadmap = (data) => {
    try {
      if (typeof data === 'string') {
        // Remove any markdown formatting if present
        const cleanText = data.replace(/text\n|\n/g, '');
        return cleanText;
      }
      return data;
    } catch (error) {
      console.error('Error parsing roadmap:', error);
      return 'Error loading roadmap data';
    }
  };

  const parsedRoadmap = parseRoadmap(roadmap);

  return (
    <div className="flex min-h-screen bg-gradient-to-r from-blue-50 to-indigo-100">
      <Sidebar />
      <div className="flex-grow p-8">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-3xl font-bold mb-6 text-center">
            Career Roadmap for {recommendation.career}
          </h1>
          <div className="prose max-w-none">
            {parsedRoadmap.split('\n').map((paragraph, index) => (
              paragraph.trim() && (
                <p key={index} className="mb-4 text-gray-700 leading-relaxed">
                  {paragraph}
                </p>
              )
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportStudent;