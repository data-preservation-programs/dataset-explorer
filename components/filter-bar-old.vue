<template>
  <div :class="['filter-bar', { focused }]">

    <input
      :value="filterValue"
      :placeholder="placeholder"
      type="text"
      class="input"
      @input="handleInput"
      @focus="focused = true"
      @blur="focused = false">

    <div class="icon-container">
      <IconSearch />
    </div>

    <DottedBorder />

  </div>
</template>

<script>
// ===================================================================== Imports
import { mapActions } from 'vuex'

import IconSearch from '@/components/icons/search'

import DottedBorder from '@/components/dotted-border'

// ====================================================================== Export
export default {
  name: 'FilterBar',

  components: {
    IconSearch,
    DottedBorder
  },

  props: {
    filterValue: {
      type: String,
      required: true
    },
    placeholder: {
      type: String,
      required: false,
      default: 'Filter Rankings'
    },
    action: {
      type: String,
      required: false,
      default: 'emit'
    }
  },

  data () {
    return {
      focused: false
    }
  },

  created () {
    this.setFilterValue('')
  },

  methods: {
    ...mapActions({
      setFilterValue: 'global/setFilterValue'
    }),
    handleInput (e) {
      const action = this.action
      const value = e.target.value
      if (action === 'emit') {
        this.$emit('setFilterValue', value)
      } else if (action === 'store') {
        this.setFilterValue(value)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
$dimensions: 2.75rem;

//////////////////////////////////////////////////////////////////////// General
.filter-bar {
  display: flex;
  position: relative;
  width: 26.4375rem;
  height: calc(#{$dimensions} - 2px);
  margin-right: 1rem;
  @include mini {
    width: auto;
    max-width: 20rem;
  }
  @include tiny {
    max-width: none;
  }
  .input {
    padding: 1rem;
    -webkit-appearance: none
  }
  &:hover {
    ::v-deep .icon-container {
      transform: scale(1.1);
    }
  }
  &.focused {
    .icon-container,
    .input {
      transition: 250ms ease-in;
    }
    ::v-deep .icon-container {
      background-color: none;
      transform: scale(1.1);
      .search-svg-circle,
      .search-svg-line {
        transition: 250ms ease-in-out;
      }
    }
    .input {
      border: none;
      padding: 0.66rem 0.75rem;
    }
    ::v-deep .dotted-border {
      rect {
        stroke-dasharray: 0;
      }
    }
  }
}

::v-deep .dotted-border {
  &:before {
    top: -2px;
    left: 100%;
  }
  &:after {
    bottom: 0.5px;
    left: 100%;
  }
  rect {
    transform: scale(0.999, 0.9) translate(3px, 1px);
    transition: stroke-dasharray 1s;
  }
}

.icon-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: calc(#{$dimensions} - 2px);
  height: calc(#{$dimensions} - 2px);
  border-radius: 0.125rem 0 0 0.125rem;
  transition: 250ms ease-out;
  ::v-deep .search-icon {
    width: 1rem;
    .search-svg-circle,
    .search-svg-line {
      transition: 250ms ease-out;
    }
  }
}

.input {
  @include fontSize_Mini;
  @include fontWeight_Medium;
  color: $classicBlue;
  width: calc(100% - (#{$dimensions} - 2px));
  height: 100%;
  padding: 0;
  font-weight: 500;
  outline: 0;
  border: 0;
  appearance: none;
  background: transparent;
  border-radius: 0 0.125rem 0.125rem 0;
  transition: 250ms ease-out;
  &:hover {
    transition: 250ms ease-in;
  }
}
::placeholder {
  @include fontWeight_Medium;
  color: $classicBlue !important;
  padding-left: 1rem;
}

</style>
