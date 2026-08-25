# 🎬 NexPlay

## Entertainment Discovery & Engagement Platform

NexPlay is a full-stack entertainment discovery platform that brings movies, TV series, sports, live matches, reviews, watchlists, and personalized user preferences together in one unified platform.

The goal of NexPlay is to provide users with a convenient way to discover entertainment content, explore sports and live events, manage their personal watchlist, review content, and personalize their entertainment experience.

---

# ✨ Features

## 🎬 Entertainment Discovery

- Browse movies and TV series
- Search and explore entertainment content
- View entertainment details
- Explore content by genre and category
- View ratings and reviews
- Discover highly rated content
- Explore where content is available
- Add content to a personal watchlist

---

## 📺 Where to Watch

NexPlay helps users find where movies and series are available to watch.

Users can explore available streaming platforms and access the relevant platform from the content details page.

Supported platforms may include:

- Netflix
- Prime Video
- Disney+
- Apple TV+

---

# 🏆 Sports

NexPlay provides a dedicated sports discovery section.

### Sports Features

- Browse multiple sports categories
- Explore sports leagues and competitions
- View league information
- Explore teams
- Explore sporting events
- View individual match details
- View today's matches
- View upcoming matches
- View finished matches
- Filter matches by status
- View live matches
- View live scores
- Automatic live-score updates
- View match venue
- View match time
- View league and sport information
- View live game clock when available

### Live Scores

Live sporting information is automatically refreshed every **30 seconds** to keep match information updated.

---

# 🏟️ Sports Data Integration

NexPlay currently uses multiple external sports data sources.

### TheSportsDB

Used for:

- Sports categories
- Leagues
- Teams
- Event information

### ESPN Scoreboard API

Used for:

- Today's matches
- Live matches
- Match scores
- Match status
- Live game information

---

# 👤 User Profile

NexPlay provides personalized user profiles.

Users can manage their personal entertainment preferences and view their activity.

### Profile Features

- User profile
- Profile editing
- Favourite genres
- Favourite sports
- Recently viewed content
- Activity history
- Watchlist

User profile information is stored in MongoDB and persists after refreshing the application.

---

# ❤️ Favourite Genres

Users can select and manage their favourite entertainment genres from their profile.

Favourite genres are stored in the database and remain available when the user returns to the application.

---

# 🏅 Favourite Sports

Users can select their favourite sports from their profile.

Favourite sports are stored with the user's account and can be updated whenever required.

---

# 👀 Recently Viewed

NexPlay keeps track of recently viewed entertainment content.

Users can quickly return to content they previously explored without having to search for it again.

---

# 📚 Activity History

Users can view their entertainment activity history.

The activity system can track interactions such as:

- Movies viewed
- Series viewed
- Sports content viewed
- Activity timestamps
- Recently accessed content

---

# 🔖 Watchlist

Users can save entertainment content for later.

Watchlist functionality allows users to:

- Add content to their watchlist
- View saved content
- Remove content from their watchlist
- Maintain a personal collection of entertainment

---

# ⭐ Ratings & Reviews

NexPlay includes a user review and rating system.

Users can:

- Create reviews
- Edit reviews
- Delete reviews
- View their reviews
- View average ratings
- View review counts
- Explore top-rated content

### Review Features

- Average rating
- Review count
- My Reviews
- Top Rated content
- Create Review
- Edit Review
- Delete Review

---

# 🔐 Authentication

NexPlay includes authentication functionality for user-specific features.

Authentication protects features such as:

- User profiles
- Watchlists
- Activity history
- Favourite genres
- Favourite sports
- Reviews
- Other user-specific information

Administrative functionality is separated from normal user functionality.

---

# 🛠️ Admin Features

NexPlay includes an administrative section for managing platform functionality.

Admin functionality includes areas such as:

- Admin dashboard
- Advertisement management
- Campaign management
- Company management
- Analytics
- Platform management

---

# 📢 Advertisement & Campaign System

NexPlay includes advertisement and campaign functionality that provides a foundation for future business and monetization features.

The system can be extended to support:

- Advertisements
- Promotional campaigns
- Sponsored content
- Business partnerships
- Campaign analytics

---

# 📊 Analytics

NexPlay includes analytics functionality for monitoring platform and campaign activity.

Analytics can help administrators understand:

- User activity
- Campaign performance
- Advertisement performance
- Engagement
- Platform usage

---

# 🎨 User Interface

The NexPlay frontend is built with React and Tailwind CSS.

The interface focuses on:

- Modern entertainment-focused design
- Responsive layouts
- Reusable components
- Interactive content cards
- Responsive navigation
- Personalized user sections
- Mobile-friendly layouts

The application is designed to work across:

- Desktop
- Tablet
- Mobile

---

# 🧩 Tech Stack

## Frontend

- React
- Vite
- Tailwind CSS
- Axios
- React Router
- JavaScript

## Backend

- Node.js
- Express.js
- REST API
- JWT Authentication
- Middleware

## Database

- MongoDB
- Mongoose

## External APIs

- TheSportsDB
- ESPN Scoreboard API
- TMDB / entertainment data services

## Development Tools

- Git
- GitHub
- VS Code
- Postman
- npm

---

# 📁 Project Structure

```text
NexPlay/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── uploads/
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── api/
│   │   ├── context/
│   │   └── App.jsx
│   │
│   ├── public/
│   └── package.json
│
└── README.md
```
