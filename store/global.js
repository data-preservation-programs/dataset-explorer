// ///////////////////////////////////////////////////////////////////// Imports
// -----------------------------------------------------------------------------
import GeneralSiteData from '@/content/pages/general.json'

// /////////////////////////////////////////////////////////////////////// State
// -----------------------------------------------------------------------------
const state = () => ({
  siteContent: {},
  modal: false,
  sliderIndex: 0,
  copied: false,
  filterValue: ''
})

// ///////////////////////////////////////////////////////////////////// Getters
// -----------------------------------------------------------------------------
const getters = {
  siteContent: state => state.siteContent,
  modal: state => state.modal,
  sliderIndex: state => state.sliderIndex,
  copied: state => state.copied,
  filterValue: state => state.filterValue
}

// ///////////////////////////////////////////////////////////////////// Actions
// -----------------------------------------------------------------------------
const actions = {
  // /////////////////////////////////////////////////////////////// getBaseData
  async getBaseData ({ commit }, payload) {
    const key = typeof payload === 'string' ? payload : payload.key
    let data = false
    switch (key) {
      case 'general': data = GeneralSiteData; break
      default : data = payload.data; break
    }
    if (data) {
      await this.dispatch('global/setSiteContent', { key, data })
    }
  },
  // //////////////////////////////////////////////////////////// setSiteContent
  setSiteContent ({ commit }, payload) {
    commit('SET_SITE_CONTENT', payload)
  },
  // ////////////////////////////////////////////////////////////////// setModal
  setModal ({ commit }, payload) {
    commit('SET_MODAL', payload)
  },
  // ////////////////////////////////////////////////////////////////// setModal
  setSliderIndex ({ commit }, payload) {
    commit('SET_SLIDER_INDEX', payload)
  },
  // ///////////////////////////////////////////////////////////// setCopiedText
  setCopiedText ({ commit }, text) {
    commit('SET_COPIED_TEXT', text)
  },
  // ////////////////////////////////////////////////////////////// setFilterValue
  setFilterValue ({ commit }, value) {
    commit('SET_FILTER_VALUE', value)
  }
}

// /////////////////////////////////////////////////////////////////// Mutations
// -----------------------------------------------------------------------------
const mutations = {
  CLEAR_STORE (state) {
    state.filterValue = ''
  },
  SET_SITE_CONTENT (state, payload) {
    state.siteContent[payload.key] = payload.data
  },
  SET_MODAL (state, payload) {
    state.modal = payload
  },
  SET_SLIDER_INDEX (state, payload) {
    state.sliderIndex = payload
  },
  SET_COPIED_TEXT (state, text) {
    state.copied = text
  },
  SET_FILTER_VALUE (state, value) {
    state.filterValue = value
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
