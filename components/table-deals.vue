<template>
  <section class="table-deals">

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
              :data-hovering="getCopyCommand(deal)"
              :class="['cell-parent', { hovering: deal.rank === hovering }]">
              <div :class="['cell cell-body', cell.slug]">

                <template v-if="cell.slug === 'icon'">
                  <DataIcon :icon="deal.slug" />
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
                  {{ getProjectLabels(deal.slug) }}
                </template>

                <div v-if="cell.slug === 'data_stored'">
                  <span>{{ $FormatBytes(deal.elegible_deal_count, '').value }}</span>
                  <span class="data-unit">{{ $FormatBytes(deal.elegible_deal_count, '').unit }}</span>
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
import DataIcon from '@/components/icons/dataset-icon'

// ====================================================================== Export
export default {
  name: 'TableDeals',

  components: {
    DataIcon
  },

  props: {
    columns: {
      type: Array,
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
      deals: 'explorer/datasetList',
      datasetNames: 'explorer/datasetNames'
      // loading: 'deals/loading'
    }),
    filtered () {
      const deals = this.deals
      // console.log(this.deals)
      return deals.length > 0 ? deals : false
    },
    icon () {
      const icon = this.deals.icon
      if (icon) {
        return icon
      } else {
        return '/media/default_icon.png'
      }
    }
  },

  methods: {
    getCopyCommand (deal) {
      return `lotus client retrieve --provider ${deal.provider_id} --maxPrice 0 --allow-local ${deal.payload_cid} output_${deal.payload_cid}.car`
    },
    toggleRowOverlay (status, dealId) {
      if (status) {
        this.hovering = dealId
      } else {
        this.hovering = false
      }
    },
    htmlFormatBytes (deal) {
      const data = this.$FormatBytes(deal)
      return data.value + '<span class="data-unit">' + data.unit + '</span>'
    },
    getProjectLabels (slug) {
      const labels = this.datasetNames.manifest
      if (labels[slug]) {
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
  margin-bottom: 0.5rem;
  font-weight: $fontWeight_Semibold;
  @include fontSize_Mini;
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
  filter: drop-shadow(0px 0px 20px rgba(0, 0, 0, 0.9));
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
        opacity: 0.5;
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
  // HOVER Overlay gradient
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
  width: 5rem;
  transform: scale(1.5);
  padding-left: 0.75rem;
}
</style>
