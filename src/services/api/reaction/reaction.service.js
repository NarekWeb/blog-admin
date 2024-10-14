import { getInstance } from '../axios'

export const ReactionService = {
  async createReaction (reaction) {
    const { data } = await getInstance().post('/backend/reaction', reaction)
    return data
  },
}
