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

        <Modal
          class="deal-modal"
          :payload-cid="selectedPayloadCid" />

        <template v-for="(deal, payloadCid) in filtered">

          <tr
            :key="payloadCid"
            class="row row-body"
            @click="openModal(payloadCid)">

            <td
              v-for="cell in columns"
              :key="cell.slug"
              :class="['cell-parent', { hovering: deal.rank === hovering }]">
              <div :class="['cell cell-body', cell.slug]">

                <template v-if="cell.slug === 'curated_dataset'">
                  <div
                    class="file_name">
                    {{ deal[0].curated_dataset }}
                  </div>
                  <div class="cid">
                    {{ deal[0].payload_cid }}
                  </div>
                </template>

                <div v-if="cell.slug === 'file_format'">
                  {{ deal[0].file_format }}
                </div>

                <div v-if="cell.slug === 'data_size'">
                  <span>{{ $FormatBytes(deal[0].data_size, '').value }}</span>
                  <span class="data-unit">{{ $FormatBytes(deal[0].data_size, '').unit }}</span>
                </div>

                <div v-if="cell.slug === 'deal_id'">
                  <template v-for="dataset in deal">
                    <div
                      :key="dataset.rank">
                      {{ dataset.deal_id }}
                    </div>
                  </template>
                </div>

                <div v-if="cell.slug === 'miner_id'">
                  <template v-for="dataset in deal">
                    <div
                      :key="dataset.rank">
                      <span class="miner">{{ dataset.miner_id }}</span><span class="flag">{{ $GetFlagIcon(dataset.location) }}</span>
                    </div>
                  </template>
                </div>

                <div v-if="cell.slug === 'status'">
                  Active
                </div>

                <template v-if="cell.slug === 'deal_start_epoch'">
                  {{ $EpochToDate(deal[0].deal_start_epoch) }}
                  <div class="date_epoch">
                    {{ deal[0].deal_start_epoch }}
                  </div>
                </template>

              </div>
            </td>

          </tr>

          <tr
            :key="`divider-${payloadCid}`"
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
import { mapActions, mapGetters } from 'vuex'

import Modal from '@/components/modal'

// ====================================================================== Export
export default {
  name: 'TableDatasetSingular',

  components: {
    Modal
  },

  props: {
    cids: {
      type: Object,
      required: true
    },
    columns: {
      type: Array,
      required: true
    }
  },

  data () {
    return {
      hovering: false,
      slideIndex: 0,
      selectedPayloadCid: false
    }
  },

  computed: {
    ...mapGetters({
      deals: 'explorer/datasetList',
      datasetNames: 'explorer/datasetNames',
      // cids: 'explorer/datasetSingular',
      modal: 'global/modal'
    }),
    filtered () {
      const deals = this.cids
      console.log(deals.length)
      return Object.keys(deals).length > 0 ? deals : false
    }
  },

  methods: {
    ...mapActions({
      setModal: 'global/setModal'
    }),
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
    openModal (selectedPayloadCid) {
      this.selectedPayloadCid = selectedPayloadCid
      this.setModal(true)
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
  cursor: pointer;
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

// ////////////////////////////////////////////////////////////////////// Common

// //////////////////////////////////////////////////////////////////// Specific
.file_name {
  @include fontWeight_Semibold;
}

.cid {
  padding-top: 0.5rem;
}

.curated_dataset {
  width: 10rem;
}

.miner_id>div>div {
  display: flex;
  flex-direction: row;
  .miner {
    width: 6rem;
  }
}

.cid {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

.data_size, .cid, .deal_id, .miner_id, .date_epoch {
  font-family: $font_Secondary;
}

.date_epoch {
  padding-top: 0.5rem;
}

.data-unit {
  padding-top: 0.125rem;
}

.data_size>div {
  display: flex;
}

.dataset {
  @include fontSize_Tiny;
  @include leading_Large;
}
</style>
