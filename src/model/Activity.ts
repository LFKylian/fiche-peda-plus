import { ActivitiesDirectory } from "./ActivitiesDirectory";
import type { ActivityFormState } from "../types/ActivityFormState";

export class Activity {

    id: string = crypto.randomUUID()

    theme: string = ""
    format: string = ""
    name: string = ""
    proceedings: string = ""
    timing: string = ""
    goals: string = ""
    tools: string[] = []
    evalCriterions: string = ""
    results: string = ""

    static fromForm(data: ActivityFormState): Activity {
        const activity = new Activity()

        activity.theme = data.theme
        activity.format = data.format
        activity.name = data.name
        activity.proceedings = data.proceedings
        activity.timing = data.timing
        activity.goals = data.goals
        activity.tools = data.tools
        activity.evalCriterions = data.evalCriterions
        activity.results = data.results

        return activity
    }

    static toForm(activity: Activity): ActivityFormState {

        const data: ActivityFormState = {
            theme: activity.theme,
            format: activity.format,
            name: activity.name,
            proceedings: activity.proceedings,
            timing: activity.timing,
            goals: activity.goals,
            tools: activity.tools,
            evalCriterions: activity.evalCriterions,
            results: activity.results
        }

        return data
    }

    static save(data: ActivityFormState): Activity {
        const activity = this.fromForm(data)
        ActivitiesDirectory.addActivity(activity)
        return activity
    }

}