import { Link } from "react-router-dom"
import type { Activity } from "../model/Activity"

type Props = {
    activities: Activity[]
}

export function ActivityList({ activities }: Props) {

    return (
        <>

            <div>
                <Link to="/">
                    <button className="btn btn-accent">
                        Ajouter une fiche pédagogique
                    </button>
                </Link>
            </div>

            <div>
                {activities.map(activity => (
                    <div key={activity.id}>
                        <Link to={ `/fiche-pedagogique/${activity.id}` }>
                            <button className="btn btn-accent">
                                {activity.name}
                            </button>
                        </Link>
                    </div>
                ))}

            </div>

        </>
    )
}
