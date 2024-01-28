import { Request, Response } from 'express';
import { GithubService } from '../services/github.service';
import { DiscordService } from '../services/discord.service';

export class GithubController {

    constructor(
        private readonly githubService: GithubService,
        private readonly discordService: DiscordService
    ) { }

    webhookHandler = (req: Request, res: Response) => {

        const githubEvent = req.headers['x-github-event'] ?? "unknown"
        const payload = req.body
        let message: string = "";

        switch (githubEvent) {
            case "star":
                message = this.githubService.onStar(payload)
                break;
            case "issues":
                message = this.githubService.onIssue(payload)
                break;
            default:
                message = `Event ${githubEvent} not implemented`
        }

        this.discordService.notify(message)
            .then((success) => {
                if (success) {
                    res.status(202).send("accepted")
                } else {
                    res.status(500).send("error")
                }
            }
            ).catch((err) => {
                console.error(err)
                res.status(500).send("error")
            })

    }
}