import { Collection, GuildMember, Snowflake } from 'discord.js'
// eslint-disable-next-line import/no-named-default
import type { default as Fuse, IFuseOptions, FuseResult as ActualFuseResult } from 'fuse.js' with { 'resolution-mode': 'import' }

export type FuseResult<T> = ActualFuseResult<T>

/**
 * Creates a general fuzzy search based on the data passed in and the options provided.
 * @param data Data to fuzzy search on.
 * @param options Options to provide for the fuzzy search.
 */
export const createFuzzySearch = async <T extends object | string | string[]>(data: readonly T[], options?: IFuseOptions<T>): Promise<Fuse<T>> => {
  const { default: Fuse } = await import('fuse.js')
  return new Fuse(data, options)
}

/**
 * Creates a fuzzy search based upon the guild member's displayNames automatically.
 * @param data Guild members map.
 * @param options Additional options to provide to the fuzzy search.
 */
export const createGuildMemberFuzzySearch = async (data: Collection<Snowflake, GuildMember>, options?: Omit<IFuseOptions<GuildMember>, 'keys'>): Promise<Fuse<GuildMember>> =>
  await createFuzzySearch(Array.from(data.values()), {
    keys: ['displayName'],
    ...options
  })
