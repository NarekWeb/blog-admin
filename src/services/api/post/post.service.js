import { getInstance } from '../axios'

export const PostService = {

  async fetchPosts () {
    const { data } =  await getInstance().get('/backend/post')
    return data.data
  },

  async createPost (post) {
    const { data } = await getInstance().post('/backend/post', post)
    return data
  },

  async updatePost (post) {
    const { data } = await getInstance().put(`/backend/post/${post.id}`, post)
    return data
  },

  async deletePost (postId) {
    const { data } = await getInstance().delete(`/backend/post/${postId}`)
    return data
  },

  async fetchPost (postId) {
    const { data } = await getInstance().get(`/backend/post/${postId}`)
    return data.data
  },
}
