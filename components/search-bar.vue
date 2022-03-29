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

    <div class="border bright" />

    <div class="border gradient" />

    <div class="border solid" />

    <div class="shadow" />

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
      default: 'Enter a search term'
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
  width: 28.5rem;
  height: $barHeight;
  transition: 250ms ease-in-out;
  // &:not(.empty):hover {
  //   .clear-button {
  //     transition: 150ms ease-in;
  //     transform: translateX(0);
  //   }
  // }
  &:hover {
    .border {
      &.solid {
        opacity: 0;
      }
      &.gradient {
        opacity: 1;
      }
    }
    .fill {
      opacity: 0.5;
    }
  }
  &.focused,
  &:not(.empty) {
    .border {
      &.solid,
      &.gradient {
        opacity: 0;
      }
      &.bright {
        opacity: 1;
      }
    }
    .fill {
      opacity: 1;
    }
  }
}

.shadow {
  position: absolute;
  top: 0;
  left: 0;
  width: calc(100% - 1.5rem);
  height: 100%;
  background-color: black;
  filter: blur(10px);
  z-index: 0;
}

.fill {
  position: absolute;
  top: 2px;
  left: 2px;
  width: calc(100% - 4px);
  height: calc(100% - 4px);
  background-color: black;
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
  &.solid {
    background-color: $logCabin;
  }
  &.gradient {
    background: linear-gradient(90deg, rgba(19, 25, 20, 1) 0%, rgba(33, 141, 101, 1) 99%);
    opacity: 0;
  }
  &.bright {
    background-color: $eucalyptus;
    opacity: 0;
  }
}

.search-button {
  position: absolute;
  top: $iconOffset;
  right: $iconOffset;
  width: $iconHeight;
  height: $iconHeight;
  background-color: $logCabin;
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
  @include fontSize_Mini;
  @include leading_Regular;
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
    color: white;
  }
}
</style>
