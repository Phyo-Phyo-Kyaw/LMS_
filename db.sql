CREATE TABLE courses (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  level VARCHAR(255),
  price INT,
  certified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);


CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  phone VARCHAR(255),
  role INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
INSERT INTO courses (name, description, level, price, certified, created_at, updated_at)
VALUES (
  'Web Development Bootcamp',
  'Learn HTML, CSS, JavaScript, and build full websites from scratch.',
  'Beginner',
  199,
  TRUE,
  NOW(),
  NOW()
);

CREATE TABLE news (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT,
  tags VARCHAR(255), -- comma-separated tags like 'education,university,updates'
  image_url VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
INSERT INTO news (title, content, tags, image_url)
VALUES (
  'New Semester Announced!',
  'The university has released the schedule for the upcoming semester.',
  'announcement,semester,university',
  'https://example.com/image.jpg'
);
INSERT INTO news (title, content, tags, image_url)
VALUES (
  'New Semester Announced!',
  'The university has released the schedule for the upcoming semester.',
  'announcement,semester,university',
  'https://example.com/image.jpg'
);

CREATE TABLE events (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  location VARCHAR(255),
  date DATE,
  time TIME,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO events (title, description, location, date, time)
VALUES 
  ('Orientation Day', 'Introduction for new students', 'Auditorium', '2025-06-01', '10:00:00'),
  ('Career Fair', 'Meet top companies on campus', 'Main Hall', '2025-06-15', '09:00:00'),
  ('Coding Challenge', 'Compete with peers in real-time coding', 'Lab A1', '2025-06-20', '14:00:00');

CREATE TABLE schedules (
  id INT AUTO_INCREMENT PRIMARY KEY,
  course_name VARCHAR(255) NOT NULL,
  instructor VARCHAR(255),
  day VARCHAR(50),
  time_start TIME,
  time_end TIME,
  location VARCHAR(100)
);
INSERT INTO schedules (course_name, instructor, day, time_start, time_end, location)
VALUES 
  ('Web Development', 'Mr. John ', 'Monday', '09:00:00', '11:00:00', 'Room 101'),
  ('Database Systems', 'Ms. Anna', 'Tuesday', '10:00:00', '12:00:00', 'Lab 202'),
  ('Software Engineering', 'Dr. Ella', 'Wednesday', '13:00:00', '15:00:00', 'Room 105');



CREATE TABLE roles ( id SERIAL PRIMARY KEY,
  name VARCHAR(50) UNIQUE NOT NULL,
created_at TIMESTAMP,
updated_at TIMESTAMP);

INSERT INTO roles (name)
VALUES ('admin'), 
  ('user');
