<template>
  <div v-if="totalPages > 1 && page <= totalPages" class="pagination-controls">

    <template v-if="page !== 1">
      <button
        class="control-button first"
        @click="navigateToPage(1)">
        First
      </button>
      <button
        class="control-button prev"
        @click="navigateToPage(page - 1)">
        Prev
      </button>
      <div class="breaker">
        {{ breaker }}
      </div>
    </template>

    <button
      v-for="page in pages"
      :key="`page-${page.num}`"
      :class="['page-button', { current: page.current, display: page.display }]"
      @click="navigateToPage(page.num)">
      {{ page.num }}
    </button>

    <template v-if="page !== totalPages">
      <div class="breaker">
        {{ breaker }}
      </div>
      <button
        class="control-button next"
        @click="navigateToPage(page + 1)">
        Next
      </button>
      <button
        class="control-button last"
        @click="navigateToPage(totalPages)">
        Last
      </button>
    </template>

  </div>
</template>

<script>
// ===================================================================== Imports
import { mapGetters } from 'vuex'

// ====================================================================== Export
export default {
  name: 'Controls',

  props: {
    breaker: {
      type: String,
      required: false,
      default: '⋯'
    }
  },

  computed: {
    ...mapGetters({
      page: 'pagination/page',
      totalPages: 'pagination/totalPages',
      display: 'pagination/display'
    }),
    pages () {
      const total = this.totalPages
      const current = this.page
      const buffer = 2
      const compiled = []
      for (let i = 0; i < total; i++) {
        compiled.push({
          num: i + 1,
          display: i >= current - buffer - 1 && i <= current + buffer - 1,
          current: i + 1 === current
        })
      }
      return compiled
    }
  },

  methods: {
    navigateToPage (page) {
      this.$router.push({
        query: { page }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
$dimension: 2.5rem;

// ///////////////////////////////////////////////////////////////////// General
.pagination-controls {
  @include fontWeight_Semibold;
  @include fontSize_Mini;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 2rem;
  margin-bottom: 1rem;
  font-family: $font_Primary;
  @include medium {
    margin-top: 6rem;
  }
}

// /////////////////////////////////////////////////////////// Buttons & Breaker
.page-button,
.breaker {
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: $dimension;
  height: $dimension;
  color: $classicBlue;
  opacity: 1 !important;
}

.breaker {
  display: flex;
  font-weight: 500;
  color: $classicBlue;
}

.page-button {
  display: none;
  &:not(.current) {
    &:hover {
      text-decoration: none;
      border-color: $classicBlue;
    }
  }
  &.display {
    display: flex;
    border-radius: 100% 55% 100% 55%;
    border: solid 1px rgba(0, 31, 230, 0);
    transition: border-color 0.35s ease-in-out;
  }
  &.current {
    cursor: default;
    border-radius: 100% 55% 100% 55%;
    border-color: $classicBlue;
    border: solid 1px;
    transition: border-color 0.35s ease-in-out;
  }
}

.control-button {
  color: $classicBlue;
  opacity: 1 !important;
  transition: all 250ms ease-in-out;
  &:hover {
    text-decoration: underline;
  }
  &.first,
  &.prev {
    margin-right: 1rem;
  }
  &.next,
  &.last {
    margin-left: 1rem;
  }
}
</style>
