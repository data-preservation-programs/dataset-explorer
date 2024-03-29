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

      <Modal
        class="deal-modal"
        :payload-cid="selectedPayloadCid" />

      <Paginate
        v-if="filtered"
        v-slot="{ paginated }"
        :display="paginationDisplay"
        :collection="filtered"
        root-node="tbody"
        class="table-body">

        <template v-for="(deal, payloadCid) in paginated">

          <tr
            :key="'row-' + payloadCid"
            class="row row-body"
            @click="openModal(deal[0].payload_cid)">

            <td
              v-for="cell in columns"
              :key="cell.slug"
              :class="['cell-parent', { hovering: deal.rank === hovering }]">

              <DottedBorder v-if="cell.slug === 'all_data_stored'" />

              <div
                class="mobile-cell-head"
                v-html="cell.label">
              </div>
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
                      :key="'deal_id-' + dataset.deal_id">
                      {{ dataset.deal_id }}
                    </div>
                  </template>
                </div>

                <div v-if="cell.slug === 'miner_id'">
                  <template v-for="dataset in deal">
                    <div
                      :key="'miner_id-' + dataset.deal_id + dataset.miner_id">
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
      </Paginate>

    </table>

    <div v-if="!filtered" class="no-results-placeholder">
      <span>No results found</span>
    </div>

    <div class="grid-center">
      <div class="col-9">
        <PaginationControls />
      </div>
    </div>
  </section>
</template>

<script>
// ===================================================================== Imports
import { mapActions, mapGetters } from 'vuex'

import Modal from '@/components/modal'
import Paginate from '@/modules/Pagination/Components/Paginate'
import PaginationControls from '@/modules/Pagination/Components/Controls'

import DottedBorder from '@/components/dotted-border'

// ====================================================================== Export
export default {
  name: 'TableDatasetSingular',

  components: {
    Modal,
    Paginate,
    PaginationControls,
    DottedBorder
  },

  props: {
    cids: {
      type: Object,
      required: true
    },
    columns: {
      type: Array,
      required: true
    },
    filterValue: {
      type: String,
      required: true
    },
    paginationDisplay: {
      type: Number,
      required: false,
      default: 20
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
      modal: 'global/modal'
    }),
    filtered () {
      const cids = Object.values(this.cids)
      const filter = this.filterValue.toLowerCase()
      const filteredByValue = cids.filter((group) => {
        const filtered = group.filter((obj) => {
          const filename = obj.filename.toLowerCase()
          const miner = obj.miner_id.toLowerCase()
          const cid = obj.payload_cid
          const deal = obj.deal_id
          if (filename.includes(filter) || miner.includes(filter) || cid.includes(filter) || deal.includes(filter)) {
            return obj
          }
          return false
        })
        if (filtered.length === 0) { return false }
        return filtered
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
/*
  Most of the table styles below are not supported by Safari. Therefore, table
  styles are reset at the end of this <style> tag and safar-specific styles are
  applied.
*/

// ///////////////////////////////////////////////////////////////////// General
.table-deals {
  @include fontSize_Mini;
  margin-bottom: 0.5rem;
  font-weight: $fontWeight_Semibold;
}

.table-container {
  min-width: 100%;
  @include medium {
    margin-bottom: -5rem;
    padding-bottom: 5rem;
    overflow-x: scroll;
  }
  @include mini {
    padding: 0;
    padding-bottom: 5rem;
    margin-top: 0;
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
  @include mini {
    display: none;
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
  position: relative;
  cursor: pointer;
  @include mini {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    padding-left: 2rem;
    padding-top: 2rem;
    padding-bottom: 1rem;
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
    rect {
      transform: scale(0.99, 0.9) translate(0.188rem, 0.25rem);
    }
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
    width: 100%;
    padding-bottom: 1rem;
    &:last-child {
      .cell-body {
        padding-bottom: 0;
      }
    }
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
    width: 65% !important;
  }
}

tr.divider {
  &:not(:last-child) {
    height: 0.5rem;
  }
}

.no-results-placeholder {
  position: relative;
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
.filter-description {
  padding-bottom: 2.5rem;
  padding-left: 1.5rem;
}

.file_name {
  @include fontWeight_Semibold;
}

.cid {
  padding-top: 0.5rem;
  @include mini {
    width: 10rem;
  }
}

.curated_dataset {
  width: 13rem;
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
  @include fontWeight_Regular;
}

.date_epoch {
  padding-top: 0.5rem;
}

.data-unit {
  padding-top: 0.375rem;
}

.data_size>div {
  display: flex;
}

.dataset {
  @include fontSize_Tiny;
  @include leading_Large;
}

// ////////////////////////////////////////////////////////////// Safari Browser
@include Safari7Plus ('tbody:not(.divider):before') {
  display: none;
}

@include Safari7Plus ('.cell-parent:first-child:before') {
  display: none;
}

@include Safari7Plus ('.cell-parent:first-child:after') {
  display: none;
}

@include Safari7Plus ('.cell-parent:nth-child(3):after') {
  display: none;
}

@include Safari7Plus ('.row-body') {
  background-color: $aquaHaze;
  transition: 100ms ease-out;
}

@include Safari7Plus ('.row-body:hover') {
  background-color: $mystic;
  transition: 100ms ease-in;
}
</style>
