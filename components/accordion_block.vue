<template>
  <section id="accordion">
    <div class="block accordion-block">
      <Accordion v-slot="{ active }">
        <AccordionSection
          v-for="(section, index) in sections"
          :key="index"
          :active="active">

          <AccordionHeader>
            <div class="grid">
              <div class="col-1">
                <IconArrowDown class="icon" />
              </div>
              <div class="col-10">
                <div class="label">
                  {{ section.label }}
                </div>
              </div>
            </div>
          </AccordionHeader>

          <AccordionContent>
            <div clas="grid">
              <div class="col-10_mi-12">
                <div
                  :class="['accordion-content-wrapper', 'description']"
                  v-html="section.content">
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
}
.accordion-section {
  &.open {
    .icon {
      transition: 0.25s ease-in;
      transform: rotate(180deg);
    }
  }
}

.icon {
  transition: 0.25s ease-out;
}
</style>
