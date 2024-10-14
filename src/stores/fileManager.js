import { defineStore } from 'pinia'
import { markRaw  } from 'vue'
import { FileManager } from '@/services/api/fileManager/fileManager.service'

export const useFileManagerStore = defineStore('fileManager', {
  state: () => ({
    storageFiles: [],
    storageDirectories: [],
  }),

  getters: {
    directories() {
      return this.storageDirectories
    },
    files() {
      return this.storageFiles
    },
  },

  actions: {
    async fetchFiles (path, search) {

      const fetchedFiles = await FileManager.fetchFiles(path,search)

      this.$patch((state) => {
        state.storageFiles = markRaw(fetchedFiles.data)
      })

      return fetchedFiles
    },

    async fetchFile (fileID) {
      return await FileManager.fetchFile(fileID)
    },

    async fetchDirectories(path,search) {
      const fetchedDirectories = await FileManager.fetchDirectories(path,search)

      this.$patch((state) => {
        state.storageDirectories = markRaw(fetchedDirectories.data)
      })

      return fetchedDirectories
    },

    addFile (file) {
      this.$patch((state) => {
        state.storageFiles.push(file)
      })
    },

    async createFile (file) {

    },
  },
})
