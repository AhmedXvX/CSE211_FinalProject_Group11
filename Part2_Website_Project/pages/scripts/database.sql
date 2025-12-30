-- Create Database
CREATE DATABASE IF NOT EXISTS eventsx;
USE eventsx;

-- Create Events Table
CREATE TABLE IF NOT EXISTS events (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    date DATE NOT NULL,
    location VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    cost DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Registrations Table
CREATE TABLE IF NOT EXISTS registrations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    event_id INT NOT NULL,
    tickets INT NOT NULL DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (event_id) REFERENCES events(id)
);

-- Create Contact Messages Table
CREATE TABLE IF NOT EXISTS contact_messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert Dummy Events
INSERT INTO events (name, date, location, category, cost) VALUES
('Spring 2026 Semester Welcome & Orientation', '2026-02-07', 'GU Campus, Building B', 'Academic', 0.00),
('Robocon 2026: Campus Qualifiers', '2026-02-10', 'GU Campus, Smart Systems Lab', 'Competition', 0.00),
('Basics of Structural Bioinformatics Workshop', '2026-02-22', 'GU Campus, CS Faculty Labs', 'Workshop', 500.00),
('GU Spring Employment Fair 2026', '2026-03-16', 'GU Campus, Exhibition Grounds', 'Career', 0.00),
('Guest Lecture: Future of Digital Banking', '2026-03-25', 'GU Campus, Auditorium 1', 'Seminar', 0.00),
('EED 2026 Graduation Project Showcase', '2026-04-05', 'Cairo International Convention Centre', 'Exhibition', 100.00),
('IEEE 3SCEA 2026 Conference', '2026-04-19', 'Fairmont Nile City Hotel, Cairo', 'Conference', 1500.00),
('GU CS Hackathon: AI for Sustainability', '2026-04-24', 'GU Campus, Innovation Hub', 'Hackathon', 0.00),
('National AI Challenge 2026 Finals', '2026-05-10', 'New Administrative Capital', 'Competition', 0.00),
('Faculty of CS Senior Project Defense', '2026-06-15', 'GU Campus, Building B', 'Academic', 0.00),
('CES 2026', '2026-01-06', 'Las Vegas, USA', 'Tech Conference', 100.00),
('MWC Barcelona 2026', '2026-03-02', 'Barcelona, Spain', 'Tech Conference', 799.00),
('NVIDIA GTC 2026', '2026-03-16', 'San Jose, USA', 'AI Conference', 0.00),
('LEAP 2026 Tech Conference', '2026-04-13', 'Riyadh, Saudi Arabia', 'Tech Expo', 0.00),
('Google I/O 2026', '2026-05-14', 'Online', 'Developer Conference', 0.00),
('WWDC 2026', '2026-06-08', 'Online', 'Developer Conference', 0.00);
