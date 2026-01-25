import { useState } from "react"
import type { ActivityFormState } from "../types/ActivityFormState"

export function ActivityForm() {
  const [activityForm, setActivityForm] = useState<ActivityFormState>({
    theme: "",
    format: "",
    name: "",
    proceedings: "",
    timing: "",
    goals: "",
    tools: [],
    evalCriterions: "",
    results: ""
  })

  const [toolInput, setToolInput] = useState("")
  const [tools, setTools] = useState<string[]>([])

  function updateField<K extends keyof ActivityFormState>(
    key: K,
    value: ActivityFormState[K]
  ) {
    setActivityForm(prev => ({ ...prev, [key]: value }))
  }

  function autoResize(e: React.ChangeEvent<HTMLTextAreaElement>) {
    e.target.style.height = "auto"
    e.target.style.height = e.target.scrollHeight + "px"
  }

  function addTool() {
    if (!toolInput.trim()) return
    setTools(prev => [...prev, toolInput.trim()])
    updateField("tools", [...activityForm.tools, toolInput.trim()])
    setToolInput("")
  }

  function removeTool(index: number) {
    setTools(prev => prev.filter((_, i) => i !== index))
    updateField(
      "tools",
      activityForm.tools.filter((_, i) => i !== index)
    )
  }

  return (
    <form className="activity-form">
      
      {/* IDENTITÉ */}
      <section>
        <h2>Informations générales</h2>

        <label>
          Thème
          <input
            value={activityForm.theme}
            onChange={e => updateField("theme", e.target.value)}
          />
        </label>

        <label>
          Format
          <input
            value={activityForm.format}
            onChange={e => updateField("format", e.target.value)}
          />
        </label>

        <label>
          Nom de l’activité
          <input
            value={activityForm.name}
            onChange={e => updateField("name", e.target.value)}
          />
        </label>
      </section>

      {/* CONTENU */}
      <section>
        <h2>Contenu pédagogique</h2>

        <label>
          Déroulé
          <textarea
            className="textarea"
            value={activityForm.proceedings}
            onChange={e => {
              autoResize(e)
              updateField("proceedings", e.target.value)
            }}
            placeholder="Étapes, consignes, déroulement..."
          />
        </label>

        <label>
          Objectifs
          <textarea
            className="textarea"
            value={activityForm.goals}
            onChange={e => {
              autoResize(e)
              updateField("goals", e.target.value)
            }}
            placeholder="Compétences visées, intentions pédagogiques..."
          />
        </label>

        <label>
          Timing
          <input
            value={activityForm.timing}
            onChange={e => updateField("timing", e.target.value)}
            placeholder="Ex : 15 min / 30 min"
          />
        </label>
      </section>

      {/* MATÉRIEL */}
      <section>
        <h2>Matériel</h2>

        <div className="tools-input">
          <input
            value={toolInput}
            placeholder="Ajouter un matériel (Entrée pour valider)"
            onChange={e => setToolInput(e.target.value)}
            onKeyDown={e => {
              if (e.key === "Enter") {
                e.preventDefault()
                addTool()
              }
            }}
          />
          <button type="button" onClick={addTool}>
            Ajouter
          </button>
        </div>

        <ul className="tools-list">
          {tools.map((tool, index) => (
            <li key={index}>
              {tool}
              <button
                type="button"
                onClick={() => removeTool(index)}
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      </section>

      {/* ÉVALUATION */}
      <section>
        <h2>Évaluation & résultats</h2>

        <label>
          Critères d’évaluation
          <textarea
            className="textarea"
            value={activityForm.evalCriterions}
            onChange={e => {
              autoResize(e)
              updateField("evalCriterions", e.target.value)
            }}
          />
        </label>

        <label>
          Résultats observés
          <textarea
            className="textarea"
            value={activityForm.results}
            onChange={e => {
              autoResize(e)
              updateField("results", e.target.value)
            }}
          />
        </label>
      </section>

    </form>
  )
}
