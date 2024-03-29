<template>
  <div class="filter-wrapper">
    <div :class="['searchbar', { focused, empty }]">
      <div class="dashed-border">
        
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
  height: 3.313rem;
  transition: 250ms ease-in-out;
}

.dashed-border {
  display: inline-block;
  background-repeat: no-repeat;
  overflow: hidden;
  background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect x='2' y='2' width='105%25' height='93%25' rx='5' fill='none' stroke='%23001FE6' stroke-width='2' stroke-dasharray='1.5%2c 10' stroke-dashoffset='10' stroke-linecap='round'/%3e%3c/svg%3e");
  &:before {
    content: '';
    position: absolute;
    background-image: url("data:image/svg+xml,%3Csvg width='8' height='8' xmlns='http://www.w3.org/2000/svg'%3E%3Cellipse ry='4' rx='4' cy='4' cx='4' fill='%23001FE6'/%3E%3C/svg%3E");
    background-size: contain;
    background-repeat: no-repeat;
    transform: translateX(-50%);
    width: 0.3125rem;
    height: 0.3125rem;
    left: 26.2rem;
  }
  &:after {
    content: '';
    position: absolute;
    background-image: url("data:image/svg+xml,%3Csvg width='8' height='8' xmlns='http://www.w3.org/2000/svg'%3E%3Cellipse ry='4' rx='4' cy='4' cx='4' fill='%23001FE6'/%3E%3C/svg%3E");
    background-size: contain;
    background-repeat: no-repeat;
    transform: translateX(50%);
    width: 0.3125rem;
    height: 0.3125rem;
    bottom: 0;
    right: 0;
  }
}

.searchbar.focused {
  .dashed-border {
    background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect x='2' y='2' width='105%25' height='93%25' rx='5' fill='none' stroke='%23001FE6' stroke-width='2' stroke-dasharray='1.5%2c 0' stroke-dashoffset='10' stroke-linecap='round'/%3e%3c/svg%3e");
    &:before {
      visibility: hidden;
    }
    &:after {
      visibility: hidden;
    }
  }
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
  padding: 0.875rem 13.625rem 1.0625rem 1.9375rem;
  background-color: transparent;
  outline: 0;
  border: 0;
  appearance: none;
  z-index: 15;
  color: $classicBlue; // input placeholder not taking the color - to fix
  @include fontSize_Mini;
  // @include placeholder {
  //   color: $classicBlue;
  // }
  &.placeholder {
    color: $classicBlue;
  }
}

.filter-wrapper { // responsible for spacing on index page
  padding-top: 5.5rem;
  padding-bottom: 3.4rem;
}

</style>
