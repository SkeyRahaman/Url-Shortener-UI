# URL Shortener UI

A modern, full-featured URL shortener frontend built with **React + Vite**. Connects to the [URL Shortener REST API](https://url-shortner-ergb.onrender.com/docs) built with FastAPI.

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5-7952B3?logo=bootstrap&logoColor=white)

---

## ✨ Features

### Authentication
- **Login** — JWT-based authentication with token stored in `localStorage`
- **Register** — New user account creation with validation
- **Auto logout** — Expired/invalid tokens are cleared automatically (401 interceptor)
- **Protected routes** — `/profile` and `/settings` redirect to login if unauthenticated

### Dashboard
- **Shorten URLs** — Paste a long URL + optional description → get a short link instantly
- **Result banner** — Copy the new short URL to clipboard with one click
- **URL list** — View all your shortened URLs fetched from the API
- **Pagination** — "Load More" button for paginated URL fetching
- **Loading skeletons** — Smooth skeleton rows while fetching
- **Empty & error states** — Clear feedback when the list is empty or the API fails

### URL Management
- ✏️ **Edit** — Update the original URL, description, or short code via a modal
- 🗑️ **Delete** — Confirmation dialog before permanently deleting a URL
- ℹ️ **Details** — View full URL info (short code, original URL, description, ID)
- 📋 **Copy** — Copy any short URL to clipboard with a toast notification

### Profile
- Displays real username & email fetched from `GET /users/me`
- Dynamic avatar generated from username initials
- **Edit Profile** modal — update email or password via `PUT /users/me`

### Settings
- **Change Password** — Secure form with confirmation field
- **Delete Account** — Type-to-confirm safety (`DELETE`) before calling `DELETE /users/me`

### UX Polish
- 🌙 **Dark / Light mode** toggle
- 🔔 **Toast notifications** (`react-hot-toast`) on every user action
- 📱 **Fully responsive** — works on mobile, tablet, and desktop
- ⚡ **Micro-animations** — hover effects, transitions, and loading spinners throughout

---

## 🔌 Backend API

This UI is a frontend for the URL Shortener REST API:

- **Base URL**: `https://url-shortner-ergb.onrender.com`
- **Docs**: [https://url-shortner-ergb.onrender.com/docs](https://url-shortner-ergb.onrender.com/docs)

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/auth/token` | Login — returns JWT |
| `POST` | `/users` | Register new user |
| `GET` | `/users/me` | Get current user profile |
| `PUT` | `/users/me` | Update email or password |
| `DELETE` | `/users/me` | Delete account |
| `POST` | `/urls/create_short_url` | Create a short URL |
| `GET` | `/urls` | List all user URLs (paginated) |
| `GET` | `/urls/{short_url}/details` | Get URL details |
| `PUT` | `/urls/{short_url}` | Update a URL |
| `DELETE` | `/urls/{short_url}` | Delete a URL |
| `GET` | `/health` | API health check |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm 9+

### Installation

```bash
# 1. Clone the repository
git clone git@github.com:SkeyRahaman/Url-Shortener-UI.git
cd Url-Shortener-UI

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env
# Edit .env and set your API base URL (see below)

# 4. Start the development server
npm run dev
```

The app will be available at **`http://localhost:5173`**.

---

## ⚙️ Environment Variables

Create a `.env` file in the project root (copy from `.env.example`):

```env
VITE_API_BASE_URL=https://url-shortner-ergb.onrender.com
```

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_BASE_URL` | Base URL of the FastAPI backend (no trailing slash) | `https://url-shortner-ergb.onrender.com` |

> **Note**: Vite only exposes variables prefixed with `VITE_` to the browser. Never put secrets in `.env`.

---

## 🗂️ Project Structure

```
src/
├── components/
│   ├── Headers.jsx          # Desktop header + mobile navbar
│   ├── Sidebar.jsx          # Collapsible sidebar navigation
│   └── ProtectedRoute.jsx   # Auth guard for protected pages
│
├── features/
│   ├── auth/
│   │   ├── AuthProvider.jsx         # Global React Context for auth state
│   │   ├── hooks/useAuth.js         # Re-exports useAuth from AuthProvider
│   │   ├── api.js                   # POST /auth/token
│   │   └── components/
│   │       ├── Login.jsx            # Login page
│   │       └── Register.jsx         # Registration page
│   │
│   ├── urls/
│   │   ├── api.js                   # URL CRUD API calls
│   │   ├── hooks/useUrls.js         # URL list state + CRUD logic
│   │   └── components/
│   │       ├── UrlBlock.jsx         # URL creation form
│   │       ├── UrlList.jsx          # URL list with actions
│   │       ├── EditUrlModal.jsx     # Edit URL modal
│   │       ├── DeleteConfirmModal.jsx # Delete confirmation dialog
│   │       └── UrlDetailsModal.jsx  # URL details view
│   │
│   └── users/
│       └── api.js                   # GET/PUT/DELETE /users/me
│
├── lib/
│   └── axios.js             # Axios instance with auth + 401 interceptors
│
└── pages/
    ├── Dashboard.jsx         # Main dashboard (URL creation + list)
    ├── Profile.jsx           # User profile + edit modal
    ├── Settings.jsx          # Change password + delete account
    └── About.jsx             # About page
```

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| [React 18](https://react.dev) | UI framework |
| [Vite 8](https://vitejs.dev) | Build tool & dev server |
| [React Router v6](https://reactrouter.com) | Client-side routing |
| [Axios](https://axios-http.com) | HTTP client with interceptors |
| [Bootstrap 5](https://getbootstrap.com) | UI components & layout |
| [Bootstrap Icons](https://icons.getbootstrap.com) | Icon set |
| [react-hot-toast](https://react-hot-toast.com) | Toast notifications |

---

## 📜 Available Scripts

```bash
npm run dev      # Start development server (http://localhost:5173)
npm run build    # Build for production (output: dist/)
npm run preview  # Preview the production build locally
npm run lint     # Run ESLint
```

---

## 🔐 Authentication Flow

1. User submits username + password on the login form
2. `POST /auth/token` returns a JWT `access_token`
3. Token is stored in `localStorage` and attached to all subsequent requests via an Axios request interceptor
4. `GET /users/me` is called on app mount to hydrate the user profile in the global `AuthContext`
5. On 401 response, the Axios response interceptor clears the token and redirects to `/`

---

## 📄 License

MIT
