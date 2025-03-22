import React, { useState } from 'react';
import { CheckCircle, MapPin, Book, Target, ArrowRight } from 'lucide-react';

const CareerRoadmapTimeline = ({ roadmap }) => {
  const [expandedStage, setExpandedStage] = useState(null);

  // Helper function to render resources
  const renderResources = (resources) => {
    if (!resources || resources.length === 0) return null;

    return (
      <div className="mt-2 space-y-2">
        <h4 className="text-sm font-semibold text-gray-600">Recommended Resources:</h4>
        {resources.map((resource, index) => (
          <a 
            key={index} 
            href={resource.link} 
            target="_blank" 
            rel="noopener noreferrer"
            className="block text-sm text-blue-600 hover:text-blue-800 hover:underline transition-colors"
          >
            <Book className="inline-block mr-2 w-4 h-4" />
            {resource.title}
          </a>
        ))}
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Your Career Development Roadmap</h2>
      
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-8 top-0 bottom-0 w-1 bg-blue-200"></div>
        
        {roadmap.stages.map((stage, index) => (
          <div 
            key={index} 
            className="relative mb-8 pl-16 cursor-pointer"
            onClick={() => setExpandedStage(expandedStage === index ? null : index)}
          >
            {/* Stage icon */}
            <div className="absolute left-0 top-0 w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center">
              {index === 0 ? <MapPin className="w-8 h-8 text-blue-500" /> : 
               index === roadmap.stages.length - 1 ? <Target className="w-8 h-8 text-green-500" /> : 
               <ArrowRight className="w-8 h-8 text-gray-500" />}
            </div>
            
            {/* Stage content */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm transition-all duration-300 
              hover:shadow-md">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-gray-800">{stage.title}</h3>
                <CheckCircle 
                  className={`w-6 h-6 ${stage.completed ? 'text-green-500' : 'text-gray-300'}`} 
                />
              </div>
              
              <p className="text-gray-600 mt-2">{stage.description}</p>
              
              {/* Expanded details */}
              {expandedStage === index && (
                <div className="mt-4 space-y-4">
                  {stage.skills && (
                    <div>
                      <h4 className="text-sm font-semibold text-gray-600">Key Skills to Develop:</h4>
                      <ul className="list-disc list-inside text-sm text-gray-700">
                        {stage.skills.map((skill, skillIndex) => (
                          <li key={skillIndex}>{skill}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {stage.resources && renderResources(stage.resources)}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CareerRoadmapTimeline;