# Nudge

A minimalist, high-performance to-do and task tracker for the web. It keeps adding, filtering and finishing tasks fast, and stores everything in your browser, so your tasks never leave your device. Optional AI suggestions (Google Gemini) give you a nudge on any task, and the app works fully without them.

**Status:** alpha testing. All six roadmap milestones are complete: adding, saving, loading, deleting, checking off and filtering tasks, and the AI suggestions screen connected to Gemini. The app is now being tested end to end, so expect rough edges. See the [roadmap](#roadmap) and [Alpha testing](#alpha-testing).

**Live demo:** [vsmadhav-dev.github.io/Nudge](https://vsmadhav-dev.github.io/Nudge)

---

## Features

### Available now

- **No-server sign-in.** On load, the app asks for your name and checks it against the one saved in `localStorage` (`userName`). If it isn't found, you are sent to the registration page.
- **Live clock.** The header shows the current date and time and updates every second.
- **Two-step add-task flow.** Type the task name in the quick bar, then fill in a short form: priority (Low, Medium or High), a label (for example Work or Personal), and the time you plan to finish it.
- **Saving and loading.** New tasks are saved by `pushitem.js`, and saved tasks are loaded and drawn when the page opens (`fetchtaskfromui.js` and `addtaskinui.js`).
- **Task cards.** Title, a coloured left border for priority, a label tag, the planned time, a completion checkbox, and AI and delete icon buttons.
- **Check off tasks.** Ticking or unticking a box is saved to `localStorage`, so the state survives a reload and shows correctly in every filter.
- **Delete tasks.** The delete icon removes the card and keeps `localStorage` in sync.
- **Working filters.** Filter by priority (All, High, Medium, Low) or by completion (All, Completed, Uncompleted), then press **Go**.
- **AI suggestions screen.** The sparkle button on a task opens a chat-style page for that task:
  - the task name in the header, with a back button
  - three quick buttons (**I'm stuck**, **Break it down**, **Only 30 min**) that write a ready-made prompt into the input so you can edit it before sending
  - a custom input with a send button for your own question
  - your prompt shown first, then the Gemini reply
  - AI text is escaped before it is drawn, so a reply can never inject HTML
- **Chat history per task.** Messages are stored in `localStorage` under a key built from the task name, so each task keeps its own conversation.
- **Bring your own key.** Your Gemini API key stays in your browser (`userAPIkey`) and is never committed to the repo. The suggestions page has a **Change API key** button.
- **Custom theme.** Warm surface colours built on CSS variables (see [Design](#design)).

### Planned after alpha

- Show the saved chat history again when a task's suggestions page is reopened
- Validate Gemini replies against an expected shape before using them
- Style the Low priority (only High and Medium have colours today)
- Remove the three placeholder cards from `index.html`

### Later

- Edit existing tasks
- Filter by label
- A date as well as a time to finish a task
- Dark and light mode that follows the system setting
- Turn a suggestion's steps into real tasks

---

## AI suggestions

The AI features use the Google Gemini API and are optional. The rule throughout: **the app decides, the model fills gaps.** Saving, filtering and sorting are plain JavaScript. The model is only asked for what code can't do:

| Feature | Without the model |
| --- | --- |
| Help when you're stuck on a task | You work it out yourself |
| Break a big task into smaller steps | You add subtasks by hand |
| Plan around limited time ("Only 30 min") | You plan the time yourself |
| Answer your own question about a task | You search elsewhere |

**How a request flows**

1. You click the sparkle button on a task card. `app.js` saves the task name as `selectedTask` and opens `html/suggestion.html`.
2. The suggestions page reads `selectedTask` and shows it in the header.
3. A quick button fills the input with a prompt, or you type your own, then press send.
4. `SendRespnseRequest.js` posts the prompt to Gemini and returns the answer text. If the request fails, the chat shows an error message instead of crashing.
5. Both messages are drawn in the chat and saved to `localStorage`.

Answers are requested as structured JSON and read with `JSON.parse`. A reply that doesn't match the expected shape is thrown away and the error message is shown.

---

## Tech stack

| Area | Technologies |
| --- | --- |
| Markup | Semantic HTML5 |
| Styling | Plain CSS3: CSS variables, Flexbox |
| Logic | Vanilla JavaScript (ES6+ modules, `async`/`await`) |
| Storage | Web Storage API (`localStorage`) |
| AI | Google Gemini API (task suggestions) |
| Typography | Geist, Geist Mono, Material Symbols Outlined (loaded from Google Fonts) |

No framework and no build step.

---

## Getting started

**Requirements:** any modern browser (Chrome, Firefox, Safari, Edge) and a local development server such as VS Code Live Server. A server is required, not optional: the scripts are loaded as ES modules (`type="module"`), and browsers block module imports when a page is opened straight from disk.

```bash
git clone https://github.com/vsmadhav-dev/Nudge.git
cd Nudge
code .
```

Then right-click `index.html` and choose **Open with Live Server**. On the first visit, enter your name and you will be sent to the registration page.

**To use the AI suggestions:** create a free Gemini API key in Google AI Studio, then open any task's suggestions page and enter the key when asked. It is kept only in your browser. Use **Change API key** to replace it.

---

## Development notes

**Storage.** Everything lives in `localStorage`. Clear the keys in DevTools → Application → Local Storage to see the first-run flow again.

| Key | Holds |
| --- | --- |
| `userName` | The signed-in name (lowercase and trimmed) |
| `taskData` | Every task, as a JSON list |
| `priority-lowtask`, `priority-mediumtask`, `priority-hightask` | The same tasks grouped by priority, used by the priority filter |
| `selectedTask` | The name of the task whose AI button was clicked |
| `userAPIkey` | Your Gemini API key |
| `chat-<task name>` | The saved conversation for that task |

**Task shape.** Each task is a small JSON object. These are the keys the code saves today:

```json
{
  "taskName": "Submit Q3 report",
  "taskPiority": "high",
  "taskCreated": "10/7/2026, 9:00:00 AM",
  "label": "Work",
  "timeComplete": "09:00",
  "checked": false
}
```

| Key | Type | Meaning |
| --- | --- | --- |
| `taskName` | string | The task title |
| `taskPiority` | string | `"low"`, `"medium"` or `"high"` |
| `taskCreated` | string | When the task was created, from `toLocaleString()` |
| `label` | string | A short label for the task (can be empty) |
| `timeComplete` | string | The planned finish time as `HH:MM` |
| `checked` | boolean | `false` when added, `true` once checked off |

**Chat message shape.** The chat for a task is a list in the order things happened, so a prompt is followed by its reply:

```json
[
  { "role": "user", "text": "I'm stuck on task \"Submit Q3 report\"..." },
  { "role": "ai", "text": "Start with the smallest next step..." }
]
```

**Known quirks**

- The priority key is spelled `taskPiority` in the code. If you rename it to `taskPriority`, migrate or clear saved tasks, or old ones will lose their priority.
- `taskCreated` is a locale-dependent string; `new Date().toISOString()` sorts correctly and parses back reliably.
- Tasks are stored twice (in `taskData` and in a per-priority list). Every change (check, delete) must update both. Storing only `taskData` and filtering by priority in code would remove this duplication.
- Tasks are matched by name, so two tasks with the same name share one checkbox state and one chat history. An `id` on each task would fix this.
- `index.html` still contains three hard-coded sample cards inside `#todoList`. Remove them once you no longer need them for styling.

**Guard every read.** Wrap `JSON.parse(localStorage.getItem(...))` in `try/catch` and fall back to an empty list, so corrupted or empty storage never breaks the page. Always `JSON.stringify` a list or object before saving it; saving one directly stores the text `[object Object]`, which can't be parsed back.

**Keep it passwordless.** `localStorage` is readable by any script on the page, so store only the name, never a password.

**Gemini API key.** A key placed in client-side code is visible to anyone who opens DevTools. Never commit it. Each user pastes their own key, which stays in their browser, or calls go through a small proxy you control. Anyone who uses the same browser profile can read a saved key.

**Hosting.** The project works on GitHub Pages as is, since every path is relative.

---

## Project structure

```
Nudge/
├── Assets/
│   └── logo.svg                      App logo and favicon
├── css/
│   ├── style.css                     Main application styles
│   ├── form.css                      Registration and login form styles
│   └── suggestion.css                AI suggestions screen styles
├── html/
│   ├── registrationForm.html         User registration page
│   └── suggestion.html               AI suggestions screen
├── js/
│   ├── modules/
│   │   ├── pushitem.js                       Saves a task to localStorage
│   │   ├── addtaskinui.js                    Builds a task card and adds it to the list
│   │   ├── fetchtaskfromui.js                Loads saved tasks and passes them to addtaskinui
│   │   ├── deleteTask.js                     Removes a task from taskData
│   │   ├── pushTaskByPriority.js             Saves a task to its priority list
│   │   ├── fetchTaskByPriority.js            Loads tasks of one priority
│   │   ├── deleteTaskByPriority.js           Removes a task from its priority list
│   │   ├── fetchCompletedTasks.js            Loads completed or uncompleted tasks
│   │   ├── updateCheckboxStatus.js           Saves a checkbox change in taskData
│   │   ├── updateCheckboxStatusByPriority.js Saves a checkbox change in the priority list
│   │   ├── suggestion.js                     Suggestions screen: header, quick prompts, chat, saved history
│   │   ├── getAPi.js                         Gets the Gemini API key from the user
│   │   ├── SendRespnseRequest.js             Sends a prompt to Gemini and returns the answer
│   │   └── requestBody.js                    Builds the request body for Gemini
│   ├── app.js                        Name check, clock, add/delete/filter/checkbox flow, AI button
│   └── register.js                   Registration logic and localStorage persistence
├── index.html                        Main task tracker dashboard
└── README.md                         Project documentation
```

---

## Conventions

- **Theme tokens only.** Colours and fonts come from the CSS variables at the top of `style.css`, never hard-coded values in a rule where a token exists.
- **Class names.** Blocks and elements use hyphenated names (`todo-card`, `todo-title`), with BEM-style `block__element` for header parts (`app-header__content`) and the suggestions screen (`topbar__task`, `quick__btn`, `composer__send`). Keep new classes consistent with the nearest existing ones.
- **Semantic HTML first.** Use real `<button>`, `<label>`, `<ul>` and `<form>` elements before reaching for `div` plus a click handler, so keyboard and screen-reader support come for free.
- **One job per module.** Each file in `js/modules/` does one small task, and `app.js` only wires them together.
- **Never trust AI text.** Escape it before putting it in `innerHTML`, or use `textContent`.
- **Touch targets.** Icon buttons and checkboxes are small today (about 22 to 32 px). Aim for 44 px on touch screens when polishing.
- **Commit messages.** Use a short prefix such as `feat:` or `fix:`, then a one-line summary.

---

## Roadmap

| # | Milestone | Status |
| --- | --- | --- |
| 1 | User registration form with localStorage | ✅ Done |
| 2 | Add a task and save it to localStorage | ✅ Done |
| 3 | Load saved tasks from localStorage on page open | ✅ Done |
| 4 | Delete a task and sync the removal with localStorage | ✅ Done |
| 5 | Filter tasks by priority and by completed/uncompleted | ✅ Done |
| 6 | AI task suggestions (Gemini API) | ✅ Done |

All milestones are done and the app is in alpha testing. After alpha: edit tasks, label filtering, task dates, and a dark/light mode toggle based on the system preference.

### Milestone details

1. **User registration.** Collect the user's name through a form and store it in `localStorage`, so the app can recognise them without any server.
2. **Add task.** Create tasks with a name, priority, label and planned finish time, and save each one so nothing is lost on refresh.
3. **Load tasks.** When the dashboard opens, read the saved tasks and render them as cards with their priority border, label tag and completion state.
4. **Delete task.** Remove a task with the delete icon and update `localStorage` at the same time, so it doesn't come back after a reload.
5. **Filter tasks.** Filter by completion status (All, Completed, Uncompleted) and by priority, entirely on the client. Checkbox changes are saved, so the filters always show the current state.
6. **AI suggestions.** The suggestions screen, quick prompt buttons, custom prompts, the Gemini request, safe rendering of replies, and chat history saved per task.

---

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

- **Suggestions screen:** a three-part layout (header, scrolling chat, bottom dock). Your prompts appear as rust bubbles on the right and AI replies as cards on the left. The quick buttons are oval and the input is a pill with the send button inside its right end. It uses the same tokens as the rest of the app.

---

## Alpha testing

Nudge is in alpha. The features above are all built, and the focus now is finding what breaks. Good places to test:

- **Checkbox state:** tick and untick tasks, then use every filter and reload the page. The state should match everywhere.
- **Delete:** delete tasks of each priority and reload, then check that none come back in any filter.
- **Suggestions screen:** try each quick button, a custom prompt, a very long task name, no internet, and a wrong or missing API key. Each should show a message, not a blank or broken page.
- **Storage:** clear `localStorage` partly (for example, remove only `taskData`) and check that the page still loads.
- **Devices:** test on a phone-sized screen and in more than one browser.

When you find a bug, open a GitHub issue with the steps, the browser, and any error shown in the DevTools console.

---

## Contributing

Bugs and ideas are welcome as GitHub issues. Please keep changes small, follow the conventions above, and test in at least one Chromium browser and one other.

---

## Licenses

Geist and Geist Mono are under the SIL Open Font License. Material Symbols is under the Apache License 2.0.
