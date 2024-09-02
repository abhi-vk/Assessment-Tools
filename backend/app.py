from flask import Flask, request, jsonify
from flask_cors import CORS
import psycopg2
import bcrypt
import os
from psycopg2 import pool
import json
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Initialize Flask app and enable CORS
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:5173", "supports_credentials": True}})

# PostgreSQL database connection settings from environment variables
DB_URL = os.getenv("DATABASE_URL")

# Initialize connection pool
try:
    connection_pool = psycopg2.pool.SimpleConnectionPool(1, 10, DB_URL)
except Exception as e:
    print(f"Error initializing the connection pool: {e}")

# Helper function to get connection from pool
def get_db_connection():
    return connection_pool.getconn()

# Helper function to release connection back to pool
def release_db_connection(conn):
    connection_pool.putconn(conn)

# Error handler for database connection issues
@app.errorhandler(psycopg2.DatabaseError)
def handle_db_error(e):
    return jsonify({"message": "A database error occurred"}), 500

# Endpoint to create or update assessments (POST)
@app.route('/api/assessments', methods=['POST'])
def create_assessment():
    data = request.json
    required_fields = {
        "title": "title",
        "type": "type",
        "questions": "questions",
        "instructions": "instructions",
        "time_limit": "timeLimit",
        "attempts": "attempts",
        "feedback": "feedback",
        "course_content": "courseContent"
    }

    for key, field_name in required_fields.items():
        if field_name not in data:
            return jsonify({"message": f"Missing required field: {field_name}"}), 400

    assessment = {
        "title": data[required_fields["title"]],
        "type": data[required_fields["type"]],
        "questions": data[required_fields["questions"]],
        "instructions": data[required_fields["instructions"]],
        "time_limit": data[required_fields["time_limit"]],
        "attempts": data[required_fields["attempts"]],
        "feedback": data[required_fields["feedback"]],
        "course_content": data[required_fields["course_content"]]
    }

    conn = get_db_connection()
    try:
        with conn.cursor() as cur:
            cur.execute("""
                INSERT INTO assignments (title, type, instructions, time_limit, attempts, feedback, course_content, created_by)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s) RETURNING id
            """, (assessment['title'], assessment['type'], assessment['instructions'], assessment['time_limit'],
                  assessment['attempts'], assessment['feedback'], assessment['course_content'], 'teacher'))
            assessment_id = cur.fetchone()[0]

            for idx, question in enumerate(assessment['questions']):
                question_id = question.get('id') or idx + 1
                cur.execute("""
                    INSERT INTO assessment_questions (assessment_id, question_id, title, options, category)
                    VALUES (%s, %s, %s, %s, %s)
                """, (assessment_id, question_id, question['title'], json.dumps(question['options']), question['category']))
        conn.commit()
        return jsonify({"message": "Assessment created successfully"}), 201
    except Exception as e:
        print(f"Error during assessment creation: {e}")
        return jsonify({"message": "An error occurred during assessment creation"}), 400
    finally:
        release_db_connection(conn)

# Endpoint to delete an assessment (DELETE)
@app.route('/api/assessments/<int:assessment_id>', methods=['DELETE'])
def delete_assessment(assessment_id):
    conn = get_db_connection()
    try:
        with conn.cursor() as cur:
            cur.execute("DELETE FROM assessment_questions WHERE assessment_id = %s", (assessment_id,))
            cur.execute("DELETE FROM assignments WHERE id = %s", (assessment_id,))
        conn.commit()
        return jsonify({"message": "Assessment deleted successfully"}), 200
    except Exception as e:
        print(f"Error during assessment deletion: {e}")
        return jsonify({"message": "An error occurred during assessment deletion"}), 400
    finally:
        release_db_connection(conn)

# Endpoint to fetch a list of all assignments (GET)
@app.route('/api/assessments', methods=['GET'])
def get_all_assignments():
    conn = get_db_connection()
    try:
        with conn.cursor() as cur:
            # Fetch all assignments
            cur.execute("SELECT id, title, type, instructions, time_limit, attempts, feedback, course_content FROM assignments")
            assignments = cur.fetchall()

            # Prepare the response
            columns = [desc[0] for desc in cur.description]
            assignments = [dict(zip(columns, row)) for row in assignments]

        return jsonify({"assignments": assignments}), 200
    except Exception as e:
        print(f"Error fetching assignments: {e}")
        return jsonify({"message": "An error occurred while fetching assignments"}), 500
    finally:
        release_db_connection(conn)

# Endpoint to fetch detailed information about an assignment (GET)
@app.route('/api/assessments/<int:assignment_id>', methods=['GET'])
def get_assignment_details(assignment_id):
    conn = get_db_connection()
    try:
        with conn.cursor() as cur:
            # Fetch assignment details
            cur.execute("""
                SELECT * FROM assignments WHERE id = %s
            """, (assignment_id,))
            assignment = cur.fetchone()

            if not assignment:
                return jsonify({"message": "Assignment not found"}), 404

            columns = [desc[0] for desc in cur.description]
            assignment = dict(zip(columns, assignment))

            # Fetch questions associated with the assignment
            cur.execute("""
                SELECT * FROM assessment_questions WHERE assessment_id = %s
            """, (assignment_id,))
            questions = cur.fetchall()
            question_columns = [desc[0] for desc in cur.description]
            questions = [dict(zip(question_columns, row)) for row in questions]

        return jsonify({"assignment": assignment, "questions": questions}), 200
    except Exception as e:
        print(f"Error fetching assignment details: {e}")
        return jsonify({"message": "An error occurred while fetching assignment details"}), 500
    finally:
        release_db_connection(conn)

# Student signup endpoint (POST)
@app.route('/signup/student', methods=['POST'])
def signup_student():
    data = request.json
    required_fields = ["name", "studentId", "email", "password"]
    
    if not data or not all(field in data for field in required_fields):
        return jsonify({"message": "Missing required fields"}), 400

    hashed_password = bcrypt.hashpw(data['password'].encode('utf-8'), bcrypt.gensalt())

    conn = get_db_connection()
    try:
        with conn.cursor() as cur:
            cur.execute("INSERT INTO students (name, student_id, email, password) VALUES (%s, %s, %s, %s)",
                        (data['name'], data['studentId'], data['email'], hashed_password.decode('utf-8')))
        conn.commit()
        return jsonify({"message": "Student signed up successfully"}), 201
    except psycopg2.IntegrityError:
        return jsonify({"message": "Email or Student ID already exists"}), 409
    except Exception as e:
        print(f"Error during signup: {e}")
        return jsonify({"message": "An error occurred during signup"}), 400
    finally:
        release_db_connection(conn)

# Teacher signup endpoint (POST)
@app.route('/signup/teacher', methods=['POST'])
def signup_teacher():
    data = request.json
    required_fields = ["name", "teacherId", "email", "password"]
    
    if not data or not all(field in data for field in required_fields):
        return jsonify({"message": "Missing required fields"}), 400

    hashed_password = bcrypt.hashpw(data['password'].encode('utf-8'), bcrypt.gensalt())

    conn = get_db_connection()
    try:
        with conn.cursor() as cur:
            cur.execute("INSERT INTO teachers (name, teacher_id, email, password) VALUES (%s, %s, %s, %s)",
                        (data['name'], data['teacherId'], data['email'], hashed_password.decode('utf-8')))
        conn.commit()
        return jsonify({"message": "Teacher signed up successfully"}), 201
    except psycopg2.IntegrityError:
        return jsonify({"message": "Email or Teacher ID already exists"}), 409
    except Exception as e:
        print(f"Error during signup: {e}")
        return jsonify({"message": "An error occurred during signup"}), 400
    finally:
        release_db_connection(conn)

# Student login endpoint (POST)
@app.route('/login/student', methods=['POST'])
def login_student():
    data = request.json
    if not data or not all(k in data for k in ("idOrEmail", "password")):
        return jsonify({"message": "Missing required fields"}), 400

    conn = get_db_connection()
    try:
        with conn.cursor() as cur:
            cur.execute("SELECT * FROM students WHERE (email=%s OR student_id=%s)",
                        (data['idOrEmail'], data['idOrEmail']))
            user = cur.fetchone()
            if user and bcrypt.checkpw(data['password'].encode('utf-8'), user[4].encode('utf-8')):
                return jsonify({"message": "Student login successful"}), 200
            else:
                return jsonify({"message": "Invalid credentials"}), 401
    except Exception as e:
        print(f"Error during login: {e}")
        return jsonify({"message": "An error occurred during login"}), 400
    finally:
        release_db_connection(conn)

# Teacher login endpoint (POST)
@app.route('/login/teacher', methods=['POST'])
def login_teacher():
    data = request.json
    if not data or not all(k in data for k in ("idOrEmail", "password")):
        return jsonify({"message": "Missing required fields"}), 400

    conn = get_db_connection()
    try:
        with conn.cursor() as cur:
            cur.execute("SELECT * FROM teachers WHERE (email=%s OR teacher_id=%s)",
                        (data['idOrEmail'], data['idOrEmail']))
            user = cur.fetchone()
            if user and bcrypt.checkpw(data['password'].encode('utf-8'), user[4].encode('utf-8')):
                return jsonify({"message": "Teacher login successful"}), 200
            else:
                return jsonify({"message": "Invalid credentials"}), 401
    except Exception as e:
        print(f"Error during login: {e}")
        return jsonify({"message": "An error occurred during login"}), 400
    finally:
        release_db_connection(conn)

# Example of a protected route (GET) - removed JWT authentication
@app.route('/protected', methods=['GET'])
def protected():
    return jsonify({"message": "This route is now public"}), 200

if __name__ == '__main__':
    app.run(debug=True)
