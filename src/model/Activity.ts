import type { ActivityFormState } from "../types/ActivityFormState";

export class Activity {

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

}