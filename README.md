Hospital Management System
A full-stack Hospital Management System designed to manage core hospital operations such as patient records, doctor profiles, appointments, and prescriptions.

The system is built using a modular architecture with:
•	React for the frontend
•	Spring Boot for the primary backend API
•	Flask for the AI Assistant service
•	PostgreSQL for persistent data storage
The application demonstrates full-stack development practices including REST API design, layered backend architecture, JWT-based authentication, and modular frontend architecture.
________________________________________
System Architecture
The application is composed of three main components.

Frontend
React application responsible for UI, routing, and communication with backend services.
Primary Backend

Spring Boot REST API responsible for core hospital operations.
AI Assistant Service

A separate Flask service responsible for AI-based analysis and assistance features.
React Frontend
      │
      │ REST API
      ▼
Spring Boot Backend
      │
      │ JPA / Hibernate
      ▼
PostgreSQL Database


React Frontend
      │
      │ HTTP Requests
      ▼
Flask AI Assistant Service
The frontend communicates with both services depending on the functionality being used.
________________________________________
Core Features
Authentication and Security
•	JWT-based authentication
•	Secure login endpoint
•	Token-based request authorization
•	Role-based access control
Supported roles:
•	Admin
•	Doctor
Certain operations are restricted based on the authenticated user's role.
________________________________________
Patient Management
•	Register and manage patient records
•	Store patient medical information
•	Maintain patient details for appointments and prescriptions
________________________________________
Doctor Management
•	Manage doctor profiles
•	Associate doctors with appointments
•	Track doctor information
________________________________________
Appointment Scheduling
•	Create appointments between patients and doctors
•	Track appointment status
•	Manage scheduling information
________________________________________
Prescription Management
•	Create prescriptions for patients
•	Add prescription items
•	Track medications issued by doctors
________________________________________
Dashboard
The dashboard provides a high-level overview of hospital activity including:
•	Patient statistics
•	Doctor statistics
•	Appointment information
________________________________________
AI Medical Assistant
The system includes a separate AI Assistant service built with Flask.
This service provides AI-driven features such as:
•	Analyzing patient symptoms
•	Providing medical insights
•	Supporting clinical decision assistance
The AI assistant operates as an independent microservice and communicates with the frontend through HTTP requests.
________________________________________
Technology Stack
Frontend
•	React
•	React Router
•	Axios
Frontend code is organized using a feature-based architecture.
________________________________________
Backend (Core API)
•	Spring Boot
•	Spring Security
•	JWT Authentication
•	Spring Data JPA
•	ModelMapper
•	Maven
________________________________________
AI Service
•	Flask (Python)
•	REST API endpoints for AI assistant functionality
________________________________________
Database
•	PostgreSQL
________________________________________
Backend Architecture
The Spring Boot backend follows a layered architecture.
controller
service
repository
entity
dto
mapper
security
config
exception
Request flow:
Controller → Service → Repository → Database
________________________________________
Security
Authentication is handled using JWT tokens.
Typical authentication flow:
1.	User submits login credentials
2.	Backend validates credentials
3.	JWT token is generated
4.	Token is returned to the frontend
5.	Frontend attaches token to protected API requests
Authorization rules restrict certain endpoints based on user roles.
________________________________________
Running the Project
Backend (Spring Boot)
cd hms-backend
mvn spring-boot:run
Backend will run on:
http://localhost:8080
________________________________________
AI Assistant Service (Flask)
Run the Flask service from the AI assistant directory:
python app.py
The service will expose endpoints used by the frontend for AI-related features.
________________________________________
Frontend
npm install
npm run dev
Frontend runs on:
http://localhost:5173

PROJECT REPOSITORIES

Frontend
https://github.com/MohammadSafwan97/React-HMS-FrontEnd

Backend (Spring Boot)
https://github.com/MohammadSafwan97/Spring-Boot-Hospital-Management-System-Backend

AI Assistant Service
https://github.com/MohammadSafwan97/hms-ai-assistant
________________________________________
Future Improvements
The following improvements are planned:
•	API documentation using OpenAPI / Swagger
•	Pagination for large datasets
•	Unit and integration tests
•	Docker containerization
•	CI/CD pipeline
•	Expanded role-based permissions

PROJECT DEMO LINK 
https://react-hms-front-end.vercel.app
________________________________________
Author
This project was developed as a portfolio project demonstrating full-stack Java development including secure REST APIs, modular frontend architecture, and multi-service backend design.

