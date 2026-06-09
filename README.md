# Mario Game Frontend Documentation

Welcome to the complete client-side documentation for the **Mario Platformer Game**. This frontend is a Single Page Application (SPA) built using **React.js** and **Vite**. It features a custom 2D HTML5 Canvas game engine, state-synchronized gameplay mechanics, glassmorphic user interfaces, dynamic achievement tracking, and persistent local session management.

---

# 📱 Project Overview

## What is this App?

This application serves as the interactive frontend interface for a side-scrolling Mario-style platformer game. It captures real-time player physics, renders game entities through HTML5 Canvas, synchronizes user progress with the backend API, manages player profiles, and provides access to achievements, settings, and leaderboard functionality.

## Core Gameplay & UI Features

- **Custom React 2D Game Engine:** Uses a synchronized `requestAnimationFrame` loop wrapped inside a custom React hook for efficient game updates and rendering.
- **Canvas Object-Oriented Rendering:** Dynamically renders players, enemies, platforms, and collectible coins through reusable game object classes.
- **Camera Parallax Scrolling:** Creates smooth horizontal scrolling and depth effects by adjusting object positions relative to player movement.
- **State-Synchronized Registers (`useRef` + `useState`):** Ensures accurate game statistics are sent to the backend despite React's asynchronous state updates.
- **Dynamic Achievement Tracking:** Retrieves achievement configurations from the server and evaluates player progress in real time.
- **Protected Routing System:** Restricts gameplay, profile, settings, and leaderboard pages to authenticated users only.
- **Persistent User Sessions:** Maintains login state through browser local storage.

## Frontend Tech Stack

- **Framework:** React.js
- **Build Tool:** Vite
- **Routing:** React Router DOM v6
- **Styling:** Bootstrap 5 and Custom CSS
- **Icons:** Bootstrap Icons
- **Game Rendering:** HTML5 Canvas API

---

# 🚀 Getting Started

## 1. Prerequisites

Before running the application, ensure you have:

- Node.js (v18 or newer recommended)
- npm

---

## 2. Environment Configuration

Create a `.env` file in the project root directory:

```env
VITE_SERVER_URL=http://localhost:5000
```

### Security Note

⚠️ Never commit production `.env` files to public repositories. Keep environment variables private and local to your machine.

---

## 3. Install Dependencies

```bash
npm install
```

---

## 4. Start the Development Server

```bash
npm run dev
```

After starting the server, Vite will provide a local URL similar to:

```text
http://localhost:5173
```

Open this URL in your browser to launch the application.

---

# 📂 Project Directory Structure

# 📂 Project Directory Structure

```text
MARIO_CLIENT/
├── public/
├── src/
│   ├── assets/
│   │   ├── background.png
│   │   ├── enemy.png
│   │   ├── hills.png
│   │   ├── platform.png
│   │   ├── platformSmallTall.png
│   │   ├── spriteRunLeft.png
│   │   ├── spriteRunRight.png
│   │   ├── spriteStandLeft.png
│   │   └── spriteStandRight.png
│   │
│   ├── components/
│   │   ├── Canvas/
│   │   │   ├── Canvas.css
│   │   │   └── Canvas.jsx
│   │   │
│   │   ├── Lives/
│   │   │   ├── Lives.css
│   │   │   └── Lives.jsx
│   │   │
│   │   ├── OverLayCard/
│   │   │   ├── OverLayCard.css
│   │   │   └── OverLayCard.jsx
│   │   │
│   │   ├── Score/
│   │   │   ├── Score.css
│   │   │   └── Score.jsx
│   │   │
│   │   ├── Coin.jsx
│   │   ├── Enemy.jsx
│   │   ├── GenericObject.jsx
│   │   └── Platform.jsx
|   |   └── Player.jsx
│   │
│   ├── hooks/
│   │   └── UseGameEngine.js
│   │
│   ├── pages/
│   │   ├── GamePage/
│   │   │   ├── Levels/
│   │   │   │   ├── Level1.jsx
│   │   │   │   ├── Level2.jsx
│   │   │   │   ├── Level3.jsx
│   │   │   │   ├── Level4.jsx
│   │   │   │   ├── Level5.jsx
│   │   │   │   └── Level6.jsx
│   │   │   ├── GameUI.css
│   │   │   └── GameUI.jsx
│   │   │
│   │   ├── HomePage/
│   │   │   ├── Home.css
│   │   │   └── Home.jsx
│   │   │
│   │   ├── LeaderboardPage/
│   │   │   ├── leadboardPage.css
│   │   │   └── leadboardPage.jsx
│   │   │
│   │   ├── LevelSelectionPage/
│   │   │   ├── LevelSelection.css
│   │   │   └── LevelSelection.jsx
│   │   │
│   │   ├── LoginPage/
│   │   │   ├── Login.css
│   │   │   └── Login.jsx
│   │   │
│   │   ├── ProfilePage/
│   │   │   ├── Profile.css
│   │   │   └── Profile.jsx
│   │   │
│   │   ├── SettingsPage/
│   │   │   ├── Settings.css
│   │   │   └── Settings.jsx
│   │   │
│   │   └── SignUpPage/
│   │       ├── SignUp.css
│   │       └── SignUp.jsx
│   │
│   ├── styles/
│   │   └── index.css
│   │
│   ├── App.css
│   ├── App.jsx
│   └── main.jsx
│
├── .env
├── .env.sample
├── .gitignore
├── eslint.config.js
├── index.html
├── LICENSE
├── package.json
├── package-lock.json
├── README.md
└── vite.config.js
```

---

# 🧱 Detailed Core Architecture Breakdown

## 🛡️ 1. Core State & Authentication Manager (App.jsx)

`App.jsx` serves as the application's central controller. It manages:

- Global user state
- Local storage synchronization
- Authentication persistence
- Protected routes
- Backend communication

### Session Persistence

When the application loads, it checks local storage for previously saved user data. If a valid session exists, the user is automatically logged in.

### Unified User Management

The application centralizes all profile-related backend operations through a single update handler:

| Action         | Method | Endpoint                  |
| -------------- | ------ | ------------------------- |
| Update Profile | PUT    | `/api/users/:id`          |
| Reset Progress | PUT    | `/api/users/:id/progress` |
| Delete Account | DELETE | `/api/users/:id`          |

---

## 🖥️ 2. Game Session Coordinator (GameUI.jsx)

`GameUI.jsx` manages:

- Live gameplay statistics
- Coin collection tracking
- Player health
- Win conditions
- Progress synchronization

### Handling React State Delays

React state updates are asynchronous. To prevent outdated values from being sent during gameplay:

- `useState` controls visual updates
- `useRef` stores the latest numerical values

When a player completes a level, the value stored in `scoreRef.current` is transmitted directly to the backend.

---

## 🏆 3. Achievement Matrix System (Profile.jsx)

The profile page dynamically retrieves achievement data from:

```text
GET /api/users/:id/achievements
```

Achievements are evaluated based on:

- Completed levels
- Current level reached
- Total collected coins

### Achievement States

**Unlocked Achievement**

- Displays completion icon
- Uses highlighted styling
- Shows animated reward indicators

**Locked Achievement**

- Displays lock icon
- Uses muted styling
- Remains hidden until requirements are met

---

## 🎛️ 4. Settings Dashboard (Settings.jsx)

The settings page provides account management tools including:

- Profile updates
- Progress resets
- Account deletion

### Supported Operations

**Update Profile**

```http
PUT /api/users/:id
```

**Reset Progress**

```http
PUT /api/users/:id/progress
```

**Delete Account**

```http
DELETE /api/users/:id
```

All critical actions require user confirmation before execution.

---

## 🔐 5. Authentication Interfaces (Login.jsx & SignUp.jsx)

The authentication pages provide secure account access using:

- Controlled React forms
- Client-side validation
- JSON request payloads
- Glassmorphic UI design

### Login Flow

1. User enters credentials
2. Request sent to backend
3. User object returned
4. Session saved to local storage
5. Redirect to Level Selection

### Registration Flow

1. User completes signup form
2. Backend creates account
3. User automatically authenticated
4. Session persisted
5. Redirect to gameplay area

---

# 🛣️ Complete Client-Side Routing Reference

## 1. Landing Page

| Property  | Value      |
| --------- | ---------- |
| Path      | `/`        |
| Component | `Home.jsx` |
| Access    | Public     |

---

## 2. Login Page

| Property  | Value       |
| --------- | ----------- |
| Path      | `/Login`    |
| Component | `Login.jsx` |
| Access    | Public      |

### Request Body

```json
{
  "email": "mario@example.com",
  "password": "securepassword123"
}
```

---

## 3. Sign Up Page

| Property  | Value        |
| --------- | ------------ |
| Path      | `/SignUp`    |
| Component | `SignUp.jsx` |
| Access    | Public       |

### Request Body

```json
{
  "fullname": "Mario",
  "email": "mario@example.com",
  "password": "securepassword123"
}
```

---

## 4. Level Selection Page

| Property  | Value                |
| --------- | -------------------- |
| Path      | `/LevelSelection`    |
| Component | `LevelSelection.jsx` |
| Access    | Protected            |

---

## 5. Gameplay Page

| Property  | Value        |
| --------- | ------------ |
| Path      | `/game/:id`  |
| Component | `GameUI.jsx` |
| Access    | Protected    |

### Win Payload

```json
{
  "additionalCoins": 75,
  "currentPlayedLevelId": 1
}
```

---

## 6. Leaderboard Page

| Property  | Value               |
| --------- | ------------------- |
| Path      | `/leaderboard`      |
| Component | `leadboardPage.jsx` |
| Access    | Protected           |

---

## 7. Profile Page

| Property  | Value         |
| --------- | ------------- |
| Path      | `/Profile`    |
| Component | `Profile.jsx` |
| Access    | Protected     |

---

## 8. Settings Page

| Property  | Value          |
| --------- | -------------- |
| Path      | `/Settings`    |
| Component | `Settings.jsx` |
| Access    | Protected      |

---

# 📌 Additional Notes

- All authenticated pages require an active user session.
- User data is persisted in local storage for session recovery.
- Game statistics are synchronized with the backend after level completion.
- Achievement calculations are performed dynamically by the backend API.
- The frontend communicates with the backend through the `VITE_SERVER_URL` environment variable.
- The project uses React functional components and hooks exclusively.
- Vite provides fast development builds and optimized production bundling.
- Bootstrap Icons are used throughout the application for UI feedback and status indicators.
- The HTML5 Canvas engine handles rendering, collision detection, and game physics independently from React's component lifecycle.
