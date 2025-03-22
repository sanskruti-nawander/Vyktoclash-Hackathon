import React, { useRef, useEffect, useState } from 'react';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { Chart, registerables } from 'chart.js';
import Sidebar from '../components/Sidebar';
import { motion } from 'framer-motion';
import { doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { useLocation, useNavigate } from 'react-router-dom';

Chart.register(...registerables);

const Results = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const [userDetails, setUserDetails] = useState(null);
  const [scores, setScores] = useState({ numerical: 0, verbal: 0, logicalReasoning: 0, creativeReasoning: 2 });
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = location.state || {};

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (user) {
        console.log('Fetching user details for user:', user);
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          const email = user.email;
          let userCollection;

          // Determine which collection to query based on the role
          if (userData.role === 'student') {
            userCollection = 'students';
          } else if (userData.role === 'graduate') {
            userCollection = 'graduates';
          }

          if (userCollection) {
            const q = query(collection(db, userCollection), where('email', '==', email));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
              querySnapshot.forEach((doc) => {
                setUserDetails(doc.data());
              });
            } else {
              console.log('No user found in', userCollection, 'with email:', email);
            }
          }
        }
      }
    };

    fetchUserDetails();
  }, [user]);

  useEffect(() => {
    const fetchResults = async () => {
      if (user) {
        try {
          const numericalResults = await getDocs(query(collection(db, 'numericalResults'), where('userId', '==', user.uid)));
          const verbalResults = await getDocs(query(collection(db, 'verbalResults'), where('userId', '==', user.uid)));
          const logicalResults = await getDocs(query(collection(db, 'logicalResults'), where('userId', '==', user.uid)));

          const calculateCorrectAnswers = (results) => {
            let correctAnswers = 0;
            results.forEach((doc) => {
              const data = doc.data();
              if (data.correct) {
                correctAnswers += 1;
              }
            });
            return correctAnswers;
          };

          const numericalScore = calculateCorrectAnswers(numericalResults);
          const verbalScore = calculateCorrectAnswers(verbalResults);
          const logicalScore = calculateCorrectAnswers(logicalResults);

          setScores({
            numerical: numericalScore,
            verbal: verbalScore,
            logicalReasoning: logicalScore,
            creativeReasoning: 2, // Fixed score for creative reasoning
          });
        } catch (error) {
          console.error('Error fetching results:', error);
        }
      }
    };

    fetchResults();
  }, [user]);

  useEffect(() => {
    if (chartRef.current) {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      const fetchUserData = async () => {
        try {
          if (user) {
            const userDoc = await getDoc(doc(db, 'users', user.uid));

            if (userDoc.exists()) {
              const userData = userDoc.data();
              console.log('Fetched user data:', userData);

              const username = userData.email.split('@')[0] || 'N/A';
              const role = userData.role || 'N/A';

              const ctx = chartRef.current.getContext('2d');
              chartInstance.current = new Chart(ctx, {
                type: 'radar',
                data: {
                  labels: ['Numerical Ability', 'Verbal Ability', 'Logical Reasoning', 'Creative Reasoning'],
                  datasets: [{
                    label: `${username} - ${role}`,
                    data: [scores.numerical, scores.verbal, scores.logicalReasoning, scores.creativeReasoning],
                    backgroundColor: 'rgba(76, 81, 191, 0.2)',
                    borderColor: '#4c51bf',
                    pointBackgroundColor: '#4c51bf',
                  }],
                },
                options: {
                  responsive: true,
                  scales: {
                    r: {
                      beginAtZero: true,
                      max: 5,
                    },
                  },
                },
              });
            } else {
              console.log('No user document found for user ID:', user.uid);
            }
          }
        } catch (error) {
          console.error('Error fetching user details:', error);
        }
      };

      fetchUserData();
    }
  }, [scores, user]);

  const downloadPDF = () => {
    const doc = new jsPDF();

    console.log('Generating PDF for user:', user.displayName || user.email);

    doc.text(`Name: ${user.displayName || user.email || 'N/A'}`, 20, 30);

    if (userDetails) {
      doc.text(`Email: ${userDetails.email || 'N/A'}`, 20, 40);
      doc.text(`Role: ${userDetails.role || 'N/A'}`, 20, 50);
      doc.text(`Aspirations: ${userDetails.aspirations || 'N/A'}`, 20, 60);
      doc.text(`Interests: ${userDetails.interests || 'N/A'}`, 20, 70);
      doc.text(`Hobbies: ${userDetails.hobbies || 'N/A'}`, 20, 80);
      doc.text(`Skills: ${userDetails.skills || 'N/A'}`, 20, 90);
      doc.text(`Achievements: ${userDetails.achievements || 'N/A'}`, 20, 100);

      if (userDetails.role === 'graduate') {
        doc.text(`CGPA: ${userDetails.cgpa || 'N/A'}`, 20, 110);
        doc.text(`College: ${userDetails.college || 'N/A'}`, 20, 120);
        doc.text(`Contact Number: ${userDetails.contactNumber || 'N/A'}`, 20, 130);
        doc.text(`Degree: ${userDetails.degree || 'N/A'}`, 20, 140);
        doc.text(`DOB: ${userDetails.dob || 'N/A'}`, 20, 150);
        doc.text(`First Name: ${userDetails.firstName || 'N/A'}`, 20, 160);
        doc.text(`Gender: ${userDetails.gender || 'N/A'}`, 20, 170);
        doc.text(`Graduation Year: ${userDetails.graduationYear || 'N/A'}`, 20, 180);
        doc.text(`Internship/Work Experience: ${userDetails.internshipWorkExp || 'N/A'}`, 20, 190);
        doc.text(`Last Name: ${userDetails.lastName || 'N/A'}`, 20, 200);
        doc.text(`Location: ${userDetails.location || 'N/A'}`, 20, 210);
      } else if (userDetails.role === 'student') {
        doc.text(`Contact Number: ${userDetails.contactNumber || 'N/A'}`, 20, 110);
        doc.text(`DOB: ${userDetails.dob || 'N/A'}`, 20, 120);
        doc.text(`Extra Curricular: ${userDetails.extraCurricular || 'N/A'}`, 20, 130);
        doc.text(`Favorite Subjects: ${userDetails.favoriteSubjects || 'N/A'}`, 20, 140);
        doc.text(`First Name: ${userDetails.firstName || 'N/A'}`, 20, 150);
        doc.text(`Gender: ${userDetails.gender || 'N/A'}`, 20, 160);
        doc.text(`Grade: ${userDetails.grade || 'N/A'}`, 20, 170);
        doc.text(`Learning Preferences: ${userDetails.learningPreferences || 'N/A'}`, 20, 180);
        doc.text(`Location: ${userDetails.location || 'N/A'}`, 20, 190);
        doc.text(`Percentage: ${userDetails.percentage || 'N/A'}`, 20, 200);
        doc.text(`School: ${userDetails.school || 'N/A'}`, 20, 210);
        doc.text(`Username: ${userDetails.username || 'N/A'}`, 20, 220);
      }
    }

    doc.autoTable({
      startY: userDetails && userDetails.role === 'graduate' ? 230 : 240,
      head: [['Category', 'Score']],
      body: [
        ['Numerical Ability', scores.numerical],
        ['Verbal Ability', scores.verbal],
        ['Logical Reasoning', scores.logicalReasoning],
        ['Creative Reasoning', scores.creativeReasoning],
      ],
      theme: 'grid',
      headStyles: { fillColor: [44, 62, 80], textColor: [255, 255, 255] },
      styles: { halign: 'center', fontSize: 12 },
      bodyStyles: { textColor: [0, 0, 0] },
    });

    const chartCanvas = chartRef.current;
    if (chartCanvas) {
      const chartImage = chartCanvas.toDataURL('image/png');
      const finalY = doc.autoTable.previous.finalY + 10;

      doc.addImage(chartImage, 'PNG', 20, finalY, 160, 90);
      doc.setDrawColor(150, 150, 150);
      doc.rect(20, finalY, 160, 90);
    }

    const pageHeight = doc.internal.pageSize.height;
    doc.setFontSize(10);
    doc.setFont('helvetica', 'italic');
    doc.text(
      'Generated by AI-Driven Career Guidance Tool. © 2024 Udaan Technologies. All rights reserved.',
      pageHeight / 2,
      pageHeight - 10,
      { align: 'center' }
    );

    doc.save('Career-Guidance-Test-Results.pdf');
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-r from-blue-100 to-blue-300">
      <Sidebar userName={user?.displayName || user?.email} />
      <div className="flex-grow flex flex-col items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl w-full bg-white shadow-lg rounded-lg p-8 text-center"
        >
          <h1 className="text-3xl font-bold mb-6 text-indigo-800">Test Results</h1>
          <p className="text-xl mb-4 text-gray-700">Numerical Ability: {scores.numerical}</p>
          <p className="text-xl mb-4 text-gray-700">Verbal Ability: {scores.verbal}</p>
          <p className="text-xl mb-4 text-gray-700">Logical Reasoning: {scores.logicalReasoning}</p>
          <p className="text-xl mb-4 text-gray-700">Creative Reasoning: {scores.creativeReasoning}</p>
          <canvas ref={chartRef} width="400" height="200" className="mb-4"></canvas>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={downloadPDF}
            className="py-2 px-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition duration-300 mb-4"
          >
            Download PDF
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/report', { state: { user, scores } })}
            className="py-2 px-4 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition duration-300"
          >
            Know Your Career by Uploading the Result
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default Results;