// /////////////////////////////////////////////////////////////////////// State
// -----------------------------------------------------------------------------
const state = () => ({
  deals: false,
  stats: false,
  page: 1,
  count: 0,
  totalPages: 1,
  loading: false
})

// ///////////////////////////////////////////////////////////////////// Getters
// -----------------------------------------------------------------------------
const getters = {
  deals: state => state.deals,
  stats: state => state.stats,
  page: state => state.page,
  count: state => state.count,
  totalPages: state => state.totalPages,
  loading: state => state.loading
}

// ///////////////////////////////////////////////////////////////////// Actions
// -----------------------------------------------------------------------------
const actions = {
  // ////////////////////////////////////////////////////////////// getDealsList
  async getDealsList ({ commit, getters, dispatch }, payload) {
    const route = payload.route
    const reset = payload.reset
    dispatch('setLoadingStatus', true)
    if (reset) {
      dispatch('setMetadata', { page: 1, count: 0, totalPages: 1 })
    }
    try {
      const search = route.query.search
      const response = await this.$AxiosAuth.get('/get-dataset-explorer-deals-list', {
        params: {
          page: getters.page,
          ...(search && { search })
        }
      })
      const payload = response.data.payload
      dispatch('setDealsList', payload.results)
      dispatch('setMetadata', payload.metadata)
      return payload.results
    } catch (e) {
      console.log('======================== [Store Action: deals/getDealsList]')
      console.log(e)
      return false
    }
  },
  // ////////////////////////////////////////////////////////////////// getStats
  async getStats ({ commit, dispatch }) {
    try {
      const response = await this.$AxiosAuth.get('/get-dataset-explorer-stats')
      dispatch('setStats', response.data.payload)
    } catch (e) {
      console.log('============================ [Store Action: deals/getStats]')
      console.log(e)
      return false
    }
  },
  // ////////////////////////////////////////////////////////////// setDealsList
  setDealsList ({ commit }, payload) {
    commit('SET_DEALS_LIST', payload)
  },
  // /////////////////////////////////////////////////////////////// setMetadata
  setMetadata ({ commit }, metadata) {
    commit('SET_TOTAL_PAGE_COUNT', metadata.totalPages)
    commit('SET_TOTAL_RESULTS_COUNT', metadata.count)
    commit('SET_PAGE', metadata.page)
  },
  // ////////////////////////////////////////////////////////////////// setStats
  setStats ({ commit }, stats) {
    commit('SET_STATS', stats)
  },
  // ///////////////////////////////////////////////////////////// incrementPage
  incrementPage ({ commit, dispatch }, payload) {
    commit('SET_PAGE', payload.page)
    dispatch('getDealsList', { route: payload.route, reset: false })
  },
  // ////////////////////////////////////////////////////////// setLoadingStatus
  setLoadingStatus ({ commit }, status) {
    commit('SET_LOADING_STATUS', status)
  }
}

// /////////////////////////////////////////////////////////////////// Mutations
// -----------------------------------------------------------------------------
const mutations = {
  SET_DEALS_LIST (state, deals) {
    state.deals = deals
  },
  SET_TOTAL_PAGE_COUNT (state, totalPages) {
    state.totalPages = totalPages
  },
  SET_TOTAL_RESULTS_COUNT (state, count) {
    state.count = count
  },
  SET_PAGE (state, page) {
    state.page = page
  },
  SET_LOADING_STATUS (state, status) {
    state.loading = status
  },
  SET_STATS (state, stats) {
    state.stats = stats
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
