<template>
  <button>
    {{ text }}
  </button>
</template>

<script>
// ====================================================================== Export
export default {
  name: 'ExpandAllButton',

  props: {
    text: {
      type: String,
      required: true
    }
  }

}
</script>

<style lang="scss" scoped>
//////////////////////////////////////////////////////////////////////// General
button {
  @include fontWeight_Semibold;
  @include fontSize_Regular;
  letter-spacing: $letterSpacing_Large;
  text-transform: uppercase;
  line-height: 2.5rem;
}
</style>
