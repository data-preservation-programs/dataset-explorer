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
      <div class="grid">
        <div class="col-4_mi-5">
          <div
            v-if="sliderIndex != 0"
            class="prev"
            @click="showDeal('prev')">
            <div><ArrowRightIcon class="arrow" /><span> Previous </span></div>
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

        <div class="col-4_mi-2 mi-hidden">
          <div
            v-if="dataset.length > 1"
            class="panel-numbers">
            {{ sliderIndex + 1 }} of {{ dataset.length }}
          </div>
        </div>

        <div class="col-4_mi-5">
          <div
            v-if="sliderIndex != (dataset.length - 1)"
            class="next"
            @click="showDeal('next')">
            <div><span> Next </span><ArrowRightIcon class="arrow" /></div>
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

        <div class="col-12">
          <div
            v-if="dataset.length > 1"
            class="mobile-panel-numbers">
            {{ sliderIndex + 1 }} of {{ dataset.length }}
          </div>
        </div>
      </div>

    </section>

  </div>
</template>

<script>
// ====================================================================== Import
import { mapGetters, mapActions } from 'vuex'

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

  computed: {
    ...mapGetters({
      siteContent: 'global/siteContent',
      sliderIndex: 'global/sliderIndex'
    }),
    pageData () {
      return this.siteContent.explorer
    },
    modal_options () {
      return this.pageData.modal.options
    },
    deal () {
      return this.dataset[this.sliderIndex]
    },
    prevDeal () {
      const index = this.sliderIndex
      const dataset = this.dataset
      if (index === 0) { return dataset[dataset.length - 1] }
      return dataset[index - 1]
    },
    nextDeal () {
      const index = this.sliderIndex
      const dataset = this.dataset
      if (index === dataset.length - 1) { return dataset[0] }
      return dataset[index + 1]
    }
  },

  methods: {
    ...mapActions({
      setSliderIndex: 'global/setSliderIndex'
    }),
    showDeal (direction) {
      const index = this.sliderIndex
      const len = this.dataset.length
      if (direction === 'next') {
        if (index === len - 1) { this.setSliderIndex(0); return }
        this.setSliderIndex(index + 1)
      } else if (direction === 'prev') {
        if (index === 0) { this.setSliderIndex(len - 1); return }
        this.setSliderIndex(index - 1)
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
    overflow-y: scroll;
    padding-top: 1.5rem;
  }
}

.inner-content {
  position: relative;
}

.panel {
  margin: 0 3.875rem;
  @include mini {
    margin: 0 2rem;
  }
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
  @include mini {
    margin-bottom: 1.5rem;
  }
  @include tiny {
    margin-bottom: 1rem;
  }
}
.name {
  @include fontWeight_Semibold;
  @include fontSize_Regular;
  padding-bottom: 0.5rem;
  @include tiny {
    padding-bottom: 0.25rem;
  }
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
  @include mini {
    flex-direction: column;
    font-size: 0.8125rem;
  }
  h5 {
    @include fontWeight_Semibold;
    font-family: $font_Primary;
    font-size: 0.9375rem;
    padding-bottom: 0.5rem;
    @include mini {
      padding-bottom: 0rem;
    }
  }
}
.storage-provider, .deal-id {
  display: flex;
  flex-direction: column;
}

.deal-id {
  padding-left: 3.25rem;
  @include mini {
    padding-left: 0;
    padding-top: 1rem;
  }
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
  line-height: 1.3;
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
  padding: 2rem 3.875rem 0 3.875rem;
  margin-bottom: 2.4375rem;
  // font-size: 0.9375;
  font-size: 1rem;
  z-index: 20;
  @include mini {
    padding: 2rem 2rem 0 2rem;
    margin-top: 0;
  }
  .prev, .next {
    display: flex;
    flex-direction: column;
    justify-content: center;
    cursor: pointer;
  }
  .prev {
    align-items: flex-start;
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
    align-items: flex-end;
    @include medium {
      padding-right: 1.75rem;
    }
    @include mini {
      padding-right: 0;
      margin-right: -3rem;
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

.arrow {
  width: 0.75rem;
  transition: all 0.25s ease;
}

.provider, .id {
  @include fontWeight_Regular;
  font-family: $font_Secondary;
}

.button-details {
  @include fontSize_Mini;
  flex-direction: column !important;
  padding-top: 0.75rem;
  @include mini {
    display: none;
  }
}

.panel-numbers {
  padding-top: 3rem;
  justify-content: center;
  align-items: center;
  display: flex;
  @include mini {
    padding-top: 0;
  }
}

.mobile-panel-numbers {
  display: none;
  @include mini {
    align-items: center;
    justify-content: center;
    display: flex;
  }
}

</style>
