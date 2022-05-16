<template>
  <svg width='100%' height='100%' xmlns='http://www.w3.org/2000/svg'>
    <rect x='6' y='-5' 
    width='102.5%' 
    height='100.5%' 
    fill='none' 
    stroke='#001FE6' 
    stroke-width='2' 
    stroke-dasharray='1.5, 10' 
    stroke-dashoffset='2 0' 
    stroke-linecap='round'/>
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
  border: 0 0 1rem 1rem;
  background-repeat: no-repeat;
  overflow: visible;
  &:before {
    content: '';
    position: absolute;
    background-color: $classicBlue;
    border-radius: 50%;
    transform: translateY(-50%);
    width: 0.3125rem;
    height: 0.3125rem;
    left: .22rem;
    @include tiny {
      top: 0.25rem;
    }
  }
  &:after {
    content: '';
    position: absolute;
    background-color: $classicBlue;
    border-radius: 50%;
    transform: translateX(50%);
    width: 0.3125rem;
    height: 0.3125rem;
    bottom: 0;
    right: 0;
    @include tiny {
      right: 0.25rem;
    }
  }
}
</style>