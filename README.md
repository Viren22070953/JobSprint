# JobSprint - AI-Powered Interview Preparation Platform

JobSprint is a full-stack MERN application that helps job seekers prepare for interviews with AI-generated resume insights, job match scoring, technical questions, behavioral questions, skill gap analysis, and personalized preparation plans.

The platform allows users to upload a resume, paste a job description, describe their goals, and receive a structured interview preparation report powered by Google Gemini.

## Live Demo

- Frontend: https://job-sprint-opal.vercel.app
- Backend API: https://jobsprint-370a.onrender.com

## Features

- AI resume and job description analysis
- Match score generation based on role fit
- Resume upload support with PDF parsing
- Personalized technical interview questions
- Behavioral interview question generation
- Skill gap analysis with severity levels
- 7-day preparation roadmap
- AI-generated resume PDF download
- User authentication with JWT cookies
- Secure password hashing with bcrypt
- Protected dashboard and report routes
- My Reports page for saved interview analyses
- Delete report functionality
- Profile page with authenticated user details
- Responsive modern dark UI
- Docker-ready frontend and backend setup
- Production deployment support for Vercel and Render

## Tech Stack

| Layer | Technology |
| --- | --- |
| Frontend | React, Vite, React Router, Axios, SCSS/CSS |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| Authentication | JWT, HTTP-only cookies, bcrypt |
| AI | Google Gemini API via `@google/genai` |
| File Handling | Multer, pdf-parse |
| PDF Generation | Puppeteer, Chromium |
| Deployment | Vercel, Render |
| Containerization | Docker, Docker Compose, Nginx |

## Project Structure

```text
FullStack_GenAI/
|-- Backend/
|   |-- src/
|   |   |-- controller/
|   |   |-- db/
|   |   |-- middleware/
|   |   |-- models/
|   |   |-- routes/
|   |   `-- services/
|   |-- Dockerfile
|   |-- package.json
|   `-- server.js
|-- Frontend/
|   |-- public/
|   |-- src/
|   |   |-- components/
|   |   |-- features/
|   |   |-- hooks/
|   |   |-- pages/
|   |   `-- styles/
|   |-- Dockerfile
|   |-- nginx.conf
|   `-- package.json
|-- docker-compose.yml
`-- README.md
```

## Core Workflow

1. User registers or logs in.
2. User starts a new analysis.
3. User uploads a resume and enters a job description.
4. Backend extracts resume text and sends structured context to Gemini.
5. AI returns a match score, questions, skill gaps, and a preparation plan.
6. The report is saved in MongoDB and displayed in the dashboard.
7. User can view, download, or delete reports.

## API Endpoints

### Authentication

| Method | Endpoint | Description |
| --- | --- | --- |
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Log in user and set auth cookie |
| GET | `/api/auth/logout` | Log out user and clear auth cookie |
| GET | `/api/auth/get-me` | Get authenticated user profile |

### Interview Reports

| Method | Endpoint | Description |
| --- | --- | --- |
| POST | `/api/interview/report-generate` | Generate AI interview report |
| GET | `/api/interview/` | Get all reports for logged-in user |
| GET | `/api/interview/report/:interviewId` | Get a single report |
| GET | `/api/interview/resume/pdf/:interviewReportId` | Generate and download resume PDF |
| DELETE | `/api/interview/delete-report/:interviewReportId` | Delete a report |

## Environment Variables

Create `Backend/.env`:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GOOGLE_GENAI_API_KEY=your_google_genai_api_key
NODE_ENV=production
```

Create `Frontend/.env`:

```env
VITE_API_URL=http://localhost:5000
```

For production on Vercel, set:

```env
VITE_API_URL=https://jobsprint-370a.onrender.com
```

## Local Development

### Backend

```bash
cd Backend
npm install
npm run dev
```

Backend runs on:

```text
http://localhost:5000
```

### Frontend

```bash
cd Frontend
npm install
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

## Docker Setup

Build and run the complete project:

```bash
docker compose up --build
```

Run in detached mode:

```bash
docker compose up -d --build
```

Stop containers:

```bash
docker compose down
```

Docker URLs:

```text
Frontend: http://localhost:3000
Backend:  http://localhost:5000
```

## Deployment

### Backend on Render

Recommended Render settings:

```text
Root Directory: Backend
Runtime: Docker
Dockerfile Path: ./Dockerfile
```

Required Render environment variables:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GOOGLE_GENAI_API_KEY=your_google_genai_api_key
NODE_ENV=production
```

### Frontend on Vercel

Recommended Vercel settings:

```text
Root Directory: Frontend
Framework Preset: Vite
Build Command: npm run build
Output Directory: dist
Install Command: npm install
```

Required Vercel environment variable:

```env
VITE_API_URL=https://jobsprint-370a.onrender.com
```

## Security

- Passwords are hashed with bcrypt.
- JWT tokens are stored in HTTP-only cookies.
- Protected routes require a valid auth token.
- Production cookies are configured for secure cross-site deployment.
- Sensitive credentials are managed with environment variables.
- `.env` files are ignored by Git.

## Scripts

### Backend

```bash
npm run dev
npm start
```

### Frontend

```bash
npm run dev
npm run build
npm run lint
npm run preview
```

## Author

**Viren Rahangdale**

- Email: [virenrahangdale12@gmail.com](mailto:virenrahangdale12@gmail.com)
- GitHub: [Viren22070953](https://github.com/Viren22070953)
- LinkedIn: [viren-rahangdale](https://linkedin.com/in/viren-rahangdale)
- LeetCode: [Viren_Rahangdale](https://leetcode.com/u/Viren_Rahangdale)

## License

This project is licensed under the ISC License.
