<template>
  <div :class="['searchbar', { focused, empty }]">

    <button class="search-button">
      <IconSearch :loading="loading" />
    </button>

    <!-- <div
      class="clear-button"
      @click="clearValue()">
      Clear
    </div> -->

    <input
      v-model="value"
      :placeholder="placeholder"
      type="text"
      class="input"
      @focus="focused = true"
      @blur="focused = false">

    <div class="fill" />

    <div class="border" />

  </div>
</template>

<script>
// ===================================================================== Imports
import Debounce from 'lodash/debounce'

import IconSearch from '@/components/icons/search'

// ====================================================================== Export
export default {
  name: 'SearchBar',

  components: {
    IconSearch
  },

  props: {
    placeholder: {
      type: String,
      required: false,
      default: 'Filter by dataset, location'
    },
    loading: {
      type: Boolean,
      required: false,
      default: false
    }
  },

  data () {
    const self = this
    return {
      value: self.$route.query.search,
      focused: false,
      debounce: false
    }
  },

  computed: {
    empty () {
      return !this.value || this.value === ''
    }
  },

  watch: {
    value () {
      this.debounce()
    },
    async '$route' (route) {
      const search = await this.$route.query.search
      if (search !== this.value) {
        this.value = ''
      }
    }
  },

  mounted () {
    this.debounce = Debounce(() => {
      const value = this.value
      const query = value === '' ? undefined : { search: value }
      this.$router.push({ query })
    }, 250)
  },

  methods: {
    clearValue () {
      this.value = ''
    }
  }
}
</script>

<style lang="scss" scoped>
$barHeight: 2.875rem;
$iconHeight: 2rem;
$iconOffset: calc((#{$barHeight} - #{$iconHeight}) / 2);

// ///////////////////////////////////////////////////////////////////// General
.searchbar {
  display: flex;
  flex-direction: row;
  position: relative;
  width: 26.2rem;
  height: 3.1rem;
  transition: 250ms ease-in-out;
  &:active {
    background-color: red;
  }
}

.fill {
  position: absolute;
  top: 2px;
  left: 2px;
  width: calc(100% - 4px);
  height: calc(100% - 4px);
  background-color: $mystic;
  border-radius: 8px;
  z-index: 10;
  transition: 250ms ease-in-out;
}

.border {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  z-index: 5;
  transition: 250ms ease-in-out;
  position: relative;
  border: 0 0 1rem 1rem;
  background-repeat: no-repeat;
  overflow: visible;
  background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect x='6' y='-5' width='102.5%25' height='100.5%25' fill='none' stroke='blue' stroke-width='2' stroke-dasharray='1.5%2c 10' stroke-dashoffset='2 0' stroke-linecap='round'/%3e%3c/svg%3e");
}

.search-button {
  position: absolute;
  top: $iconOffset;
  right: $iconOffset;
  width: $iconHeight;
  height: $iconHeight;
  background-color: $mystic;
  border-radius: 0.25rem;
  z-index: 15;
  .icon-search {
    width: 100%;
    height: 100%;
  }
}

// .clear-button {
//   display: flex;
//   flex-direction: row;
//   align-items: center;
//   position: absolute;
//   top: 0;
//   right: 0;
//   height: 100%;
//   font-size: 0.75rem;
//   font-weight: 600;
//   text-transform: uppercase;
//   // background-color: $charadeDark;
//   // border-left: 1px solid $shark;
//   transform: translateX(100%);
//   padding: 0 0.75rem;
//   cursor: pointer;
//   z-index: 10;
//   transition: 150ms ease-out;
//   &:hover {
//     text-decoration: underline;
//   }
// }

.input {
  flex: 1;
  position: relative;
  height: 100%;
  padding-left: 0.75rem;
  padding-right: calc(#{$iconHeight} + #{$iconOffset} * 2);
  background-color: transparent;
  outline: 0;
  border: 0;
  appearance: none;
  z-index: 15;
  @include placeholder {
    color: $classicBlue;
  }
}
</style>
