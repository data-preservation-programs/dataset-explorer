<template>
  <div :class="['filter-bar', { focused }]">

    <div class="dotted-border">

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

    </div>
    
  </div>
</template>

<script>
// ===================================================================== Imports
import { mapActions } from 'vuex'

import IconSearch from '@/components/icons/search'

// ====================================================================== Export
export default {
  name: 'FilterBar',

  components: {
    IconSearch
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

// ///////////////////////////////////////////////////////////////////// General
.filter-bar {
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
    padding: 0.66rem;
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
    .dotted-border {
      background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect x='2' y='2' width='105%25' height='93%25' rx='5' fill='none' stroke='%23001FE6' stroke-width='2' stroke-dasharray='1.5%2c 0' stroke-dashoffset='10' stroke-linecap='round'/%3e%3c/svg%3e");
      &:before {
        visibility: hidden;
      }
      &:after {
        visibility: hidden;
      }
    }
  }
}

.dotted-border {
  position: relative;
  padding-right: 0.5rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  flex: 1;
  background-repeat: no-repeat;
  overflow: hidden;
  background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect x='2' y='2' width='100%25' height='93%25' rx='5' fill='none' stroke='%23001FE6' stroke-width='2' stroke-dasharray='1.5%2c 10' stroke-dashoffset='10' stroke-linecap='round'/%3e%3c/svg%3e");
  &:before {
    content: '';
    position: absolute;
    background-image: url("data:image/svg+xml,%3Csvg width='8' height='8' xmlns='http://www.w3.org/2000/svg'%3E%3Cellipse ry='4' rx='4' cy='4' cx='4' fill='%23001FE6'/%3E%3C/svg%3E");
    background-size: contain;
    background-repeat: no-repeat;
    transform: translateX(-50%);
    width: 0.3125rem;
    height: 0.3125rem;
    right: -0.125rem;
    top: 0;
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
    bottom: -0.0625rem;
    right: 0.125rem;
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
}

</style>
