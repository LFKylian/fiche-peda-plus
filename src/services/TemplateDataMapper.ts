import { Session } from "../model/Session"
import { Activity } from "../model/Activity"
import type { TemplateData } from "./ExportService"

export function buildTemplateDataFromSession(
    sessionNbr: string,
    legend1: string,
    legend2: string,
    session: Session,
    activities: Activity[]
): TemplateData {

    return {
        sessionNbr: sessionNbr,

        legend1: legend1,
        legend2: legend2,

        generalInfo: [
            session.generalInfo.theme,
            session.generalInfo.tutorsName.join(", "),
            String(session.generalInfo.tutoredNumber),
            session.generalInfo.date
        ],

        remindersNGoals: [
            session.remindersNGoals.remindersFromLastSess,
            session.remindersNGoals.keyMessages,
            session.remindersNGoals.pedagogicalGoals
        ],

        activitiesList: activities.map(activity => ([
            activity.theme,
            activity.format,
            activity.name,
            activity.proceedings,
            activity.timing,
            activity.goals,
            activity.tools.join(", "),
            activity.evalCriterions,
            activity.results
        ]))
    }
}
