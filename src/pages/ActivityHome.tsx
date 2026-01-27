import { Activity } from "../model/Activity"
import { ActivitiesList } from "./components/ActivitiesList"
import { ActivitiesDirectory } from "../model/ActivitiesDirectory"

export function ActivityHome() {
  ActivitiesDirectory.fetchLocalStorage()
  const activities: Activity[] = ActivitiesDirectory.getAllActivities()

  return (
    <>

      <div>
        <h1><strong>Mes activités</strong></h1>
      </div>

      <div>
        <ActivitiesList activities={activities} />
      </div>

    </>
  )
}
