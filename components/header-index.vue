<template>
  <header id="header-index">
    <div class="grid">
      <div class="col-9_mi-12_sm-10">
        
        <div class="header-wrapper">
          <div class="dotted-border">
            <h1 class="heading">
              {{ heading }}
            </h1>

            <h2 class="subheading">
              {{ subheading }}
            </h2>
          </div>
        </div>

      </div>
    </div>
  </header>

</template>

<script>
export default {
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

.dotted-border {
  position: relative;
  border: 0 0 1rem 1rem;
  background-repeat: no-repeat;
  overflow: visible;
  background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect x='6' y='-5' width='102.5%25' height='100.5%25' fill='none' stroke='%23001FE6' stroke-width='2' stroke-dasharray='1.5%2c 10' stroke-dashoffset='2 0' stroke-linecap='round'/%3e%3c/svg%3e");
    &:before {
      content: '';
      position: absolute;
      background-image: url("data:image/svg+xml,%3Csvg width='8' height='8' xmlns='http://www.w3.org/2000/svg'%3E%3Cellipse ry='4' rx='4' cy='4' cx='4' fill='%23001FE6'/%3E%3C/svg%3E");
      background-size: contain;
      background-repeat: no-repeat;
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
      background-image: url("data:image/svg+xml,%3Csvg width='8' height='8' xmlns='http://www.w3.org/2000/svg'%3E%3Cellipse ry='4' rx='4' cy='4' cx='4' fill='%23001FE6'/%3E%3C/svg%3E");
      background-size: contain;
      background-repeat: no-repeat;
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
