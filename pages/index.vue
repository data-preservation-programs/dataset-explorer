<template>
  <div :class="`page page-${tag}`">

    <HeaderIndex
      :heading="heading"
      :subheading="subheading" />

    <div class="grid">
      <div class="col-9">
        <SearchBar />
      </div>
      <div class="col-3">
        <SortButton />
      </div>
    </div>

    <section id="deals-table">
      <div class="grid">
        <div class="col">
          <TableDatasetIndex :columns="tableColumns" />
        </div>
      </div>
    </section>

    <SortButton />

    <div class="grid">
      <div class="col-9">
        <section class="pagination-controls">
          <!-- Pagination Controls Component Here - class exists for spacing purposes -->
        </section>
      </div>
      <div class="col-3">
        <PaginationDropdown />
      </div>
    </div>

  </div>
</template>

<script>
// ===================================================================== Imports
import { mapGetters, mapActions } from 'vuex'

import HeaderIndex from '@/components/header-index'
import TableDatasetIndex from '@/components/table-dataset-index'

import FileNames from '@/content/data/dataset-explorer-manifest.json'
import SortButton from '@/components/sort-button'
import PaginationDropdown from '@/components/pagination-dropdown'
import IndexPageData from '@/content/pages/index.json'

import SearchBar from '@/components/search-bar'

// ====================================================================== Export
export default {
  name: 'IndexPage',

  components: {
    HeaderIndex,
    SearchBar,
    SortButton,
    TableDatasetIndex,
    PaginationDropdown
  },

  data () {
    return {
      tag: 'index'
    }
  },

  async fetch ({ store, route, $content }) {
    await store.dispatch('global/getBaseData', 'general')
    await store.dispatch('global/getBaseData', { key: 'index', data: IndexPageData })
    await store.dispatch('explorer/setDatasetNames', FileNames)
    await store.dispatch('explorer/getExplorerData', { tag: 'index', file: 'dataset_list.json' })
  },

  head () {
    return this.$CompileSeo(this.$GetSeo(this.tag))
  },

  computed: {
    ...mapGetters({
      siteContent: 'global/siteContent',
      datasetList: 'explorer/datasetList'
    }),
    pageData () {
      return this.siteContent[this.tag]
    },
    pageContent () {
      return this.pageData.page_content
    },
    heading () {
      return this.pageContent.fold.heading
    },
    subheading () {
      return this.pageContent.fold.subheading
    },
    tableColumns () {
      return this.pageContent.table.columns
    }
  },

  watch: {
  },

  mounted () {
  },

  beforeDestroy () {
  },

  methods: {
    ...mapActions({
    })
  }
}
</script>

<style lang="scss" scoped>
// ///////////////////////////////////////////////////////////////////// General
.pagination-controls {
  padding-bottom: 1rem; // this is to make space for future pagination controls if or when they are created
}
</style>
