<template>
  <section class="table-deals">

    <div
      v-if="filterValue !== ''"
      class="filter-description">
      Showing {{ filteredLength }} results for '{{ filterValue }}'
    </div>

    <table v-if="filtered" class="table-container">
      <!-- ============================================================ Head -->
      <thead class="table-head">
        <tr class="row row-head">

          <th
            v-for="(column, index) in columns"
            :key="`heading-${index}`"
            class="cell cell-head"
            v-html="column.label">
          </th>

        </tr>
      </thead>
      <!-- ============================================================ Body -->
      <tbody class="divider" />
      <tbody class="table-body">
        <template v-for="deal in filtered">
          <tr
            :key="deal.rank"
            class="row row-body"
            @click="navigateToDataset($event, deal.slug)">

            <td
              v-for="cell in columns"
              :key="cell.slug"
              :class="['cell-parent', { hovering: deal.rank === hovering }]">

              <DottedBorder v-if="cell.slug === 'all_data_stored'" />

              <div
                class="mobile-cell-head"
                v-html="cell.label" />

              <div :class="['cell cell-body', cell.slug]">

                <template v-if="cell.slug === 'icon'">
                  <DatasetIcon :icon="deal.slug" />
                </template>

                <template v-if="cell.slug === 'locations'">
                  <div class="location-flags">
                    <span
                      v-for="(location, index) in deal.locations_stored"
                      :key="index">
                      {{ $GetFlagIcon(location) }}
                    </span>
                  </div>
                </template>

                <template v-if="cell.slug === 'dataset_name'">
                  <nuxt-link
                    :to="'/' + deal.slug">
                    {{ getProjectLabels(deal.slug) }}
                  </nuxt-link>
                </template>

                <template v-if="cell.slug === 'data_stored'">
                  <span>{{ $FormatBytes(deal.eligible_data_size, '').value }}</span>
                  <span class="data-unit">{{ $FormatBytes(deal.eligible_data_size, '').unit }}</span>
                </template>

                <template v-if="cell.slug === 'all_data_stored'">
                  <span>{{ $FormatBytes(deal.eligible_data_size, '').value }}</span>
                  <span class="data-unit">{{ $FormatBytes(deal.eligible_data_size, '').unit }}</span>
                </template>

                <template v-if="cell.slug === 'storage_providers'">
                  {{ deal.miner_list.length }}
                </template>

              </div>

            </td>

          </tr>
          <tr
            :key="`divider-${deal.rank}`"
            class="divider" />
        </template>
      </tbody>
    </table>

    <div v-if="!filtered" class="no-results-placeholder">
      <span>No results found</span>
    </div>

  </section>
</template>

<script>
// ===================================================================== Imports
import { mapGetters } from 'vuex'

import DatasetIcon from '@/components/icons/dataset-icon'
import DottedBorder from '@/components/dotted-border'

// ====================================================================== Export
export default {
  name: 'TableDatasetIndex',

  components: {
    DatasetIcon,
    DottedBorder
  },

  props: {
    columns: {
      type: Array,
      required: true
    },
    filterValue: {
      type: String,
      required: true
    }
  },

  data () {
    return {
      hovering: false
    }
  },

  computed: {
    ...mapGetters({
      datasets: 'explorer/datasetList',
      datasetNames: 'explorer/datasetNames'
    }),
    filtered () {
      const datasets = this.datasets
      if (!datasets) { return false }
      const filteredByValue = datasets.filter((obj) => {
        const slug = obj.slug.toLowerCase()
        const filter = this.filterValue.toLowerCase()
        if (slug.includes(filter)) {
          return obj
        }
        return false
      })
      if (filteredByValue.length === 0) { return false }
      return filteredByValue
    },
    filteredLength () {
      const filterLength = this.filtered.length
      if (filterLength > 0) { return filterLength }
      return 0
    }
  },

  methods: {
    toggleRowOverlay (status, dealId) {
      if (status) {
        this.hovering = dealId
      } else {
        this.hovering = false
      }
    },
    getProjectLabels (slug) {
      const labels = this.datasetNames.manifest
      if (labels.hasOwnProperty(slug)) {
        return labels[slug].label
      } else {
        return slug
      }
    },
    navigateToDataset (e, slug) {
      if (e.target.nodeName !== 'A') {
        this.$router.push({ path: `${slug}` })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
// ///////////////////////////////////////////////////////////////////// General
.table-deals {
  @include fontSize_Mini;
  margin-bottom: 0.5rem;
  font-weight: $fontWeight_Semibold;
}

.table-container {
  min-width: 100%;
  @include medium {
    padding-bottom: 5rem;
    overflow-x: scroll;
  }
}

.external-link {
  @include fontWeight_Semibold;
  color: $classicBlue;
  &:hover {
    text-decoration: underline;
  }
}

.table-head {
  position: relative;
  vertical-align: bottom;
  @include mini {
    display: none;
  }
  &:before,
  &:after {
    content: '';
    position: absolute;
    border-radius: 5px;
  }
  &:before {
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
  }
  &:after {
    top: 1px;
    left: 1px;
    width: calc(100% - 2px);
    height: calc(100% - 2px);
    z-index: 5;
  }
}

.row-head {
  position: relative;
  z-index: 10;
}

.cell-head {
  @include fontSize_Mini;
  padding: 0.5rem 1.25rem !important;
  text-align: left;
}
@-moz-document url-prefix() {
  .cell-head {
    padding-bottom: 1rem !important;
  }
}

.table-body {
  vertical-align: top;
}

tbody.divider {
  height: 0.5rem;
}

tbody:not(.divider) {
  position: relative;
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: calc(100% - 10px);
    height: calc(100% - 4px);
    background: #A9B4CB;
    opacity: 0.6;
    filter: blur(20px);
  }
}

.row-body {
  cursor: pointer;
  position: relative;
  @include mini {
    display: flex;
    flex-direction: column;
    padding-left: 2rem;
    padding-top: 2rem;
  }
  &:hover {
    .cell-parent:nth-child(3) {
      .dotted-border {
        transition: 100ms ease-in;
        opacity: 1;
      }
    }
  }
}

.cell-parent:first-child {
  &:before,
  &:after {
    content: '';
    position: absolute;
    border-radius: 5px;
  }
  // Border gradient
  &:before {
    top: -2px;
    left: -2px;
    width: 100%;
    height: 100%;
    background: $white;
    z-index: 0;
  }
  // Background color
  &:after {
    top: 1px;
    left: 1px;
    width: calc(100% - 2px);
    height: calc(100% - 2px);
    background: $gradient_SilverGrey;
    z-index: 5;
  }
}

.cell-parent:not(:first-child) {
  @include mini {
    margin-top: 1rem;
    &:before {
      content: '';
      position: absolute;
      z-index: 25;
      left: -0.125rem;
      background-color: $classicBlue;
      opacity: 0.3;
      height: 1px;
      width: calc(100% + 0.125rem);
      margin-top: -1.5rem;
    }
  }
}

::v-deep .cell-parent:nth-child(3) {
  .dotted-border {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    z-index: 10;
    transition: 100ms ease-out;
    &:before,
    &:after {
      display: none;
    }
  }
}

.cell-parent {
  @include mini {
    display: flex;
    flex-direction: row;
    line-height: 1.5;
    padding-bottom: 1rem;
    width: 100%;
  }
  &.hovering {
    &:not(:nth-child(4)) {
      .cell-body {
        opacity: 0;
      }
    }
    &:nth-child(4) {
      &:before {
        transition: 100ms ease-in;
        opacity: 1;
        pointer-events: all;
      }
      .cell-body.sp {
        opacity: 0;
      }
    }
  }
}

.cell-body {
  padding: 1.25rem;
  @include mini {
    padding-top: 0;
    padding-bottom: 0;
    width: 65% !important;
  }
}

tr.divider {
  &:not(:last-child) {
    height: 0.5rem;
  }
}

.no-results-placeholder {
  padding: 1rem;
  filter: drop-shadow(0px 5px 3px rgba(0, 0, 0, 0.3));
  @include medium {
    margin: 0 calc(7% + 0.5rem);
    margin-bottom: -3rem;
  }
  &:before,
  &:after {
    content: '';
    position: absolute;
    border-radius: 5px;
  }
  &:before {
    top: -2px;
    left: -2px;
    width: 100%;
    height: 100%;
    background: $white;
    z-index: 0;
  }
  &:after {
    top: 1px;
    left: 1px;
    width: calc(100% - 1px);
    height: calc(100% - 1px);
    background: $gradient_SilverGrey;
    z-index: 5;
  }
  span {
    position: relative;
    z-index: 10;
  }
}

.cell-body {
  position: relative;
  z-index: 25;
  span {
    display: block;
  }
}

.icon {
  img {
    width: 2.8125rem;
    height: auto;
  }
}

.mobile-cell-head {
  display: none;
  @include mini {
    display: block;
    position: relative;
    z-index: 25;
    width: 35%;
    padding-right: 1rem;
  }
}

// ////////////////////////////////////////////////////////////////////// Common

// //////////////////////////////////////////////////////////////////// Specific
.filter-description {
  margin-top: -2.75rem;
  padding-bottom: 2.5rem;
  padding-left: 1.5rem;
}

.filename,
.renew-by-date {
  @include fontSize_Tiny;
  @include leading_Small;
}

.dataset_name {
  width: 15rem;
  margin-bottom: 0.75rem;
}

::v-deep svg {
  fill: $classicBlue;
}

.icon {
  div {
    width: 2.8125rem;
  }
}

.data_stored, .all_data_stored, .storage_providers {
  font-family: $font_Secondary;
  @include fontWeight_Regular;
  font-size: 0.875rem;
  div {
    display: flex;
    .data-unit {
      padding-top: 0.375rem;
    }
  }

}

.dataset {
  @include fontSize_Tiny;
  @include leading_Large;
}

.location {
  font-size: 1.375rem;
}

.location-flags {
  display: flex;
  flex-wrap: wrap;
  width: 6.5rem;
  transform: scale(1.5);
  padding-left: 0.75rem;
  padding-right: 0.5rem;
  @include mini {
    width: 75%;
    margin-left: 1.75rem;
  }
  @include tiny {
    margin-left: 0.5rem;
  }
}

////////////////////////////////////////////////////////////////// Dotted Border
::v-deep .dotted-border {
  &:before &:after {
    height: 0;
  }
  rect {
    transform: scale(0.999) translate(2px, -2px);
  }
}
</style>
