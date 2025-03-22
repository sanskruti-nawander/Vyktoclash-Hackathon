import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import Sidebar from '../components/Sidebar';

const Report = () => {
  const location = useLocation();
  const { user, scores } = location.state || {};
  const [userRole, setUserRole] = useState('');
  const [loading, setLoading] = useState(true);
  const [recommendations, setRecommendations] = useState({});

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        if (!user?.uid) {
          console.error('No user ID available');
          return;
        }

        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          console.log('User data:', userData); // Debug log
          setUserRole(userData.role);
        } else {
          console.error('No user document found');
        }
      } catch (error) {
        console.error('Error fetching user role:', error);
      }
    };

    fetchUserRole();
  }, [user]);

  useEffect(() => {
    // Calculate career recommendations based on scores and role
    const calculateRecommendations = () => {
      setLoading(true);
      const totalScore = (scores.numerical + scores.verbal + scores.logicalReasoning) / 3;

      let careerPaths = [];
      let skillsToImprove = [];
      let nextSteps = [];

      if (userRole === 'student') {
        if (scores.numerical > 70) {
          careerPaths.push('Science & Mathematics', 'Engineering', 'Data Science');
          nextSteps.push('Focus on PCM in 11th & 12th', 'Prepare for JEE/NEET');
        }
        if (scores.verbal > 70) {
          careerPaths.push('Literature', 'Journalism', 'Law');
          nextSteps.push('Consider Humanities stream', 'Focus on language skills');
        }
        if (scores.logicalReasoning > 70) {
          careerPaths.push('Computer Science', 'Research', 'Analytics');
          nextSteps.push('Learn basic programming', 'Develop analytical skills');
        }
      } else if (userRole === 'graduate') {
        if (scores.numerical > 70) {
          careerPaths.push('Data Analyst', 'Financial Analyst', 'Business Intelligence');
          nextSteps.push('Learn SQL & Python', 'Get certified in data analysis');
        }
        if (scores.verbal > 70) {
          careerPaths.push('Content Strategy', 'Digital Marketing', 'Corporate Communications');
          nextSteps.push('Build writing portfolio', 'Learn SEO basics');
        }
        if (scores.logicalReasoning > 70) {
          careerPaths.push('Software Development', 'Product Management', 'Consulting');
          nextSteps.push('Build technical projects', 'Prepare for interviews');
        }
      }

      // Determine skills to improve
      if (scores.numerical < 60) skillsToImprove.push('Quantitative Analysis', 'Mathematical Reasoning');
      if (scores.verbal < 60) skillsToImprove.push('Communication Skills', 'Reading Comprehension');
      if (scores.logicalReasoning < 60) skillsToImprove.push('Problem Solving', 'Critical Thinking');

      setRecommendations({
        careerPaths: [...new Set(careerPaths)],
        skillsToImprove,
        nextSteps: [...new Set(nextSteps)],
        overallScore: totalScore
      });
      setLoading(false);
    };

    if (scores && userRole) {
      calculateRecommendations();
    }
  }, [scores, userRole]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-r from-blue-50 to-indigo-100">
      <Sidebar userName={user?.displayName || user?.email} />
      <div className="flex-grow p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-5xl mx-auto"
        >
          {/* Header Section */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
            <h1 className="text-4xl font-bold mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-600">
              Career Guidance Report
            </h1>
            <div className="text-center text-gray-600 mb-4">
              <p className="text-lg">Based on your aptitude test performance</p>
              <p className="font-semibold">Role: {userRole}</p>
            </div>
            <div className="grid grid-cols-3 gap-4 mt-6">
              <div className="bg-indigo-50 p-4 rounded-lg text-center">
                <p className="text-gray-600">Numerical</p>
                <p className="text-2xl font-bold text-indigo-600">{scores.numerical}%</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg text-center">
                <p className="text-gray-600">Verbal</p>
                <p className="text-2xl font-bold text-blue-600">{scores.verbal}%</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg text-center">
                <p className="text-gray-600">Logical</p>
                <p className="text-2xl font-bold text-green-600">{scores.logicalReasoning}%</p>
              </div>
            </div>
          </div>

          {/* Recommendations Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Career Paths */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <h2 className="text-2xl font-semibold mb-4 text-indigo-700">
                Recommended Career Paths
              </h2>
              <ul className="space-y-3">
                {recommendations.careerPaths.map((career, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <span className="text-indigo-500">•</span>
                    <span>{career}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Skills to Improve */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <h2 className="text-2xl font-semibold mb-4 text-blue-700">
                Skills to Improve
              </h2>
              <ul className="space-y-3">
                {recommendations.skillsToImprove.map((skill, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <span className="text-blue-500">•</span>
                    <span>{skill}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Next Steps */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-white rounded-xl shadow-lg p-6 md:col-span-2"
            >
              <h2 className="text-2xl font-semibold mb-4 text-green-700">
                Recommended Next Steps
              </h2>
              <ul className="space-y-3">
                {recommendations.nextSteps.map((step, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <span className="text-green-500">•</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Overall Assessment */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="bg-white rounded-xl shadow-lg p-6 mt-6"
          >
            <h2 className="text-2xl font-semibold mb-4 text-purple-700">
              Overall Assessment
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Based on your overall score of {recommendations.overallScore.toFixed(1)}%, you show 
              {recommendations.overallScore > 70 ? ' strong ' : recommendations.overallScore > 50 ? ' moderate ' : ' developing '}
              aptitude in the tested areas. Focus on the recommended next steps and consider the suggested career paths
              while continuing to develop your skills in the identified areas for improvement.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Report; 