<template>
  <svg class="dotted-border-svg" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
    <rect
      fill="none"
      stroke="#001FE6"
      stroke-width="2"
      stroke-linecap="round" />
  </svg>
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
  overflow: visible;
  &:before {
    content: '';
    position: absolute;
    background-color: $classicBlue;
    border-radius: 50%;
    width: 0.3125rem;
    height: 0.3125rem;
  }
  &:after {
    content: '';
    position: absolute;
    background-color: $classicBlue;
    border-radius: 50%;
    width: 0.3125rem;
    height: 0.3125rem;
  }
}
</style>