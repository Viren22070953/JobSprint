# HireLens — AI-Powered Resume Analyzer & Job Matcher

HireLens is a full-stack web application that leverages **Generative AI** to help job seekers evaluate their resumes, match them against job descriptions, and prepare for interviews with a personalized roadmap.

---

## 🚀 Live Demo

> Coming Soon / [Deploy Link Here]

---

## 📌 Features

- 📄 **Resume Score** — AI analyzes your resume and gives a detailed score based on relevance and quality
- 🎯 **Job Matching** — Matches your resume against a target job description to measure fitment
- 🧠 **Technical Interview Questions** — Auto-generates role-specific technical questions based on your profile
- 💬 **Behavioral Interview Questions** — Generates HR/behavioral questions tailored to your experience
- 📊 **Skill Gap Analysis** — Identifies missing skills required for your target role
- 🗓️ **Day-wise Preparation Plan** — Provides a structured, personalized study roadmap to bridge skill gaps
- 🔐 **Secure Authentication** — JWT-based login/signup with Redis token blacklisting to prevent session reuse

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React.js, Tailwind CSS |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB |
| **AI Integration** | Google Gemini API |
| **Authentication** | JWT + Redis Token Blacklisting |
| **Deployment** | Vercel (Frontend), Render (Backend) |

---

## 📁 Project Structure
HireLens/

├── client/                  # React frontend

│   ├── src/

│   │   ├── components/      # Reusable UI components

│   │   ├── pages/           # Route-level pages

│   │   └── services/        # API call handlers

├── server/                  # Node.js + Express backend

│   ├── controllers/         # Route logic

│   ├── routes/              # API endpoints

│   ├── models/              # Mongoose schemas

│   ├── middleware/          # Auth, error handling

│   └── utils/               # Gemini AI integration, helpers

└── README.md

---

## ⚙️ Getting Started

### Prerequisites

- Node.js v18+
- MongoDB (local or Atlas)
- Redis (local or Upstash)
- Google Gemini API Key

### Installation

```bash
# Clone the repository
git clone https://github.com/Viren22070953/HIreLens.git
cd HIreLens
```

```bash
# Install server dependencies
cd server
npm install
```

```bash
# Install client dependencies
cd ../client
npm install
```

### Environment Variables

Create a `.env` file inside the `server/` directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
REDIS_URL=your_redis_url
GEMINI_API_KEY=your_google_gemini_api_key
```

### Run the App

```bash
# Start backend
cd server
npm run dev

# Start frontend
cd ../client
npm start
```

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login and receive JWT |
| POST | `/api/auth/logout` | Blacklist token via Redis |
| POST | `/api/analyze/resume` | Analyze resume + job description |
| GET | `/api/analyze/questions` | Fetch generated interview questions |
| GET | `/api/analyze/skillgap` | Fetch skill gap + preparation plan |

---

## 🧠 How It Works

User Input (Resume + Self Description + Job Description)

│

▼

Google Gemini API

│

├──▶ Resume Score

├──▶ Technical Questions

├──▶ Behavioral Questions

├──▶ Skill Gap Analysis

└──▶ Day-wise Preparation Plan

---

## 🔐 Security

- Passwords hashed using **bcrypt**
- **JWT tokens** for stateless authentication
- **Redis-based token blacklisting** ensures logged-out tokens cannot be reused
- Environment variables used for all sensitive credentials

---

## 🙌 Author

**Viren Rahangdale**
- 📧 [virenrahangdale12@gmail.com](mailto:virenrahangdale12@gmail.com)
- 💼 [LinkedIn](https://linkedin.com/in/viren-rahangdale)
- 🐙 [GitHub](https://github.com/Viren22070953)
- 💻 [LeetCode](https://leetcode.com/u/Viren_Rahangdale)

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

> ⭐ If you found this project helpful, please consider giving it a star!
