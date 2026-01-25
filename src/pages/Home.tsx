import { Link } from "react-router-dom"

type Session = {
  id: string
  theme: string
  date: string
}

export function Home({ sessions }: { sessions: Session[] }) {
  return (
    <div>
      <h1>Mes sessions</h1>

      <Link to="/nouvelle-fiche-pedagogique">
        <button>➕ Créer une session</button>
      </Link>

      <ul>
        {sessions.map(session => (
          <li key={session.id}>
            <Link to={`/fiche-pedagogique/${session.id}`}>
              {session.theme} — {session.date}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
