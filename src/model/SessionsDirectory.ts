import { Session } from "./Session";
import type { SessionDescription } from "../types/Form";

export class SessionsDirectory {

    static directory: Map<string, Session> = new Map()

    static fetchLocalStorage() {
        let itemKey, item: string | null
        let session: Session | null = null

        for (let i = 0; i < localStorage.length; i++) {
            itemKey = localStorage.key(i)

            // For each key in the local storage, gets the
            // corresponding session to the key 'session-{session.id}'.
            if (itemKey && itemKey.startsWith("session-")) {
                item = localStorage.getItem(itemKey)

                if (item && verifyDataFormat(JSON.parse(item))) {
                    session = JSON.parse(item)
                }
            }

            // Adds the read session or ignores it if it is null.
            if (session) {
                this.addSession(session)
            }

            session = null
        }
    }

    // Updates the session if present or adds it
    static addSession(session: Session) {
        this.directory.set(session.id, session)
        localStorage.setItem(`session-${session.id}`, JSON.stringify(session))
    }

    static getAllSessions(): Map<string, Session> {
        return this.directory
    }

    static getSessionByID(id: string) {
        const session: Session | undefined = this.directory.get(id)
        return session !== undefined ? session : null
    }

    static hasID(id: string): boolean {
        return this.directory.has(id)
    }

}

function verifyDataFormat(data: unknown): data is SessionDescription {
    if (typeof data !== "object" || data === null) return false

    const d = data as Record<string, unknown>

    return (
        typeof d.generalInfo === "object" &&
        d.generalInfo !== null &&
        typeof (d.generalInfo as any).theme === "string" &&
        Array.isArray((d.generalInfo as any).tutorsName) &&
        typeof (d.generalInfo as any).tutoredNumber === "number" &&
        typeof (d.generalInfo as any).date === "string" &&

        typeof d.remindersNGoals === "object" &&
        d.remindersNGoals !== null &&
        typeof (d.remindersNGoals as any).remindersFromLastSess === "string" &&
        typeof (d.remindersNGoals as any).pedagogicalGoals === "string" &&
        typeof (d.remindersNGoals as any).keyMessages === "string" &&

        Array.isArray(d.activities) &&
        d.activities.every(t => typeof t === "string") &&

        typeof d.debriefing === "object"
    )
}