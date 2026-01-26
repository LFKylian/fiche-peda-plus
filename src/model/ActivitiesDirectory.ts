import { Activity } from "./Activity";

export class ActivitiesDirectory {

    static directory: Activity[] = []

    static fetchLocalStorage() {
        let itemKey, item: string | null
        let activity: Activity | null = null

        for (let i = 0; i < localStorage.length; i++) {
            itemKey = localStorage.key(i)

            if (itemKey && itemKey.startsWith("session-")) {
                item = localStorage.getItem(itemKey)
                activity = item !== null ? JSON.parse(item) : null
            }

            if (activity && !this.getActivityByID(activity.id)) {
                this.addActivity(activity)
            }

            activity = null
        }
    }

    static addActivity(activity: Activity) {
        const dir: Activity[] = this.directory.slice()
        dir.push(activity)
        this.directory = dir
        localStorage.setItem(`session-${activity.id}`, JSON.stringify(activity))
    }

    static getAllActivities(): Activity[] {
        return this.directory.slice()
    }

    static getActivityByID(id: string) {
        const activity: Activity | undefined = this.directory.find((a) => a.id === id)
        return activity !== undefined ? activity : null
    }

}