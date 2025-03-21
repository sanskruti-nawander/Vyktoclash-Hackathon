import React from 'react';
import { motion } from 'framer-motion';

const RoadmapDisplay = ({ recommendation, roadmap }) => {
  // Ensure roadmap is in the correct format
  const parsedRoadmap = typeof roadmap === 'string' 
    ? JSON.parse(roadmap.replace(/```json\n|\n```/g, '')) 
    : roadmap;

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-indigo-100 p-8">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header Section */}
        <div className="bg-blue-600 text-white p-8">
          <h1 className="text-4xl font-bold mb-4">
            Roadmap to Becoming a {recommendation.career}
          </h1>
          <p className="text-xl text-blue-100">
            A personalized career journey tailored to your goals and potential
          </p>
        </div>

        {/* Roadmap Stages */}
        <div className="p-8 space-y-12">
          {parsedRoadmap.careerRoadmap.phases.map((phase, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="flex md:flex-row flex-col gap-8 items-start"
            >
              {/* Stage Header (Left Side) */}
              <div className="md:w-1/3 w-full">
                <h2 className="text-2xl font-bold text-blue-800 border-b-4 border-blue-500 pb-2">
                  Stage {index + 1}: {phase.phaseName}
                </h2>
              </div>

              {/* Stage Details (Right Side) */}
              <div className="md:w-2/3 w-full">
                <div className="bg-gray-50 rounded-lg p-6 shadow-md">
                  <ul className="space-y-4 list-disc list-inside text-gray-700 text-lg">
                    {phase.steps.map((step, stepIndex) => (
                      <li key={stepIndex} className="leading-relaxed">
                        {step}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Insights Section */}
        <div className="bg-gray-100 p-8">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              Career Insights
            </h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-lg shadow">
                <h4 className="font-bold text-blue-600 mb-2">Salary Range</h4>
                <p>{recommendation.salaryRange || 'Not specified'}</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <h4 className="font-bold text-blue-600 mb-2">Job Market</h4>
                <p>{recommendation.jobMarket || 'Not specified'}</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <h4 className="font-bold text-blue-600 mb-2">Growth Potential</h4>
                <p>{recommendation.growthPotential || 'Not specified'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoadmapDisplay;