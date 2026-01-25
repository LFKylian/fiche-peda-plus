import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useState } from "react"
import { Home } from "./pages/Home"
import { SessionBuilder } from "./pages/SessionBuilder"

export default function App() {
  const [sessions, setSessions] = useState([])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home sessions={sessions} />} />
        <Route path="/nouvelle-fiche-pedagogique" element={<SessionBuilder />} />
        <Route path="/fiche-pedagogique/:id" element={<SessionBuilder />} />
      </Routes>
    </BrowserRouter>
  )
}
