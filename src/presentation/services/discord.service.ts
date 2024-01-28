import { envs } from "../../config/envs";

export class DiscordService {

    private readonly discordWebHook: string = envs.DISCORD_WEBHOOK_URL

    constructor() { }

    async notify(message: string) {
        const body = {
            content: message,
            embeds: [
                {
                    image: {
                        url: "https://avatars.githubusercontent.com/u/10251037?s=200&v=4"
                    }
                }
            ]
        }

        const response = await fetch(this.discordWebHook, {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json"
            }
        })

        console.log(response)

        if (!response.ok) {
            console.error(`Error sending message to discord: ${response.statusText}`)
            return false;
        }

        return true;
    }
}