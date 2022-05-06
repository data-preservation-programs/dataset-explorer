<template>
  <div :class="`page page-${tag}`">

    <Stats
      :dataset-name="getProjectLabels($route.params.id)"
      :stats="stats"
      :stat-data="statData" />

    <FilterBar
      :filter-value="filterValue"
      :placeholder="page_filterBarPlaceholder"
      action="store" />

    <section id="deals-table">
      <div class="grid">
        <div class="col">

          <TableDatasetSingular
            v-if="cids"
            :cids="cids"
            :filter-value="filterValue"
            :columns="tableColumns" />

        </div>
      </div>
    </section>

    <div v-if="loading" class="dataset-loading-placeholder">

      <LoaderTripleDot theme="blue" />

      <div class="loading-text">
        {{ loadingText }}
      </div>

    </div>

  </div>
</template>

<script>
// ===================================================================== Imports
import { mapGetters, mapActions } from 'vuex'

import Stats from '@/components/stats'
import TableDatasetSingular from '@/components/table-dataset-singular'
import LoaderTripleDot from '@/components/spinners/triple-dot'
import Page from '@/content/pages/explorer.json'
import FileNames from '@/content/data/dataset-explorer-manifest.json'

import FilterBar from '@/components/FilterBar'

// ====================================================================== Export
export default {
  name: 'IndexPage',

  components: {
    Stats,
    TableDatasetSingular,
    LoaderTripleDot,
    FilterBar
  },

  data () {
    return {
      tag: 'explorer',
      subtag: 'singular',
      loading: false,
      loadingText: ''
    }
  },

  async fetch ({ store, route, $content }) {
    await store.dispatch('global/getBaseData', 'general')
    await store.dispatch('global/getBaseData', { key: 'explorer', data: Page })
    await store.dispatch('explorer/setDatasetNames', FileNames)
    await store.dispatch('explorer/getExplorerData', { tag: 'index', file: 'dataset_list.json' })
    // await store.dispatch('explorer/clearStore')
  },

  // head () {
  //   return this.$CompileSeo(this.$GetSeo(this.tag))
  // },

  computed: {
    ...mapGetters({
      siteContent: 'global/siteContent',
      datasetNames: 'explorer/datasetNames',
      datasetList: 'explorer/datasetList',
      cids: 'explorer/datasetSingular',
      filterValue: 'global/filterValue'
    }),
    dataNames () {
      return this.datasetNames
    },
    dataset () {
      return this.datasetList
    },
    pageData () {
      return this.siteContent[this.tag]
    },
    stats () {
      return this.pageData.stats
    },
    statData () {
      const dataset = this.datasetList.filter((obj) => {
        return obj.slug === this.$route.params.id
      })
      return dataset[0]
    },
    page_filterBarPlaceholder () {
      return this.pageData.filter_bar_placeholder
    },
    tableColumns () {
      return this.pageData.table.columns
    }
  },

  created () {
    this.loadingText = this.pageData.table.loading_placeholder_text
  },

  async mounted () {
    const id = this.$route.params.id
    this.loading = true
    const timeout = setTimeout(() => {
      this.loadingText = this.pageData.loading_text_secondary
    }, 5000)
    await this.getExplorerData({ tag: 'singular', file: `${id}.json` })
    clearTimeout(timeout)
    this.loading = false
  },

  methods: {
    ...mapActions({
      getExplorerData: 'explorer/getExplorerData'
    }),
    getProjectLabels (slug) {
      const labels = this.datasetNames.manifest
      if (labels.hasOwnProperty(slug)) {
        return labels[slug].label
      } else {
        return slug
      }
    }
  }
}
</script>

<style lang="scss" scoped>
// ///////////////////////////////////////////////////////////////////// General

// /////////////////////////////////////////////////////////////// [Toolbar] Top

// /////////////////////////////////////////////////////////////////////// Table
.dataset-loading-placeholder {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  .loading-text {
    padding-left: 2rem;
  }
}

// //////////////////////////////////////////////////////////// [Toolbar] Bottom

</style>
