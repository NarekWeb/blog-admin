import { defineStore } from 'pinia'
import { markRaw  } from 'vue'
import { LinkService } from '@/services/api/link/link.service'

export const useLinkStore = defineStore('link', {
  state: () => ({
    links: [],
    link: null,
  }),
  getters: {
    linksList() {
      return this.links
    },
    link() {
      return this.link
    },
  },
  actions: {
    async fetchLinks () {
      const fetchedLinks  = await LinkService.fetchLinks()

      this.$patch((state) => {
        state.links = markRaw(fetchedLinks)
      })

      return fetchedLinks
    },

    async fetchLink (id) {
      const fetchedLink  = await LinkService.fetchLink(id)

      this.$patch((state) => {
        state.link = fetchedLink
      })

      return fetchedLink
    },
  },
})
