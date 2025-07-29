# monkey_river_team_10
# Monkey & River Hackathon 2025 – Full Stack App

## 🚀 Challenge Overview

This project was built as part of the **#MonkeyAndRiverHackathon2025**, hosted by [Monkey & River](https://monkeyandriver.com) in collaboration with [Momentum Life Insurance](https://momentum.co.za) and [Otinga.io](https://otinga.io).

The goal was to bootstrap a full-stack application and implement core features including authentication, database connectivity, and a working CRUD interface for a chosen domain.

---

## 🧱 Stack Choice

**Frontend:** React  
**Backend:** Node.js + Express  
**Authentication:** JWT-based Auth  
**Database:** MongoDB (via MongoDB Atlas)

This stack was chosen for its flexibility, JavaScript end-to-end simplicity, and ease of setup — ideal for rapid development under time constraints.

---

## 📦 Features Implemented

### ✅ Authentication & Authorization
- User registration and login
- Password hashing with bcrypt
- JWT tokens for session management
- All feature routes are protected by auth middleware

### ✅ Database Connection
- Connected to MongoDB Atlas
- Health check endpoint at: `/api/health`

### ✅ Required Pages / Features

#### 1. User Profile & Preferences
- View and edit:
  - Name
  - Email
  - Password
  - Settings: `emailNotifications` and `riskThreshold`
- Changes persist to MongoDB

#### 2. Alerts / Notifications Dashboard
- Alerts stored in database
- Each alert shows:
  - Timestamp
  - Title
  - Status (e.g. Active, Resolved)

#### 3. Entity CRUD Page (AI for Health)
- Entity: `DiagnosticTest`
  - Fields: `id`, `name`, `result`, `date`
- Full Create, Read, Update, Delete support via API + UI

---

## 🧪 Testing

Automated tests were written to validate:
- Authentication flow
- DB connectivity
- Core CRUD logic
- Feature routes

### Run tests:
```bash
# From /server
npm run test


Developers:

Mandla Mbolekwa
Thato "Tom" Kekae
Entle Matshikiza
Mokgethwa Kambula
Siphamandla Mbatha 
