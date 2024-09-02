import React, { useEffect, useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../components/axios'; // Adjust the path according to your file structure

import { FaHome, FaSignOutAlt, FaChartBar, FaComments, FaPlay } from 'react-icons/fa';
import { useAssessments } from '../components/AssessmentContext';

const StudentDashboardPage = () => {
  const { published, setPublished } = useAssessments();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('');
  const [sortOption, setSortOption] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch published assessments from the backend
  useEffect(() => {
    const fetchAssessments = async () => {
      try {
        console.log("Fetching assessments...");
        const response = await axiosInstance.get('/api/assessments');
        console.log("API response:", response);
        if (response.data && response.data.assignments) {
          setPublished(response.data.assignments);
          console.log("Assessments set successfully:", response.data.assignments);
        } else {
          console.log("No assignments found in response.");
        }
      } catch (error) {
        console.error('Error fetching published assessments:', error.response?.data?.message || error.message);
      } finally {
        setLoading(false);
        console.log("Loading completed.");
      }
    };

    fetchAssessments();
  }, [setPublished]);

  // Handle logout and clear tokens
  const handleLogout = () => {
    console.log("Logging out...");
    localStorage.removeItem('access_token');
    sessionStorage.removeItem('access_token');
    navigate('/'); // Redirect to login page after logout
  };

  // Filter and sort assessments using useMemo for performance
  const filteredAssessments = useMemo(() => {
    let filtered = [...published];

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter((assignment) =>
        assignment.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by type
    if (filterType) {
      filtered = filtered.filter((assignment) => assignment.type === filterType);
    }

    // Sort assignments
    if (sortOption === 'date') {
      filtered.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    } else if (sortOption === 'popularity') {
      filtered.sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
    } else if (sortOption === 'completion') {
      filtered.sort((a, b) => (b.completion_rate || 0) - (a.completion_rate || 0));
    }

    return filtered;
  }, [published, searchQuery, filterType, sortOption]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="min-vh-100 d-flex flex-column bg-light">
      {/* Navbar with Home, Results, Feedback, and Logout */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
        <div className="container">
          <Link className="navbar-brand" to="/">Student Dashboard</Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  <FaHome size={20} /> Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/review-feedback">
                  <FaChartBar size={20} /> Results
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/feedback-summary">
                  <FaComments size={20} /> Feedback
                </Link>
              </li>
              <li className="nav-item">
                <button className="btn btn-outline-light d-flex align-items-center" onClick={handleLogout}>
                  <FaSignOutAlt size={20} className="me-2" /> Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <main className="flex-grow-1 p-4">
        <div className="container">
          <div className="d-flex flex-column flex-md-row mb-4">
            <select
              className="form-select mb-2 mb-md-0 me-md-3"
              style={{ maxWidth: '200px' }}
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="">Filter by Type</option>
              <option value="Quiz">Quiz</option>
              <option value="Assignment">Assignment</option>
              <option value="Survey">Survey</option>
            </select>
            <select
              className="form-select"
              style={{ maxWidth: '200px' }}
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="">Sort by</option>
              <option value="date">Date</option>
              <option value="popularity">Popularity</option>
              <option value="completion">Completion Rates</option>
            </select>
          </div>

          <section className="mb-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h1 className="text-primary">Published Assessments</h1>
              <input
                type="text"
                placeholder="Search assessments..."
                className="form-control w-50"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="row row-cols-1 row-cols-md-3 g-4">
              {filteredAssessments.length > 0 ? (
                filteredAssessments.map((assignment) => (
                  <div className="col mb-4" key={assignment.id}>
                    <div className="card shadow-sm h-100">
                      <div className="card-body d-flex flex-column">
                        <h5 className="card-title text-secondary">{assignment.title || 'No Title'}</h5>
                        <p className="card-text">
                          <strong>Type:</strong> {assignment.type || 'N/A'}
                        </p>
                        <p className="card-text">
                          <strong>Time Limit:</strong> {assignment.time_limit ? `${assignment.time_limit} mins` : 'N/A'}
                        </p>
                        <p className="card-text">
                          <strong>Attempts:</strong> {assignment.attempts || 'N/A'}
                        </p>
                        <div className="mt-auto d-flex justify-content-between">
                          <Link to={`/details`} className="btn btn-primary">
                            View
                          </Link>
                          <button
                            className="btn btn-success"
                            onClick={() => navigate(`/take-assessment/${assignment.id}`)}
                          >
                            <FaPlay className="me-1" /> Start
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <h2>No assessments found.</h2>
              )}
            </div>
          </section>
        </div>
      </main>

      <footer className="bg-dark text-white py-3 w-100 mt-auto">
        <div className="container text-center">
          <p className="mb-0">&copy; 2024 Assessment Tools. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default StudentDashboardPage;
