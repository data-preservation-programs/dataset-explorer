<template>
  <div :class="`page page-${tag}`">

    <SortButton />

    <section id="deals-table">
      <div class="grid">
        <div class="col">
          <TableDatasetIndex :columns="tableColumns" />
        </div>
      </div>
    </section>

  </div>
</template>

<script>
// ===================================================================== Imports
import { mapGetters, mapActions } from 'vuex'

import TableDatasetIndex from '@/components/table-dataset-index'
import Page from '@/content/pages/index.json'
import FileNames from '@/content/data/dataset-explorer-manifest.json'
import SortButton from '@/components/sort-button'

// ====================================================================== Export
export default {
  name: 'IndexPage',

  components: {
    TableDatasetIndex,
    SortButton
  },

  data () {
    return {
      tag: 'index'
    }
  },

  async fetch ({ store, route, $content }) {
    await store.dispatch('global/getBaseData', { key: 'index', data: Page })
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
    pageContent () {
      return this.siteContent.index
    },
    tableColumns () {
      return this.pageContent.page_content.table.columns
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

// /////////////////////////////////////////////////////////////// [Toolbar] Top

// /////////////////////////////////////////////////////////////////////// Table

// //////////////////////////////////////////////////////////// [Toolbar] Bottom

</style>
