# Ride Sharing Platform 🚗🌎

Welcome to the Ride Sharing Platform repository! This project is a comprehensive solution for facilitating ride-sharing among users with a focus on scalability, real-time notifications, security, and ease of use. The platform allows users to connect, share rides, track their journey, and provide feedback – all managed through a well-organized and user-friendly interface.

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Setup and Installation](#setup-and-installation)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Frontend Overview](#frontend-overview)
- [Backend Overview](#backend-overview)
- [Additional Integrations](#additional-integrations)
- [Future Improvements](#future-improvements)
- [License](#license)

---

## Features 🛠️

### User Roles
- **Traveler**: Can request rides and join existing rides.
- **Traveler Companion**: Can accompany a Traveler in a shared ride.
- **Admin**: Manages the platform, including rides, users, and feedback.

### Core Functionalities
- **Ride Sharing via WhatsApp/SMS**: Users can share ride details with others through WhatsApp or SMS.
- **Real-time Location Tracking**: Leveraging the Mapbox API, users can track rides in real-time.
- **Geofencing-based Notifications**: Receive alerts when users enter or leave predefined geofenced areas.
- **Secure Authentication**: JWT-based authentication for secure user sessions.
- **Feedback Mechanism**: Users can provide feedback on rides, enhancing the platform's quality.

---

## Tech Stack ⚙️

### Frontend
- **React**: For building responsive and interactive UI.
- **Mapbox API**: Utilized for map rendering, geolocation, navigation, and route visualization.
  
### Backend
- **Node.js & Express**: Efficient and scalable server-side application development.
- **Java (Spring)**: Used for developing some backend services to enhance robustness.
- **MongoDB**: For storing ride and user-related data, allowing scalability and flexibility in data management.

### Notifications
- **Twilio API**: Integrated to send notifications to users on WhatsApp or via SMS, ensuring real-time alerts and updates.

### Additional Libraries
- **JWT**: Secure session management for user authentication.
- **Mongoose**: ODM library for MongoDB to manage database interactions smoothly.
- **Axios**: For handling API requests in the frontend.
- **Mapbox GL**: Enables high-quality map rendering and customization.

---

## Setup and Installation 🚀

### Prerequisites
- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)
- [Mapbox API Key](https://www.mapbox.com/)
- [Twilio API Key](https://www.twilio.com/)

### Installation
1. **Clone the repository**:
   ```bash
   git clone https://github.com/AnantBansal02/Ride-Sharing-Platform.git
   cd Ride-Sharing-Platform
   ```
2. **Install Backend Dependencies**:
   ```bash
   npm install
   ```
3. **Install Frontend Dependencies**:
   ```bash
   cd ../frontend
   npm install
   ```
4. Environment Variables: Create a .env file in both root and frontend directories with the following keys (root for backend):
   **Backend `.env`**:
   
