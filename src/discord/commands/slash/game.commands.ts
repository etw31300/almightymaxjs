import { createCommandGroupDecorator } from 'necord'

export const GameCommandsGroup = createCommandGroupDecorator({
  name: 'play',
  description: 'Play a game with Max or with someone else!'
})
