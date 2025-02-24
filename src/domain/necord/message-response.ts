import type { Message, OmitPartialGroupDMChannel } from 'discord.js'

export interface MessageResponse extends OmitPartialGroupDMChannel<Message<boolean>> {}
