# HRMS Fullstack Application

**React • Node.js • Express • Prisma • PostgreSQL • Docker**

A full-stack **Human Resource Management System (HRMS)** built with modern web technologies.
This project demonstrates end-to-end development including frontend UI, backend APIs, database modeling, authentication, and containerized infrastructure.

---

  ✨ Features

* User Authentication (Admin / HR roles)
* Department Management
* Employee Management
* Leave Request & Approval Workflow
* RESTful APIs with Express
* Database migrations with Prisma
* PostgreSQL containerized using Docker
* Clean separation of frontend & backend

---

## 🧱 Tech Stack

### Frontend

* React (Vite)
* Axios
* Modern ES Modules

### Backend

* Node.js
* Express.js
* Prisma ORM
* JWT Authentication
* Zod Validation

### Database & DevOps

* PostgreSQL
* Docker & Docker Compose

---

## 📂 Project Structure

```
hrms-fullstack/
│
├── client/              # React frontend
│   ├── src/
│   └── .env.example
│
├── server/              # Node.js backend
│   ├── src/
│   ├── prisma/
│   ├── .env.example
│   └── package.json
│
├── docker-compose.yml   # PostgreSQL container
└── README.md
```

---

## 🚀 How to Run Locally

### 1️⃣ Start PostgreSQL (Docker)

From the project root:

```bash
docker compose up -d
```

Verify:

```bash
docker ps
```

---

### 2️⃣ Backend Setup (Node + Prisma)

```bash
cd server
cp .env.example .env
npm install
npx prisma migrate dev --name init
npm run dev
```

Backend will run on:

```
http://localhost:5001
```

Health check:

```
http://localhost:5001/health
```

---

### 3️⃣ Frontend Setup (React)

Open a **new terminal**:

```bash
cd client
cp .env.example .env
npm install
npm run dev
```

Frontend will run on:

```
http://localhost:5173
```

---

## 🔐 Environment Variables

### Backend (`server/.env`)

```env
PORT=5001
DATABASE_URL="postgresql://hrms:hrms123@localhost:5432/hrmsdb?schema=public"
JWT_SECRET="your_strong_secret_here"
```

### Frontend (`client/.env`)

```env
VITE_API_URL=http://localhost:5001
```

---

## 🧪 Test the Application

1. Open `http://localhost:5173`
2. Register as **HR** or **ADMIN**
3. Login
4. Add Departments
5. Add Employees
6. Create Leave Requests
7. Approve / Reject Leaves

---

## 📦 Git Workflow (Quick Reference)

```bash
git status
git add .
git commit -m "Meaningful commit message"
git pull --rebase origin main
git push origin main
```

---

## 🧠 Learning Outcomes

* Built a full-stack application from scratch
* Understood Dockerized database workflows
* Managed schema migrations with Prisma
* Implemented role-based authentication
* Learned real Git & GitHub workflows
* Debugged real-world port & environment issues

---

## 📌 Future Enhancements

* UI improvements with Tailwind CSS
* Pagination & search
* Role-based UI rendering
* Deployment to AWS / Render / Railway
* CI/CD pipeline with GitHub Actions

---

## 👩‍💻 Author

**Anjana Tulasi**
GitHub: [https://github.com/AnjanaTulasi](https://github.com/AnjanaTulasi)

