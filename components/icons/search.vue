<template>
  <div class="icon-container icon-search">

    <Spinner v-if="loading" />

    <svg v-if="!loading" viewBox="0 0 15 18" fill="none" xmlns="http://www.w3.org/2000/svg">

      <circle
        cx="6.5"
        cy="6.5"
        r="5.5"
        stroke="%23001FE6"
        stroke-width="2"
        stroke-linecap="round" />

      <path
        d="M10 12L13 16"
        stroke="%23001FE6"
        stroke-width="2"
        stroke-linecap="round" />

    </svg>

  </div>
</template>

<script>
// ===================================================================== Imports
import Spinner from '@/components/spinners/material-circle'

// ====================================================================== Export
export default {
  name: 'Search',

  components: {
    Spinner
  },

  props: {
    loading: {
      type: Boolean,
      required: false,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
// ///////////////////////////////////////////////////////////////////// General
.icon-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  // position: absolute;
  // top: 0;
  // left: 0;
  // height: 100%;
  // width: 3rem;
}

.spinner {
  margin-right: 0 !important;
}

svg {
  width: 15px;
  height: 18px;
}
</style>
