<template>
  <div :class="`page page-${tag}`">

    <div class="grid">
      <div class="col">
        <h1 class="page-heading">
          {{ heading }}
        </h1>
      </div>
    </div>

    <Stats
      v-if="statData"
      :stats="stats"
      :stat-data="statData" />

    <div class="divider" />

    <section id="toolbar-top">
      <div class="grid">
        <div class="col">

          <SearchBar
            :placeholder="searchbarPlaceholder"
            :loading="loading" />

          <div v-if="!loading && deals && searchTerm" class="count">
            Showing {{ count.toLocaleString() }} results for ‘{{ searchTerm }}’
          </div>

        </div>
      </div>
    </section>

    <section id="table-deals">
      <div class="grid">
        <div class="col">

          <DealsTable v-if="deals" :columns="columns" />

        </div>
      </div>
    </section>

    <section id="toolbar-bottom">
      <div class="grid">
        <div class="col">

          <div v-if="(loading && !deals) || (loading && count === 0)" class="loading-placeholder">
            <span>{{ loadingPlaceholderText }}</span>
            <Spinner v-if="loading" />
          </div>

          <div v-if="deals && totalPages > 1" id="pagination">
            <PaginationControls
              :page="page"
              :total-pages="totalPages"
              :loading="loading"
              store-key="deals" />
            <div class="grain" />
          </div>

        </div>
      </div>
    </section>

  </div>
</template>

<script>
// ===================================================================== Imports
import { mapGetters, mapActions } from 'vuex'

import Stats from '@/components/stats'
import SearchBar from '@/components/search-bar'
import DealsTable from '@/components/table-deals'
import Spinner from '@/components/spinners/material-circle'
import PaginationControls from '@/components/pagination-controls'

import IndexPageData from '@/content/pages/index.json'

// ====================================================================== Export
export default {
  name: 'IndexPage',

  components: {
    Stats,
    SearchBar,
    DealsTable,
    Spinner,
    PaginationControls
  },

  data () {
    return {
      tag: 'index'
    }
  },

  async fetch ({ store, route }) {
    await store.dispatch('global/getBaseData', { key: 'index', data: IndexPageData })
    await store.dispatch('deals/getStats')
  },

  head () {
    return this.$CompileSeo(this.$GetSeo(this.tag))
  },

  computed: {
    ...mapGetters({
      siteContent: 'global/siteContent',
      deals: 'deals/deals',
      statData: 'deals/stats',
      totalPages: 'deals/totalPages',
      count: 'deals/count',
      page: 'deals/page',
      loading: 'deals/loading'
    }),
    pageData () {
      return this.siteContent[this.tag]
    },
    pageContent () {
      return this.pageData.page_content
    },
    heading () {
      return this.pageContent.heading
    },
    stats () {
      return this.pageContent.stats
    },
    table () {
      return this.pageContent.table
    },
    searchbarPlaceholder () {
      return this.table.searchbar.placeholder
    },
    loadingPlaceholderText () {
      return this.table.loading_placeholder_text
    },
    columns () {
      return this.table.columns
    },
    searchTerm () {
      return this.$route.query.search
    }
  },

  watch: {
    '$route' (route) {
      this.getDealsList({ route, reset: true })
    },
    deals () {
      this.stopLoading()
    }
  },

  mounted () {
    this.getDealsList({ route: this.$route, reset: true })
  },

  beforeDestroy () {
    this.setDealsList(false)
  },

  methods: {
    ...mapActions({
      getDealsList: 'deals/getDealsList',
      setLoadingStatus: 'deals/setLoadingStatus',
      setDealsList: 'deals/setDealsList'
    }),
    stopLoading () {
      this.$nextTick(() => {
        if (typeof this.deals !== 'boolean') {
          this.setLoadingStatus(false)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
// ///////////////////////////////////////////////////////////////////// General
.page-heading {
  margin-bottom: 5.875rem;
  text-align: center;
  @include tiny {
    text-align: left;
    margin-bottom: 3rem;
  }
}

.divider {
  margin-top: 6.25rem;
  margin-bottom: 2.25rem;
}

// /////////////////////////////////////////////////////////////// [Toolbar] Top
#toolbar-top {
  position: relative;
}

.searchbar {
  @include mini {
    width: 100%;
  }
}

.count {
  @include fontWeight_Bold;
  margin: 1.25rem 0 0.25rem 1rem;
  line-height: 1.375rem;
  word-break: break-word;
  @include mini {
    margin: 1.25rem 1rem 0.25rem 1rem;
  }
}

// /////////////////////////////////////////////////////////////////////// Table
#table-deals {
  [class~="grid"], [class*="grid-"], [class*="grid_"] {
    @include medium {
      padding: 0;
      [class~=col], [class*=col-], [class*=col_] {
        padding: 0;
      }
    }
  }
}

.loading-placeholder {
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
  margin-bottom: -3rem;
  padding: 1rem;
  filter: drop-shadow(0px 0px 20px rgba(0, 0, 0, 0.9));
  &:before,
  &:after {
    content: '';
    position: absolute;
    border-radius: 10px;
  }
  &:before {
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(350deg, #18583C 25%, rgba(0, 0, 0, 0) 35%);
    z-index: 0;
  }
  &:after {
    top: 1px;
    left: 1px;
    width: calc(100% - 2px);
    height: calc(100% - 2px);
    background: linear-gradient(350deg, #102F21 10%, rgba(19, 25, 20, 0.9) 45%);
    z-index: 5;
  }
  span,
  .spinner {
    position: relative;
    z-index: 10;
  }
  .spinner {
    margin-left: 1rem;
  }
}

// //////////////////////////////////////////////////////////// [Toolbar] Bottom
#pagination {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  position: relative;
  height: 3.75rem;
  padding: 0 0.5rem;
  filter: drop-shadow(0px 0px 20px rgba(0, 0, 0, 0.9));
  &:before,
  &:after {
    content: '';
    position: absolute;
    border-radius: 10px;
  }
  &:before {
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(187deg, #18583C 25%, rgba(0, 0, 0, 0) 35%);
    z-index: 0;
  }
  &:after {
    top: 1px;
    left: 1px;
    width: calc(100% - 2px);
    height: calc(100% - 2px);
    background: linear-gradient(187deg, #102F21 10%, rgba(19, 25, 20, 0.9) 45%);
    z-index: 5;
  }
  .grain {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-repeat: repeat;
    background-image: url('~assets/patterns/grain.png');
    opacity: 0.015;
    z-index: 10;
  }
}

#pagination-controls {
  position: relative;
  z-index: 15;
}
</style>
