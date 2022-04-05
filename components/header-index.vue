<template>
  <div id="header-index">
    <div class="grid">
      <div class="col-9">
        
        <div class="dotted-border">
          <div class="heading">
            DATASET EXPLORER
          </div>

          <div class="subheading">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
            tempor incididunt ut labore
          </div>
        </div>

      </div>
    </div>
  </div>

</template>

<script>
export default {
  props: {

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
  border-image: url("data:image/svg+xml,%3Csvg width='8' height='8' xmlns='http://www.w3.org/2000/svg'%3E%3Cellipse ry='4' rx='4' cy='4' cx='4' fill='blue'/%3E%3C/svg%3E") 8 round;
  top: 50%;
}

.dotted-border::after {
  content: '';
  border-image: url("data:image/svg+xml,%3Csvg width='8' height='8' xmlns='http://www.w3.org/2000/svg'%3E%3Cellipse ry='4' rx='4' cy='4' cx='4' fill='blue'/%3E%3C/svg%3E") 8 round;
  position: absolute;
  top: 50%;
}

.heading {
  @include header;
  margin: 1rem;
  padding-left: 2.1rem;
}

.subheading {
  @include subheading;
  text-transform: uppercase;
  margin: 1rem;
  padding-left: 2.7rem;
  padding-bottom: 2.3rem;
}

</style>
