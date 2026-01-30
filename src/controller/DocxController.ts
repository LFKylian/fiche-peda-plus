import { Activity } from "../model/Activity";
import type { Session } from "../model/Session";
import { SessionsDirectory } from "../model/SessionsDirectory";
import { ActivitiesDirectory } from "../model/ActivitiesDirectory";
import { buildTemplateDataFromSession } from "../services/TemplateDataMapper";
import { generateAndDownloadDocx, previewDocx, type TemplateData } from "../services/ExportService";

export class DocxController {

    public static mapTemplateDataFromSessID(sessionID: string): TemplateData | null {
        const session: Session | null = SessionsDirectory.getSessionByID(sessionID)

        if (!session) return null
        
        let activity: Activity | null;
        const activities: Activity[] = new Array()

        session.activities.map((id) => {
            activity = ActivitiesDirectory.getActivityByID(id)

            if (activity) {
                activities.push(activity)
            }
        })

        const data: TemplateData = buildTemplateDataFromSession("", "", "", session, activities)
        return data
    }

    public static async preview(data: TemplateData, containerElement: HTMLElement) {
        await previewDocx(data, containerElement).catch(() => console.error("Cannot load preview!"))
    }

    public static async download(sessionID: string) {
        const data: TemplateData | null = this.mapTemplateDataFromSessID(sessionID)

        if (!data) return

        await generateAndDownloadDocx(data).catch(() => console.error("Impossible to download!"))
    }

}