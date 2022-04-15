<template>

  <div class="col-10">
    <div :class="[show ? 'dropdown-wrapper dotted-border show' : 'dropdown-wrapper dotted-border']" >
      <button ref="dropdownButton" @click="toggleDropdown">
        Sort by <i class="chevron" />
      </button>
      <div ref="dropdownContent" class="dropdown-content">
        <div class="dropdown-item">
          Renew By - Latest
        </div>
        <div class="dropdown-item">
          Renew By - Soonest
        </div>
      </div>
    </div>
  </div>

</template>

<script>
// ===================================================================== Imports
// ====================================================================== Export

export default {
  name: 'SortButton',

  data () {
    return {
      show: ''
    }
  },

  methods: {
    toggleDropdown () {
      if (this.show === 'show') {
        this.show = ''
      } else {
        this.show = 'show'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
// ///////////////////////////////////////////////////////////////////// General

.dotted-border {
  position: relative;
  height: auto;
  padding: 1.25rem;
  margin: 1rem;
  display: inline-block;
  background-repeat: no-repeat;
  background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cmask id='mask-top-left'%3E%3Crect x='0' y='0' width='100%25' height='100%25' fill='white' /%3E%3Crect x='0' y='0' width='80%25' height='10%25' fill='black' /%3E%3C/mask%3E%3C/defs%3E%3Crect x='-2' y='2' width='98%25' height='95%25' rx='8' fill='none' stroke='blue' stroke-width='3' stroke-dasharray='2, 14' stroke-dashoffset='10' stroke-linecap='round' mask='url(%23mask-top-left)'/%3E%3C/svg%3e");
  transition: all $transitionDuration linear;
  &:before {
    content: '';
    position: absolute;
    background-image: url("data:image/svg+xml,%3Csvg width='8' height='8' xmlns='http://www.w3.org/2000/svg'%3E%3Cellipse ry='4' rx='4' cy='4' cx='4' fill='%23001FE6'/%3E%3C/svg%3E");
    background-size: contain;
    background-repeat: no-repeat;
    transform: translateX(-50%);
    width: 0.625rem;
    height: 0.625rem;
    right: 0rem;
  }
  &:after {
    content: '';
    position: absolute;
    background-image: url("data:image/svg+xml,%3Csvg width='8' height='8' xmlns='http://www.w3.org/2000/svg'%3E%3Cellipse ry='4' rx='4' cy='4' cx='4' fill='%23001FE6'/%3E%3C/svg%3E");
    background-size: contain;
    background-repeat: no-repeat;
    transform: translateX(50%);
    width: 0.625rem;
    height: 0.625rem;
    bottom: -0.25rem;
    left: 0;
  }
}

.dropdown-wrapper {
  min-width: 16rem;

  button {
    position: relative;
    font-size: $fontSize_Mini;
    font-weight: $fontWeight_Semibold;
    cursor: pointer;
    text-align: right;
    width: 100%;
    height: 100%;
    padding-right: 1rem;

  }

  i.chevron {
    display: inline-block;
    transition: all $transitionDuration linear;
    margin: 0 -0.625rem -0.625rem 0.625rem;
    &:before, &:after {
      background-color: $classicBlue;
      transition: all $transitionDuration linear;
    }
  }

  .dropdown-content {
    overflow: hidden;
    opacity: 0;
    max-height: 0rem;
    box-sizing: border-box;
    background: linear-gradient(131.13deg, #F7F9FA 8.78%, #E2E8EF 94.22%);
    border-radius: 0.3rem;
    box-shadow: 0px 20px 70px rgba(169, 180, 203, 0.3), 0 -3px 0px #FFFFFF, 0px 3px 0px #D6DADF, inset 0px -20px 20px rgba(255, 255, 255, 0.2);
    padding: 0 0;
    transition: all $transitionDuration ease;
  }

  .dropdown-item {
    cursor: pointer;
    font-size: $fontSize_Mini;
    font-weight: $fontWeight_Semibold;
    line-height: 1.875rem;
    padding: 0.25rem 1.25rem;
    &:hover {
      background: #D5DBE6;
      width: 100%;
    }
  }

  &.show {
    i.chevron {
      &:before {
        transform: rotate(-45deg);
      }
      &:after {
        transform: rotate(45deg);
      }
    }
    .dropdown-content {
        max-height: 20rem;
        margin-top: 1rem;
        opacity: 1;
    }
  }
}

</style>
