import { NavLink, Navigate, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import './App.css'

function App() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
  const apiBaseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api`
    : 'http://localhost:8000/api'

  return (
    <div className="app-shell py-4 py-md-5">
      <div className="container">
        <header className="mb-4">
          <h1 className="display-6 fw-semibold mb-2">Octofit Tracker</h1>
          <p className="text-body-secondary mb-0">API base URL: {apiBaseUrl}</p>
          {!codespaceName && (
            <p className="text-warning-emphasis mb-0 mt-2">
              Using localhost fallback because VITE_CODESPACE_NAME is not set.
            </p>
          )}
        </header>

        <nav className="nav nav-pills nav-fill flex-column flex-sm-row gap-2 mb-4">
          <NavLink
            to="/users"
            className={({ isActive }) =>
              `nav-link rounded-3 ${isActive ? 'active' : 'border'}`
            }
          >
            Users
          </NavLink>
          <NavLink
            to="/teams"
            className={({ isActive }) =>
              `nav-link rounded-3 ${isActive ? 'active' : 'border'}`
            }
          >
            Teams
          </NavLink>
          <NavLink
            to="/activities"
            className={({ isActive }) =>
              `nav-link rounded-3 ${isActive ? 'active' : 'border'}`
            }
          >
            Activities
          </NavLink>
          <NavLink
            to="/leaderboard"
            className={({ isActive }) =>
              `nav-link rounded-3 ${isActive ? 'active' : 'border'}`
            }
          >
            Leaderboard
          </NavLink>
          <NavLink
            to="/workouts"
            className={({ isActive }) =>
              `nav-link rounded-3 ${isActive ? 'active' : 'border'}`
            }
          >
            Workouts
          </NavLink>
        </nav>

        <Routes>
          <Route path="/" element={<Navigate to="/users" replace />} />
          <Route path="/users" element={<Users apiBaseUrl={apiBaseUrl} />} />
          <Route path="/teams" element={<Teams apiBaseUrl={apiBaseUrl} />} />
          <Route
            path="/activities"
            element={<Activities apiBaseUrl={apiBaseUrl} />}
          />
          <Route
            path="/leaderboard"
            element={<Leaderboard apiBaseUrl={apiBaseUrl} />}
          />
          <Route path="/workouts" element={<Workouts apiBaseUrl={apiBaseUrl} />} />
          <Route path="*" element={<Navigate to="/users" replace />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
