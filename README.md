# NexPlay

**Entertainment Discovery & Branding Platform**

NexPlay is an entertainment discovery platform that allows users to explore sports, leagues, teams, matches, and live sporting events through a unified interface.

## Tech Stack

* **Frontend:** React + Tailwind CSS
* **Backend:** Node.js + Express.js
* **Database:** MongoDB
* **Sports Data:** TheSportsDB + ESPN Scoreboard API

## Features

### Sports

* Browse multiple sports categories
* Explore sports leagues and competitions
* Browse league information
* Explore teams and sporting events
* View individual match/event details
* View today's matches
* View upcoming matches
* View finished matches
* Filter matches by status
* View live matches and live scores
* Automatic live-score updates every 30 seconds
* Match information including:

  * Teams
  * Scores
  * League
  * Sport
  * Match status
  * Match time
  * Venue
  * Live game clock when available

### Sports Data Integration

NexPlay uses:

* **TheSportsDB** for sports categories, leagues, teams, and event information.
* **ESPN Scoreboard API** for live and today's match data.

## Project Setup

### 1. Clone the repository

```bash
git clone <repository-url>
cd NexPlay
```

### 2. Install Backend Dependencies

```bash
cd backend
npm install
```

Start the backend:

```bash
npm run dev
```

### 3. Install Frontend Dependencies

Open another terminal:

```bash
cd frontend
npm install
```

Start the frontend:

```bash
npm run dev
```

The frontend and backend should now be running separately.

## Team Members

* Fahim
* Ayesha
*
*

## Demo Account

For testing the application, the following account can be used.

### Company Account

**Email:** [fahim202678@gmail.com](mailto:fahim202678@gmail.com)

**Password:** 12345678

## Development Notes

The Sports page automatically refreshes live-score information every 30 seconds.

Live events are displayed separately from today's, upcoming, and finished matches.

## Thank You

Thank you for using NexPlay.
