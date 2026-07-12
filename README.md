# URL Shortener UI

A modern, full-featured URL shortener frontend built with **React + Vite**. Connects to the [URL Shortener REST API](https://url-shortner-ergb.onrender.com/docs) built with FastAPI.

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5-7952B3?logo=bootstrap&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-enabled-2496ED?logo=docker&logoColor=white)
![GitHub Pages](https://img.shields.io/badge/GitHub--Pages-deployed-222222?logo=github&logoColor=white)

---

## ✨ Features

### Authentication & Authorization
- **Login & Registration** — JWT-based authentication with token stored in `localStorage`.
- **Responsive Layout** — Sign-in and registration pages place credentials forms on the left/top and "Coming Soon" social SSO integrations on the right/bottom.
- **Auto Logout** — Expired/invalid tokens are cleared automatically (401 interceptor) and redirect smoothly using dynamic base paths.
- **Protected Routes** — `/profile` and `/settings` redirect to login if unauthenticated.

### Dashboard
- **Shorten URLs** — Paste a long URL + optional description → get a short link instantly.
- **Interactive Short Codes** — Short links in the dashboard are clickable redirects that open the original URL in a new tab (using the backend `/urls/{short_code}` endpoint).
- **Inline Copy** — Convenient copy icons next to short codes in both lists and success banners.
- **URL List & Pagination** — View user-shortened URLs with support for paginated fetching ("Load More").
- **Empty & Error States** — Clear feedback when the list is empty or the API fails.

### Backend Wakeup Loader
- **Render Cold-Start Handling** — Fully animated fullscreen loader that displays a 45-second countdown progress bar while waiting for free-tier Render backend instances to wake up.
- **Dynamic CS Jokes** — Keeps users entertained by rotating funny, lame programmer jokes every 7 seconds.
- **Background Health Polling** — Pings the API docs endpoint `/docs` every 5 seconds to bypass ad-blocker filters and transitions automatically once online.

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
| `GET` | `/urls/{short_url}` | Redirect to original long URL |
| `PUT` | `/urls/{short_url}` | Update a URL |
| `DELETE` | `/urls/{short_url}` | Delete a URL |
| `GET` | `/health` | API health check |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm 9+
- Docker (optional, for containerized running)

### Local Development

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

## 🐳 Docker Deployment

The application features a production-ready, optimized multi-stage Docker build utilizing **Node 20 Alpine** (build stage) and **Nginx Alpine** (serving stage).

### Run Locally with Docker
To build and run the production-grade static Nginx container locally:

```bash
# 1. Build the Docker image
docker build -t url-shortener-ui .

# 2. Run the container mapping to port 5173 (standard whitelisted CORS port)
docker run -d -p 5173:80 --name url-shortener-ui url-shortener-ui
```

---

## ⚙️ GitHub Actions CI/CD

The project is configured with two GitHub Actions automated workflows:

### 1. Docker Hub Build & Publish (`docker-publish.yml`)
Runs on pushes to `main`. It automatically:
- Builds the multi-stage Dockerfile.
- Tags the image with both `latest` and the unique **GitHub Actions Run Number** (`sakibmondal7/url-shortner-ui:<run_number>`).
- Pushes the image directly to Docker Hub.

### 2. GitHub Pages Deployment (`deploy-pages.yml`)
Runs on pushes to `main`. It automatically:
- Builds the static production React assets using dynamic base paths.
- Copies `dist/index.html` to `dist/404.html` to handle client-side SPA routing correctly.
- Deploys the static assets directly to **GitHub Pages**:
  👉 **https://skeyrahaman.github.io/Url-Shortener-UI/**

---

## ⚙️ Environment Variables

Create a `.env` file in the project root:

```env
VITE_API_BASE_URL=https://url-shortner-ergb.onrender.com
```

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_BASE_URL` | Base URL of the FastAPI backend (no trailing slash) | `https://url-shortner-ergb.onrender.com` |

---

## 🗂️ Project Structure

```
src/
├── components/
│   ├── Headers.jsx          # Desktop header + mobile navbar
│   ├── Sidebar.jsx          # Collapsible sidebar navigation
│   ├── ProtectedRoute.jsx   # Auth guard for protected pages
│   └── BackendLoader.jsx    # Wakes up Render backend with CS jokes & timer
│
├── features/
│   ├── auth/
│   │   ├── AuthProvider.jsx         # Global React Context for auth state
│   │   ├── hooks/useAuth.js         # Re-exports useAuth from AuthProvider
│   │   ├── api.js                   # POST /auth/token
│   │   └── components/
│   │       ├── Login.jsx            # Login page (form left, social right)
│   │       └── Register.jsx         # Registration page (form left, social right)
│   │
│   ├── urls/
│   │   ├── api.js                   # URL CRUD API calls
│   │   ├── hooks/useUrls.js         # URL list state + CRUD logic
│   │   └── components/
│   │       ├── UrlBlock.jsx         # URL creation form (clickable results)
│   │       ├── UrlList.jsx          # URL list with inline copy and clickable links
│   │       ├── EditUrlModal.jsx     # Edit URL modal
│   │       ├── DeleteConfirmModal.jsx # Delete confirmation dialog
│   │       └── UrlDetailsModal.jsx  # URL details view
│   │
│   └── users/
│       └── api.js                   # GET/PUT/DELETE /users/me
│
├── lib/
│   └── axios.js             # Axios instance with auth + 401 interceptors (dynamic BASE_URL redirects)
│
└── pages/
    ├── Dashboard.jsx         # Main dashboard (URL creation + list)
    ├── Profile.jsx           # User profile + edit modal
    ├── Settings.jsx          # Change password + delete account
    └── About.jsx             # About page
```

---

## 📄 License

MIT
