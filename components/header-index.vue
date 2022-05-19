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
        </div>
        <DottedBorder />
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
  margin-left: -0.5rem;
}

::v-deep .rect {
  width: 110%;
  height: 100%;
  stroke-dasharray: 1.5, 10;
  stroke-dashoffset: 2;
  transform: translate(0.688rem, -0.75rem);
}

::v-deep svg {
  top: -19rem;
}

.dotted-border {
  &:before {
    transform: translateY(50%);
    left: 0.56rem;
    top: -27.5rem;
  }
  &:after {
    right: 37.3rem;
    top: 37.6rem;
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
