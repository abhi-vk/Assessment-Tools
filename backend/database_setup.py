import psycopg2
import os

# Database connection settings
DB_URL = os.getenv("DATABASE_URL", "postgresql://postgres:Abhi-2002@localhost:5432/assignment-tools")

# Connect to PostgreSQL
try:
    conn = psycopg2.connect(DB_URL)
    cur = conn.cursor()
except Exception as e:
    print(f"Error connecting to the database: {e}")
    exit()

# Create tables for students and teachers if they don't exist
def create_tables():
    try:
        cur.execute("""
        CREATE TABLE IF NOT EXISTS students (
            id SERIAL PRIMARY KEY,
            name VARCHAR(1000),
            student_id VARCHAR(50) UNIQUE,
            email VARCHAR(1000) UNIQUE,
            password VARCHAR(1000)
        )
        """)
        cur.execute("""
        CREATE TABLE IF NOT EXISTS teachers (
            id SERIAL PRIMARY KEY,
            name VARCHAR(1000),
            teacher_id VARCHAR(50) UNIQUE,
            email VARCHAR(1000) UNIQUE,
            password VARCHAR(1000)
        )
        """)
        cur.execute("""
        CREATE TABLE IF NOT EXISTS assignments (
            id SERIAL PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            type VARCHAR(50) NOT NULL,
            instructions TEXT,
            time_limit INTEGER,
            attempts INTEGER,
            feedback TEXT,
            course_content TEXT,
            questions JSONB, -- Store questions in JSONB format
            created_by INTEGER REFERENCES teachers(id),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
        """)
        cur.execute("""
        CREATE TABLE IF NOT EXISTS assessment_questions (
            id SERIAL PRIMARY KEY,
            assessment_id INTEGER REFERENCES assignments(id),
            question_id INTEGER,
            title TEXT,
            options JSONB,
            category VARCHAR(100)
        )
        """)

        # Commit the changes
        conn.commit()
        print("Tables created successfully.")
    except Exception as e:
        print(f"Error creating tables: {e}")
        conn.rollback()

if __name__ == "__main__":
    create_tables()
    cur.close()
    conn.close()
