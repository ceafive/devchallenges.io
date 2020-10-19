export const state = () => ({
  uploadReady: true,
  uploading: false,
  uploaded: false,
  imgURL: '',
  progressBarWidth: 0,
})
export const mutations = {
  SET_IMG_DATA(state, payload) {
    state.imgURL = payload
  },
  UPLOADREADY(state, payload) {
    state.uploadReady = payload
  },
  UPLOADING(state, payload) {
    state.uploading = payload
  },
  UPLOADED(state, payload) {
    state.uploaded = payload
  },
  PROGRESS_BAR_WIDTH(state, payload) {
    state.progressBarWidth = payload
  },
}
export const actions = {
  async sendFileToDB({ commit }, file) {
    try {
      commit('UPLOADREADY', false)
      commit('UPLOADING', true)
      commit('UPLOADED', false)

      let width = 0
      const setProgressBarWidth = setInterval(() => {
        if (width === 100) return
        width = width + 5

        commit('PROGRESS_BAR_WIDTH', width)
      }, 2000)

      const res = await this.$axios.$post('/upload/', file)
      const url = await res.url
      if (url) {
        commit('PROGRESS_BAR_WIDTH', 100)
        commit('UPLOADREADY', false)
        commit('UPLOADING', false)
        clearInterval(setProgressBarWidth)
      }

      commit('SET_IMG_DATA', url)
      commit('UPLOADED', true)
      commit('PROGRESS_BAR_WIDTH', 0)
    } catch (error) {
      commit('UPLOADREADY', true)
      commit('UPLOADING', false)
      commit('UPLOADED', false)
      commit('PROGRESS_BAR_WIDTH', 0)
      // console.log(error)
    }
  },
  getFileUploaded({ commit }, file) {
    commit('GET_FILE', file)
  },
}

export const getters = {
  file: (state) => state.file,
  url: (state) => state.url,
  uploadReady: (state) => state.uploadReady,
  uploading: (state) => state.uploading,
  uploaded: (state) => state.uploaded,
  progressBarWidth: (state) => state.progressBarWidth,
  imgURL: (state) => state.imgURL,
}
