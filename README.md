# Nudge

A minimalist, high-performance To-Do and Task Tracker web app that helps you manage daily tasks efficiently with optional AI task suggestions.

> **Status:** Early development. User registration, task list layout, time updates, and task filtering UI are functional. Persistent task storage and Gemini API task suggestions are in progress.

---

## Features

### Available Now

- **User Registration & Local Storage:** Save user credentials locally (`localStorage`) without requiring external server authentication.
- **Header & Clock:** Live updated time-and-date header alongside personalized welcome info.
- **Task Filtering UI:** Filter options (All, Completed, Uncompleted) with dropdown controls and status badges.
- **Task Item Layout:** Interactive task cards supporting title display, metadata tag priority badges (High, Medium), completion checkboxes, and action icons.
- **Custom Theme Palette:** Warm surface colors (`#C1B4AE`, `#D1C7C1`, `#BE5A38`, `#92140C`) built with custom CSS variables.

---

## Roadmap

Track progress live at [vsmadhav-dev.github.io/Nudge](https://vsmadhav-dev.github.io/Nudge/)

| # | Milestone | Status |
|---|-----------|--------|
| 1 | User registration form with localStorage | ✅ Completed |
| 2 | Add task and save it to localStorage | 🚧 In Progress |
| 3 | Load saved tasks from localStorage on page open | ⏳ Planned |
| 4 | Delete task and sync removal with localStorage | ⏳ Planned |
| 5 | Filter tasks by priority and by completed/uncompleted | ⏳ Planned |
| 6 | AI task suggestions (Gemini API) | ⏳ Planned |

### Milestone Details

- [x] **1. User Registration**
  Collect the user's details through a registration form and store them in localStorage, so the app can greet them without any server.

- [ ] **2. Add Task** *(in progress)*
  Create tasks with a title and priority (High / Medium) and save each one to localStorage so nothing is lost on refresh.

- [ ] **3. Load Tasks**
  When the dashboard opens, read saved tasks from localStorage and render them as task cards with their priority badge and completion state.

- [ ] **4. Delete Task**
  Remove a task from the UI with the delete icon and update localStorage at the same time so it doesn't come back after a reload.

- [ ] **5. Filter Tasks**
  Filter the list by completion status (All, Completed, Uncompleted) and by priority, entirely on the client side.

- [ ] **6. AI Suggestions**
  Use the Google Gemini API to:
  - Break a big task into smaller subtasks
  - Suggest a priority level and estimated completion time
  - Turn natural language like "Remind me to submit Q3 report tomorrow at 9 AM" into a structured task

### Later

- Edit existing tasks
- Custom tags on tasks
- Dark / Light mode toggle based on system preference

---

## Tech Stack

| Area | Technologies |
|------|--------------|
| Markup | Semantic HTML5 |
| Styling | Plain CSS3 (CSS Variables, Flexbox, BEM Naming Conventions) |
| Typography | Geist, Geist Mono, Material Symbols Outlined |
| Logic | Vanilla JavaScript (ES6+) |
| Storage | Web Storage API (`localStorage`) |
| AI Engine | Google Gemini API (for task breakdown and suggestions) |

---

## Getting Started

### Requirements

- Any modern web browser (Google Chrome, Mozilla Firefox, Safari, Microsoft Edge).
- Local development server (e.g., VS Code Live Server) to prevent relative path issues.

### Local Installation

```bash
# 1. Clone the repository
git clone https://github.com/vsmadhav-dev/Nudge.git

# 2. Navigate to project folder
cd Nudge

# 3. Open in VS Code or launch via Live Server
code .
```

---

## Project Structure

```
Nudge/
├── Assets/
│   └── logo.svg            # App logo & favicon
├── css/
│   ├── style.css           # Main application styles
│   └── form.css            # Registration & login form styles
├── html/
│   └── register.html       # User registration page
├── js/
│   ├── app.js              # Clock, filter, and main UI interaction logic
│   └── register.js         # Registration logic & localStorage persistence
├── index.html              # Main task tracker dashboard
└── README.md               # Project documentation
```
