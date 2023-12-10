// @ts-check
import { CommandType } from "reciple";
import { pages } from "./button-pagination.js";
import { ReactionPaginationBuilder } from "@falloutstudios/djs-pagination";

/**
 * @type {import("reciple").RecipleModuleData}
 */
export default {
    versions: ['^8'],
    commands: [
        {
            command_type: CommandType.MessageCommand,
            name: 'pagination',
            description: 'Reaction pagination',
            async execute({ message }) {
                const pagination = new ReactionPaginationBuilder({
                    pages,
                    endTimer: 20000,
                    onEnd: 'ClearAllReactions',
                    reactions: [
                        {
                            emoji: '⏪',
                            type: 'FirstPage'
                        },
                        {
                            emoji: '⬅',
                            type: 'PreviousPage'
                        },
                        {
                            emoji: '🛑',
                            type: 'Stop'
                        },
                        {
                            emoji: '➡',
                            type: 'NextPage'
                        },
                        {
                            emoji: '⏩',
                            type: 'LastPage'
                        }
                    ]
                });

                await pagination.send({
                    command: message,
                    sendAs: 'NewMessage'
                })
            }
        }
    ],
    async onStart(client) { return true; }
};