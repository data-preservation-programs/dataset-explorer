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

          <th class="cell cell-head">
            <IconCode class="icon code" />
          </th>

        </tr>
      </thead>
      <!-- ============================================================ Body -->
      <tbody class="divider" />
      <tbody class="table-body">
        <template v-for="deal in filtered">
          <tr :key="deal.deal_id" class="row row-body">

            <td
              v-for="cell in columns"
              :key="cell.slug"
              :data-hovering="getCopyCommand(deal)"
              :class="['cell-parent', { hovering: deal.deal_id === hovering }]">
              <div :class="['cell cell-body', cell.slug]">

                <template v-if="cell.slug === 'file'">
                  <span v-if="deal.filename" class="filename">
                    <span>{{ $TruncateString(deal.filename, 15, '...', 'double') }}</span>
                  </span>
                  <div class="piece_cid copyable">
                    <span>{{ $TruncateString(deal.piece_cid, 8, '...', 'double') }}</span>
                    <CopyButton :value="deal.piece_cid" />
                  </div>
                  <div class="payload_cid copyable">
                    <span>{{ $TruncateString(deal.payload_cid, 8, '...', 'double') }}</span>
                    <CopyButton :value="deal.payload_cid" />
                  </div>
                </template>

                <template v-if="cell.slug === 'location'">
                  {{ $GetFlagIcon(deal.location) }}
                </template>

                <template v-if="cell.slug === 'dataset'">
                  {{ deal.dataset_name }}
                </template>

                <template v-if="cell.slug === 'deal_id'">
                  <div class="copyable">
                    <a
                      :href="`https://filecoin.tools/${deal.deal_id}`"
                      target="_blank"
                      class="external-link">
                      {{ deal.deal_id }}
                    </a>
                    <CopyButton :value="deal.deal_id" />
                  </div>
                </template>

                <template v-if="cell.slug === 'sp'">
                  <div class="copyable">
                    <span class="sp-id">{{ deal.provider_id }}</span>
                    <CopyButton :value="deal.provider_id" />
                  </div>
                </template>

                <template v-if="cell.slug === 'renew_by'">
                  <span class="renew-by-date">
                    {{ $EpochToDate(deal.end_epoch) }}
                  </span>
                  <span class="end-epoch">
                    {{ deal.end_epoch }}
                  </span>
                </template>

              </div>
            </td>

            <td
              class="cell-parent">
              <div
                class="cell cell-body code_copy"
                @mouseenter="toggleRowOverlay(true, deal.deal_id)"
                @mouseleave="toggleRowOverlay(false)">
                <IconCode class="icon code" />
                <CopyButton :value="getCopyCommand(deal)" />
              </div>
            </td>

          </tr>
          <tr
            :key="`divider-${deal.deal_id}`"
            class="divider" />
        </template>
      </tbody>
    </table>

    <div v-if="!filtered && !loading" class="no-results-placeholder">
      <span>No results found</span>
    </div>

  </section>
</template>

<script>
// ===================================================================== Imports
import { mapGetters } from 'vuex'

import CopyButton from '@/components/copy-button'

import IconCode from '@/components/icons/code'

// ====================================================================== Export
export default {
  name: 'TableDeals',

  components: {
    CopyButton,
    IconCode
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
      deals: 'deals/deals',
      loading: 'deals/loading'
    }),
    filtered () {
      const deals = this.deals
      return deals.length > 0 ? deals : false
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
    }
  }
}
</script>

<style lang="scss" scoped>
// ///////////////////////////////////////////////////////////////////// General
.table-deals {
  margin-bottom: 0.5rem;
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
  @include fontWeight_Bold;
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
}

.row-head {
  position: relative;
  z-index: 10;
}

.cell-head {
  @include fontSize_Tiny;
  @include leading_Large;
  padding: 1.25rem;
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
    width: 100%;
    height: 100%;
    background: linear-gradient(270.02deg, #00CB80 0.01%, #000000 60.1%);
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
    border-radius: 10px;
  }
  // Border gradient
  &:before {
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(270deg, #27FFAF, rgba(22, 33, 26, 0) 72%);
    z-index: 0;
  }
  // Background color
  &:after {
    top: 1px;
    left: 1px;
    width: calc(100% - 2px);
    height: calc(100% - 2px);
    background-color: $logCabin;
    z-index: 5;
  }
}

.cell-parent:nth-child(2) {
  // Overlay gradient
  &:before {
    content: '';
    position: absolute;
    top: 1px;
    left: 1px;
    width: calc(100% - 2px);
    height: calc(100% - 2px);
    background: linear-gradient(270deg, #00CA80 -5.5%, rgba(60, 150, 117, 0.7) 12%, rgba(5, 101, 65, 0.6) 35%, rgba(19, 25, 20, 0) 75%);
    border-radius: 10px;
    opacity: 0.5;
    z-index: 10;
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
    background: linear-gradient(270deg, rgba(0, 202, 128, 0.79) -1.5%, rgba(60, 150, 117, 0.52) 24%, rgba(5, 101, 65, 0.33) 70%, rgba(19, 25, 20, 0) 92%);
    border-radius: 10px;
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
    + .cell-parent {
      .code_copy {
        .icon.code,
        .copy-button {
          transition: 250ms ease-in;
        }
        .icon.code {
          opacity: 0;
        }
        .copy-button {
          opacity: 1;
        }
      }
    }
  }
}

.cell-parent:nth-child(4) {
  // Code command copy HOVER overlay
  &:before {
    @include fontSize_Tiny;
    @include leading_Large;
    content: attr(data-hovering);
    display: flex;
    flex-direction: row;
    align-items: center;
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    background: $racingGreen;
    font-family: $font_Secondary;
    border-radius: 10px;
    padding: 2rem;
    padding-right: 4rem;
    opacity: 0;
    pointer-events: none;
    z-index: 20;
    transition: 100ms ease-out;
  }
}

.cell-head:first-child,
.cell-parent:last-child {
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-repeat: repeat;
    background-image: url('~assets/patterns/grain.png');
    opacity: 0.02;
    z-index: 10;
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
  filter: drop-shadow(0px 0px 20px rgba(0, 0, 0, 0.9));
  @include medium {
    margin: 0 calc(7% + 0.5rem);
    margin-bottom: -3rem;
  }
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
.copyable {
  display: flex;
  flex-direction: row;
  align-items: center;
  &:hover {
    .copy-button {
      opacity: 1;
      transform: translateX(0);
    }
  }
  .copy-button {
    margin-left: 0.5rem;
    opacity: 0;
    transform: translateX(0.25rem);
    transition: 250ms ease-in-out;
  }
}

.piece_cid,
.payload_cid,
.deal_id,
.sp,
.end-epoch {
  @include fontSize_Tiny;
  @include leading_Medium;
  font-family: $font_Secondary;
}

// //////////////////////////////////////////////////////////////////// Specific
.filename,
.renew-by-date {
  @include fontSize_Tiny;
  @include leading_Small;
}

.filename {
  margin-bottom: 0.75rem;
}

.piece_cid,
.payload_cid {
  &:before {
    font-family: $font_Primary;
    opacity: 0.5;
    margin-right: 1rem;
  }
}

.piece_cid {
  margin-bottom: 0.25rem;
  &:before {
    content: 'Piece';
    width: 3.375rem;
  }
}

.payload_cid {
  &:before {
    content: 'Payload';
  }
}

.dataset {
  @include fontSize_Tiny;
  @include leading_Large;
}

.sp-id {
  @include fontWeight_Bold;
}

.location {
  font-size: 1.375rem;
}

.renew-by-date {
  margin-bottom: 0.25rem;
  white-space: nowrap;
}

::v-deep .code_copy {
  &:hover {
    .icon.code {
      path {
        transition: 250ms ease-in;
        fill: $classicBlue;
      }
    }
  }
  .copy-button,
  .icon.code {
    transition: 250ms ease-out;
  }
  .copy-button {
    position: absolute;
    top: 1.25rem;
    left: 1.25rem;
    width: 1.125rem;
    opacity: 0;
  }
}

.icon.code {
  cursor: pointer;
  width: 1.375rem;
}
</style>
