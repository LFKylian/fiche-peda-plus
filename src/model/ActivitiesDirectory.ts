import { Activity } from "./Activity";
import type { ActivityDescription, ActivitySummary } from "../types/Form";

export class ActivitiesDirectory {

    static directory: Activity[] = []

    static fetchLocalStorage() {
        let itemKey, item: string | null
        let activity: Activity | null = null

        for (let i = 0; i < localStorage.length; i++) {
            itemKey = localStorage.key(i)

            // For each key in the local storage, gets the
            // corresponding activity to the key 'activity-{activity.id}'.
            if (itemKey && itemKey.startsWith("activity-")) {
                item = localStorage.getItem(itemKey)

                if (item && verifyDataFormat(JSON.parse(item))) {
                    activity = JSON.parse(item)
                }
            }

            // Adds the read activity or ignores it if it is null.
            if (activity) {
                this.addActivity(activity)
            }

            activity = null
        }
    }

    // Updates the activity if present or adds it
    static addActivity(activity: Activity) {
        let dir: Activity[]

        if (this.hasID(activity.id)) {
            dir = this.directory.filter((a) => a.id !== activity.id)
        } else {
            dir = this.directory.slice()
        }

        dir.push(activity)
        this.directory = dir
        localStorage.setItem(`activity-${activity.id}`, JSON.stringify(activity))
    }

    static getAllActivities(): Activity[] {
        return this.directory.slice()
    }

    static getAllSummarizedActivities(): ActivitySummary[] {
        const summarized: ActivitySummary[] = this.directory.map((activity) => {
            const res: ActivitySummary = {
            id: activity.id,
            theme: activity.theme,
            name: activity.name }

            return res
        })
        
        return summarized
    }

    static getActivityByID(id: string) {
        const activity: Activity | undefined = this.directory.find((a) => a.id === id)
        return activity !== undefined ? activity : null
    }

    static hasID(id: string): boolean {
        return this.directory.some((a) => a.id === id)
    }

}

function verifyDataFormat(data: unknown): data is ActivityDescription {

    if (typeof data !== "object" || data === null) return false

    const d = data as Record<string, unknown>

    return (
        typeof d.id === "string" &&
        typeof d.theme === "string" &&
        typeof d.format === "string" &&
        typeof d.name === "string" &&
        typeof d.proceedings === "string" &&
        typeof d.timing === "string" &&
        typeof d.goals === "string" &&
        Array.isArray(d.tools) &&
        d.tools.every(t => typeof t === "string") &&
        typeof d.evalCriterions === "string" &&
        typeof d.results === "string"
    )
}