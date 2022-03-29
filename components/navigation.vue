<template>
  <section id="navigation">
    <div class="grid">
      <div class="col">
        <nav class="navigation">

          <nuxt-link
            :to="linkLogo.to"
            class="logo-link">
            <Logo class="logo" />
            <Spinner v-if="loading" />
          </nuxt-link>

          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSe5bpkD5RJeHGMNx3CpkV3a6UA2i7aroNE5DlGUdQF0mQU8DQ/viewform"
            target="_blank"
            class="register-link mobile-only">
            Register
          </a>

          <div class="links">
            <component
              :is="link.type"
              v-for="(link, index) in links"
              :key="index"
              :to="link.type === 'nuxt-link' ? link.url : undefined"
              :href="link.type === 'a' ? link.url : undefined"
              :target="link.target"
              :class="link.class_names">
              {{ link.text }}
            </component>
          </div>

        </nav>
      </div>
    </div>
  </section>
</template>

<script>
// ===================================================================== Imports
import { mapGetters } from 'vuex'

import Logo from '@/components/logo'
import Spinner from '@/components/spinners/material-circle'

// ====================================================================== Export
export default {
  name: 'Navigation',

  components: {
    Logo,
    Spinner
  },

  computed: {
    ...mapGetters({
      siteContent: 'global/siteContent',
      loading: 'deals/loading'
    }),
    navigation () {
      return this.siteContent.general.navigation
    },
    linkLogo () {
      return this.navigation.logo
    },
    links () {
      return this.navigation.links
    }
  }
}
</script>

<style lang="scss" scoped>
// ///////////////////////////////////////////////////////////////////// General
#navigation {
  padding-top: 4.6875rem;
  margin-bottom: 6.75rem;
}

// ////////////////////////////////////////////////////////////////// Navigation
.navigation {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  @include mini {
    flex-direction: column;
  }
  @include tiny {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
  }
}

.logo-link {
  display: flex;
  flex-direction: row;
  transition: 250ms ease-out;
  @include mini {
    margin-bottom: 1rem;
  }
  @include tiny {
    margin-bottom: 0;
  }
  &:hover {
    transition: 250ms ease-in;
    transform: scale(1.05);
  }
}

.logo {
  width: 10.5rem;
}

.spinner {
  margin-top: 0.125rem;
  margin-left: 1rem;
}

.links {
  display: flex;
  flex-direction: row;
  align-items: center;
  @include tiny {
    justify-content: center;
    width: 100%;
    margin-top: 2rem;
  }
}

.nav-link {
  @include leading_Large;
  @include textShadow;
  @include fontWeight_Semibold;
  font-size: 1.25rem;
  margin-right: 3rem;
  @include tiny {
    @include fontSize_Regular;
    @include leading_Regular;
    margin-right: 0;
    &:first-child {
      margin-right: 3rem;
    }
  }
}

.register-link {
  @include fontWeight_Semibold;
  @include leading_Large;
  @include textShadow;
  font-size: 1.25rem;
  margin-bottom: 1rem;
  padding: 1rem 1.5rem;
  background-color: $logCabin;
  border-radius: 10px;
  filter: drop-shadow(0px 0px 34px black);
  transition: 250ms ease-out;
  @include tiny {
    @include fontSize_Regular;
    @include leading_Regular;
  }
  &:hover {
    transition: 250ms ease-in;
    transform: scale(1.05);
    text-decoration: underline;
  }
  &.mobile-only {
    display: none;
    @include tiny {
      display: block;
    }
  }
  &.desktop-only {
    @include tiny {
      display: none;
    }
  }
}
</style>
