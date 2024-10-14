import { getInstance } from '../axios'

export const CommentService = {

  async fetchComments (params) {
    return  await getInstance().get('/backend/comment', { params })
  },

  async createComment (comment) {
    const { data } = await getInstance().post('/backend/comment', comment)
    return data
  },

  async updateComment (comment) {
    const { data } = await getInstance().put(`/backend/comment/${comment.id}`, comment)
    return data
  },

  async deleteComment (commentId) {
    const { data } = await getInstance().delete(`/backend/comment/${commentId}`)
    return data
  },

  async fetchComment (commentId) {
    const { data } = await getInstance().get(`/backend/comment/${commentId}`)
    return data.data
  },

  async updateCommentsOrder (comment) {
    const { data } = await getInstance().put('/backend/comment/reorder', comment)
    return data.status
  }
}
