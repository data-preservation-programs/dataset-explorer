<template>
  <div id="header-index">
    <div class="grid">
      <div class="col-9">
        
        <div class="header-wrapper">
          <div class="dotted-border">
            <div class="heading">
              {{ heading }}
            </div>

            <div class="subheading">
              {{ subheading }}
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>

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
  background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect x='6' y='-5' width='102.5%25' height='100.5%25' fill='none' stroke='blue' stroke-width='2' stroke-dasharray='1.5%2c 10' stroke-dashoffset='2 0' stroke-linecap='round'/%3e%3c/svg%3e");
}

.dotted-border::before {
  content: '';
  position: absolute;
  background-image: url("data:image/svg+xml,%3Csvg width='8' height='8' xmlns='http://www.w3.org/2000/svg'%3E%3Cellipse ry='4' rx='4' cy='4' cx='4' fill='blue'/%3E%3C/svg%3E");
  background-size: contain;
  background-repeat: no-repeat;
  transform: translateY(-50%);
  width: 0.3125rem;
  height: 0.3125rem;
  left: .22rem;
}

.dotted-border::after {
  content: '';
  position: absolute;
  background-image: url("data:image/svg+xml,%3Csvg width='8' height='8' xmlns='http://www.w3.org/2000/svg'%3E%3Cellipse ry='4' rx='4' cy='4' cx='4' fill='blue'/%3E%3C/svg%3E");
  background-size: contain;
  background-repeat: no-repeat;
  transform: translateX(50%);
  width: 0.3125rem;
  height: 0.3125rem;
  bottom: 0;
  right: 0;
}

.header-wrapper {
  padding-bottom: 5rem;
}

.heading {
  @include header;
  margin: 1rem;
  padding-left: 2.1rem;
}

.subheading {
  @include subheading;
  margin: 1rem;
  padding-left: 2.7rem;
  padding-bottom: 2.3rem;
}

</style>
