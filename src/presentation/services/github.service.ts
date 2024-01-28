import { GithubIssuePayload, GithubStartPayload } from "../../interfaces";

export class GithubService {
    constructor() { }

    onStar(payload: GithubStartPayload): string {
        let message: string = "";

        const { starred_at, action, sender, repository } = payload

        return `User ${sender.login} ${action} star on ${repository.full_name} `

    }
    onIssue(payload: GithubIssuePayload): string {
        const { action, issue, sender, repository } = payload

        if (action === "opened") {
            return `An issue was opened with this title: ${issue.title} by ${sender.login} on ${repository.full_name}`
        }

        if (action === "closed") {
            return `An issue was closed with this title: ${issue.title} by ${sender.login} on ${repository.full_name}`
        }

        if (action === "reopened") {
            return `An issue was reopened with this title: ${issue.title} by ${sender.login} on ${repository.full_name}`
        }

        return `Unhandle action for the issue event: ${action}`
    }
}

