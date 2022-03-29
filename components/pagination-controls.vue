<template>
  <section id="pagination-controls">

    <div class="controls">

      <template v-if="page !== 1">
        <button
          class="control-button first"
          @click="incrementPage(1)">
          First
        </button>
        <button
          class="control-button prev"
          @click="incrementPage(page - 1)">
          Prev
        </button>
        <div class="breaker">
          {{ breaker }}
        </div>
      </template>

      <template v-for="pageButton in pages">
        <button
          :key="`page-${pageButton.num}`"
          :class="['page-button', { current: pageButton.current }]"
          @click="incrementPage(pageButton.num)">
          {{ pageButton.num }}
        </button>
      </template>

      <template v-if="page !== totalPages">
        <div class="breaker">
          {{ breaker }}
        </div>
        <button
          class="control-button next"
          @click="incrementPage(page + 1)">
          Next
        </button>
        <button
          class="control-button last"
          @click="incrementPage(totalPages)">
          Last
        </button>
      </template>

    </div>

    <Spinner v-if="loading" />

  </section>
</template>

<script>
// ===================================================================== Imports
import Throttle from 'lodash/throttle'

import Spinner from '@/components/spinners/material-circle'

// ====================================================================== Export
export default {
  name: 'PaginationControls',

  components: {
    Spinner
  },

  props: {
    breaker: {
      type: String,
      required: false,
      default: '⋯'
    },
    page: {
      type: Number,
      required: true
    },
    totalPages: {
      type: Number,
      required: true
    },
    storeKey: {
      type: String,
      required: true
    },
    loading: {
      type: Boolean,
      required: false,
      default: false
    },
    defaultBuffer: {
      type: Number,
      required: false,
      default: 7
    }
  },

  data () {
    return {
      buffers: [
        { breakpoint: '25.9375rem', amount: 0 },
        { breakpoint: '40rem', amount: 2 },
        { breakpoint: '53.125rem', amount: 4 },
        { breakpoint: '64rem', amount: 6 },
        { breakpoint: '75rem', amount: 7 }
      ],
      pages: [],
      resize: false
    }
  },

  watch: {
    loading (loading) {
      if (!loading) {
        this.getPages()
      }
    }
  },

  mounted () {
    const resize = () => { this.getPages() }; resize()
    this.resize = Throttle(resize, 10)
    window.addEventListener('resize', this.resize)
  },

  beforeDestroy () {
    if (this.resize) { window.removeEventListener('resize', this.resize) }
  },

  methods: {
    incrementPage (page) {
      this.$store.dispatch(`${this.storeKey}/incrementPage`, { route: this.$route, page })
    },
    getBuffer () {
      const buffers = this.buffers
      const len = buffers.length
      for (let i = 0; i < len; i++) {
        const buffer = buffers[i]
        const matched = window.matchMedia(`(max-width: ${buffer.breakpoint})`).matches
        if (matched) { return buffer.amount }
      }
      return this.defaultBuffer
    },
    getPages () {
      this.$nextTick(async () => {
        const total = this.totalPages
        const current = this.page
        const buffer = await this.getBuffer()
        console.log(buffer)
        const compiled = []
        for (let i = 0; i < total; i++) {
          if (i >= current - buffer - 1 && i <= current + buffer - 1) {
            compiled.push({
              num: i + 1,
              current: i + 1 === current
            })
          }
        }
        this.pages = compiled
      })
    }
  }
}
</script>

<style lang="scss" scoped>
$dimension: 2.75rem;

// ///////////////////////////////////////////////////////////////////// General
#pagination-controls {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.controls {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

// /////////////////////////////////////////////////////////// Buttons & Breaker
.page-button,
.breaker,
.control-button {
  @include fontSize_Tiny;
  @include leading_Medium;
  @include fontWeight_Semibold;
  opacity: 1;
}

.page-button,
.control-button {
  &:hover {
    color: $mountainMeadow;
  }
}

.page-button {
  display: block;
  text-decoration: none;
  &.current {
    color: $mountainMeadow;
  }
}

.control-button {
  transition: 250ms ease-out;
  &:hover {
    transition: 250ms ease-in;
  }
}

.breaker {
  padding-top: 0.9375rem;
}

// .spinner {
//   margin-left: 1rem;
// }
</style>
