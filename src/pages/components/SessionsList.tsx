// import { base } from "../../App"
import { Link } from "react-router-dom"
import type { Session } from "../../model/Session"

type Props = {
    sessions: Session[]
}

export function SessionsList({ sessions }: Props) {

    return (
        <>

            <div>
                <Link to={`/nouvelle-fiche-pedagogique`}>
                    <button className="btn btn-accent">
                        Créer une fiche pédagogique
                    </button>
                </Link>
            </div>

            <div>
                {sessions.map((session) => (
                    <div key={session.id}>
                        <Link to={`/fiche-pedagogique/${session.id}`}>
                            <button className="btn btn-accent">
                                Thème : {session.generalInfo.theme}
                                <br />
                                Date : {session.generalInfo.date}
                            </button>
                        </Link>
                    </div>
                ))}
            </div>

        </>
    )
}
