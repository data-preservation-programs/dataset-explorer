// /////////////////////////////////////////////////////////////////////// State
// -----------------------------------------------------------------------------
const state = () => ({
  datasetList: false,
  datasetSingular: false
})

// ///////////////////////////////////////////////////////////////////// Getters
// -----------------------------------------------------------------------------
const getters = {
  datasetList: state => state.datasetList,
  datasetSingular: state => state.datasetSingular
}

// ///////////////////////////////////////////////////////////////////// Actions
// -----------------------------------------------------------------------------
const actions = {
  clearStore ({ commit }) {
    commit('CLEAR_STORE')
  },
  // /////////////////////////////////////////////////////////// getExplorerData
  async getExplorerData ({ commit }, payload) {
    try {
      const response = await this.$AxiosAuth.get('/get-explorer-data', {
        params: { file: payload.file, format: 'json' }
      })
      const file = response.data.payload
      if (payload.tag === 'index') {
        commit('SET_DATASET_LIST', file)
      } else {
        commit('SET_DATASET_SINGULAR', file)
      }
      return file
    } catch (e) {
      console.log('====== [Store Action: explorer/getExplorerData] ERROR')
      console.log(e)
      return false
    }
  }
}

// /////////////////////////////////////////////////////////////////// Mutations
// -----------------------------------------------------------------------------
const mutations = {
  CLEAR_STORE (state) {
    state.datasetList = false
    state.datasetSingular = false
  },
  SET_DATASET_LIST (state, list) {
    state.datasetList = list
  },
  SET_DATASET_SINGULAR (state, singular) {
    state.datasetSingular = singular
  }
}

// ////////////////////////////////////////////////////////////////////// Export
// -----------------------------------------------------------------------------
export default {
  state,
  getters,
  actions,
  mutations
}