import { ActivitiesDirectory } from "../model/ActivitiesDirectory"
import type { ActivitySummary } from "../types/Form"
import { SessionForm } from "./components/SessionForm"

export function SessionBuilder() {
  const createdActivities: ActivitySummary[] = ActivitiesDirectory.getAllSummarizedActivities()

  return (
    <>
      <SessionForm createdActivities={createdActivities}/>
    </>
  )
}
