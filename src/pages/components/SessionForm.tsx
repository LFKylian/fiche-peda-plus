import { base } from "../../App"
import { useEffect, useState } from "react"
import { Session } from "../../model/Session"
import { ActivitySelector } from "./ActivitySelector"
import type { ActivitySummary } from "../../types/Form"
import { useNavigate, useParams } from "react-router-dom"
import type { SessionDescription } from "../../types/Form"
import { SessionsDirectory } from "../../model/SessionsDirectory"

type Props = {
    createdActivities: ActivitySummary[]
}

export function SessionForm({ createdActivities }: Props) {
    const navigate = useNavigate()
    const [tutorInput, setTutorInput] = useState("")

    let initialState = {
        id: "",

        generalInfo: {
            theme: "",
            tutorsName: new Array<string>(),
            tutoredNumber: 0,
            date: ""
        },

        remindersNGoals: {
            remindersFromLastSess: "",
            pedagogicalGoals: "",
            keyMessages: ""
        },

        activities: new Array<ActivitySummary>()
    }

    // Handle session modification from /fiche-pedagogique/:id
    const { id } = useParams<{ id: string }>()

    if (id) {
        const loadedSession: Session | null = SessionsDirectory.getSessionByID(id)

        if (loadedSession) {
            const session: SessionDescription = Session.getDescription(loadedSession)
            // Removing all the 'null' elements symbolized by {id: "", theme: "", name: ""}
            session.activities = session.activities.filter((activity) => activity.id !== "")
            initialState = session
        }
    }

    const [sessionForm, setSessionForm] = useState<SessionDescription>(initialState)
    const [selectedActivities, setSelectedActivities] = useState<ActivitySummary[]>(sessionForm.activities)

    const [isLeaving, setIsLeaving] = useState(false)
    // 'useEffect' is executed after each re-render that
    // lead changes of value for one or more elements of the array. 
    // Mandatory to insure that the states have been modified
    // before redirecting the user to an other page.
    useEffect(() => {
        if (isLeaving) {
            Session.saveFromDescription(sessionForm)
            navigate(base)
        }
        // Cleanup function called when a state change occurs
        return () => setIsLeaving(false)
    }, [sessionForm, isLeaving])

    function updateGeneralInfo<K extends keyof SessionDescription["generalInfo"]>(
        key: K,
        value: SessionDescription["generalInfo"][K]
    ) {
        setSessionForm(prev => ({
            ...prev,
            generalInfo: {
                ...prev.generalInfo,
                [key]: value
            }
        }))
    }

    function updateReminders<K extends keyof SessionDescription["remindersNGoals"]>(
        key: K,
        value: SessionDescription["remindersNGoals"][K]
    ) {
        setSessionForm(prev => ({
            ...prev,
            remindersNGoals: {
                ...prev.remindersNGoals,
                [key]: value
            }
        }))
    }

    function autoResize(e: React.ChangeEvent<HTMLTextAreaElement>) {
        e.target.style.height = "auto"
        e.target.style.height = e.target.scrollHeight + "px"
    }

    function addTutor() {
        if (!tutorInput.trim()) return
        updateGeneralInfo("tutorsName", [
            ...sessionForm.generalInfo.tutorsName,
            tutorInput.trim()
        ])
        setTutorInput("")
    }

    function removeTutor(index: number) {
        updateGeneralInfo(
            "tutorsName",
            sessionForm.generalInfo.tutorsName.filter((_, i) => i !== index)
        )
    }

    function updateActivities() {
        setSessionForm((prev) => ({
            ...prev,
            activities: selectedActivities
        }))
    }

    function handleOnSelectionChange(selection: ActivitySummary[]) {
        setSelectedActivities(selection)
    }

    function handleSave() {
        updateActivities()
        setIsLeaving(true)
    }

    function handleCancel() {
        navigate(base)
    }

    return (
        <>
            <form className="session-form">

                {/* INFORMATIONS GÉNÉRALES */}
                <section>
                    <h2>Informations générales</h2>

                    <label>
                        Thème
                        <input
                            value={sessionForm.generalInfo.theme}
                            onChange={e => updateGeneralInfo("theme", e.target.value)}
                        />
                    </label>

                    <label>
                        Date
                        <input
                            type="date"
                            value={sessionForm.generalInfo.date}
                            onChange={e => updateGeneralInfo("date", e.target.value)}
                        />
                    </label>

                    <label>
                        Nombre d'élèves
                        <input
                            type="number"
                            min={0}
                            value={sessionForm.generalInfo.tutoredNumber}
                            onChange={e =>
                                updateGeneralInfo("tutoredNumber", Number(e.target.value))
                            }
                        />
                    </label>

                    <div>
                        <label>Tuteurs</label>
                        <input
                            value={tutorInput}
                            placeholder="Ajouter un tuteur"
                            onChange={e => setTutorInput(e.target.value)}
                            onKeyDown={e => {
                                if (e.key === "Enter") {
                                    e.preventDefault()
                                    addTutor()
                                }
                            }}
                        />
                        <button type="button" onClick={addTutor}>
                            Ajouter
                        </button>

                        <ul>
                            {sessionForm.generalInfo.tutorsName.map((name, index) => (
                                <li key={index}>
                                    {name}
                                    <button
                                        type="button"
                                        onClick={() => removeTutor(index)}
                                    >
                                        ✕
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>

                {/* RAPPELS & OBJECTIFS */}
                <section>
                    <h2>Rappels & objectifs pédagogiques</h2>

                    <label>
                        Rappels de la dernière session
                        <textarea
                            className="textarea"
                            value={sessionForm.remindersNGoals.remindersFromLastSess}
                            onChange={e => {
                                autoResize(e)
                                updateReminders("remindersFromLastSess", e.target.value)
                            }}
                        />
                    </label>

                    <label>
                        Objectifs pédagogiques
                        <textarea
                            className="textarea"
                            value={sessionForm.remindersNGoals.pedagogicalGoals}
                            onChange={e => {
                                autoResize(e)
                                updateReminders("pedagogicalGoals", e.target.value)
                            }}
                        />
                    </label>

                    <label>
                        Messages clés
                        <textarea
                            className="textarea"
                            value={sessionForm.remindersNGoals.keyMessages}
                            onChange={e => {
                                autoResize(e)
                                updateReminders("keyMessages", e.target.value)
                            }}
                        />
                    </label>
                </section>

                {/* ACTIVITÉS (placeholder) */}
                <section>
                    <h2>Activités</h2>

                    <label>
                        Sélectionner des activités
                        <ActivitySelector
                            activities={createdActivities}
                            selected={selectedActivities}
                            onSelectionChange={handleOnSelectionChange}
                        />
                    </label>

                </section>

            </form>

            <div className="form-actions">
                <button className="btn btn-accent" onClick={handleSave}>
                    Enregistrer la fiche
                </button>

                <button className="btn btn-secondary" onClick={handleCancel}>
                    Annuler
                </button>
            </div>
        </>
    )
}
