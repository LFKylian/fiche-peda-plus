import { ActivityHome } from "./ActivityHome";
import type { Session } from "../model/Session";
import { SessionsList } from "./components/SessionsList";
import { SessionsDirectory } from "../model/SessionsDirectory";

export function Home() {
  SessionsDirectory.fetchLocalStorage()
  const sessionsMap: Map<string, Session> = SessionsDirectory.getAllSessions()
  const sessions: Session[] = Array.from(sessionsMap.values())

  return (
    <>

      <div>
        <h1><strong>Mes fiches pédagogiques</strong></h1>
      </div>

      <div>
        <SessionsList sessions={sessions} />
      </div>

      <br />

      <div>
        <ActivityHome />
      </div>

    </>
  )

}