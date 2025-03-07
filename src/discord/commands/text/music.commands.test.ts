
describe('MusidCommands', () => {
  describe('playSong', () => {
    it.todo('should reply with a message if the command is invoked outside of a guild')
    it.todo('should resume playback if the player is paused and no search query was provided')
    it.todo('should reply with a message indicating no search query was provided if one isn\'t and the player is not paused')
    it.todo('should add the first result to the queue given the provided search query')
  })

  describe('stopPlayback', () => {
    it.todo('should reply with a message if the command is invoked outside of a guild')
    it.todo('should disconnect the player and destroy it with the reason of \'User request\' when invoked')
  })
})
