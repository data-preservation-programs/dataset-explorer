<template>
  <div :class="`page page-${tag}`">

    <section class="navigation">
      <Navigation />
    </section>

    <section class="header">
      <HeaderIndex
        :heading="heading"
        :subheading="subheading" />
    </section>

    <div class="grid">
      <div class="col-9">
        <section class="search-bar">
          <SearchBar />
        </section>
      </div>
      <div class="col-3">
        <section class="sort-button">
          <SortButton />
        </section>
      </div>
    </div>

    <section id="deals-table">
      <div class="grid">
        <div class="col">
          <TableDatasetIndex :columns="tableColumns" />
        </div>
      </div>
    </section>

    <div class="grid">
      <div class="col-9">
        <section class="pagination-controls">
          <!-- Pagination Controls Component Here -->
        </section>
      </div>
      <div class="col-3">
        <section class="pagination-dropdown">
          <PaginationDropdown />
        </section>
      </div>
    </div>

    <section class="footer">
      <SiteFooter />
    </section>
  </div>
</template>

<script>
// ===================================================================== Imports
import { mapGetters, mapActions } from 'vuex'
import SiteFooter from '@/components/site-footer'

import Navigation from '@/components/navigation'
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
    Navigation,
    HeaderIndex,
    SearchBar,
    SortButton,
    TableDatasetIndex,
    PaginationDropdown,
    SiteFooter
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
.navigation {
  padding-top: 2rem;
  padding-left: 5rem;
  padding-bottom: 4rem;
}

.search-bar, .sort-button {
  padding-top: 5.5rem;
  padding-bottom: 3.4rem;
}

.pagination-controls, .pagination-dropdown {
  padding-bottom: 1rem;
}

.footer {
  padding-bottom: 4rem;
}

</style>
