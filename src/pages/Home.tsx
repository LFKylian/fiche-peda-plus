import { Activity } from "../model/Activity"
import { ActivityList } from "../components/ActivityList"
import { ActivitiesDirectory } from "../model/ActivitiesDirectory"

export function Home() {
  ActivitiesDirectory.fetchLocalStorage()
  const activities: Activity[] = ActivitiesDirectory.getAllActivities()

  return (
    <>

      <div>
        <h1><strong>Mes fiches pédagogiques</strong></h1>
      </div>

      <div>
        <ActivityList activities={activities} />
      </div>

    </>
  )
}
