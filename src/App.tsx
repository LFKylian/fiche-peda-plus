import { Home } from "./pages/Home"
import { ActivityHome } from "./pages/ActivityHome"
import { DocxPreview } from "./pages/DocumentPreview"
import { SessionBuilder } from "./pages/SessionBuilder"
import { ActivityBuilder } from "./pages/ActivityBuilder"
import { BrowserRouter, Routes, Route } from "react-router-dom"

// export const base: string = "https://LFKylian.github.io/fiche-peda-plus"

export default function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path={`/`} element={<Home />} />

        <Route path={`/nouvelle-fiche-pedagogique`} element={<SessionBuilder />} />
        <Route path={`/fiche-pedagogique/:id`} element={<SessionBuilder />} />
        <Route path={`/fiche-pedagogique/:id/apercu-docx`} element={<DocxPreview />} />

        <Route path={`/mes-activites`} element={<ActivityHome />} />
        <Route path={`/nouvelle-activite`} element={<ActivityBuilder />} />
        <Route path={`/activite/:id`} element={<ActivityBuilder />} />
      </Routes>
    </BrowserRouter>
  )
}
