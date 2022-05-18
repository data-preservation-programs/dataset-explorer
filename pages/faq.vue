<template>
  <div :class="`page page-${tag}`">
    <div class="content">
      <div class="grid">

        <!-- ======================================================= Heading -->
        <div class="col-11_sm-12">
          <h1 class="heading">
            {{ heading }}
          </h1>
        </div>

        <!-- ===================================================== Accordion -->
        <div class="col-11_sm-12">

          <div class="grid">
            <div class="col" data-push-left="off-1">
              <button
                class="expand-all-button"
                @click="expandAllAccordionSections">
                {{ expandAllButtonText }}
              </button>
            </div>
          </div>

          <Accordion
            ref="accordion"
            v-slot="{ active }"
            :multiple="true"
            @toggleStateChanged="accordionToggleStateChanged">
            <AccordionSection
              v-for="(section, index) in accordionSections"
              :key="index"
              :active="active">

              <AccordionHeader>
                <div class="header-inner-wrapper">
                  <div class="grid">
                    <div class="col-1">
                      <i class="chevron" />
                    </div>
                    <div class="col-11">
                      <h2 class="label">
                        {{ section.label }}
                      </h2>
                    </div>
                  </div>
                </div>
              </AccordionHeader>

              <AccordionContent>
                <div class="content-inner-wrapper">
                  <div clas="grid">
                    <div class="col-11_mi-12">
                      <div v-html="section.content" />
                    </div>
                  </div>
                </div>
              </AccordionContent>

            </AccordionSection>
          </Accordion>

        </div>

        <!-- ================================================= Dotted Border -->
        <div class="dotted-border" />

      </div>
    </div>
  </div>
</template>

<script>
// ===================================================================== Imports
import { mapGetters } from 'vuex'

import Accordion from '@/components/accordion/accordion'
import AccordionHeader from '@/components/accordion/accordion-header'
import AccordionContent from '@/components/accordion/accordion-content'
import AccordionSection from '@/components/accordion/accordion-section'

import Page from '@/content/pages/faq.json'

// ====================================================================== Export
export default {
  name: 'FaqPage',

  components: {
    Accordion,
    AccordionHeader,
    AccordionContent,
    AccordionSection
  },

  data () {
    return {
      tag: 'faq',
      accordionExpanded: false
    }
  },

  async fetch ({ store }) {
    await store.dispatch('global/getBaseData', { key: 'faq', data: Page })
  },

  head () {
    return this.$CompileSeo(this.$GetSeo(this.tag))
  },

  computed: {
    ...mapGetters({
      siteContent: 'global/siteContent'
    }),
    heading () {
      return this.siteContent[this.tag].page_content.heading
    },
    accordionSections () {
      return this.siteContent[this.tag].page_content.accordion_sections
    },
    expandAllButtonText () {
      if (this.accordionExpanded) { return this.siteContent[this.tag].page_content.collapse_all_button_text }
      return this.siteContent[this.tag].page_content.expand_all_button_text
    }
  },

  methods: {
    accordionToggleStateChanged (toggleState) {
      console.log(toggleState)
    },
    expandAllAccordionSections () {
      if (this.accordionExpanded === true) {
        this.$refs.accordion.$emit('expand-all')
        // this.accordionExpanded = false
      } else {
        this.$refs.accordion.$emit('expand-all')
        // this.accordionExpanded = true
      }
    }
  }
}
</script>

<style lang="scss" scoped>
// ///////////////////////////////////////////////////////////////////// General
.heading {
  @include header;
  padding-bottom: 1rem;
  padding-top: 0.625rem;
  margin-left: 5.1875rem;
  @include small {
    margin-left: 4.1875rem;
  }
  @include mini {
    font-size: 5.75rem;
    padding-bottom: 1rem;
    padding-top: 0;
    margin-left: 1rem;
  }
  @include tiny {
    font-size: 3.179rem;
    line-height: 3.063rem;
    letter-spacing: 0.5px;
    padding-bottom: 3.125rem;
    padding-top: 0;
    padding-bottom: 1rem;
    margin-left: 1.5rem;
  }
}

.expand-button {
  cursor: pointer;
  margin-left: 5.625rem;
  @include mini {
    margin-left: -2rem;
  }
}

.accordion {
  margin-left: 5.1875rem;
  @include mini {
    margin-left: 1.5rem;
  }
  @include tiny {
    margin-left: 0.5rem;
  }
}

.content {
  position: relative;
  margin-top: 5rem;
  margin-bottom: 5rem;
  margin-left: 0.75rem;
}

// /////////////////////////////////////////////////////////////////// Accordion
.accordion-section {
  i.chevron {
    display: inline-block;
    margin-top: 1rem;
    &:before, &:after {
      background-color: $classicBlue;
      transition: all $transitionDurationShort ease-in;
    }
  }
  &.open {
    i.chevron {
      &:before {
        transform: rotate(-45deg);
      }
      &:after {
        transform: rotate(-90deg);
        transform: rotate(45deg);
      }
    }
  }
  &:last-child {
    .content-inner-wrapper {
      @include mini {
        padding-bottom: 0;
      }
    }
  }
}

i.chevron {
  display: inline-block;
  margin-top: 1rem;
  &:before, &:after {
    background-color: $classicBlue;
    transition: all $transitionDurationShort ease-in;
  }
  @include small {
    margin-left: 1.5rem;
  }
}

.header-inner-wrapper {
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-content: center;
  justify-content: space-between;
  padding-top: 1rem;
}

.label {
  padding-left: 1.5rem;
}

.content-inner-wrapper {
  padding-left: 5.688rem;
  padding-top: 1rem;
  padding-bottom: 1rem;
  font-weight: $fontWeight_Medium;
  line-height: 2rem;
  font-size: 1.125rem;
  @include small {
    padding-left: 4.188rem;
  }
  @include mini {
    padding-left: 3.688rem;
    padding-bottom: 8rem;
    margin-top: -1.5rem;
  }
}

.expand-all-button {
  @include fontWeight_Semibold;
  @include fontSize_Regular;
  margin-left: 1rem;
  letter-spacing: $letterSpacing_Large;
  text-transform: uppercase;
  line-height: 2.5rem;
  margin-top: -1rem;
  @include mini {
    margin-left: -1.5rem;
  }
  @include tiny {
    margin-left: -0.7rem;
    font-size: 1rem;
  }
}

// /////////////////////////////////////////////////////////////// Dotted Border
.dotted-border {
  position: absolute;
  top: 0;
  width: 0.5rem;
  height: 100%;
  background-repeat: no-repeat;
  overflow: visible;
  background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect x='6' y='-2' width='102.5%25' height='100.5%25' fill='none' stroke='blue' stroke-width='2' stroke-dasharray='1.5%2c 10' stroke-dashoffset='2 0' stroke-linecap='round'/%3e%3c/svg%3e");
  &::before {
    content: '';
    position: absolute;
    background-image: url("data:image/svg+xml,%3Csvg width='8' height='8' xmlns='http://www.w3.org/2000/svg'%3E%3Cellipse ry='4' rx='4' cy='4' cx='4' fill='blue'/%3E%3C/svg%3E");
    background-size: contain;
    background-repeat: no-repeat;
    transform: translateY(-50%);
    width: 0.3125rem;
    height: 0.3125rem;
    left: 0.22rem;
    top: 0rem;
    @include tiny {
      top: -3px;
    }
  }
  &:after {
    content: '';
    position: absolute;
    background-image: url("data:image/svg+xml,%3Csvg width='8' height='8' xmlns='http://www.w3.org/2000/svg'%3E%3Cellipse ry='4' rx='4' cy='4' cx='4' fill='blue'/%3E%3C/svg%3E");
    background-size: contain;
    background-repeat: no-repeat;
    transform: translateX(50%);
    width: 0.3125rem;
    height: 0.3125rem;
    bottom: 0.1px;
    left: 0.0625rem;
    @include tiny {
      bottom: -0.25rem;
    }
  }
  @include mini {
    left: 1rem;
  }
  @include tiny {
    left: 1rem;
  }
}
</style>
