<template>
  <div
    v-if="dataset"
    id="modal"
    :class="{ active: modal }"
    @keyup.esc="closeModal">

    <section id="modal-deal">

      <div class="toolbar">
        <button class="close-button" @click="closeModal">
          X
        </button>
      </div>

      <Slider :dataset="dataset" />

    </section>

  </div>
</template>

<script>
// ====================================================================== Import
import { mapGetters, mapActions } from 'vuex'

import Slider from '@/components/slider'

// ====================================================================== Export
export default {
  name: 'Modal',

  components: {
    Slider
  },

  props: {
    payloadCid: {
      type: [Boolean, String],
      required: true
    }
  },

  data () {
    return {
      initialized: false
    }
  },

  computed: {
    ...mapGetters({
      modal: 'global/modal',
      deals: 'explorer/datasetList',
      datasetNames: 'explorer/datasetNames',
      cids: 'explorer/datasetSingular',
      sliderIndex: 'global/sliderIndex'
    }),
    dataset () {
      return this.cids[this.payloadCid]
    },
    action () {
      return this.modal.action
    },
    url () {
      return this.modal.url
    }
  },

  mounted () {
    window.addEventListener('keydown', (e) => {
      const key = e.key || e.keyCode
      if (key === 'Escape' || key === 'Esc' || key === 27) {
        this.closeModal()
      }
    })
  },

  methods: {
    ...mapActions({
      setModal: 'global/setModal',
      setSliderIndex: 'global/setSliderIndex'
    }),
    closeModal () {
      if (this.modal) {
        this.setSliderIndex(0)
        this.setModal(false)
      }
    },
    getEmbedUrl () {
      return `${this.$BuildVideoEmbedUrl(this.$ParseVideoUrl(this.url))}?autoplay=1`
    }
  }
}
</script>

<style lang="scss" scoped>
// ///////////////////////////////////////////////////////////////////// General
#modal {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  visibility: hidden;
  pointer-events: none;
  z-index: -1;
  &:before {
    content: '';
    position: absolute;
    top: inherit;
    left: inherit;
    width: inherit;
    height: inherit;
    background: rgba(0, 0, 0, 0.5);
    opacity: 0;
    z-index: 5;
    transition: 250ms ease-out;
  }
  &.active {
    visibility: visible;
    pointer-events: all;
    z-index: 10000;
    &:before {
      transition: 250ms ease-in;
      opacity: 1;
    }
    #modal-deal {
      transition: 250ms 100ms ease-in;
      transform: translateY(0);
      opacity: 1;
      z-index: 1000;
    }
  }
}
// ///////////////////////////////////////////////////////////////////// Toolbar
.toolbar {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
}
.close-button {
  @include fontWeight_Semibold;
  color: $classicBlue;
  padding: 0.5rem 1rem;
}
// /////////////////////////////////////////////////////////////// [Modal] Deal
#modal-deal {
  background: $gradient_SilverGrey;
  box-shadow: 0px 30px 70px rgba(169, 180, 203, 0.3), -3px -3px 0px #FFFFFF, 0px 3px 0px #D6DADF, inset 0px -20px 20px rgba(255, 255, 255, 0.2);
  border-radius: 0.3125rem;
  width: 50%;
}
</style>
