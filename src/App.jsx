import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import CodeAnalysis from './pages/CodeAnalysis'
import Learn from './pages/Learn'
import Practice from './pages/Practice'
import Leaderboard from './pages/Leaderboard'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="code" element={<CodeAnalysis />} />
        <Route path="learn" element={<Learn />} />
        <Route path="practice" element={<Practice />} />
        <Route path="leaderboard" element={<Leaderboard />} />
      </Route>
    </Routes>
  )
}

export default App
