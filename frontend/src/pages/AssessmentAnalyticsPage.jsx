import React, { useState } from 'react';
import { Chart, registerables } from 'chart.js';
import { Bar, Line, Pie } from 'react-chartjs-2';

// Register necessary components
Chart.register(...registerables);

const AssessmentAnalyticsPage = () => {
  const [analyticsData, setAnalyticsData] = useState({
    overallPerformance: {
      labels: ['Quiz 1', 'Quiz 2', 'Quiz 3'],
      data: [75, 85, 90]
    },
    questionLevelAnalysis: [
      { question: 'Q1', avgTime: 30, correctRate: 80, incorrectRate: 20 },
      { question: 'Q2', avgTime: 45, correctRate: 60, incorrectRate: 40 }
    ],
    studentPerformanceTrends: [
      { student: 'John Doe', scores: [85, 90, 88] },
      { student: 'Jane Smith', scores: [78, 85, 80] }
    ]
  });

  const handleExportReport = () => {
    alert("Exporting report...");
  };

  const handleComparison = () => {
    alert("Comparing performance...");
  };

  return (
    <div className="container my-4">
      <h1 className="mb-4">Assessment Analytics</h1>

      {/* Overall Assessment Performance */}
      <div className="mb-4">
        <h2 className="h4 mb-3">Overall Assessment Performance</h2>
        <div className="card">
          <div className="card-body">
            <Bar
              data={{
                labels: analyticsData.overallPerformance.labels,
                datasets: [{
                  label: 'Average Score',
                  data: analyticsData.overallPerformance.data,
                  backgroundColor: 'rgba(75, 192, 192, 0.2)',
                  borderColor: 'rgba(75, 192, 192, 1)',
                  borderWidth: 1
                }]
              }}
              options={{
                scales: {
                  y: {
                    beginAtZero: true
                  }
                }
              }}
              width={300}
              height={150}
            />
          </div>
        </div>
      </div>

      {/* Question-Level Analysis */}
      <div className="mb-4">
        <h2 className="h4 mb-3">Question-Level Analysis</h2>
        {analyticsData.questionLevelAnalysis.map((item, index) => (
          <div key={index} className="card mb-3">
            <div className="card-body">
              <h3 className="h5">Question {item.question}</h3>
              <p>Average Time Spent: {item.avgTime} seconds</p>
              <p>Correct Response Rate: {item.correctRate}%</p>
              <p>Incorrect Response Rate: {item.incorrectRate}%</p>
              <div className="mt-3">
                <Pie
                  data={{
                    labels: ['Correct', 'Incorrect'],
                    datasets: [{
                      data: [item.correctRate, item.incorrectRate],
                      backgroundColor: ['#36a2eb', '#ff6384']
                    }]
                  }}
                  width={200}
                  height={200}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Student Performance Trends */}
      <div className="mb-4">
        <h2 className="h4 mb-3">Student Performance Trends</h2>
        {analyticsData.studentPerformanceTrends.map((student, index) => (
          <div key={index} className="card mb-3">
            <div className="card-body">
              <h3 className="h5">{student.student}</h3>
              <div className="mt-3">
                <Line
                  data={{
                    labels: ['Quiz 1', 'Quiz 2', 'Quiz 3'],
                    datasets: [{
                      label: 'Scores',
                      data: student.scores,
                      fill: false,
                      borderColor: '#42A5F5'
                    }]
                  }}
                  options={{
                    scales: {
                      y: {
                        beginAtZero: true
                      }
                    }
                  }}
                  width={300}
                  height={150}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Feedback and Improvement Areas */}
      <div className="mb-4">
        <h2 className="h4 mb-3">Feedback and Improvement Areas</h2>
        <p>Identify common areas where students struggled, helping teachers focus on specific topics or skills in future lessons.</p>
      </div>

      {/* Export Reports */}
      <div className="mb-4">
        <button
          onClick={handleExportReport}
          className="btn btn-primary"
        >
          Export Report
        </button>
      </div>

      {/* Comparison Tools */}
      <div>
        <button
          onClick={handleComparison}
          className="btn btn-success"
        >
          Compare Performance
        </button>
      </div>
    </div>
  );
};

export default AssessmentAnalyticsPage;
