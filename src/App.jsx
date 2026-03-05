import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import CodeAnalysis from './pages/CodeAnalysis'
import Learn from './pages/Learn'
import Practice from './pages/Practice'
import Leaderboard from './pages/Leaderboard'
import Auth from './pages/Auth'
import { AuthProvider } from './contexts/AuthContext'
import LearnCourse from './pages/LearnCourse'
import Translate from './pages/Translate'

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="code" element={<CodeAnalysis />} />
          <Route path="learn" element={<Learn />} />
          <Route path="practice" element={<Practice />} />
          <Route path="practice/:courseId" element={<Practice />} />
          <Route path="leaderboard" element={<Leaderboard />} />
          <Route path="auth" element={<Auth />} />
          <Route path="/learn/:courseId" element={<LearnCourse />} />
          <Route path="translate" element={<Translate />} />
        </Route>
      </Routes>
    </AuthProvider>
  )
}

export default App
