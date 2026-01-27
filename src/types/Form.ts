export type ActivityDescription = {

    id: string
    theme: string
    format: string
    name: string
    proceedings: string
    timing: string
    goals: string
    tools: string[]
    evalCriterions: string
    results: string

}

export type ActivitySummary = {

    id: string
    name: string
    theme: string
    
}

export type SessionDescription = {

    id: string

    generalInfo: {
        theme: string
        tutorsName: string[]
        tutoredNumber: number
        date: string
    }

    remindersNGoals: {
        remindersFromLastSess: string
        pedagogicalGoals: string
        keyMessages: string
    }

    activities: ActivitySummary[]

    // debriefing will be add later
}