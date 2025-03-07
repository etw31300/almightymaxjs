import { Injectable } from '@nestjs/common'
import config from 'config'
import { ApplicationCommandOptionChoiceData, AutocompleteInteraction, Collection, GuildMember, Snowflake } from 'discord.js'
import { AutocompleteInterceptor } from 'necord'

import MaxConfig from '~/domain/config/MaxConfig'
import { createGuildMemberFuzzySearch, FuseResult, isFuseResult } from '~/utils/fuzzy-search'

const { maxUserId } = config.get<MaxConfig>('max')

@Injectable()
export class SelectGuildMemberInterceptor extends AutocompleteInterceptor {
  private readonly mapGuildMemberOrFuseResultToOptionChoiceData = (guildMemberOrFuseResult: GuildMember | FuseResult<GuildMember>): ApplicationCommandOptionChoiceData => {
    const guildMember = isFuseResult(guildMemberOrFuseResult)
      ? guildMemberOrFuseResult.item
      : guildMemberOrFuseResult

    return {
      name: guildMember.displayName,
      value: guildMember.id
    }
  }

  public async transformOptions (interaction: AutocompleteInteraction): Promise<void> {
    const filterSelfAndBotsExceptMax = (guildMember: GuildMember, guildMemberId: Snowflake): boolean =>
      guildMemberId !== interaction.user.id && (!guildMember.user.bot || guildMemberId === maxUserId)

    const allApplicableGuildMembers = (
      await interaction.guild?.members.list({ cache: true, limit: 99 }) ?? new Collection<Snowflake, GuildMember>()
    ).filter(filterSelfAndBotsExceptMax)

    const searchQuery = interaction.options.get('user')?.value?.toString() ?? ''

    const guildMemberFuzzySearch = await createGuildMemberFuzzySearch(allApplicableGuildMembers)
    const searchResults = guildMemberFuzzySearch.search(searchQuery)

    if (searchQuery.length === 0) {
      return await interaction.respond(
        allApplicableGuildMembers.map(this.mapGuildMemberOrFuseResultToOptionChoiceData)
      )
    }

    return await interaction.respond(
      searchResults.map(this.mapGuildMemberOrFuseResultToOptionChoiceData)
    )
  }
}
