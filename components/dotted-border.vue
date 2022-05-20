<template>
  <div class="dotted-border">
    <svg xmlns="http://www.w3.org/2000/svg">

      <rect
        x="0"
        y="0"
        width="100%"
        height="100%" />

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
.dotted-border {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  &:before,
  &:after {
    content: '';
    position: absolute;
    background-color: $classicBlue;
    border-radius: 50%;
    width: 0.375rem;
    height: 0.375rem;
  }
}

svg {
  width: 100%;
  height: 100%;
}

rect {
  fill: none;
  stroke: $classicBlue;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-dasharray: 1.5, 10;
  stroke-dashoffset: 5;
}
</style>
