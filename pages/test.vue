<template>
  <header id="header-index">
    <div class="grid">
      <div class="col-9_mi-12_sm-10">
        <div class="header-wrapper">
          <h1 class="heading">
            I am job
          </h1>

          <h2 class="subheading">
            I'm sorry the position has been filled
          </h2>
          <DottedLine />
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import DottedLine from '@/components/dotted-line.vue'

export default {
  name: 'TestPage',

  components: {
    DottedLine
  }
}
</script>

<style lang="scss" scoped>

.dotted-border-svg {
  width: 102.5%;
  height: 100.5%;
  stroke-dasharray: 1.5, 10;
  stroke-dashoffset: 2, 0;
  .rect {
    x: 6;
    y: -5;
  }
}

.heading {
  position: relative;
  @include header;
  margin: 1rem;
  padding-left: 3rem;
  padding-top: 0.563rem;
  @include medium {
    font-size: 7.75rem;
  }
  @include small {
    font-size: 7rem;
    padding-left: 2rem;
  }
  @include mini {
    font-size: 6rem;
    padding-left: 2rem;
  }
  @include tiny {
    font-size: 3.123rem;
    padding-left: 2rem;
    padding-top: 0;
  }
}

.subheading {
  @include subheading;
  line-height: 2.438rem;
  margin: 1rem;
  padding-left: 3.75rem;
  padding-bottom: 2.2rem;
  @include small {
    padding-left: 2.375rem;
  }
  @include mini {
    padding-left: 2.375rem;
  }
  @include tiny {
    font-size: 1.25rem;
    padding-left: 2.375rem;
  }
}

</style>
