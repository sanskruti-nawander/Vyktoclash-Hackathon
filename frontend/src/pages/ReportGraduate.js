import React from 'react';
import { useLocation } from 'react-router-dom';
import { CheckCircle, Target } from 'lucide-react';

const ReportGraduate = () => {
  const location = useLocation();
  const { recommendation, roadmap } = location.state;

  // Safe parsing function
  const parseRoadmap = (data) => {
    try {
      if (typeof data === 'string') {
        const cleanJson = data.replace(/```json\n|\n```/g, '');
        return JSON.parse(cleanJson);
      }
      return data;
    } catch (error) {
      console.error('Error parsing roadmap:', error);
      return null;
    }
  };

  const parsedRoadmap = parseRoadmap(roadmap);

  console.log('Parsed Roadmap:', parsedRoadmap);

  if (!parsedRoadmap || !parsedRoadmap.careerRoadmap || !parsedRoadmap.careerRoadmap.phases) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md text-center">
          <Target className="mx-auto mb-4 text-blue-500" size={64} />
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Roadmap Generation Error
          </h1>
          <p className="text-gray-600">
            We couldn't generate your career roadmap. Please try again or contact support.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            Roadmap to Becoming a {recommendation.career}
          </h1>
          
          {parsedRoadmap.careerRoadmap.phases.map((phase, index) => (
            <div 
              key={index} 
              className="flex flex-col md:flex-row mb-8 border-b pb-8 last:border-b-0"
            >
              <div className="md:w-1/3 pr-4 mb-4 md:mb-0">
                <div className="flex items-center">
                  <CheckCircle 
                    className="mr-3 text-blue-500" 
                    size={24} 
                  />
                  <h2 className="text-2xl font-semibold text-gray-800">
                    Stage {index + 1}: {phase.phaseName}
                  </h2>
                </div>
              </div>
              
              <div className="md:w-2/3 pl-4 md:pl-8 border-l-2 border-blue-100">
                {phase.steps.map((step, stepIndex) => (
                  <div 
                    key={stepIndex} 
                    className="mb-4 last:mb-0 relative pl-4 before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:bg-blue-500 before:rounded-full"
                  >
                    <p className="text-gray-700 text-base leading-relaxed">
                      {step}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReportGraduate;