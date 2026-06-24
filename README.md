# BrainBox Reviewer App

A simple CRUD web application designed to organize and manage Civil Service Examination (CSE) review materials from BrainBox. The application helps users store reviewer topics, tutorial links, and study resources in a centralized platform for easier learning and review.

## Features

- 📚 Create, Read, Update, and Delete (CRUD) reviewer materials
- 🔍 Search topics and review materials
- 🏷️ Filter reviewers by category or topic
- 🎥 Store and access tutorial video links
- 📖 Organize study resources for Civil Service Examination preparation
- 🚀 Quick navigation to tutorial videos and learning materials

## Purpose

The BrainBox Reviewer App was developed to help Civil Service Examination (CSE) examinees organize and access their review materials efficiently. Instead of manually searching for tutorial videos and notes, users can easily browse, search, and filter topics from a single platform.

## Tech Stack

### Frontend

- React.js
- Vite
- JavaScript
- HTML5
- CSS / Tailwind CSS

### Backend & Database

- Supabase

## Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd brainbox-reviewer-app
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the project root:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Run the Application

```bash
npm run dev
```

## Usage

1. Add reviewer materials and tutorial links.
2. Search for specific topics using the search bar.
3. Filter materials by category or topic.
4. Click tutorial links to open the corresponding video.
5. Manage review resources through the CRUD interface.

## Project Structure

```text
src/
├── components/
├── pages/
├── services/
├── assets/
├── App.jsx
└── main.jsx
```

## Future Enhancements

- User Authentication
- Bookmark/Favorite Topics
- Progress Tracking
- Notes and Annotations
- Dark Mode
- Mobile Responsive Improvements

## Disclaimer

This application is intended for educational purposes only. All tutorial videos, reviewer materials, and external resources belong to their respective creators and owners. The application only stores and organizes publicly accessible links and references.

## Author

**Andrei Portugal**

Programmer | Web Developer

---

### Good luck to all Civil Service Examination (CSE) takers! 📚🎉
