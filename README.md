# Nudge

A minimalist, high-performance to-do and task tracker for the web. It keeps adding, filtering and finishing tasks fast, and stores everything in your browser, so your tasks never leave your device. Optional AI suggestions (Google Gemini) will break big tasks into steps, and the app works fully without them.

**Status:** early development. The name check, the task list layout, the live clock, the filter UI and the two-step add-task form are in place. Adding, saving and loading tasks work. Delete, working filters and the Gemini suggestions come next. See the [roadmap](#roadmap).

**Live roadmap:** [vsmadhav-dev.github.io/Nudge](https://vsmadhav-dev.github.io/Nudge)

## Features

**Available now**

- **No-server sign-in.** On load, the app asks for your name and checks it against the one saved in `localStorage` (`userName`). If it isn't found, you are sent to the registration page.
- **Live clock.** The header shows the current date and time and updates every second.
- **Two-step add-task flow.** Type the task name in the quick bar, then fill in a short form: priority (Low, Medium or High), a label (for example Work or Personal), and the time you plan to finish it.
- **Saving and loading.** New tasks are saved by `pushitem.js`, and saved tasks are loaded and drawn when the page opens (`fetchtaskfromui.js` and `addtaskinui.js`).
- **Task cards.** Title, a coloured left border for priority, a label tag, the planned time, a completion checkbox, and AI and delete icon buttons.
- **Filter UI.** All, Completed and Uncompleted, in a dropdown.
- **Custom theme.** Warm surface colours built on CSS variables (see [Design](#design)).

**Coming next**

- Save the completed state when a checkbox is ticked
- Delete a task and keep `localStorage` in sync
- Make the filter dropdown work, and add a priority filter
- Style the Low priority (only High and Medium have colours today)

**Later**

- Edit existing tasks
- Filter by label
- A date as well as a time to finish a task
- Dark and light mode that follows the system setting

## AI suggestions (planned)

The AI features use the Google Gemini API and are optional. The rule throughout: **the app decides, the model fills gaps.** Saving, filtering and sorting are plain JavaScript. The model is only asked for what code can't do:

| Feature | Without the model |
| --- | --- |
| Break a big task into smaller subtasks | You add subtasks by hand |
| Suggest a priority and estimated time | You pick the priority yourself |
| Turn "Remind me to submit Q3 report tomorrow at 9 AM" into a task | You fill in the form |

Answers will be requested as structured JSON and checked before use. A reply that doesn't match the expected shape is thrown away and the manual flow stays available. The sparkle button on each task card is where this will start.

## Tech stack

| Area | Technologies |
| --- | --- |
| Markup | Semantic HTML5 |
| Styling | Plain CSS3: CSS variables, Flexbox |
| Logic | Vanilla JavaScript (ES6+ modules) |
| Storage | Web Storage API (`localStorage`) |
| AI | Google Gemini API (task breakdown and suggestions) |
| Typography | Geist, Geist Mono, Material Symbols Outlined (loaded from Google Fonts) |

No framework and no build step.

## Getting started

**Requirements:** any modern browser (Chrome, Firefox, Safari, Edge) and a local development server such as VS Code Live Server. A server is required, not optional: `app.js` is loaded as an ES module (`type="module"`), and browsers block module imports when a page is opened straight from disk.

```bash
git clone https://github.com/vsmadhav-dev/Nudge.git
cd Nudge
code .
```

Then right-click `index.html` and choose **Open with Live Server**. On the first visit, enter your name and you will be sent to the registration page.

## Development notes

- **Storage.** The signed-in name is kept under `userName` (lowercase and trimmed). Tasks are saved by `js/modules/pushitem.js`. Clear both in DevTools → Application → Local Storage to see the first-run flow again.
- **Task shape.** Each task is a small JSON object. These are the keys the code saves today:

  ```json
  {
    "taskName": "Submit Q3 report",
    "taskPiority": "high",
    "taskCreated": "10/7/2026, 9:00:00 AM",
    "label": "Work",
    "timeComplete": "09:00"
  }
  ```

  | Key | Type | Meaning |
  | --- | --- | --- |
  | `taskName` | string | The task title |
  | `taskPiority` | string | `"low"`, `"medium"` or `"high"` |
  | `taskCreated` | string | When the task was created, from `toLocaleString()` |
  | `label` | string | A short label for the task (can be empty) |
  | `timeComplete` | string | The planned finish time as `HH:MM` |
  | `completed` | boolean | **Planned.** `false` when added, `true` once checked off |

- **Known quirks.** The priority key is spelled `taskPiority` in the code. If you rename it to `taskPriority`, migrate or clear saved tasks, or old ones will lose their priority. `taskCreated` is a locale-dependent string; `new Date().toISOString()` sorts correctly and parses back reliably.
- **Placeholder cards.** `index.html` still contains three hard-coded sample cards inside `#todoList`. Remove them once loading from storage is complete.
- **Guard every read.** Wrap `JSON.parse(localStorage.getItem(...))` in `try/catch` and fall back to an empty list, so corrupted or empty storage never breaks the page.
- **Keep it passwordless.** `localStorage` is readable by any script on the page, so store only the name, never a password.
- **Gemini API key.** A key placed in client-side code is visible to anyone who opens DevTools. Never commit it. Either let each user paste their own key in a settings field (kept in their browser), or route calls through a small proxy you control.
- **Hosting.** The project works on GitHub Pages as is, since every path is relative.

## Project structure

```
Nudge/
├── Assets/
│   └── logo.svg                 App logo and favicon
├── css/
│   ├── style.css                Main application styles
│   └── form.css                 Registration and login form styles
├── html/
│   └── registrationForm.html    User registration page
├── js/
│   ├── modules/
│   │   ├── pushitem.js          Saves a task to localStorage
│   │   ├── addtaskinui.js       Builds a task card and adds it to the list
│   │   └── fetchtaskfromui.js   Loads saved tasks and passes them to addtaskinui
│   ├── app.js                   Name check, clock, add-task flow, startup
│   └── register.js              Registration logic and localStorage persistence
├── index.html                   Main task tracker dashboard
└── README.md                    Project documentation
```

## Conventions

- **Theme tokens only.** Colours and fonts come from the CSS variables at the top of `style.css`, never hard-coded values in a rule where a token exists.
- **Class names.** Blocks and elements use hyphenated names (`todo-card`, `todo-title`), with BEM-style `block__element` for header parts (`app-header__content`). Keep new classes consistent with the nearest existing ones.
- **Semantic HTML first.** Use real `<button>`, `<label>`, `<ul>` and `<form>` elements before reaching for `div` plus a click handler, so keyboard and screen-reader support come for free.
- **One job per module.** Each file in `js/modules/` does one small task, and `app.js` only wires them together.
- **Touch targets.** Icon buttons and checkboxes are small today (about 22 to 32 px). Aim for 44 px on touch screens when polishing.

## Roadmap

| # | Milestone | Status |
| --- | --- | --- |
| 1 | User registration form with `localStorage` | ✅ Done |
| 2 | Add a task and save it to `localStorage` | ✅ Done |
| 3 | Load saved tasks from `localStorage` on page open | ✅ Done |
| 4 | Delete a task and sync the removal with `localStorage` | ✅ Done |
| 5 | Filter tasks by priority and by completed/uncompleted | ⏳ Planned (UI built) |
| 6 | AI task suggestions (Gemini API) | ⏳ Planned |

After v1: edit tasks, label filtering, task dates, and a dark/light mode toggle based on the system preference.

### Milestone details

1. **User registration.** Collect the user's name through a form and store it in `localStorage`, so the app can recognise them without any server.
2. **Add task.** Create tasks with a name, priority, label and planned finish time, and save each one so nothing is lost on refresh.
3. **Load tasks.** When the dashboard opens, read the saved tasks and render them as cards with their priority border, label tag and completion state.
4. **Delete task.** Remove a task with the delete icon and update `localStorage` at the same time, so it doesn't come back after a reload.
5. **Filter tasks.** Filter by completion status (All, Completed, Uncompleted) and by priority, entirely on the client.
6. **AI suggestions.** Use the Gemini API to break a big task into subtasks, suggest a priority and estimated time, and turn natural language into a structured task.

## Design

- **Typography:** Geist for text, Geist Mono for the time and tags, Material Symbols Outlined for icons.
- **Colours:** warm, low-contrast surfaces with a rust accent. These are the CSS variables in `style.css`:

| Token | Hex | Used for |
| --- | --- | --- |
| `--bg-surface` | `#C1B4AE` | Page background |
| `--card-bg` | `#D1C7C1` | Cards, filter bar and forms |
| `--card-hover` | `#D9D0CB` | Card hover |
| `--text-main` | `#353238` | Body text |
| `--text-muted` | `#5E5B63` | Times and completed titles |
| `--text-heading` | `#92140C` | Heading, High priority border, delete hover |
| `--accent-primary` | `#BE5A38` | Buttons, checked boxes, focus rings |
| `--accent-secondary` | `#BE7C4D` | Medium priority border and tag |

## Contributing

Bugs and ideas are welcome as GitHub issues. Please keep changes small, follow the conventions above, and test in at least one Chromium browser and one other.

## Licenses

Geist and Geist Mono are under the SIL Open Font License. Material Symbols is under the Apache License 2.0.
