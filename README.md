# 🏨 Hotel Management System (Frontend)

A modern, scalable **frontend application** for the Hotel Management System built with **Next.js (App Router)**.  
It integrates with a RESTful backend to handle rooms, bookings, guests, payments, and staff management.

Built with **Next.js**, **Tailwind CSS**, **shadcn/ui**, **TanStack Form**, and **Better Auth**, this project delivers a clean, responsive, and production-ready UI experience.

---

## 🔗 Project Links

| Resource | URL |
|----------|-----|
| 🖥️ Frontend Repository | https://github.com/mdopi2024/B6A5-CLIENT-SIDE |
| 🖥️ Backend Repository | https://github.com/mdopi2024/B6A5-backend-server |
| 🚀 Live Demo (Vercel) | https://boshonto-totel-management-frontend.vercel.app |

---

## ⚙️ Tech Stack

| Technology | Description |
|------------|------------|
| Next.js (App Router) | React Framework |
| Tailwind CSS | Styling |
| shadcn/ui | UI Components |
| Better Auth | Authentication |
| TanStack Form | Form Handling |
| Axios / Fetch | API Requests |
| Stripe | Payment Integration |

---

## ✨ Features

### 🔐 Authentication System (Better Auth)
- Secure login & registration
- Session-based authentication
- Protected routes
- Role-based UI (Admin / Staff / Guest)

---

### 🏠 Room Management UI
- View available rooms
- Filter and explore room details
- Responsive room cards UI

---

### 📅 Booking System
- Book rooms with date selection
- Real-time validation
- Prevent double booking

---

### 👤 Guest Dashboard
- View profile information
- Booking history tracking
- Account management

---

### 💳 Payment System (Stripe)
- Stripe checkout integration
- Secure payment flow
- Payment status tracking

---

### 👨‍💼 Admin Dashboard
- Manage rooms
- Manage bookings
- Manage staff and guests
- View system overview

---

## 🛠️ Getting Started

### 📥 Installation

```bash
git clone #
cd hotel-management-frontend
npm install


# BACKEND CONFIG
BACKEND_URL=http://localhost:5000
API_URL=http://localhost:5000/api/v1
AUTH_URL=http://localhost:5000/api/auth

# STRIPE CONFIG
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=your_stripe_public_key

# BETTER AUTH CONFIG
BETTER_AUTH_SECRET=your_better_auth_secret
BETTER_AUTH_URL=http://localhost:5000

# FRONTEND CONFIG
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
NEXT_PUBLIC_BACKEND_URL=http://localhost:5000
NEXT_PUBLIC_FRONTEND_URL=http://localhost:3000

# Development
npm run dev

# Production build
npm run build

npm start