<template>
  <div class="grid">
    <div class="col-5">

      <div class="filter-wrapper">
        <div :class="['searchbar', { focused, empty }]">
          <div class="border">
            
            <button class="search-button">
              <IconSearch :loading="loading" />
            </button>
            
            <input
              v-model="value"
              :placeholder="placeholder"
              type="text"
              class="input"
              @focus="focused = true"
              @blur="focused = false">

          </div>
        </div>
      </div>

    </div>
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

.border {
  display: inline-block;
  position: relative;
  background-repeat: no-repeat;
  overflow: hidden;
  background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect x='2' y='2' width='105%25' height='95%25' rx='5' fill='none' stroke='blue' stroke-width='2' stroke-dasharray='1.5%2c 10' stroke-dashoffset='10' stroke-linecap='round'/%3e%3c/svg%3e");
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
}

.input {
  flex: 1;
  position: relative;
  height: 100%;
  padding: 0.875rem 13.7rem 1rem 1.9rem;
  background-color: transparent;
  outline: 0;
  border: 0;
  appearance: none;
  z-index: 15;
  @include placeholder {
    color: $classicBlue;
  }
}

.filter-wrapper {
  padding-bottom: 5rem;
}
</style>
