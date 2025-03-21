import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import './Results.css';

const Results = () => {
  const { state } = useLocation();
  const { responses, marks, questions } = state;
  const navigate = useNavigate();

  useEffect(() => {
    if (!responses || !marks || !questions) {
      navigate('/interview-landing');
    }
  }, [responses, marks, questions, navigate]);

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('Performance Report', 14, 22);
    doc.setFontSize(12);
    doc.text('Interview Results:', 14, 30);

    const tableColumn = ['Question', 'Response', 'Marks'];
    const tableRows = [];

    responses.forEach((response, index) => {
      const questionData = [
        questions[index],
        response,
        marks[index],
      ];
      tableRows.push(questionData);
    });

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 35,
      styles: { fontSize: 8 },
    });

    doc.save('performance_report.pdf');
  };

  return (
    <div className="container">
      <header>
        <h2>Performance Report</h2>
      </header>
      <div className="results">
        <h3>Responses:</h3>
        <ul>
          {responses.map((response, index) => (
            <li key={index}>
              <strong>Question {index + 1}:</strong> {questions[index]}
              <br />
              <strong>Response:</strong> {response}
              <br />
              <strong>Marks:</strong> {marks[index]}
            </li>
          ))}
        </ul>
      </div>
      <button onClick={generatePDF}>Download PDF</button>
      <button onClick={() => navigate('/interview-landing')}>Back to Home</button>
    </div>
  );
};

export default Results;
