import { Injectable } from '@nestjs/common'
import config from 'config'
import { AutocompleteInteraction, Collection, GuildMember, Snowflake } from 'discord.js'
import { AutocompleteInterceptor } from 'necord'

import MaxConfig from '~/domain/config/MaxConfig'
import { createGuildMemberFuzzySearch, FuseResult } from '~/utils/fuzzy-search'

const { maxUserId } = config.get<MaxConfig>('max')

@Injectable()
export class SelectGuildMemberInterceptor extends AutocompleteInterceptor {
  public async transformOptions (interaction: AutocompleteInteraction): Promise<void> {
    const guildMembers = await interaction.guild?.members.list({ cache: true, limit: 25 }) ?? new Collection<Snowflake, GuildMember>()
    const guildMemberFuzzySearch = await createGuildMemberFuzzySearch(guildMembers)

    const excludeSelfAndBotsExceptMax = ({ item: guildMember }: FuseResult<GuildMember>): boolean => {
      return guildMember.id !== interaction.user.id && (!guildMember.user.bot || guildMember.id === maxUserId)
    }

    return await interaction.respond(
      guildMemberFuzzySearch.search(interaction.options.get('user')?.value?.toString() ?? '')
        .filter(excludeSelfAndBotsExceptMax)
        .map(({ item: guildMember }) => ({
          name: guildMember.displayName,
          value: guildMember.id
        }))
    )
  }
}
