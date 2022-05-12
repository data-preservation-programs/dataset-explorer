<template>
  <section id="accordion">
    <div class="block accordion-block">
      <Accordion
        v-slot="{ active }"
        :multiple="true">
        <AccordionSection
          v-for="(section, index) in sections"
          :key="index"
          :active="active">

          <AccordionHeader>
            <div class="header-inner-wrapper">
              <div class="grid">
                <div class="col-1">
                  <IconArrowDown class="icon" />
                </div>
                <div class="col-11">
                  <div class="label">
                    {{ section.label }}
                  </div>
                </div>
              </div>
            </div>
          </AccordionHeader>

          <AccordionContent>
            <div class="content-inner-wrapper">
              <div clas="grid">
                <div class="col-11_mi-12">
                  <div
                    class="content"
                    v-html="section.content">
                  </div>
                </div>
              </div>
            </div>
          </AccordionContent>

        </AccordionSection>
      </Accordion>
    </div>
  </section>
</template>

<script>
// ====================================================================== Import
import Accordion from '@/components/accordion/accordion'
import AccordionHeader from '@/components/accordion/accordion-header'
import AccordionContent from '@/components/accordion/accordion-content'
import AccordionSection from '@/components/accordion/accordion-section'
import IconArrowDown from '@/components/icons/IconArrowDown'

// ====================================================================== Export
export default {
  name: 'AccordionBlock',

  components: {
    Accordion,
    AccordionHeader,
    AccordionContent,
    AccordionSection,
    IconArrowDown
  },

  props: {
    sections: {
      type: Array,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
// ///////////////////////////////////////////////////////////////////// General
#accordion {
  font: $font_Primary;
  @include mini {
    margin-left: 1.5rem;
  }
  @include tiny {
    margin-left: 0.5rem;
  }
}
.accordion-section {
  &.open {
    .icon {
      transition: 0.25s ease-in;
      transform: rotate(180deg);
    }
  }
}

.header-inner-wrapper {
  display: flex;
  flex-direction: row;
  align-content: center;
  justify-content: space-between;
  padding-top: 1.3rem;
  & .label {
    padding-left: 2rem;
    margin-bottom: -0.625rem;
  }
}

.content-inner-wrapper {
  padding-left: 5.688rem;
  padding-top: 1rem;
  padding-bottom: 1rem;
  font-weight: $fontWeight_Medium;
  line-height: 2rem;
  font-size: 1.125rem;
  @include mini {
    padding-left: 4.188rem;
  }
  @include tiny {
    padding-left: 3.688rem;
    padding-bottom: 8.5rem;
    margin-top: -1.5rem;
  }
}

.icon {
  transition: 0.25s ease-out;
}
</style>
