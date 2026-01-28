import { base } from "../../App"
import { Link } from "react-router-dom"
import type { Activity } from "../../model/Activity"

type Props = {
    activities: Activity[]
}

export function ActivitiesList({ activities }: Props) {

    return (
        <>

            <div>
                <Link to={`${base}/nouvelle-activite`}>
                    <button className="btn btn-accent">
                        Créer une activité
                    </button>
                </Link>
            </div>

            <div>
                {activities.map(activity => (
                    <div key={activity.id}>
                        <Link to={ `${base}/activite/${activity.id}` }>
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
