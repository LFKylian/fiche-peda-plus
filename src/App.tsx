import { Home } from "./pages/Home"
import { ActivityHome } from "./pages/ActivityHome"
import { SessionBuilder } from "./pages/SessionBuilder"
import { ActivityBuilder } from "./pages/ActivityBuilder"
import { BrowserRouter, Routes, Route } from "react-router-dom"

export const base: string = "https://LFKylian.github.io/fiche-peda-plus"

export default function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path={`${base}/`} element={<Home />} />

        <Route path={`${base}/nouvelle-fiche-pedagogique`} element={<SessionBuilder />} />
        <Route path={`${base}/fiche-pedagogique/:id`} element={<SessionBuilder />} />

        <Route path={`${base}/mes-activites`} element={<ActivityHome />} />
        <Route path={`${base}/nouvelle-activite`} element={<ActivityBuilder />} />
        <Route path={`${base}/activite/:id`} element={<ActivityBuilder />} />
      </Routes>
    </BrowserRouter>
  )
}
