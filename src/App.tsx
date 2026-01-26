import { Home } from "./pages/Home"
import { SessionBuilder } from "./pages/SessionBuilder"
import { BrowserRouter, Routes, Route } from "react-router-dom"

export default function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/nouvelle-fiche-pedagogique" element={<SessionBuilder />} />
        <Route path="/fiche-pedagogique/:id" element={<SessionBuilder />} />
      </Routes>
    </BrowserRouter>
  )
}
