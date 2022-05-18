<template>
  <div class="dot">
    <svg class="dotted-border-svg" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <rect
        class="rect"
        fill="none"
        stroke="#001FE6"
        stroke-width="2"
        stroke-linecap="round" />
    </svg>
  </div>
</template>

<script>
// ====================================================================== Export
export default {
  name: 'DottedLine'
}
</script>

<style lang="scss" scoped>
// ///////////////////////////////////////////////////////////////////// General
svg {
  position: relative;
}
</style>
