# Codebridge — Website

> **Innovate, Develop, Succeed**

A professional, modern, and fast full-stack website showcasing Codebridge's services, team, and portfolio to attract local businesses in Cambodia and international clients. Built with a modern web ecosystem to ensure optimal performance and SEO.

## 🚀 Tech Stack

- **Framework:** Next.js (App Router)
- **Frontend:** React 19, Tailwind CSS v4, Framer Motion, React Icons
- **Backend & DB:** Next.js API Routes, Prisma ORM
- **Authentication:** Custom JWT Auth, Bcrypt.js, Google Auth
- **Utilities:** Nodemailer (Contact Forms), ImageKit (Image hosting & processing)

## ✨ Key Features

- **Fully Responsive:** Seamless experience across mobile, tablet, and desktop.
- **Modern UI/UX:** Clean, minimal, and professional design system using Codebridge brand colors (Navy Blue & Light Blue).
- **Dynamic Animations:** Integrated page transitions and smooth scroll animations using Framer Motion.
- **Portfolio Filtering:** Interactive project gallery with category tabs (All / Web / Mobile / Design).
- **Contact Integration:** Working contact form with email notifications via Nodemailer.
- **Admin Dashboard:** Secure backend portal to manage packages, projects, services, team members, and users.
- **SEO Optimized:** Fast loading times and optimized meta tags.

## 👥 Meet the Team

| Name | Role |
| :--- | :--- |
| **Vibol Sen** | Project Management |
| **Chen SreyNeat** | Digital Marketing & Content |
| **Sam Nisa** | Frontend Development & UI/UX |
| **Khorn SoaKhouch** | Backend Development |
| **Kheang Senghorng** | Backend Development |

## 🛠️ Getting Started

### 1. Prerequisites
Ensure you have Node.js installed on your machine.

### 2. Environment Setup
Create a `.env` file at the root of the project and populate it with your specific keys (Database URL, JWT Secret, ImageKit keys, etc.).

### 3. Install Dependencies
```bash
npm install
```

### 4. Database Setup
Generate the Prisma client:
```bash
npx prisma generate
```

*(Optional)* If you need to push the schema to your database or run migrations:
```bash
npx prisma db push
# or
npx prisma migrate dev
```

### 5. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📦 Build for Production

To create an optimized production build:
```bash
npm run build
npm run start
```
