<template>
  <div class="modal-slider">
    <!-- =================================================================== -->
    <section
      :style="{ height: modalHeight }"
      :class="`panel-${panel}`">

      <section
        v-for="(deal, index) in dataset"
        :key="`panel-${index}`"
        ref="panel"
        class="panel fade">
        <div class="inner-content">
          <div class="name-cid">
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
              </div>
            </div>
            <div class="deal-id">
              <h5> Deal ID </h5>
              <div>
                {{ deal.deal_id }}
              </div>
            </div>
          </div>

        </div>
      </section>

    </section>

    <!-- =================================================================== -->
    <section class="toggle-buttons">
      <div class="grid">
        <div class="col">
          <div class="prev">
            <div
              v-if="panel != 0"
              @click="plusSlides(slideIndex += -1)">
              Previous
              <ArrowRightIcon class="arrow" />
            </div>
          </div>
          <div class="next">
            <div
              v-if="panel != dataset.length"
              @click="plusSlides(slideIndex += 1)">
              Next
              <ArrowRightIcon class="arrow" />
            </div>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>

<script>
// ====================================================================== Import
import ArrowRightIcon from '@/components/icons/ArrowRight'

// ====================================================================== Export
export default {
  name: 'Slider',

  components: {
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
      panel: 0,
      modalHeight: '0px',
      resize: false,
      slideIndex: 1
    }
  },

  computed: {
    metadata () {
      return this.schedule[this.panel]
    }
  },

  watch: {
    panel (index) {
      this.setModalHeight(index)
    }
  },

  beforeDestroy () {
    if (this.resize) { window.removeEventListener('resize', this.resize) }
  },

  mounted () {
    const resize = () => { this.setModalHeight() }; resize()
    this.resize = this.$throttle(resize, 1)
    window.addEventListener('resize', this.resize)
  },

  methods: {
    setModalHeight (index) {
      const panel = this.$refs.panel[index || this.panel]
      this.modalHeight = `${panel.clientHeight + 30}px`
    },

    showSlides (n) {
      let i
      const slides = document.getElementsByClassName('panel')
      if (n > slides.length) { this.slideIndex = 1 }
      if (n < 1) { this.slideIndex = slides.length }
      for (i = 0; i < slides.length; i++) {
        slides[i].style.display = 'none'
      }
      slides[this.slideIndex - 1].style.display = 'block'
    }
  }
}
</script>

<style lang="scss" scoped>

// ///////////////////////////////////////////////////////////////////// General
.modal-slider {
  position: relative;
  padding-top: 2rem;
  @include mini {
    padding-top: 3rem;
  }
}

.inner-content {
  position: relative;
}

.panel {
  display: none;
}

.fade {
  animation-name: fade;
  animation-duration: 1.5s;
}

@keyframes fade {
  from {opacity: .4}
  to {opacity: 1}
}

// /////////////////////////////////////////////////////////////// Panel Toggler
.panel-toggler {
  display: flex;
  flex-direction: row;
  margin-top: 0.5rem;
  &.panel-0 {
    .label-0 {
      &:after {
        height: 4px;
        opacity: 1;
      }
    }
  }
  &.panel-1 {
    .toggle {
      &:before {
        transform: translateX(calc(100% + 4px));
      }
    }
    .label-1 {
      &:after {
        height: 4px;
        opacity: 1;
      }
    }
  }
  &.panel-2 {
    .toggle {
      &:before {
        transform: translateX(calc(100% + 4px));
      }
    }
    .label-2 {
      &:after {
        height: 4px;
        opacity: 1;
      }
    }
  }
  .label-0, .label-1, .label-2 {
    display: flex;
    flex-direction: column;
    &:not(:last-child) {
      padding-right: 4.375rem;
    }
    .label-text {
      font-family: $font_Secondary;
      margin-bottom: 0.8125rem;
      &:hover {
        transform: scale(1.025);
      }
      @include tiny {

      }
    }
    .sublabel-text {
      transition: 250ms ease-in-out;
    }
    &:after {
      content: '';
      position: relative;
      bottom: 0.5rem;
      left: 0;
      width: 100%;
      height: 0px;
      background-color: black;
      opacity: 0;
      border-radius: 5px;
      transition: all 0.3s ease-in-out;
    }
    &:hover, &:active {
      &:after {
        height: 4px;
        opacity: 1;
      }
    }
  }
}

.toggle-buttons {
  margin-top: -3rem;
  @include small {
    margin-top: -2rem;
  }
  @include tiny {
    margin-top: -3rem;
  }
}

.toggle-buttons>div>div {
  display: flex;
  flex-direction: row;
  align-content: center;
  justify-content: space-between;
  padding-top: 2rem;
  font-size: 1.5rem;
  font-family: $font_Secondary;
  position: relative;
  z-index: 20;
  .prev>div, .next>div {
    cursor: pointer;
    display: flex;
    .arrow {
      width: 1.5rem;
      transition: all 0.25s ease;
    }
    @include tiny {
      font-size: 1rem;
    }
  }
  .prev {
    @include medium {
      padding-left: 1.75rem;
    }
    div {
      flex-direction: row-reverse;
    }
    .arrow {
      position: relative;
      left: -1.5rem;
      transform: rotate(180deg);
    }
    &:hover {
      .arrow {
        left: -2rem;
      }
    }
  }
  .next {
    @include medium {
      padding-right: 1.75rem;
    }
    div {
      flex-direction: row;
    }
    .arrow {
      position: relative;
      right: -1.5rem;
    }
    &:hover {
      .arrow {
        right: -2rem;
      }
    }
  }
}

</style>
