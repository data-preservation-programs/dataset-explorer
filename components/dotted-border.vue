<template>
  <div class="dotted-border">
    <svg class="svg-class" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <rect
        class="rect"
        x="0"
        y="0"
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
  name: 'DottedBorder'
}
</script>

<style lang="scss" scoped>
// ///////////////////////////////////////////////////////////////////// General
svg {
  position: relative;
  width: 100%;
  height: 100%;
}

.dotted-border {
  width: 100%;
  height: 100%;
  position: relative;
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
