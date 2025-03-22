import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { 
  Target, 
  BookOpen, 
  CheckCircle, 
  Clock, 
  PlayCircle, 
  FileText, 
  Link as LinkIcon,
  Globe
} from 'lucide-react';

// Utility function to extract homepage from a URL
const getHomepage = (url) => {
  try {
    const parsedUrl = new URL(url);
    return `${parsedUrl.protocol}//${parsedUrl.hostname}`;
  } catch (error) {
    return url;
  }
};

// Utility function to get a readable domain name
const getDomainName = (url) => {
  try {
    const parsedUrl = new URL(url);
    return parsedUrl.hostname.replace('www.', '');
  } catch (error) {
    return url;
  }
};

const CareerRoadmapPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const roadmap = location.state?.roadmap;
  const [expandedPhases, setExpandedPhases] = useState({});

  // Toggle phase expansion
  const togglePhaseExpansion = (index) => {
    setExpandedPhases(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  // Determine icon based on phase index
  const getPhaseIcon = (index) => {
    const icons = [PlayCircle, Clock, Target];
    return icons[index % icons.length];
  };

  // Determine color based on phase index
  const getPhaseColor = (index) => {
    const colors = [
      'rgb(59, 130, 246)', // blue
      'rgb(16, 185, 129)',  // green
      'rgb(245, 158, 11)'   // amber
    ];
    return colors[index % colors.length];
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-8 text-gray-800 text-center flex items-center">
        <Target className="mr-4 text-blue-500" size={40} />
        Career Development Roadmap
      </h1>
      
      {roadmap?.roadmap ? (
        <VerticalTimeline layout="1-column-left">
          {roadmap.roadmap.map((phase, index) => {
            const PhaseIcon = getPhaseIcon(index);
            const phaseColor = getPhaseColor(index);
            const isExpanded = expandedPhases[index];

            return (
              <VerticalTimelineElement
                key={index}
                className="vertical-timeline-element--work"
                contentStyle={{ 
                  background: phaseColor, 
                  color: '#fff',
                  borderRadius: '12px',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                }}
                contentArrowStyle={{ borderRight: `7px solid ${phaseColor}` }}
                date={phase.phase}
                iconStyle={{ 
                  background: phaseColor, 
                  color: '#fff',
                  boxShadow: '0 0 0 4px rgba(255,255,255,0.3)'
                }}
                icon={<PhaseIcon />}
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-2xl font-bold flex-grow">{phase.phase}</h3>
                  <button 
                    onClick={() => togglePhaseExpansion(index)}
                    className="text-white hover:bg-white/20 rounded-full p-2 transition"
                  >
                    {isExpanded ? 'Collapse' : 'Expand'}
                  </button>
                </div>

                {isExpanded && (
                  <>
                    <div className="mb-4">
                      <h4 className="text-lg font-semibold flex items-center mb-2">
                        <BookOpen className="mr-2" size={20} /> Key Steps
                      </h4>
                      <ul className="list-disc list-inside space-y-2">
                        {phase.steps.map((step, stepIndex) => (
                          <li 
                            key={stepIndex} 
                            className="flex items-center"
                          >
                            <CheckCircle className="mr-2 text-white/70" size={16} />
                            {step}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {phase.resources && phase.resources.length > 0 && (
                      <div>
                        <h4 className="text-lg font-semibold flex items-center mb-2">
                          <FileText className="mr-2" size={20} /> Recommended Resources
                        </h4>
                        <ul className="space-y-2">
                          {phase.resources.map((resource, resourceIndex) => (
                            <li key={resourceIndex} className="flex items-center space-x-2">
                              <a 
                                href={resource} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-white/90 hover:text-white flex items-center underline flex-grow"
                              >
                                <LinkIcon className="mr-2" size={16} />
                                {getDomainName(resource)}
                              </a>
                              <a 
                                href={getHomepage(resource)}
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-white/90 hover:text-white"
                                title="Visit Homepage"
                              >
                                <Globe size={16} />
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </>
                )}
              </VerticalTimelineElement>
            );
          })}
        </VerticalTimeline>
      ) : (
        <div className="text-center text-gray-600 text-xl">
          No roadmap available. Please complete the skill assessment first.
        </div>
      )}
      
      <div className="mt-8 flex space-x-4">
        <button
          onClick={() => navigate('/dashboard')}
          className="py-2 px-4 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 transition duration-300"
        >
          Back
        </button>
        <button
          onClick={() => window.print()}
          className="py-2 px-4 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition duration-300"
        >
          Print Roadmap
        </button>
      </div>
    </div>
  );
};

export default CareerRoadmapPage;