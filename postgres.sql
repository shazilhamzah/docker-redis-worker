-- Active: 1741463326504@@20.106.195.225@5432@postgres
CREATE TABLE students_avg_grades (
    id SERIAL PRIMARY KEY,
    student_id INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    average_grade DECIMAL(4,2) NOT NULL
);


SELECT * FROM students_avg_grades;


DELETE  FROM students_avg_grades;