// /////////////////////////////////////////////////////////////////////// State
// -----------------------------------------------------------------------------
const state = () => ({
  datasetList: false,
  datasetNames: false,
  datasetSingular: false
})

// ///////////////////////////////////////////////////////////////////// Getters
// -----------------------------------------------------------------------------
const getters = {
  datasetList: state => state.datasetList,
  datasetNames: state => state.datasetNames,
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
      const response = await this.$axios.get(`${this.$config.frontendUrl}/data/dataset-explorer/${payload.file}`)
      const file = response.data
      if (payload.tag === 'index') {
        commit('SET_DATASET_LIST', file)
      } else {
        commit('SET_DATASET_SINGULAR', file)
      }
      return file
    } catch (e) {
      console.log('============ [Store Action: explorer/getExplorerData] ERROR')
      console.log(e)
      return false
    }
  },
  setDatasetNames ({ commit }, payload) {
    commit('SET_DATASET_NAMES', payload)
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
  SET_DATASET_NAMES (state, data) {
    state.datasetNames = data
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
