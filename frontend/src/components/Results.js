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
          console.log('User data:', userData);
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
                console.log('User details document:', doc.data());
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
          console.log('Fetching numerical results for user:', user.uid);
          const numericalResults = await getDocs(query(collection(db, 'numericalResults'), where('user.uid', '==', user.uid)));
          console.log('Numerical results fetched:', numericalResults.docs.map(doc => doc.data()));

          console.log('Fetching verbal results for user:', user.uid);
          const verbalResults = await getDocs(query(collection(db, 'verbalResults'), where('user.uid', '==', user.uid)));
          console.log('Verbal results fetched:', verbalResults.docs.map(doc => doc.data()));

          console.log('Fetching logical results for user:', user.uid);
          const logicalResults = await getDocs(query(collection(db, 'logicalResults'), where('user.uid', '==', user.uid)));
          console.log('Logical results fetched:', logicalResults.docs.map(doc => doc.data()));

          const getScore = (results) => {
            let score = 0;
            results.forEach((doc) => {
              const data = doc.data();
              console.log('Result data:', data);
              score += data.score || 0;
            });
            return score;
          };

          const numericalScore = getScore(numericalResults);
          const verbalScore = getScore(verbalResults);
          const logicalScore = getScore(logicalResults);

          console.log('Fetched scores:', { numericalScore, verbalScore, logicalScore });

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

    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('Career Guidance Test Results', 105, 20, { align: 'center' });

    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text(`Name: ${user.displayName || user.email || 'N/A'}`, 20, 40);

    if (userDetails) {
      const userDetailsTable = [
        ['Email', userDetails.email || 'N/A'],
        ['Role', userDetails.role || 'N/A'],
        ['Aspirations', userDetails.aspirations || 'N/A'],
        ['Interests', userDetails.interests || 'N/A'],
        ['Hobbies', userDetails.hobbies || 'N/A'],
        ['Skills', userDetails.skills || 'N/A'],
        ['Achievements', userDetails.achievements || 'N/A'],
      ];

      if (userDetails.role === 'graduate') {
        userDetailsTable.push(
          ['CGPA', userDetails.cgpa || 'N/A'],
          ['College', userDetails.college || 'N/A'],
          ['Contact Number', userDetails.contactNumber || 'N/A'],
          ['Degree', userDetails.degree || 'N/A'],
          ['DOB', userDetails.dob || 'N/A'],
          ['First Name', userDetails.firstName || 'N/A'],
          ['Gender', userDetails.gender || 'N/A'],
          ['Graduation Year', userDetails.graduationYear || 'N/A'],
          ['Internship/Work Experience', userDetails.internshipWorkExp || 'N/A'],
          ['Last Name', userDetails.lastName || 'N/A'],
          ['Location', userDetails.location || 'N/A']
        );
      } else if (userDetails.role === 'student') {
        userDetailsTable.push(
          ['Contact Number', userDetails.contactNumber || 'N/A'],
          ['DOB', userDetails.dob || 'N/A'],
          ['Extra Curricular', userDetails.extraCurricular || 'N/A'],
          ['Favorite Subjects', userDetails.favoriteSubjects || 'N/A'],
          ['First Name', userDetails.firstName || 'N/A'],
          ['Gender', userDetails.gender || 'N/A'],
          ['Grade', userDetails.grade || 'N/A'],
          ['Learning Preferences', userDetails.learningPreferences || 'N/A'],
          ['Location', userDetails.location || 'N/A'],
          ['Percentage', userDetails.percentage || 'N/A'],
          ['School', userDetails.school || 'N/A'],
          ['Username', userDetails.username || 'N/A']
        );
      }

      doc.autoTable({
        startY: 50,
        head: [['Field', 'Value']],
        body: userDetailsTable,
        theme: 'grid',
        headStyles: { fillColor: [44, 62, 80], textColor: [255, 255, 255] },
        styles: { halign: 'left', fontSize: 10 },
        bodyStyles: { textColor: [0, 0, 0] },
      });
    }

    doc.autoTable({
      startY: doc.autoTable.previous.finalY + 10,
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

      // Analyze the graph and determine if the person is left-brained or right-brained
      const isLeftBrained = scores.numerical + scores.verbal > scores.logicalReasoning + scores.creativeReasoning;
      const brainAnalysisText = isLeftBrained
        ? 'Based on the graph, you are more left-brained 🧠.'
        : 'Based on the graph, you are more right-brained 🧠.';

      doc.text(brainAnalysisText, 20, finalY + 100);
      doc.text(
        'If the graph is tilted towards the right, the person is right-brained. If the graph is tilted towards the left, the person is left-brained.',
        20,
        finalY + 110
      );
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