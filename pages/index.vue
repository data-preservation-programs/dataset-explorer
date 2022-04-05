<template>
  <div :class="`page page-${tag}`">

    INDEX
    <section id="deals-table">
      <div class="grid">
        <div class="col">
          <TableDatasetList :columns="tableColumns" />
        </div>
      </div>
    </section>

  </div>
</template>

<script>
// ===================================================================== Imports
import { mapGetters, mapActions } from 'vuex'

import TableDatasetList from '@/components/table-dataset-list'
import page from '@/content/pages/index.json'
import fileNames from '@/content/data/dataset-explorer-manifest.json'

// ====================================================================== Export
export default {
  name: 'IndexPage',

  components: {
    TableDatasetList
  },

  data () {
    return {
      tag: 'index'
    }
  },

  async fetch ({ store, route, $content }) {
    await store.dispatch('global/getBaseData', { key: 'index', data: page })
    await store.dispatch('explorer/setDatasetNames', fileNames)
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
