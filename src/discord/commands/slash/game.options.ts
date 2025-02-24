import { StringOption } from 'necord'

export class GameOptions {
  @StringOption({
    name: 'user',
    description: 'The user to play a game with.',
    autocomplete: true,
    required: false
  })
    userId!: string
}
