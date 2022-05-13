<template>
  <div :class="`page page-${tag}`">

    <HeaderIndex
      class="header"
      :heading="heading"
      :subheading="subheading" />
    <section id="filter-search">
      <div class="grid">
        <div class="col-9">
          <FilterBar
            :filter-value="filterValue"
            :placeholder="page_filterBarPlaceholder"
            @setFilterValue="setFilterValue" />
        </div>
      </div>
    </section>
    <section id="deals-table">
      <div class="grid">
        <div class="col">
          <TableDatasetIndex
            :filter-value="filterValue"
            :columns="tableColumns" />
        </div>
      </div>
    </section>

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
import IndexPageData from '@/content/pages/index.json'

import FilterBar from '@/components/filter-bar-old'

// =================================================================== Functions
const animateScroll = (instance, name) => {
  if (name.includes('deals') || name.includes('documentation') || name.includes('retrievals')) {
    instance.$scrollToElement(instance.$refs.navigation.$el, 500, -120, true)
  } else {
    instance.$scrollToElement(instance.$refs.info.$el, 500, -120, true)
  }
}

// ====================================================================== Export
export default {
  name: 'IndexPage',

  components: {
    HeaderIndex,
    FilterBar,
    TableDatasetIndex
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
      datasetList: 'explorer/datasetList',
      filterValue: 'global/filterValue'
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
    page_filterBarPlaceholder () {
      return this.pageContent.table.searchbar.placeholder
    },
    tableColumns () {
      return this.pageContent.table.columns
    }
  },

  watch: {
    '$route' (route) {
      this.$nextTick(() => {
        animateScroll(this)
        this.setFilterValue('')
      })
    }
  },

  mounted () {

  },

  beforeDestroy () {
  },

  methods: {
    ...mapActions({
      setFilterValue: 'global/setFilterValue'
    })
  }
}
</script>

<style lang="scss" scoped>
// ///////////////////////////////////////////////////////////////////// General
.header {
  margin-bottom: 3.5rem;
  @include small {
    margin-bottom: 3rem;
  }
  @include mini {
    margin-bottom: 2rem;
  }
}

// /////////////////////////////////////////////////////////////// [Toolbar] Top
#filter-search {
  padding-bottom: 2.5rem;
  @include small {
    padding-bottom: 1.5rem;
  }
}
// /////////////////////////////////////////////////////////////////////// Table
#deals-table {
  margin-bottom: 2.5rem;
}
</style>
