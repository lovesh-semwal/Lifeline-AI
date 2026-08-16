# 🚑 LifeLine-AI

### AI-Powered Emergency Healthcare Platform

LifeLine-AI is a **full-stack emergency healthcare platform** designed to help users quickly access essential healthcare resources during critical situations. The platform brings emergency reporting, nearby hospital discovery, blood donor assistance, AI-powered guidance, location-based services, and real-time communication together in one centralized application.

The goal of LifeLine-AI is to **reduce the time and effort required to find appropriate healthcare resources during emergencies** and provide users with a simple, accessible, and responsive digital platform.

---

## 🌟 Features

### 🚨 Emergency Reporting

Users can report medical emergencies and provide important information that can help in emergency situations.

### 🏥 Nearby Hospitals

Users can discover nearby hospitals using location-based services, making it easier to identify healthcare facilities when immediate assistance is required.

### 🩸 Blood Donor Search

The platform helps users search for suitable blood donors based on blood-group requirements.

### 🤖 AI Healthcare Assistant

An AI-powered assistant provides preliminary health-related information and guidance using the **Google Gemini API**.

> ⚠️ The AI assistant is intended for informational and preliminary guidance purposes and should not replace professional medical advice.

### 📍 Location-Based Services

Location functionality helps users identify relevant healthcare resources based on their location.

### 💬 Real-Time Communication

**Socket.IO** is used to support real-time communication within the application.

### 👤 User Profile

Users can manage their profile and relevant personal information through the platform.

### 🔐 Authentication & Security

Secure authentication is implemented using **JWT** and password hashing with **bcrypt.js**.

### 📱 Responsive Interface

The frontend is designed to provide a responsive experience across different screen sizes.

---

## 🛠️ Technology Stack

### Frontend

* React.js
* Vite
* JavaScript
* HTML5
* CSS3
* Tailwind CSS
* React Router
* Redux Toolkit
* Axios
* Framer Motion
* React Icons

### Backend

* Node.js
* Express.js
* REST APIs
* Socket.IO

### Database

* MongoDB
* Mongoose

### AI & External Services

* Google Gemini API
* Google Maps API
* Firebase
* Cloudinary

### Authentication & Security

* JSON Web Tokens (JWT)
* bcrypt.js

### Development & Deployment

* Git
* GitHub
* VS Code
* Vercel

---

## 🏗️ System Architecture

```text
                    ┌──────────────────────┐
                    │       User           │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │   React Frontend     │
                    │   Vite + Tailwind    │
                    └──────────┬───────────┘
                               │
                         REST APIs
                               │
                               ▼
                    ┌──────────────────────┐
                    │   Node.js + Express  │
                    │       Backend        │
                    └──────┬───────┬───────┘
                           │       │
              ┌────────────┘       └────────────┐
              ▼                                 ▼
     ┌─────────────────┐               ┌─────────────────┐
     │    MongoDB      │               │ External APIs   │
     │   + Mongoose    │               │ Gemini / Maps   │
     └─────────────────┘               └─────────────────┘
                           │
                           ▼
                    ┌─────────────────┐
                    │    Socket.IO    │
                    │ Real-Time Data  │
                    └─────────────────┘
```

---

## 📂 Project Structure

```text
LifeLine-AI/
│
├── client/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── layouts/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── routes/
│   │   ├── redux/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   ├── app.js
│   ├── server.js
│   ├── db.js
│   └── package.json
│
├── .gitignore
└── README.md
```

---

## 🔑 Main Backend Modules

The backend is organized into separate modules to keep the application scalable and maintainable.

```text
Routes
│
├── authRoutes
├── userRoutes
├── profileRoutes
├── hospitalRoutes
├── donorRoutes
├── emergencyRoutes
├── aiRoutes
└── chatRoutes
```

### Database Models

```text
User
Hospital
BloodDonor
Emergency
Chat
```

### Middleware

```text
authMiddleware
adminMiddleware
errorMiddleware
uploadMiddleware
validateMiddleware
```

---

## ⚙️ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/lovesh-semwal/Lifeline-AI.git
```

```bash
cd Lifeline-AI
```

---

### 2. Install Frontend Dependencies

```bash
cd client
npm install
```

---

### 3. Install Backend Dependencies

```bash
cd ../server
npm install
```

---

## 🔐 Environment Variables

Create a `.env` file inside the `server` directory.

```env
PORT=5000
NODE_ENV=development

CLIENT_URL=http://localhost:5173

MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret
JWT_EXPIRE=7d

GROQ_API_KEY=your_groq_api_key

```

> **Important:** Never upload your `.env` file, API keys, passwords, or database credentials to GitHub.

---

## ▶️ Run the Project Locally

### Start Backend

From the `server` directory:

```bash
npm run dev
```

The backend will run on:

```text
http://localhost:5000
```

### Start Frontend

Open another terminal:

```bash
cd client
npm run dev
```

The frontend will run on:

```text
http://localhost:5173
```

---

## 🔄 Application Flow

```text
User
  │
  ▼
Login / Register
  │
  ▼
Dashboard
  │
  ├── Emergency Reporting
  │
  ├── Nearby Hospitals
  │
  ├── Blood Donors
  │
  ├── AI Assistant
  │
  ├── Real-Time Communication
  │
  └── User Profile
```

---

## 🎯 Project Objectives

The main objectives of LifeLine-AI are:

* Provide quick access to emergency healthcare resources.
* Make nearby hospitals easier to discover.
* Help users find suitable blood donors.
* Provide preliminary AI-based healthcare guidance.
* Enable location-based healthcare services.
* Provide real-time communication capabilities.
* Bring multiple emergency services into one platform.
* Create a scalable foundation for future healthcare features.

---

## 💡 Problem Statement

During medical emergencies, people may struggle to quickly find nearby hospitals, suitable blood donors, emergency assistance, and reliable preliminary information. These services are often distributed across different platforms, which can increase the time and effort required to access the right resources.

LifeLine-AI addresses this problem by providing a centralized platform that combines multiple emergency healthcare services into a single application, helping users connect with relevant healthcare resources more efficiently.

---

## 🚀 Proposed Solution

LifeLine-AI provides an integrated digital platform where users can report emergencies, discover nearby hospitals, search for blood donors, access an AI-powered healthcare assistant, use location-based services, and communicate in real time. By combining these capabilities within one application, the platform aims to simplify the emergency response process and reduce the effort required to find appropriate healthcare resources.

---

## 📈 Expected Impact

LifeLine-AI aims to improve the accessibility and efficiency of emergency healthcare resources by providing users with a centralized platform for finding hospitals, blood donors, emergency assistance, and preliminary AI-based guidance. By reducing the need to switch between multiple services, the platform can make it easier for users to access relevant resources during critical situations and improve coordination between users and available healthcare services.

---

## 🗺️ Future Roadmap

* [ ] Advanced emergency notifications
* [ ] Improved hospital availability information
* [ ] Enhanced AI healthcare assistant
* [ ] Ambulance assistance and tracking
* [ ] Doctor consultation integration
* [ ] Mobile application
* [ ] Advanced emergency analytics
* [ ] Healthcare organization integration
* [ ] Multilingual support
* [ ] Improved real-time emergency coordination

---

## 🔒 Security Considerations

LifeLine-AI follows basic security practices including:

* JWT-based authentication
* Password hashing using bcrypt.js
* Protected API routes
* Environment variables for sensitive credentials
* Backend validation
* Authentication middleware
* CORS configuration
* Separation of frontend and backend services

---

## 🧪 Testing

The application should be tested across:

* Authentication and authorization
* Emergency reporting
* Hospital search
* Blood donor search
* AI assistant
* API communication
* Database operations
* Real-time communication
* Location services
* Responsive UI
* Error handling

---

## 📸 Screenshots

Add your project screenshots here to showcase the interface.

```text
screenshots/
├── home.png
├── login.png
├── register.png
├── dashboard.png
├── hospitals.png
├── blood-donors.png
├── emergency.png
├── ai-assistant.png
└── profile.png
```

Example:

```markdown
## 📸 Screenshots

### Home Page

![Home Page](screenshots/home.png)

### Dashboard

![Dashboard](screenshots/dashboard.png)

### Emergency Reporting

![Emergency Reporting](screenshots/emergency.png)
```

---

## 🌐 Live Demo

**Live Website:**
lifeline-ai-by-lovesh.vercel.app

**GitHub Repository:**
https://github.com/lovesh-semwal/Lifeline-AI/


---

## 👨‍💻 Developer

### Lovesh Semwal

**B.Tech Computer Science Student**

LifeLine-AI was developed as a **full-stack hackathon project** with the goal of exploring how modern web technologies, AI, location services, and real-time communication can be combined to address real-world emergency healthcare challenges.

---

## 🏆 Project Highlights

* Full-stack web application
* AI integration
* REST API architecture
* MongoDB database
* JWT authentication
* Real-time communication
* Location-based services
* Responsive UI
* Modular frontend and backend architecture
* Cloud/API integrations

---

## ⚠️ Disclaimer

LifeLine-AI is a technology project intended to demonstrate the use of modern web technologies in an emergency healthcare scenario. Information provided by the AI assistant is for preliminary and educational purposes only and should not be considered a substitute for professional medical diagnosis or treatment.

In an actual emergency, users should contact appropriate emergency services or qualified healthcare professionals.

---

## ⭐ Support

If you find this project useful or interesting, consider giving the repository a ⭐ on GitHub.

---

### Built with ❤️ using React, Node.js, MongoDB & AI
