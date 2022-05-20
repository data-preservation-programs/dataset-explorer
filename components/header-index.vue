<template>
  <header id="header-index">
    <div class="grid">
      <div class="col-9_mi-12_sm-10">

        <div class="header-wrapper">

          <h1 class="heading">
            {{ heading }}
          </h1>

          <h2 class="subheading">
            {{ subheading }}
          </h2>

          <DottedBorder />

        </div>

      </div>
    </div>
  </header>
</template>

<script>
// ===================================================================== Imports

import DottedBorder from '@/components/dotted-border'

// ====================================================================== Export
export default {
  name: 'HeaderIndex',

  components: {
    DottedBorder
  },

  props: {
    heading: {
      type: String,
      required: true
    },
    subheading: {
      type: String,
      required: true
    }
  }

}
</script>

<style lang="scss" scoped>
//////////////////////////////////////////////////////////////////////// General
.header-wrapper {
  position: relative;
}

::v-deep .dotted-border {
  &:before {
    top: -1px;
    left: -1px;
  }
  &:after {
    bottom: 0;
    right: -1px;
  }
  rect {
    transform: scale(0.999) translate(2px, -2px);
    // transform: scale(0.999, 0.99) translate(2px, 2px);
  }
}

.heading {
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
