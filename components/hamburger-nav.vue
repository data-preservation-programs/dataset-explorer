<template>
  <nav class="navbar">
    <div class="navbar-container container">
      <input type="checkbox">
      <div class="hamburger-lines">
        <span class="line line1"></span>
        <span class="line line2"></span>
        <span class="line line3"></span>
      </div>
      <ul class="menu-items">
        <li
          v-for="link in links"
          :key="'link-' + link.text">
          <nuxt-link
            :to="link.url">
            {{ link.text }}
          </nuxt-link>
        </li>
      </ul>
    </div>
  </nav>
</template>
<script>
// ===================================================================== Imports

// ====================================================================== Export
export default {
  name: 'HamburgerNav',

  props: {
    links: {
      type: Array,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
// ///////////////////////////////////////////////////////////////////// General
.navbar {
  position: absolute;
  top: 2.5rem;
  right: 1.25rem;
  z-index: 12;
}

.navbar-container input[type="checkbox"],
.navbar-container .hamburger-lines {
  display: block;
}

.navbar-container {
  position: relative;
  height: 2rem;
  input[type="checkbox"] {
    position: absolute;
    height: 2rem;
    width: 1.875rem;
    top: 1.25rem;
    right: 1.25rem;
    z-index: 5;
    opacity: 0;
  }
  .hamburger-lines {
    height: 1.4375rem;
    width: 2.1875rem;
    position: absolute;
    top: 1.25rem;
    right: 0.25rem;
    z-index: 2;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .line {
      height: 0.25rem;
      width: 100%;
      border-radius: 0.625rem;
      background: $classicBlue;
    }
  }
}

.navbar .menu-items {
  margin-bottom: 1rem;
  padding-top: 3.75rem;
  padding-left: 2.125rem;
  padding-right: 2.125rem;
  max-width: 18.75rem;
  transform: translate(150%);
  display: flex;
  flex-direction: column;
  transition: transform 0.5s ease-in-out;
  background: rgb(247, 249, 250, 0.95);
  box-shadow: 0.3125rem 0rem 0.625rem 0rem $mischka;
  list-style: none;
  li {
    margin-bottom: 1.5rem;
    font-size: 1.3rem;
    font-weight: 500;
  }
}

.navbar-container input[type="checkbox"]:checked ~ .menu-items {
  transform: translateX(0);
}

.navbar-container input[type="checkbox"]:checked ~ .hamburger-lines {
  .line1 {
    transition: all 250ms ease-in-out;
    transform: rotate(45deg);
    width: 60%;
  }
  .line2 {
    transition: all 250ms ease-in-out;
    transform: rotate(-45deg);
    width: 60%;
    position: absolute;
    top: 0rem;
  }
  .line3 {
    transform: scaleY(0);
  }
}
</style>
