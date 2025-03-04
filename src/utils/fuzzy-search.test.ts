import { Collection, GuildMember, Snowflake } from 'discord.js'
import type { IFuseOptions } from 'fuse.js' with { 'resolution-mode': 'import' }
import { v4 as uuid } from 'uuid'
import { isFuseResult, FuseResult, createGuildMemberFuzzySearch } from './fuzzy-search'

describe('fuzzy-search', () => {
  afterEach(() => jest.resetAllMocks())

  describe('createGuildMemberFuzzySearch', () => {
    it('should create a fuzzy search based on the displayName of each user in the provided collection', async () => {
      const expectedGuildMembers = [
        { displayName: 'someone' },
        { displayName: 'someoneelse' }
      ] as unknown as GuildMember[]

      const guildMemberCollection = new Collection<Snowflake, GuildMember>(expectedGuildMembers.map((guildMember) => [uuid(), guildMember]))
      const expectedOptions: Omit<IFuseOptions<GuildMember>, 'keys'> = { isCaseSensitive: true }

      const createFuzzySearchSpy = jest.spyOn(jest.requireActual('./fuzzy-search'), 'createFuzzySearch')

      await expect(createGuildMemberFuzzySearch(guildMemberCollection, expectedOptions)).resolves
      expect(createFuzzySearchSpy).toHaveBeenCalledExactlyOnceWith(
        expectedGuildMembers,
        {
          ...expectedOptions,
          keys: ['displayName']
        }
      )
    })
  })

  describe('isFuseResult', () => {
    it.each<{ data: FuseResult<any> | null | object, expectedResult: boolean }>([
      { data: null, expectedResult: false },
      { data: {}, expectedResult: false },
      { data: { item: 'something', refIndex: 0 }, expectedResult: true }
    ])('should return with $expectedResult when the the value is \'$data\'', ({ data, expectedResult }) => {
      expect(isFuseResult(data)).toBe(expectedResult)
    })
  })
})
