# Nudge

A minimalist, high-performance To-Do and Task Tracker web app that helps you manage daily tasks efficiently with optional AI task suggestions.

**Status:** Early development. User registration, task list layout, time updates, and task filtering are functional; persistent task storage and Gemini API task suggestions are in progress.

---

## Features

### Available Now
* **User Registration & Local Storage:** Save user credentials locally (`localStorage`) without requiring external server authentication.
* **Header & Clock:** Live updated time-and-date header alongside personalized welcome info.
* **Task Filtering UI:** Filter options (All, Completed, Uncompleted) with dropdown controls and status badges.
* **Task Item Layout:** Interactive task cards supporting title display, metadata tag priority badges (High, Medium), completion checkboxes, and action icons.
* **Custom Theme Palette:** Warm surface colors (`#C1B4AE`, `#D1C7C1`, `#BE5A38`, `#92140C`) built with custom CSS variables.

### Planned for v1
* **Full Task CRUD Operations:** Add, edit, check off, and delete daily tasks with persistent `localStorage` synchronization.
* **Priority Tagging:** Assign high/medium priority and custom tags upon task creation.
* **Filter Functionality:** Active client-side list filtering by completion status and category.
* **Gemini AI Integration:**
  * AI-assisted task breakdown and subtask suggestions via Google Gemini API.
  * Natural language task input (e.g., *"Remind me to submit Q3 report tomorrow at 9 AM"*).
  * Smart task priority and estimated completion time suggestions.
* **Dark / Light Mode Toggle:** Dynamic color mode selection based on system preferences.

---

## Tech Stack

| Area | Technologies |
| :--- | :--- |
| **Markup** | Semantic HTML5 |
| **Styling** | Plain CSS3 (CSS Variables, Flexbox, BEM Naming Conventions) |
| **Typography** | Geist, Geist Mono, Material Symbols Outlined |
| **Logic** | Vanilla JavaScript (ES6+) |
| **Storage** | Web Storage API (`localStorage`) |
| **AI Engine** | Google Gemini API (for task breakdown and suggestions) |

---

## Getting Started

### Requirements
* Any modern web browser (Google Chrome, Mozilla Firefox, Safari, Microsoft Edge).
* Local development server (e.g., VS Code Live Server) to prevent relative path issues.

### Local Installation

```bash
# 1. Clone the repository
git clone [https://github.com/vsmadhav-dev/Nudge.git](https://github.com/vsmadhav-dev/Nudge.git)

# 2. Navigate to project folder
cd Nudge

# 3. Open in VS Code or launch via Live Server
code .
```

### Project Structure
```bash
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
