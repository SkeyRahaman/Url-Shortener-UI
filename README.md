 # 🔗 URL Shortener Dashboard

 A modern, responsive React-based URL shortener dashboard featuring a sleek UI, dynamic theme switching (Dark/Light mode), and a modular component architecture.

 ## ✨ Features

 * Dual Themes: Seamlessly switch between a high-contrast Dark Mode and a clean Light Mode.
 * Dynamic Navigation: Custom-built sidebar and header navigation system (Dashboard, About, Profile, and Settings).
 * Responsive Design: Fully optimized for mobile, tablet, and desktop views using Bootstrap 5.
 * Modular Architecture:
     * Broken down into reusable sub-components for better maintainability.
     * State-driven UI updates for a smooth user experience.
     * Prop-drilling for consistent theme application across all views.
 * Modern UI Components:
     * Interactive URL input blocks with "glow" effects.
     * Detailed link listing with action buttons.
     * Comprehensive user Profile and Settings management.

 ## 🚀 Tech Stack

 * Frontend: React.js (Class and Functional Components)
 * Styling: Bootstrap 5, Bootstrap Icons, and Custom CSS-in-JS
 * Icons: Bootstrap Icons
 * Avatars: UI Avatars API

## 📂 Project Structure

````text
src/
├── components/
│   ├── Headers.js      # Mobile and Desktop header components
│   ├── Sidebar.js      # Navigation sidebar with theme toggle
│   ├── NavBar.js       # Main Layout Wrapper (Manages global state)
│   ├── Dashboard.js    # Main stats and URL input view
│   ├── About.js        # Project information and features
│   ├── Profile.js      # User account and security settings
│   └── Settings.js     # API keys and general preferences
├── App.js              # Root component & Page Routing logic
└── index.js            # Entry point
```
````


 ## 🛠️ Installation & Setup

 1. Clone the repository:
 `bash
 git clone https://github.com/your-username/url-shortener-react.git
 `

 2. Navigate to the project folder:
 `bash
 cd url-shortener-react
 `

 3. Install dependencies:
 `bash
 npm install
 `

 4. Start the development server:
 `bash
 npm start
 `

 ## 💡 Key Implementation Details

 ### Theme Management
 The theme state is managed centrally in NavBar.js and passed down to all children via React.cloneElement. This ensures that whenever the user toggles the theme, every component—from the Sidebar to the Profile cards—updates instantly with the correct colors, borders, and shadows.

 ### Navigation Logic
 Instead of a heavy routing library, this project uses a lightweight state-based navigation system in App.js. This allows for fast transitions and keeps the application logic simple, stable, and easy to debug.
