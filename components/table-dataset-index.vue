<template>
  <section class="table-deals">

    <div
      v-if="filterValue !== ''"
      class="filter-description">
      Showing {{ filtered.length - 1 }} results for '{{ filterValue }}'
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
          <tr :key="deal.rank" class="row row-body">

            <td
              v-for="cell in columns"
              :key="cell.slug"
              :class="['cell-parent', { hovering: deal.rank === hovering }]">
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

                <div v-if="cell.slug === 'data_stored'">
                  <span>{{ $FormatBytes(deal.eligible_data_size, '').value }}</span>
                  <span class="data-unit">{{ $FormatBytes(deal.eligible_data_size, '').unit }}</span>
                </div>

                <div v-if="cell.slug === 'all_data_stored'">
                  <span>{{ $FormatBytes(deal.eligible_data_size, '').value }}</span>
                  <span class="data-unit">{{ $FormatBytes(deal.eligible_data_size, '').unit }}</span>
                </div>

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

// ====================================================================== Export
export default {
  name: 'TableDatasetIndex',

  components: {
    DatasetIcon
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
    display: block;
    margin-top: -3rem;
    margin-bottom: -5rem;
    padding: 3rem calc(7% + 0.5rem);
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
  padding: 0rem 1.25rem;
  text-align: left;
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
    background: $gray400;
    opacity: 0.6;
    filter: blur(20px);
  }
}

.row-body {
  position: relative;
  &:hover {
    .cell-parent:nth-child(3) {
      &:before {
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

.cell-parent:nth-child(3) {
  // HOVER Overlay gradient and Dashed SVG
  &:before {
    content: '';
    position: absolute;
    top: 1px;
    left: 1px;
    width: calc(100% - 2px);
    height: calc(100% - 2px);
    border-radius: 5px;
    opacity: 0;
    z-index: 15;
    transition: 100ms ease-out;
    background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect x='2' y='2' width='99%25' height='92%25' rx='5' fill='none' stroke='%23001FE6' stroke-width='2' stroke-dasharray='1.5%2c 10' stroke-dashoffset='10' stroke-linecap='round'/%3e%3c/svg%3e");
  }
}

.cell-parent {
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
}

tr.divider {
  &:not(:last-child) {
    height: 0.5rem;
  }
}

.no-results-placeholder {
  margin-bottom: -3rem;
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

// ///////////////////////////////////////////////////////////////////// General
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
  div {
    display: flex;
    .data-unit {
      padding-top: 0.125rem;
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
}
</style>
