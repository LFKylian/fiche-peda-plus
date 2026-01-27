import type { ActivitySummary } from "../../types/Form"

type ActivitySelectorProps = {
    activities: ActivitySummary[]
    selected: ActivitySummary[]
    onSelectionChange: (next: ActivitySummary[]) => void
}

export function ActivitySelector({ activities, selected, onSelectionChange }: ActivitySelectorProps) {

    function toggleActivity(activity: ActivitySummary) {
        let next = selected.slice()

        if (next.some((s) => s.id === activity.id)) {
            next = next.filter((a) => a.id !== activity.id)
        } else {
            next.push(activity)
        }

        onSelectionChange(next)
    }

    return (
        <div className="activities-container">

            {activities.map((activity) => {
                const isSelected = selected.some((s) => s.id === activity.id)

                return (
                    <div
                        key={activity.id}
                        className={`activity-card ${isSelected ? "selected" : ""}`}
                        onClick={() => toggleActivity(activity)}
                    >
                        <h4>{activity.name}</h4>
                        <p>{activity.theme}</p>
                    </div>
                )
            })}

        </div>
    )
}
