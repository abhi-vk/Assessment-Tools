import React, { useEffect, useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../components/axios';
import { FaHome, FaPlus, FaSearch, FaCog, FaUser, FaSignOutAlt, FaTrashAlt, FaArchive, FaChartLine } from 'react-icons/fa'; // Added FaChartLine
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { useAssessments } from '../components/AssessmentContext';

const AssessmentDashboardPage = () => {
  const { drafts, published, setPublished } = useAssessments();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('');
  const [sortOption, setSortOption] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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

  const handleLogout = () => {
    console.log("Logging out...");
    localStorage.removeItem('access_token');
    sessionStorage.removeItem('access_token');
    navigate('/'); 
  };

  const handleEdit = (id) => {
    navigate(`/edit-assessment/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/api/assessments/${id}`);
      setPublished(published.filter(assessment => assessment.id !== id));
    } catch (error) {
      console.error('Error deleting assessment:', error.response?.data?.message || error.message);
    }
  };

  const handleAction = (action) => {
    navigate('/archive-deletion');
    // If you need to perform the action (delete or archive) immediately, you can call the respective functions here
    // For example, if 'action' is 'delete', you can call handleDelete()
  };

  const filteredAssessments = useMemo(() => {
    let filtered = [...published];

    if (searchQuery) {
      filtered = filtered.filter((assignment) =>
        assignment.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (filterType) {
      filtered = filtered.filter((assignment) => assignment.type === filterType);
    }

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
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
        <div className="container">
          <a className="navbar-brand" href="#">Assessment Dashboard</a>
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
                <Link className="nav-link" to="/create-assessment">
                  <FaPlus size={20} /> Create
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/question-bank">
                  <FaSearch size={20} /> Question Bank
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/analytics">
                  <FaChartLine size={20} /> Analytics
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/grading-review">
                  <FaUser size={20} /> Grading & Review
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/settings">
                  <FaCog size={20} /> Settings
                </Link>
              </li>
              <li className="nav-item d-flex align-items-center">
                <DropdownButton 
                  id="action-dropdown" 
                  title={<><FaTrashAlt size={20} className="me-2" /> Actions</>} 
                  variant="outline-secondary" 
                  className="me-3"
                >
                  <Dropdown.Item onClick={() => handleAction('delete')}>
                    <FaTrashAlt size={16} className="me-2" /> Delete
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => handleAction('archive')}>
                    <FaArchive size={16} className="me-2" /> Archive
                  </Dropdown.Item>
                </DropdownButton>
                <button 
                  className="btn btn-outline-light d-flex align-items-center" 
                  onClick={handleLogout}
                >
                  <FaSignOutAlt size={20} className="me-2" /> Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <main className="flex-grow-1 p-4">
        <div className="container">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-4">
            <Link to="/create-assessment" className="btn btn-success mb-2 mb-md-0">
              <FaPlus size={16} /> Create New Assessment
            </Link>
          </div>

          <div className="d-flex flex-column flex-md-row mb-4">
            <input
              type="text"
              className="form-control mb-2 mb-md-0 me-md-3"
              placeholder="Search assessments..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
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
              <option value="completion">Completion Rate</option>
            </select>
          </div>

          <section>
            <div className="row row-cols-1 row-cols-md-3 g-4">
              {filteredAssessments.length > 0 ? (
                filteredAssessments.map(assignment => (
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
                          <button
                            className="btn btn-warning"
                            onClick={() => handleEdit(assignment.id)}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-danger"
                            onClick={() => handleDelete(assignment.id)}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p>No assessments available.</p>
              )}
            </div>
          </section>
          <section>
            <h2 className="h4 mb-3">Recent Activities</h2>
            <div className="list-group">
              <div className="list-group-item list-group-item-light">
                <p className="mb-1 text-muted">Student 1 submitted Assessment Title 1</p>
                <small className="text-muted">Date: August 26, 2024</small>
              </div>
              {/* Add more activity items as needed */}
            </div>
          </section>
        </div>
      </main>

      <footer className="bg-dark text-white text-center py-3 mt-auto">
        <p className="mb-0">© 2024 Assessment Dashboard. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default AssessmentDashboardPage;
