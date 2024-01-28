import express from "express"
import { envs } from "./config/envs";
import { GithubController } from "./presentation/github/controller";
import { GithubService } from "./presentation/services/github.service";
import { DiscordService } from "./presentation/services/discord.service";

(() => {
    main()
})();

function main() {
    const app = express()
    app.use(express.json())
    const service = new GithubService()
    const discord = new DiscordService()
    const controller = new GithubController(service, discord)

    app.post("/api/github", controller.webhookHandler)

    app.listen(envs.PORT, () => {
        console.log(`Listening on port ${envs.PORT}`)
    })
}


