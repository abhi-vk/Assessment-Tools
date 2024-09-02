import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Button, Row, Col, Card } from 'react-bootstrap';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="d-flex flex-column min-vh-100 bg-light">
      <header className="bg-dark text-white py-3 w-100">
        <Container className="text-center">
          <h1>Welcome to the Assignment Tool</h1>
        </Container>
      </header>

      <div className="flex-grow-1 d-flex justify-content-center align-items-center">
        <Card className="w-75 shadow-sm border-dark bg-dark text-light">
          <Card.Body>
            <Row>
              <Col md={6} className="d-flex flex-column align-items-center mb-4 mb-md-0">
                <h4 className="mb-3 text-primary">Student</h4>
                <Button
                  variant="outline-light"
                  className="mb-2 w-75"
                  onClick={() => navigate('/student-signup')}
                >
                  Student Signup
                </Button>
                <Button
                  variant="outline-light"
                  className="w-75"
                  onClick={() => navigate('/student-login')}
                >
                  Student Login
                </Button>
              </Col>
              <Col md={6} className="d-flex flex-column align-items-center">
                <h4 className="mb-3 text-success">Teacher</h4>
                <Button
                  variant="outline-light"
                  className="mb-2 w-75"
                  onClick={() => navigate('/teacher-signup')}
                >
                  Teacher Signup
                </Button>
                <Button
                  variant="outline-light"
                  className="w-75"
                  onClick={() => navigate('/teacher-login')}
                >
                  Teacher Login
                </Button>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </div>

      <footer className="bg-dark text-white py-3 w-100 mt-auto">
        <Container className="text-center">
          <p className="mb-0">&copy; 2024 Assessment Tools. All rights reserved.</p>
        </Container>
      </footer>
    </div>
  );
};

export default HomePage;
