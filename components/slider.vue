<template>
  <div class="modal-slider">
    <!-- =================================================================== -->
    <section ref="panel" class="panel">
      <div class="inner-content">

        <div class="pannel-top">
          <div class="name">
            {{ deal.curated_dataset }}<span> {{ deal.rank }} </span>
          </div>
          <div class="cid">
            {{ deal.payload_cid }}
          </div>
        </div>

        <div class="storage-deal-id">
          <div class="storage-provider">
            <h5> Storage Provider </h5>
            <div>
              {{ deal.miner_id }}
              <span class="flag">
                {{ $GetFlagIcon(deal.location) }}
              </span>
            </div>
          </div>
          <div class="deal-id">
            <h5> Deal ID </h5>
            <div>
              {{ deal.deal_id }}
            </div>
          </div>
        </div>

        <div
          v-for="(option, optionIndex) in modal_options"
          :key="'option' + optionIndex"
          class="option">
          <div
            v-if="modal_options.length > 1"
            class="option-label">
            {{ option.label }}
          </div>
          <div class="helper-text">
            {{ option.helper_text }}
          </div>
          <div class="code-snippet">
            <CopyButton
              :value="option.command + deal.miner_id + ' ' + deal.payload_cid + ' ' + deal.filename"
              class="copy-button" />
            <span>{{ option.command }}</span><span>{{ deal.miner_id }}</span>
            <div class="cid">
              {{ deal.payload_cid }}
            </div>
            <div>
              {{ deal.filename }}
            </div>
          </div>
        </div>

      </div>
    </section>

    <!-- =================================================================== -->
    <section class="toggle-buttons">
      <div class="place-holder">
        <div
          v-if="index != 0"
          class="prev"
          @click="showDeal('prev')">
          <ArrowRightIcon class="arrow" /><span> Previous </span>
          <div class="button-details">
            <div>
              SP
              <span class="provider">
                {{ prevDeal.miner_id }}
              </span>
              <span class="flag">
                {{ $GetFlagIcon(prevDeal.location) }}
              </span>
            </div>
            <div>
              Deal ID
              <span class="id">
                {{ prevDeal.deal_id }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div
        v-if="dataset.length > 1"
        class="panel-numbers">
        {{ index + 1 }} of {{ dataset.length }}
      </div>

      <div class="place-holder">
        <div
          v-if="index != (dataset.length - 1)"
          class="next"
          @click="showDeal('next')">
          <span> Next </span><ArrowRightIcon class="arrow" />
          <div class="button-details">
            <div>
              SP
              <span class="provider">
                {{ nextDeal.miner_id }}
              </span>
              <span class="flag">
                {{ $GetFlagIcon(nextDeal.location) }}
              </span>
            </div>
            <div>
              Deal ID
              <span class="id">
                {{ nextDeal.deal_id }}
              </span>
            </div>
          </div>
        </div>
      </div>

    </section>

  </div>
</template>

<script>
// ====================================================================== Import
import { mapGetters } from 'vuex'

import CopyButton from '@/components/copy-button'
import ArrowRightIcon from '@/components/icons/ArrowRight'

// ====================================================================== Export
export default {
  name: 'Slider',

  components: {
    CopyButton,
    ArrowRightIcon
  },

  props: {
    dataset: {
      type: Array,
      required: true
    }
  },

  data () {
    return {
      index: 0
    }
  },

  computed: {
    ...mapGetters({
      siteContent: 'global/siteContent'
    }),
    pageData () {
      return this.siteContent.explorer
    },
    modal_options () {
      return this.pageData.modal.options
    },
    deal () {
      return this.dataset[this.index]
    },
    prevDeal () {
      const index = this.index
      const dataset = this.dataset
      console.log(dataset)
      if (index === 0) { return dataset[dataset.length - 1] }
      return dataset[index - 1]
    },
    nextDeal () {
      const index = this.index
      const dataset = this.dataset
      if (index === dataset.length - 1) { return dataset[0] }
      return dataset[index + 1]
    }
  },

  methods: {
    showDeal (direction) {
      const index = this.index
      const len = this.dataset.length
      if (direction === 'next') {
        if (index === len - 1) { this.index = 0; return }
        this.index += 1
      } else if (direction === 'prev') {
        if (index === 0) { this.index = len - 1; return }
        this.index -= 1
      }
    }
  }
}
</script>

<style lang="scss" scoped>

// ///////////////////////////////////////////////////////////////////// General
.modal-slider {
  position: relative;
  @include mini {
    padding-top: 3rem;
  }
}

.inner-content {
  position: relative;
}

.panel {
  margin: 0 3.875rem;
}

.fade {
  animation-name: fade;
  animation-duration: 1.5s;
}

@keyframes fade {
  from {opacity: .4}
  to {opacity: 1}
}

// /////////////////////////////////////////////////////////////// Sections
.pannel-top {
  border-bottom: 2px solid white;
  padding-bottom: 1.9875rem;
  margin-bottom: 2.125rem;
}
.name {
  @include fontWeight_Semibold;
  @include fontSize_Regular;
  padding-bottom: 0.5rem;
}
.cid {
  @include fontWeight_Regular;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-family: $font_Secondary;
  font-size: 1rem;
}
.storage-deal-id {
  @include fontSize_Regular;
  font-weight: 800;
  font-family: $font_Secondary;
  display: flex;
  flex-direction: row;
  h5 {
    @include fontWeight_Semibold;
    font-family: $font_Primary;
    font-size: 0.9375rem;
    padding-bottom: 0.5rem;
  }
}
.storage-provider, .deal-id {
  display: flex;
  flex-direction: column;
}

.deal-id {
  padding-left: 3.25rem;
}

// //////////////////////////////////////////////////////////////// Options
.option {
  padding-top: 2.4375rem;
}
.option-label {
  font-size: 1rem;
  padding-bottom: 0.25rem;
}
.helper-text {
  @include fontWeight_Regular;
}
.code-snippet {
  @include fontSize_Mini;
  @include fontWeight_Regular;
  font-family: $font_Secondary;
  background-color: $fog;
  border-radius: 0.325rem;
  padding: 0.5rem 0.75rem;
  margin-top: 1rem;
  .cid {
    @include fontSize_Mini;
  }
}

.copy-button {
  float: right;
}

// /////////////////////////////////////////////////////////////// Toggle Buttons
.toggle-buttons {
  padding: 0 3.875rem;
  margin-bottom: 2.4375rem;
  font-size: 0.9375;
  @include small {
    margin-top: -2rem;
  }
  @include tiny {
    margin-top: -3rem;
  }
}

.arrow {
  width: 0.75rem;
  transition: all 0.25s ease;
}

.toggle-buttons {
  display: flex;
  flex-direction: row;
  align-content: center;
  justify-content: space-between;
  padding-top: 2rem;
  font-size: 1rem;
  position: relative;
  z-index: 20;
  .prev, .next {
    cursor: pointer;
  }
  .prev {
    @include medium {
      padding-left: 1.75rem;
    }
    .arrow {
      position: relative;
      left: -0.5rem;
      transform: rotate(180deg);
    }
    &:hover {
      .arrow {
        left: -1rem;
      }
    }
  }
  .next {
    @include medium {
      padding-right: 1.75rem;
    }
    .arrow {
      position: relative;
      right: -0.5rem;
    }
    &:hover {
      .arrow {
        right: -1rem;
      }
    }
  }
}
.provider, .id {
  @include fontWeight_Regular;
  font-family: $font_Secondary;
}

.button-details {
  @include fontSize_Mini;
  flex-direction: column !important;
}

.panel-numbers {
  position: absolute;
  bottom: 0;
  left: 17rem;
}

</style>
